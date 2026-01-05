
import { neon } from '@neondatabase/serverless';

// Sponsors
export async function getSponsors() {
    const sql = neon(process.env.neon_db_connection_url!);
    const rows = await sql`SELECT * FROM sponsors`;
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
