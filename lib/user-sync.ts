import { supabase } from "@/lib/supabaseClient"
import type { User } from "@supabase/supabase-js"

export const syncUserToDB = async (user: User) => {
  try {
    // Check if user already exists in public.users table
    const { data, error: selectError } = await supabase.from("users").select("id").eq("id", user.id).single()

    // If user doesn't exist, insert them
    if (!data && selectError?.code === "PGRST116") {
      const { error: insertError } = await supabase.from("users").insert([
        {
          id: user.id,
          username: user.email,
          has_gold_access: false,
          has_diamond_access: false,
        },
      ])

      if (insertError) {
        console.error("Error inserting user into public.users:", insertError)
        throw insertError
      }

      console.log("User successfully synced to database:", user.email)
    } else if (selectError && selectError.code !== "PGRST116") {
      // Handle other errors (not "no rows returned")
      console.error("Error checking user existence:", selectError)
      throw selectError
    } else {
      console.log("User already exists in database:", user.email)
    }
  } catch (error) {
    console.error("Error in syncUserToDB:", error)
    throw error
  }
}
