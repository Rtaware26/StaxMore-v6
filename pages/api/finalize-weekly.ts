import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

// Initialize Supabase client with service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      persistSession: false, // Do not persist session for API routes
    },
  }
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Get current time in AEST (UTC+10 or UTC+11 for daylight saving)
    // For simplicity, we'll use UTC now and assume your DB times are UTC.
    // If your DB times are truly AEST, you'd need a more robust time zone conversion.
    const currentTime = new Date(); 

    // 1. Query competitions table for active and ended competitions
    const { data: competitions, error: competitionsError } = await supabase
      .from('competitions')
      .select('id, name, league_id, start_time, end_time, status')
      .eq('status', 'active')
      .lte('end_time', currentTime.toISOString());

    if (competitionsError) {
      console.error('Error fetching competitions:', competitionsError);
      return res.status(500).json({ message: 'Error fetching competitions', details: competitionsError.message });
    }

    if (!competitions || competitions.length === 0) {
      return res.status(200).send('No active competitions to finalize.');
    }

    let finalizedCount = 0;

    for (const comp of competitions) {
      console.log(`Processing competition: ${comp.name} (${comp.id})`);

      // 3. For each competition, check if there is at least 1 user in competition_entries
      const { count: entryCount, error: entryError } = await supabase
        .from('competition_entries')
        .select('id', { count: 'exact' })
        .eq('competition_id', comp.id);

      if (entryError) {
        console.error(`Error counting entries for competition ${comp.id}:`, entryError);
        // Continue to next competition, don't block finalization for others
        continue;
      }

      if (entryCount && entryCount > 0) {
        console.log(`Found ${entryCount} entries for competition ${comp.id}. Finalizing...`);
        // Call the RPC function to finalize competition results
        const { data: rpcResult, error: rpcError } = await supabase.rpc('finalize_competition_results', {
          comp_id: comp.id,
        });

        if (rpcError) {
          console.error(`Error finalizing results for competition ${comp.id}:`, rpcError);
        } else if (rpcResult === true) {
          console.log(`Successfully finalized competition: ${comp.id}`);
          finalizedCount++;
        } else {
          console.warn(`Finalization RPC returned false for competition: ${comp.id}. Already closed or not active?`);
        }
      } else {
        console.log(`No entries found for competition ${comp.id}. Skipping finalization.`);
      }
    }

    // 4. Return a 200 response with the number of competitions finalized
    return res.status(200).send(`Finalized ${finalizedCount} competitions.`);
  } catch (error: any) {
    console.error('Unhandled error in /api/finalize-weekly:', error);
    return res.status(500).json({ message: 'Internal Server Error', details: error.message });
  }
} 