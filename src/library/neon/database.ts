import { cacheLife } from 'next/cache';
import { neon } from '@neondatabase/serverless';

type QueryResult = { rows: Record<string, unknown>[] };

// Sponsors
export async function getSponsors(sponsorLevel: string): Promise<QueryResult> {
    'use cache'
    cacheLife('days')
    if (process.env.neon_db_connection_url === undefined) {
        return { rows: [] };
    }
    const sql = neon(process.env.neon_db_connection_url!);
    const rows = await sql`SELECT * FROM sponsors WHERE sponsor_level = ${sponsorLevel} ORDER BY display_order ASC`;
    return { rows };
}

export async function getSponsorRanks(): Promise<QueryResult> {
    'use cache'
    cacheLife('days')
    if (process.env.neon_db_connection_url === undefined) {
        return { rows: [] };
    }
    const sql = neon(process.env.neon_db_connection_url!);
    const rows = await sql`SELECT * FROM sponsor_levels ORDER BY level_order ASC`;
    return { rows };
}

// Members
export async function getActiveExecutives(): Promise<QueryResult> {
    'use cache'
    cacheLife('days')
    if (process.env.neon_db_connection_url === undefined) {
        return { rows: [] };
    }
    const sql = neon(process.env.neon_db_connection_url!);
    const rows = await sql`
    SELECT m.first_name, m.last_name, m.title, m.img_ref_link 
    FROM members m
        LEFT JOIN member_types mt ON m.member_type = mt.name
    WHERE active = TRUE 
    ORDER BY 
        mt.type_order ASC,
        display_order ASC,
        title ASC,
        first_name ASC`;

    return { rows };
}

// Projects
export async function getProjects(projectType: string): Promise<QueryResult> {
    'use cache'
    cacheLife('days')
    if (process.env.neon_db_connection_url === undefined) {
        return { rows: [] };
    }
    const sql = neon(process.env.neon_db_connection_url!);
    const rows = await sql`
    SELECT 
        *
    FROM projects p
    WHERE project_type = ${projectType}
    ORDER BY id DESC`;
    return { rows };
}

// Competitions
export interface CompetitionEvent {
    id?: number;
    name: string;
    year?: string;
    location?: string;
    event_date: string;
    end_date?: string;
    link?: string;
    description?: string;
}

export async function getUpcomingCompetition(): Promise<CompetitionEvent> {
    'use cache'
    cacheLife('days')

    const defaultCompetition: CompetitionEvent = {
        name: process.env.NEXT_PUBLIC_COMPETITION_NAME || 'Launch Canada 2027',
        year: '2027',
        location: process.env.NEXT_PUBLIC_COMPETITION_LOCATION || 'Timmins, Ontario',
        event_date: process.env.NEXT_PUBLIC_COMPETITION_TARGET_DATE || '2027-08-14T12:00:00-04:00',
        link: process.env.NEXT_PUBLIC_COMPETITION_LINK || 'https://www.launchcanada.org',
        description: 'Countdown to competition week in Timmins, Ontario'
    };

    if (process.env.neon_db_connection_url === undefined) {
        return defaultCompetition;
    }

    try {
        const sql = neon(process.env.neon_db_connection_url!);
        const rows = await sql`
        SELECT * FROM competitions 
        WHERE display = TRUE AND event_date >= NOW() - INTERVAL '7 days'
        ORDER BY event_date ASC 
        LIMIT 1`;

        if (rows && rows.length > 0) {
            const row = rows[0] as any;
            return {
                id: row.id,
                name: row.name || defaultCompetition.name,
                year: row.year || defaultCompetition.year,
                location: row.location || defaultCompetition.location,
                event_date: row.event_date ? new Date(row.event_date).toISOString() : defaultCompetition.event_date,
                end_date: row.end_date ? new Date(row.end_date).toISOString() : undefined,
                link: row.link || defaultCompetition.link,
                description: row.description || defaultCompetition.description
            };
        }
    } catch {
        // Fall back gracefully if table does not exist or network unavailable
    }

    return defaultCompetition;
}

