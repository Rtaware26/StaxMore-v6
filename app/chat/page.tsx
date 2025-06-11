"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth-provider";
import { ProtectedRoute } from "@/components/protected-route";
import { ChatService, LeagueMessage, DirectMessage, DMThread, DMThreadParticipant } from "@/lib/chat-service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MessageSquare, Users, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Command, CommandInput, CommandList, CommandEmpty, CommandItem } from "@/components/ui/command";
import { supabase } from "@/lib/supabaseClient"; // Import supabase instance
import Leaderboard from '@/components/Leaderboard';

// Define a type for user status
interface UserStatus {
  user_id: string;
  status: 'online' | 'offline' | 'away';
  last_seen: string | null;
}

export default function ChatPage() {
  const { user, loading, userProfile } = useAuth();
  const [currentView, setCurrentView] = useState<'league' | 'dm'>('league');
  const [selectedDMUserId, setSelectedDMUserId] = useState<string | null>(null);
  const [leagueMessages, setLeagueMessages] = useState<LeagueMessage[]>([]);
  const [directMessages, setDirectMessages] = useState<DirectMessage[]>([]);
  const [dmThreads, setDmThreads] = useState<DMThread[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [isUserSearchOpen, setIsUserSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<DMThreadParticipant[]>([]);

  // --- Online Status State ---
  const [userStatuses, setUserStatuses] = useState<Record<string, UserStatus>>({});
  const [currentUserStatus, setCurrentUserStatus] = useState<'online' | 'offline' | 'away'>('online');

  // --- Online Status Functions ---

  // Update current user's status in the database
  const updateCurrentUserStatus = async (status: 'online' | 'offline' | 'away') => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_status')
        .upsert({ user_id: user.id, status, last_seen: new Date().toISOString() });

      if (error) {
        console.error('Error updating user status:', error);
      } else {
        setCurrentUserStatus(status);
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  // Set user as online when component mounts
  useEffect(() => {
    if (user) {
      updateCurrentUserStatus('online');
    }

    // Set user as offline when component unmounts
    return () => {
      if (user) {
        updateCurrentUserStatus('offline');
      }
    };
  }, [user]);

  // Subscribe to user status changes
  useEffect(() => {
    if (!user) return;

    const subscription = supabase
      .channel('user_status_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'user_status' },
        (payload) => {
          console.log('User status change received:', payload);
          const newStatus = payload.new as UserStatus;
          setUserStatuses((prev) => ({ ...prev, [newStatus.user_id]: newStatus }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [user, supabase]);

  // Fetch initial user statuses
  useEffect(() => {
    const fetchUserStatuses = async () => {
      const { data, error } = await supabase
        .from('user_status')
        .select('*');

      if (error) {
        console.error('Error fetching user statuses:', error);
        return;
      }

      const statuses: Record<string, UserStatus> = {};
      data.forEach((status) => {
        statuses[status.user_id] = status;
      });
      setUserStatuses(statuses);
    };

    fetchUserStatuses();
  }, []);

  // --- End Online Status Functions ---

  // Fetch initial league messages and DM threads using userProfile.league
  useEffect(() => {
    const loadChatData = async () => {
      // Data can only be loaded once user and their profile (including league) are known and not loading
      if (!user || loading || !userProfile?.league) {
        return;
      }

      console.log("ChatPage: Loading initial chat data for league:", userProfile.league);

      try {
        // Fetch initial league messages using the user's league from profile
        const initialLeagueMessages = await ChatService.getLeagueMessages(userProfile.league);
         // Filter messages by userProfile.league on the frontend as well (redundant but safe double-check)
        const filteredLeagueMessages = initialLeagueMessages.filter(msg => msg.league === userProfile.league);
        setLeagueMessages(filteredLeagueMessages);

        // Fetch initial DM threads
        const initialDMThreads = await ChatService.getDMThreads(user.id);
        setDmThreads(initialDMThreads);

      } catch (error) {
        console.error('ChatPage: Error loading initial chat data:', error);
      }
    };

    // Only attempt to load chat data if user is available, not loading, and userProfile.league exists
    if (user && !loading && userProfile?.league) {
      loadChatData();
    }

  }, [user, loading, userProfile?.league]); // Effect depends on user, loading, and userProfile.league

  // Fetch direct messages when a DM user is selected
  useEffect(() => {
    const loadDirectMessages = async () => {
      if (!user || !selectedDMUserId) {
        setDirectMessages([]);
        return;
      }
      const chatId = ChatService.generateChatId(user.id, selectedDMUserId);
      const messages = await ChatService.getDirectMessages(chatId);
      setDirectMessages(messages);
    };

    loadDirectMessages();
  }, [user, selectedDMUserId]);

  // --- Real-time Subscriptions ---

  // Subscribe to League Messages using userProfile.league
  useEffect(() => {
    // Subscribe only if current view is league, user is available, not loading, and userProfile.league exists
    // Note: The existing subscription logic below handles the 'currentView' and 'userProfile.league' checks.
    // We will integrate the real-time subscription into the existing useEffect or create a new one if necessary.

    // Based on the user's request, let's add the real-time subscription for league messages.
    // This subscription should run whenever the user's league changes.
    if (!userProfile?.league || !user) return; // Ensure user and league are available

    console.log(`ChatPage: Setting up real-time subscription for league messages for league: ${userProfile.league}`);

    const channel = supabase
      .channel(`league_chat_${userProfile.league}`) // Unique channel name per league
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'league_messages',
          filter: `league=eq.${userProfile.league}`, // Use the correct column name 'league'
        },
        (payload) => {
          console.log('ChatPage: Real-time league message received:', payload.new);
          const newMessage = payload.new as LeagueMessage;
          // Add the new message to the state only if it's not already there (e.g., from initial fetch)
          setLeagueMessages((prev) => {
            if (prev.some(msg => msg.id === newMessage.id)) return prev; // Avoid duplicates
            return [...prev, newMessage];
          });
        }
      )
      .subscribe();

    // Clean up subscription on component unmount or when league changes
    return () => {
      console.log(`ChatPage: Cleaning up real-time subscription for league: ${userProfile.league}`);
      supabase.removeChannel(channel);
    };

  }, [userProfile?.league, user, supabase, setLeagueMessages]); // Dependencies: user's league, user, supabase instance, and state setter

  // Subscribe to Direct Messages
  useEffect(() => {
    if (currentView !== 'dm' || !user || !selectedDMUserId) return;

    const chatId = ChatService.generateChatId(user.id, selectedDMUserId);
    console.log(`Subscribing to DM messages for chatId: ${chatId}`);

    const subscription = supabase
      .channel(`dm:${chatId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'direct_messages', filter: `chat_id=eq.${chatId}` },
        (payload) => {
          console.log('New DM message received:', payload);
          // Add the new message to the state
          setDirectMessages((prev) => [...prev, payload.new as DirectMessage]);
          // Potentially refresh DM threads list here or add optimism update
        }
      )
      .subscribe();

    // Clean up subscription
    return () => {
       console.log(`Unsubscribing from DM messages for chatId: ${chatId}`);
       supabase.removeChannel(subscription);
    };
  }, [currentView, user, selectedDMUserId, supabase]); // Add supabase to dependencies

    // --- End Real-time Subscriptions ---

  // Handle sending message
  const handleSendMessage = async () => {
    // Use loading to prevent sending while still loading auth/profile
    // Ensure user, message input, and userProfile.league are available for league chat
    // Ensure user, message input, and selectedDMUserId are available for DM chat
    if (loading || !user || !messageInput.trim()) return; // Keep basic checks

    try {
      if (currentView === 'league' && userProfile?.league) { // Check for league view and userProfile.league
        console.log("ChatPage: Attempting to send league message to league:", userProfile.league);
        // sendLeagueMessage now gets sender_id internally from auth
        await ChatService.sendLeagueMessage(userProfile.league, messageInput, userProfile?.username || user.email || 'Anonymous'); // Pass userProfile.league and username
        console.log("ChatPage: League message sent.");
        setMessageInput(''); // Clear input after sending
      } else if (currentView === 'dm' && selectedDMUserId) { // Check for DM view and selectedDMUserId
        console.log("ChatPage: Attempting to send DM message...");
        await ChatService.sendDirectMessage(user.id, selectedDMUserId, messageInput);
        console.log("ChatPage: DM message sent.");
        setMessageInput('');
      }
    } catch (error) {
      console.error('ChatPage: Error sending message:', error);
      // Optionally show an alert to the user
      alert('Failed to send message.');
    }
  };

  // Handle user search for DMs
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.length >= 3) {
        const results: DMThreadParticipant[] = await ChatService.searchUsersByUsername(searchTerm);
        // Filter out the current user from search results
        setSearchResults(results.filter((result) => user?.id !== result.id));
      } else {
        setSearchResults([]);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, user?.id]);

  const handleSelectUserForDM = (userId: string) => {
      setSelectedDMUserId(userId);
      setCurrentView('dm');
      setIsUserSearchOpen(false); // Close search dialog
      setSearchTerm(''); // Clear search term
      setSearchResults([]); // Clear search results
  };

  // Check overall page loading state
  const pageLoading = loading; // Page loading is just auth/profile loading now

  // Handle access denied based on userProfile.league
  const hasLeagueMembership = !!userProfile?.league; // Check if league exists on profile
  // Show access denied if not loading, user exists, but userProfile.league is null or empty
  const showAccessDenied = !pageLoading && user && !hasLeagueMembership; // Updated access check

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading chat...</p>
      </div>
    );
  }

  if (user && !hasLeagueMembership && !loading) { // Ensure not loading before showing this
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 py-8">
        <div className="max-w-md w-full space-y-6 text-center bg-white p-8 rounded-xl shadow-2xl">
          <h2 className="text-2xl font-bold text-slate-900">No League Membership</h2>
          <p className="text-slate-600">You need to join a competition league to access the chat.</p>
          <Button asChild>
            <a href="/competitions">Explore Leagues</a>
          </Button>
        </div>
      </div>
    );
  }

  if (!user && !loading) { // Ensure not loading before showing login message
    return (
       <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 py-8">
        <div className="max-w-md w-full space-y-6 text-center bg-white p-8 rounded-xl shadow-2xl">
          <h2 className="text-2xl font-bold text-slate-900">Authentication Required</h2>
          <p className="text-slate-600">Please log in to access the chat.</p>
          {/* Add a login button if needed */}
        </div>
      </div>
    );
  }

  if (showAccessDenied) { // Use the derived showAccessDenied state
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 py-8">
        <div className="max-w-md w-full space-y-6 text-center bg-white p-8 rounded-xl shadow-2xl">
          <h2 className="text-2xl font-bold text-slate-900">Membership Required</h2>
          <p className="text-slate-600">You need to join a competition league to access the chat.</p>
          <Button asChild>
            <a href="/competitions">Explore Leagues</a>
          </Button>
        </div>
      </div>
    );
  }

  // Render the chat UI if user is logged in and has a league membership
  // Only render if user and userProfile?.league exist after loading
  if (!user || !userProfile?.league) return null; // Add a final check before rendering UI

  return (
    <ProtectedRoute>
      <div className="flex h-[calc(100vh-4rem)] bg-slate-100">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
          <div className="p-4 border-b border-slate-200">
            <Tabs value={currentView} onValueChange={(value) => setCurrentView(value as 'league' | 'dm')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="league">League Chat</TabsTrigger>
                <TabsTrigger value="dm">Direct Messages</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Sidebar Content - League or DM List */}
          <Tabs value={currentView} onValueChange={(value) => setCurrentView(value as 'league' | 'dm')} className="flex-grow flex flex-col">
             <TabsContent value="league" className="m-0 flex-grow flex flex-col">
                <ScrollArea className="flex-grow">
                  {/* Display the user's single league */}
                   {userProfile?.league && (
                    <div className="p-4">
                      <h3 className="text-lg font-medium mb-2">Your League: {userProfile.league.charAt(0).toUpperCase() + userProfile.league.slice(1)}</h3>
                      {/* Optional: Add a link or info related to their league */}
                    </div>
                   )}
                </ScrollArea>
             </TabsContent>
             <TabsContent value="dm" className="m-0 flex-grow flex flex-col">
                <ScrollArea className="flex-grow">
                  {/* DM Threads List */}
                  {dmThreads.length === 0 ? (
                    <div className="p-4 text-slate-600 text-center">No direct messages yet. Start a new conversation!</div>
                  ) : (
                    dmThreads.map(thread => (
                      <div
                        key={thread.chat_id}
                        className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-slate-100 ${
                          selectedDMUserId === thread.participants.find(p => p.id !== user?.id)?.id ? 'bg-slate-200' : ''
                        }`}
                        onClick={() => setSelectedDMUserId(thread.participants.find(p => p.id !== user?.id)?.id || null)}
                      >
                        <Avatar>
                          <AvatarImage src={thread.participants.find(p => p.id !== user?.id)?.avatar_url || undefined} />
                          <AvatarFallback>{thread.participants.find(p => p.id !== user?.id)?.username?.[0] || 'U'}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 overflow-hidden">
                          <div className="font-semibold text-slate-800 truncate">
                            {thread.participants.find(p => p.id !== user?.id)?.username || 'Unknown User'}
                            {/* Display online status */}
                            {userStatuses[thread.participants.find(p => p.id !== user?.id)?.id || '']?.status === 'online' && (
                              <span className="ml-2 inline-block h-2 w-2 rounded-full bg-green-500"></span>
                            )}
                          </div>
                          <div className="text-sm text-slate-600 truncate">
                            {thread.last_message?.content || 'Start of conversation'}
                          </div>
                        </div>
                      </div>
                    ))
                  )}

                  {/* Button to open user search for new DM */}
                  <div className="p-3">
                     <Button className="w-full" onClick={() => setIsUserSearchOpen(true)}>
                        <Search className="mr-2 h-4 w-4" /> Start New DM
                     </Button>
                  </div>
                </ScrollArea>
             </TabsContent>
          </Tabs>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between">
             {currentView === 'league' && userProfile?.league ? ( // Use userProfile.league
                <CardTitle className="text-xl font-semibold">League Chat: {userProfile.league.charAt(0).toUpperCase() + userProfile.league.slice(1)}</CardTitle>
             ) : currentView === 'dm' && selectedDMUserId ? (
                <CardTitle className="text-xl font-semibold">Direct Message: {dmThreads.find(t => t.participants.some(p => p.id === selectedDMUserId))?.participants.find(p => p.id !== user?.id)?.username || 'Loading...'}</CardTitle>
             ) : (
                <CardTitle className="text-xl font-semibold">Select a Chat</CardTitle>
             )}
             {/* Future: Add options button, etc. */}
          </div>

          {/* Message Area */}
          <ScrollArea className="flex-grow p-4 space-y-4">
             {currentView === 'league' && userProfile?.league ? ( // Use userProfile.league
                leagueMessages.map((message, index) => (
                   <div key={message.id || index} className={`flex items-start gap-3 ${
                      message.sender_id === user?.id ? 'justify-end' : 'justify-start'
                   }`}>
                      {message.sender_id !== user?.id && (
                         <Avatar>
                            <AvatarImage src={message.sender?.avatar_url || undefined} />
                            <AvatarFallback>{message.sender?.username?.[0] || 'U'}</AvatarFallback>
                         </Avatar>
                      )}
                      <div className={`p-3 rounded-lg max-w-xs lg:max-w-md ${
                         message.sender_id === user?.id ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-800'
                      }`}>
                         {message.sender_id !== user?.id && (
                            <div className="font-semibold text-sm mb-1">{message.sender?.username || 'Unknown User'}</div>
                         )}
                         <p>{message.content}</p>
                         <div className={`text-xs mt-1 ${
                            message.sender_id === user?.id ? 'text-blue-200' : 'text-slate-500'
                         }`}>
                            {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {/* Format time */}
                         </div>
                      </div>
                      {message.sender_id === user?.id && (
                         <Avatar>
                             <AvatarImage src={message.sender?.avatar_url || undefined} />
                            <AvatarFallback>{message.sender?.username?.[0] || 'U'}</AvatarFallback>
                         </Avatar>
                      )}
                   </div>
                ))
             ) : currentView === 'dm' && selectedDMUserId ? (
                directMessages.map((message, index) => (
                   <div key={message.id || index} className={`flex items-start gap-3 ${
                      message.sender_id === user?.id ? 'justify-end' : 'justify-start'
                   }`}>
                      {message.sender_id !== user?.id && (
                         <Avatar>
                             {/* Find the participant that is NOT the current user */}
                             <AvatarImage src={dmThreads.find(t => t.participants.some(p => p.id === selectedDMUserId))?.participants.find(p => p.id !== user?.id)?.avatar_url || undefined} />
                             <AvatarFallback>{dmThreads.find(t => t.participants.some(p => p.id === selectedDMUserId))?.participants.find(p => p.id !== user?.id)?.username?.[0] || 'U'}</AvatarFallback>
                         </Avatar>
                      )}
                      <div className={`p-3 rounded-lg max-w-xs lg:max-w-md ${
                         message.sender_id === user?.id ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-800'} // Different color for DM
                      `}>
                         {/* In DMs, sender username isn't strictly necessary in every message bubble */}
                         <p>{message.content}</p>
                         <div className={`text-xs mt-1 ${
                            message.sender_id === user?.id ? 'text-green-200' : 'text-slate-500'}
                         `}>
                            {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {/* Format time */}
                         </div>
                      </div>
                      {message.sender_id === user?.id && (
                         <Avatar>
                            <AvatarImage src={user.user_metadata?.avatar_url || undefined} />
                             <AvatarFallback>{user.user_metadata?.username?.[0] || user.email?.[0] || 'U'}</AvatarFallback>
                         </Avatar>
                      )}
                   </div>
                ))
             ) : (
                <div className="text-center text-slate-600">Select a chat from the sidebar.</div>
             )}
          </ScrollArea>

          {/* Message Input Area */}
          {(currentView === 'league' && userProfile?.league) || (currentView === 'dm' && selectedDMUserId) ? ( // Use userProfile.league
             <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-2">
                <Input
                   placeholder={`Send message to ${currentView === 'league' && userProfile?.league ? userProfile.league.charAt(0).toUpperCase() + userProfile.league.slice(1) + ' League' : selectedDMUserId ? 'user' : ''}`}
                   value={messageInput}
                   onChange={(e) => setMessageInput(e.target.value)}
                   onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                         handleSendMessage();
                      }
                   }}
                   className="flex-grow"
                />
                <Button onClick={handleSendMessage}>
                   <Send className="h-5 w-5" />
                </Button>
             </div>
          ) : null}

        </div>

        {/* User Search Dialog for New DM */}
        <Dialog open={isUserSearchOpen} onOpenChange={setIsUserSearchOpen}>
           <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                 <DialogTitle>Start New Direct Message</DialogTitle>
                 <DialogDescription>Search for a user by username to start a private chat.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                 <Command>
                    <CommandInput placeholder="Search users..." value={searchTerm} onValueChange={setSearchTerm} />
                    <CommandList>
                       {searchTerm.length < 3 && (
                         <CommandEmpty>Type at least 3 characters to search.</CommandEmpty>
                       )}
                       {searchTerm.length >= 3 && searchResults.length === 0 && (
                         <CommandEmpty>No users found.</CommandEmpty>
                       )}
                       {searchResults.map((user) => (
                         <CommandItem
                            key={user.id}
                            onSelect={() => {
                              handleSelectUserForDM(user.id);
                              setIsUserSearchOpen(false);
                              setSearchTerm(''); // Clear search term
                              setSearchResults([]); // Clear search results
                            }}
                         >
                            <Avatar className="mr-2 h-8 w-8">
                               <AvatarImage src={user.avatar_url || undefined} />
                               <AvatarFallback>{user.username?.[0] || 'U'}</AvatarFallback>
                            </Avatar>
                            {user.username}
                         </CommandItem>
                       ))}
                    </CommandList>
                 </Command>
              </div>
           </DialogContent>
        </Dialog>

      </div>
    </ProtectedRoute>
  );
} 