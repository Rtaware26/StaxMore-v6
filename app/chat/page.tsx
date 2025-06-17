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
import { FeatureAccess } from "@/components/feature-access";

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

  // Add a simple keyframe animation for a subtle background effect
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes gradient-xy {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .animate-gradient-xy {
        background-size: 400% 400%;
        animation: gradient-xy 15s ease infinite;
      }
      @keyframes pulse-online {
        0% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7); }
        70% { box-shadow: 0 0 0 10px rgba(74, 222, 128, 0); }
        100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
      }
      .animate-pulse-online {
        animation: pulse-online 2s infinite;
      }
      .fade-in-message {
        animation: fade-in 0.5s ease-out;
      }
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Clean up the style tag when the component unmounts
      style.remove();
    };
  }, []);

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
      if (currentView === 'league') {
        if (!userProfile?.league) {
          console.error("Cannot send league message: user not in a league.");
          return;
        }
        if (!userProfile?.username) {
          console.error("Cannot send league message: user username not found.");
          return;
        }
        console.log("ChatPage: Attempting to send league message to league:", userProfile.league);
        // sendLeagueMessage now gets sender_id internally from auth
        const newMessage = await ChatService.sendLeagueMessage(
          userProfile.league,
          messageInput,
          userProfile.username
        );
        if (newMessage) {
          setLeagueMessages((prev) => [...prev, newMessage]);
          setMessageInput('');
        }
      } else if (currentView === 'dm' && selectedDMUserId) {
        console.log("ChatPage: Attempting to send DM to user:", selectedDMUserId);
        const newMessage = await ChatService.sendDirectMessage(
          user.id,
          selectedDMUserId,
          messageInput
        );
        if (newMessage) {
          setDirectMessages((prev) => [...prev, newMessage]);
          setMessageInput('');
          // Optionally refresh DM threads to update last message
          const updatedDMThreads = await ChatService.getDMThreads(user.id);
          setDmThreads(updatedDMThreads);
        }
      }
    } catch (error) {
      console.error('ChatPage: Error sending message:', error);
    }
  };

  // Handle selecting a user for Direct Message
  const handleSelectUserForDM = (userId: string) => {
    setSelectedDMUserId(userId);
    setCurrentView('dm');
    setIsUserSearchOpen(false); // Close search dialog after selecting user
    setSearchTerm(''); // Clear search term
    setSearchResults([]); // Clear search results
  };

  // Handle user search
  useEffect(() => {
    if (searchTerm.length >= 3) {
      const search = async () => {
        const results = await ChatService.searchUsersByUsername(searchTerm);
        setSearchResults(results.filter(u => u.id !== user?.id)); // Filter out current user
      };
      const handler = setTimeout(() => {
        search();
      }, 300); // Debounce search

      return () => {
        clearTimeout(handler);
      };
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, user?.id]);

  // Combine loading states
  const pageLoading = loading; // Assuming useAuth loading covers initial auth/profile loading
  const hasLeagueMembership = userProfile?.league !== null; // Check if user is in a league

  return (
    <FeatureAccess feature="chat">
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-4 h-[calc(100vh-4rem)] relative overflow-hidden rounded-lg shadow-xl">
          {/* Animated Background Placeholder */}
          <div className="absolute inset-0 z-0 opacity-20">
            {/* Replace with actual animated background components (e.g., particles, gradient waves) */}
            <div className="h-full w-full bg-gradient-to-br from-primary/10 to-accent/10 animate-gradient-xy"></div>
          </div>

          <div className="grid grid-cols-12 gap-4 h-full relative z-10">
            {/* Left Sidebar - DM Threads */}
            <div className="col-span-3 bg-card/80 backdrop-blur-lg rounded-lg border border-border shadow-lg flex flex-col">
              <div className="p-4 border-b border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">Direct Messages</h2>
                <Button
                  variant="outline"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-[1.02]"
                  onClick={() => setIsUserSearchOpen(true)}
                >
                  <Users className="w-4 h-4 mr-2" />
                  New Message
                </Button>
                {/* Search Bar for DM threads */}
                <Input
                  placeholder="Search DMs..."
                  className="mt-4 bg-input/60 backdrop-blur-sm border-border text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                />
              </div>
              <ScrollArea className="h-[calc(100%-10rem)]">
                <div className="p-2 space-y-1">
                  {dmThreads.map((thread) => (
                    <div
                      key={thread.chat_id}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-[1.01] flex items-center space-x-3 ${
                        selectedDMUserId === thread.participants.find(p => p.id !== user?.id)?.id
                          ? 'bg-primary/20 text-primary-foreground shadow-md'
                          : 'bg-card/60 hover:bg-accent/30 text-foreground shadow-sm'
                      }`}
                      onClick={() => handleSelectUserForDM(thread.participants.find(p => p.id !== user?.id)?.id || '')}
                    >
                      <div className="relative">
                        <Avatar className="w-10 h-10 border-2 border-primary/50">
                          <AvatarImage src={thread.participants.find(p => p.id !== user?.id)?.avatar_url as string | undefined} />
                          <AvatarFallback className="bg-primary text-primary-foreground">{thread.participants.find(p => p.id !== user?.id)?.username?.[0] || 'U'}</AvatarFallback>
                        </Avatar>
                        <span
                          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${
                            userStatuses[thread.participants.find(p => p.id !== user?.id)?.id || '']?.status === 'online'
                              ? 'bg-green-500 animate-pulse-online'
                              : userStatuses[thread.participants.find(p => p.id !== user?.id)?.id || '']?.status === 'away'
                              ? 'bg-yellow-500'
                              : 'bg-gray-500'
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {thread.participants.find(p => p.id !== user?.id)?.username}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {thread.last_message?.content || 'No messages yet'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Main Chat Area */}
            <div className="col-span-9 bg-card/80 backdrop-blur-lg rounded-lg border border-border shadow-lg flex flex-col">
              <Tabs defaultValue="league" className="flex-1 flex flex-col">
                <div className="border-b border-border">
                  <TabsList className="w-full justify-start p-2 bg-muted/50 rounded-none">
                    <TabsTrigger
                      value="league"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors duration-300 rounded-md py-2 px-4"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      League Chat
                    </TabsTrigger>
                    <TabsTrigger
                      value="dm"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-colors duration-300 rounded-md py-2 px-4"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Direct Messages
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="league" className="flex-1 flex flex-col p-4 overflow-hidden">
                  <ScrollArea className="flex-1 pr-2">
                    <div className="space-y-4">
                      {leagueMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex items-start gap-3 fade-in-message ${
                            message.sender_id === user?.id ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          {message.sender_id !== user?.id && (
                            <Avatar className="w-8 h-8 border-2 border-accent/50">
                              <AvatarImage src={message.sender?.avatar_url as string | undefined} />
                              <AvatarFallback className="bg-accent text-accent-foreground">{message.sender?.username?.[0] || 'U'}</AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`max-w-[70%] rounded-xl p-3 shadow-md relative ${
                              message.sender_id === user?.id
                                ? 'bg-primary text-primary-foreground rounded-br-none'
                                : 'bg-muted/70 text-foreground rounded-bl-none backdrop-blur-md border border-border'
                            }`}
                          >
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-sm">
                                {message.sender_id === user?.id ? 'You' : message.sender?.username || 'Unknown User'}
                              </span>
                              <span className="text-xs text-muted-foreground opacity-80">
                                {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <p className="text-sm">{message.content}</p>
                            {/* Add Reaction Placeholder */}
                            <div className="absolute -bottom-3 right-0 flex space-x-1">
                              {/* Sample Reaction */}
                              <span className="bg-secondary/80 text-secondary-foreground text-xs px-2 py-0.5 rounded-full shadow-sm hover:bg-secondary transition-colors cursor-pointer">👍 1</span>
                            </div>
                          </div>
                          {message.sender_id === user?.id && (
                            <Avatar className="w-8 h-8 border-2 border-primary/50">
                              <AvatarImage src={user?.user_metadata?.avatar_url || undefined} />
                              <AvatarFallback className="bg-primary text-primary-foreground">{userProfile?.username?.[0] || 'U'}</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  {/* Input Bar for League Chat */}
                  <div className="p-4 border-t border-border bg-card/70 backdrop-blur-lg rounded-b-lg">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Type your message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 bg-input/50 text-foreground border-border focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                      />
                      <Button
                        onClick={handleSendMessage}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-[1.05]"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="dm" className="flex-1 flex flex-col p-4 overflow-hidden">
                  {selectedDMUserId ? (
                    <>
                      <ScrollArea className="flex-1 pr-2">
                        <div className="space-y-4">
                          {directMessages.map((message) => (
                            <div
                              key={message.id}
                              className={`flex items-start gap-3 fade-in-message ${
                                message.sender_id === user?.id ? 'justify-end' : 'justify-start'
                              }`}
                            >
                              {message.sender_id !== user?.id && (
                                <Avatar className="w-8 h-8 border-2 border-accent/50">
                                  <AvatarImage src={dmThreads.find(t => t.participants.some(p => p.id === message.sender_id))?.participants.find(p => p.id === message.sender_id)?.avatar_url as string | undefined} />
                                  <AvatarFallback className="bg-accent text-accent-foreground">{dmThreads.find(t => t.participants.some(p => p.id === message.sender_id))?.participants.find(p => p.id === message.sender_id)?.username?.[0] || 'U'}</AvatarFallback>
                                </Avatar>
                              )}
                              <div
                                className={`max-w-[70%] rounded-xl p-3 shadow-md relative ${
                                  message.sender_id === user?.id
                                    ? 'bg-primary text-primary-foreground rounded-br-none'
                                    : 'bg-muted/70 text-foreground rounded-bl-none backdrop-blur-md border border-border'
                                }`}
                              >
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="font-medium text-sm">
                                    {message.sender_id === user?.id ? 'You' : dmThreads.find(t => t.participants.some(p => p.id === message.sender_id))?.participants.find(p => p.id === message.sender_id)?.username || 'Other User'}
                                  </span>
                                  <span className="text-xs text-muted-foreground opacity-80">
                                    {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                                <p className="text-sm">{message.content}</p>
                                {/* Add Reaction Placeholder */}
                                <div className="absolute -bottom-3 right-0 flex space-x-1">
                                  {/* Sample Reaction */}
                                  <span className="bg-secondary/80 text-secondary-foreground text-xs px-2 py-0.5 rounded-full shadow-sm hover:bg-secondary transition-colors cursor-pointer">👍 1</span>
                                </div>
                              </div>
                              {message.sender_id === user?.id && (
                                <Avatar className="w-8 h-8 border-2 border-primary/50">
                                  <AvatarImage src={user?.user_metadata?.avatar_url || undefined} />
                                  <AvatarFallback className="bg-primary text-primary-foreground">{userProfile?.username?.[0] || 'U'}</AvatarFallback>
                                </Avatar>
                              )}
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                      {/* Input Bar for DM Chat */}
                      <div className="p-4 border-t border-border bg-card/70 backdrop-blur-lg rounded-b-lg">
                        <div className="flex space-x-2">
                          <Input
                            placeholder="Type your message..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            className="flex-1 bg-input/50 text-foreground border-border focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
                          />
                          <Button
                            onClick={handleSendMessage}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-[1.05]"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <p className="text-muted-foreground">Select a conversation to start messaging</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* User Search Dialog */}
        <Dialog open={isUserSearchOpen} onOpenChange={setIsUserSearchOpen}>
          <DialogContent className="sm:max-w-[425px] bg-card/90 backdrop-blur-lg border border-border shadow-2xl rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-foreground">New Message</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Search for a user to start a conversation
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Command className="bg-background/50 backdrop-blur-sm rounded-lg border border-border">
                <CommandInput
                  placeholder="Search users..."
                  value={searchTerm}
                  onValueChange={setSearchTerm}
                  className="bg-input/60 text-foreground border-b border-border focus:ring-0 focus:border-primary"
                />
                <CommandList>
                  <CommandEmpty className="text-muted-foreground py-4 text-center">No users found.</CommandEmpty>
                  {searchResults.map((user) => (
                    <CommandItem
                      key={user.id}
                      onSelect={() => {
                        handleSelectUserForDM(user.id);
                        setIsUserSearchOpen(false);
                      }}
                      className="flex items-center space-x-2 p-2 hover:bg-accent/50 cursor-pointer transition-colors"
                    >
                      <Avatar className="h-8 w-8 border-2 border-primary/50">
                        <AvatarImage src={user.avatar_url || undefined} />
                        <AvatarFallback className="bg-primary text-primary-foreground">{user.username?.[0] || 'U'}</AvatarFallback>
                      </Avatar>
                      <span className="text-foreground">{user.username}</span>
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </FeatureAccess>
  );
} 