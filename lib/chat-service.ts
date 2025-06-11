import { supabase } from "./supabaseClient";

// Define types for messages based on your Supabase schema

interface BaseMessage {
  id: string;
  created_at: string;
  content: string; // Assuming 'content' is the column name for message text
  sender_id: string;
}

interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
}

export interface LeagueMessage extends BaseMessage {
  league: string;
  sender: Profile | null; // Add sender profile
}

export interface DirectMessage extends BaseMessage {
  chat_id: string;
  // Direct messages don't explicitly need receiver_id here if joining participants
}

export interface DMThreadParticipant extends Profile {
  // Removed: user_id: string; // Ensure user_id is here as it's used for key/comparison
  // username and avatar_url are inherited from Profile
}

export interface DMThread {
    chat_id: string;
    participants: DMThreadParticipant[];
    last_message: DirectMessage | null; // Use DirectMessage type for last_message
}

export class ChatService {

  // --- League Chat Functions ---

  static async sendLeagueMessage(
    league: string,
    content: string,
    senderUsername: string
  ): Promise<LeagueMessage | null> {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('Error getting authenticated user for sending league message:', userError);
      return null;
    }

    const senderId = user.id; // Securely get user ID from auth
    console.log("ChatService: Sending league message from user ID:", senderId, "to league:", league);

    const { data, error } = await supabase
      .from("league_messages")
      .insert([
        {
          content: content,
          sender_id: senderId, // Use the securely fetched ID
          sender_username: senderUsername, // Use the username passed from frontend
          league: league,
        },
        ])
        .select("*") // Select the inserted row to return it
      .single(); // Expecting a single row back

      if (error) {
        console.error("ChatService: Error inserting league message:", error); // Log insert error
        console.error("ChatService: Full error inserting league message:", JSON.stringify(error, null, 2)); // Add detailed logging
        return null;
      }
       console.log("ChatService: Inserted league message data:", data); // Log successful insert data

      // Need to manually fetch sender profile if needed here, or update the initial select
      // Let's update the select to fetch sender profile
       const { data: insertedMessage, error: fetchError } = await supabase
        .from("league_messages")
        .select("*") // Fetch just the inserted row without embedding sender profile
        .eq("id", data.id) // Assuming insert returns a single object with the new row's ID
        .single();

      if(fetchError) {
        console.error("ChatService: Error fetching inserted league message with sender:", fetchError);
        console.error("ChatService: Full error fetching inserted league message with sender:", JSON.stringify(fetchError, null, 2)); // Add detailed logging
        // Return partial data or null depending on how critical the sender info is immediately
        return { ...data, sender: null }; // Return inserted data without sender
      }

      console.log("ChatService: Fetched inserted league message (without sender embedding):", insertedMessage);
      return insertedMessage as LeagueMessage; // Cast to updated type
    }

    static async getLeagueMessages(league: string, limit = 50): Promise<LeagueMessage[]> {
      // RLS on league_messages SELECT should handle filtering by the user's league
      // We just need to filter by the specific league channel requested.
      console.log("ChatService: Attempting to fetch league messages for league:", league);
      const { data, error } = await supabase
        .from("league_messages")
        .select("*") // Fetch only message data, without embedding sender profile for now
        .eq("league", league)
        .order("created_at", { ascending: true }) // Assuming 'created_at' is the correct timestamp column
        .limit(limit);

      if (error) {
        console.error("ChatService: Error fetching league messages:", error);
        console.error("ChatService: Full error fetching league messages:", JSON.stringify(error, null, 2)); // Add detailed logging
        return [];
      }
       console.log("ChatService: Fetched league messages without embedding:", data?.length, "messages");
      // We will need to fetch sender profiles separately in the frontend
      return data || [];
    }

    // --- Direct Message Functions ---

    static generateChatId(user1Id: string, user2Id: string): string {
      return [user1Id, user2Id].sort().join("_");
    }

    static async sendDirectMessage(
      senderId: string,
      receiverId: string,
      message: string
    ): Promise<DirectMessage | null> {
      const chatId = this.generateChatId(senderId, receiverId);

      const { data, error } = await supabase
        .from("direct_messages")
        .insert([
          {
            sender_id: senderId,
            receiver_id: receiverId,
            message: message,
            chat_id: chatId,
          },
        ])
        .select("*") // Select the inserted row to return it, without embedding
        .single();

      if (error) {
        console.error("Error sending direct message:", error);
        console.error("ChatService: Full error sending direct message:", JSON.stringify(error, null, 2)); // Add detailed logging
        return null;
      }
       console.log("ChatService: Inserted direct message data:", data);
       // We will need to fetch sender/receiver profiles separately if needed immediately
      return data;
    }

    static async getDirectMessages(chatId: string, limit = 100): Promise<DirectMessage[]> {
      const { data, error } = await supabase
        .from("direct_messages")
        .select("*") // Fetch only message data
        .eq("chat_id", chatId)
        .order("created_at", { ascending: true })
        .limit(limit);

      if (error) {
        console.error("Error fetching direct messages:", error);
         console.error("ChatService: Full error fetching direct messages:", JSON.stringify(error, null, 2)); // Add detailed logging
        return [];
      }
       console.log("ChatService: Fetched direct messages without embedding:", data?.length, "messages");
      // We will need to fetch sender profiles separately in the frontend
      return data || [];
    }

    // Fetch list of DM threads for a user
    static async getDMThreads(userId: string): Promise<DMThread[]> {
      // Fetch direct messages involved in threads without embedding profiles
      const { data: messages, error } = await supabase
        .from("direct_messages")
        .select("*") // Fetch only message data, without embedding profiles
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching raw DM messages for threads:", error);
        console.error("ChatService: Full error fetching raw DM messages for threads:", JSON.stringify(error, null, 2)); // Add detailed logging
        return [];
      }

      console.log('Raw direct_messages data for threads (without embedding):', messages); // Added logging

      if (!messages) return [];

      const threadsMap = new Map<
        string,
        { lastMessage: DirectMessage ; otherParticipantId: string }
      >();

      for (const msg of messages) {
        const chatId = msg.chat_id;
        const otherParticipantId = msg.sender_id === userId ? msg.receiver_id : msg.sender_id;

        if (
          !threadsMap.has(chatId) ||
          new Date(msg.created_at) > new Date(threadsMap.get(chatId)!.lastMessage.created_at)
        ) {
          threadsMap.set(chatId, { lastMessage: msg, otherParticipantId });
        }
      }

      const threadList = Array.from(threadsMap.values());

      // We will need to fetch participant profiles separately in the frontend
      // Returning a simplified DMThread structure without embedded profiles
      return threadList
        .map((t) => {
          // Construct a basic thread structure, frontend will fetch participant profiles
          const participants: DMThreadParticipant[] = [
              { id: userId, username: "You", avatar_url: null }, // Use id, removed user_id
              { id: t.otherParticipantId, username: "Unknown User", avatar_url: null }
          ].filter(p => p.id !== null) as DMThreadParticipant[]; // Filter by id, cast

          return {
            chat_id: t.lastMessage.chat_id,
            participants: participants, // Placeholder participants, frontend will update
            last_message: t.lastMessage, // Include the full last message object
          };
        })
        .sort((a, b) =>
          a.last_message?.created_at && b.last_message?.created_at
            ? new Date(b.last_message.created_at).getTime() -
              new Date(a.last_message.created_at).getTime()
            : 0
        );
    }

    // Function to search for users by username for DMs
    static async searchUsersByUsername(query: string): Promise<DMThreadParticipant[]> {
      console.log("ChatService: Searching users by username:", query);
      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, avatar_url, league") // Selecting league as well
        .ilike("username", `%${query}%`)
        .limit(10);

      if (error) {
        console.error("Error searching users:", error);
        console.error("Full error searching users:", JSON.stringify(error, null, 2)); // Add detailed logging
        return [];
      }

      // Filter out current user from search results if user is authenticated
      const { data: userData } = await supabase.auth.getUser();
      const currentUserId = userData?.user?.id;

      const filteredData = data.filter(profile => profile.id !== currentUserId);

      return filteredData.map(profile => ({
        id: profile.id,
        username: profile.username || 'Anonymous',
        avatar_url: profile.avatar_url || null,
        league: profile.league || null,
      }));
    }
}
