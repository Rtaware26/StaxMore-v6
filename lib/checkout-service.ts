import { type User } from "@supabase/supabase-js";

export const handleCheckout = async (userId: string, leagueId: string, entryFee: number) => {
  if (!userId) {
    alert("Please log in to join a league.");
    return;
  }
  try {
    console.log(`Initiating checkout for user ${userId}, league ${leagueId}, fee ${entryFee}`);
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, leagueId, entryFee }),
    });

    let data;
    try {
      data = await res.json();
    } catch (jsonError) {
      // If parsing as JSON fails, read as text for debugging
      try {
        const text = await res.text();
        console.error("Checkout failed: Server did not return valid JSON. Raw response:", text);
        alert("Checkout failed: Server error. Please check console for details.");
      } catch (textError) {
        console.error("Checkout failed: Could not read server response as text.", textError);
        alert("Checkout failed: Could not read server response.");
      }
      return;
    }

    if (data?.url) {
      // Success: Redirect to Stripe checkout
      window.location.href = data.url;
    } else {
      // API returned JSON, but not the expected success format
      console.error("Checkout session creation failed:", data);
      const errorMessage = data?.message || data?.error || "Unknown error from server.";
      alert(`Checkout failed: ${errorMessage}`);
    }
  } catch (fetchError) {
    console.error("Error during checkout process (fetch failed):", fetchError);
    alert("An error occurred during checkout. Could not reach server.");
  }
}; 