
import { neon } from '@neondatabase/serverless';

// Sponsors
export async function getSponsors(sponsorLevel: string) {
    const sql = neon(process.env.neon_db_connection_url!);
    const rows = await sql`SELECT * FROM sponsors WHERE sponsor_level = ${sponsorLevel} ORDER BY display_order ASC`;
    return Response.json({rows});
}

export async function getSponsorRanks() {
    const sql = neon(process.env.neon_db_connection_url!);
    const rows = await sql`SELECT * FROM sponsor_levels ORDER BY level_order ASC`;
    return Response.json({rows});
}

// Members
export async function getActiveExecutives() {
    const sql = neon(process.env.neon_db_connection_url!);
    const all_executives = await sql`SELECT * FROM members WHERE display_order IS NOT NULL AND active = TRUE ORDER BY display_order ASC`;
    const other_members = await sql`SELECT * FROM members WHERE display_order IS NULL AND active = TRUE ORDER BY title ASC, first_name ASC`;
    all_executives.push(...other_members);
    return Response.json(all_executives);
}
