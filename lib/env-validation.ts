export function validateEnvVars() {
  const requiredEnvVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }

  const missingVars = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key)

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}\n` +
        "Please check your .env.local file and ensure all required variables are set.",
    )
  }

  return requiredEnvVars as Record<keyof typeof requiredEnvVars, string>
}

// Validate on module load (only in browser/server, not during build)
if (typeof window !== "undefined" || process.env.NODE_ENV === "development") {
  try {
    validateEnvVars()
  } catch (error) {
    console.error("Environment validation failed:", error)
  }
}
