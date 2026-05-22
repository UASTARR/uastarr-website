
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
    const all_executives = await sql`
    SELECT m.first_name, m.last_name, m.title, m.img_ref_link 
    FROM members m
        LEFT JOIN member_types mt ON m.member_type = mt.name
    WHERE active = TRUE 
    ORDER BY 
        mt.type_order ASC,
        display_order ASC,
        title ASC,
        first_name ASC`;
        
    return Response.json(all_executives);
}

// Projects
export async function getProjects(projectType: string) {
    const sql = neon(process.env.neon_db_connection_url!);
    const rows = await sql`
    SELECT 
        *
    FROM projects p
    WHERE project_type = ${projectType}
    ORDER BY id DESC`;
    return Response.json({rows});
}