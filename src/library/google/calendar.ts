import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

export interface CalendarEvent {
    id: string;
    title: string;
    start: string;      // ISO datetime string, or YYYY-MM-DD for all-day events
    end: string;
    location?: string;
    description?: string;
    allDay: boolean;
}

// Google Calendar descriptions can contain HTML (its editor is rich-text).
// Convert to plain text with line breaks preserved so the UI renders it safely.
function cleanDescription(html?: string | null): string | undefined {
    if (!html) return undefined;
    const text = html
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/(p|div|li)>/gi, '\n')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .trim();
    return text || undefined;
}

// Fetches events from the start of the current month up to `monthsAhead` months ahead.
// DEV: Uses dummy calendar. Before deploying to production, replace
// google_calendar_id in .env with the real UASTARR calendar ID,
// and ensure the production calendar is shared with the service account.
export async function getUpcomingEvents(monthsAhead: number = 4): Promise<CalendarEvent[]> {
    if (!process.env.google_calendar_id) {
        console.warn('google_calendar_id is not set in .env');
        return [];
    }

    const calendar = google.calendar({
        version: 'v3',
        auth: process.env.google_api_key,
    });

    // Start from the first day of the current month so navigating
    // back to the current month still shows all events
    const timeMin = new Date();
    timeMin.setDate(1);
    timeMin.setHours(0, 0, 0, 0);

    const timeMax = new Date(timeMin);
    timeMax.setMonth(timeMax.getMonth() + monthsAhead);

    try {
        const res = await calendar.events.list({
            calendarId: process.env.google_calendar_id,
            timeMin: timeMin.toISOString(),
            timeMax: timeMax.toISOString(),
            singleEvents: true,     // Expands recurring events into individual instances
            orderBy: 'startTime',
        });

        const items = res.data.items || [];

        return items
            .filter(e => e.id && e.summary)
            .map(e => ({
                id: e.id!,
                title: e.summary!,
                start: e.start?.dateTime || e.start?.date || '',
                end: e.end?.dateTime || e.end?.date || '',
                location: e.location ?? undefined,
                description: cleanDescription(e.description),
                allDay: !e.start?.dateTime,
            }));
    } catch (error) {
        console.error('Failed to fetch calendar events:', error);
        return [];
    }
}