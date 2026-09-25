'use client';
 
import { useState, useEffect, useRef } from 'react';
import { CalendarEvent } from '@/library/google/calendar';
 
interface Props {
    events: CalendarEvent[];
}
 
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];
 
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
 
const ACCENT_COLORS = [
    'bg-yellow-400 text-black',
];
 
// ---------- date helpers ----------
 
function dateOnly(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
 
// Inclusive end date. Google all-day events use EXCLUSIVE end dates
// (an all-day event on Jul 8 has end = Jul 9), so subtract one day.
function inclusiveEndDate(ev: CalendarEvent): Date {
    const end = new Date(ev.end);
    if (ev.allDay) {
        const e = dateOnly(end);
        e.setDate(e.getDate() - 1);
        return e;
    }
    return dateOnly(end);
}
 
function diffDays(a: Date, b: Date): number {
    return Math.round((b.getTime() - a.getTime()) / 86400000);
}
 
// Stable color per event (same event keeps its color across week rows)
function colorFor(ev: CalendarEvent): string {
    let h = 0;
    for (let i = 0; i < ev.id.length; i++) {
        h = (h * 31 + ev.id.charCodeAt(i)) % 100000;
    }
    return ACCENT_COLORS[h % ACCENT_COLORS.length];
}
 
// ---------- component ----------
 
export default function EventsCalendar({ events }: Props) {
    const now = new Date();
    const [year, setYear]   = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth()); // 0-indexed
 
    const [dropdownOpen, setDropdownOpen]   = useState(false);
    const [dropdownMonth, setDropdownMonth] = useState(now.getMonth());
    const [dropdownYear, setDropdownYear]   = useState(now.getFullYear());
 
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
 
    const sectionRef = useRef<HTMLDivElement>(null);
 
    // Reveal the fade_in elements once half the section has scrolled into view.
    // Mirrors the site's scripts.js mechanism (adds .visible), just with an
    // earlier trigger point scoped to this section.
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
 
        function reveal() {
            if (!section) return;
            const rect = section.getBoundingClientRect();
            const viewportH = window.innerHeight;
            const visiblePx = Math.min(rect.bottom, viewportH) - Math.max(rect.top, 0);
            const halfway = Math.min(rect.height, viewportH) * 0.5;
 
            if (visiblePx >= halfway) {
                section.querySelectorAll('.fade_in').forEach(el => el.classList.add('visible'));
                window.removeEventListener('scroll', reveal);
            }
        }
 
        reveal(); // in case the section is already half-visible on load
        window.addEventListener('scroll', reveal);
        return () => window.removeEventListener('scroll', reveal);
    }, []);
 
    // --- build grid of actual Dates (includes leading/trailing adjacent-month days) ---
    const firstDay    = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const totalCells  = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const gridStart   = new Date(year, month, 1 - firstDay);
 
    const cells: { date: Date; currentMonth: boolean; isToday: boolean }[] = [];
    for (let i = 0; i < totalCells; i++) {
        const date = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i);
        cells.push({
            date,
            currentMonth: date.getMonth() === month && date.getFullYear() === year,
            isToday: date.toDateString() === now.toDateString(),
        });
    }
 
    const rows: typeof cells[] = [];
    for (let i = 0; i < cells.length; i += 7) {
        rows.push(cells.slice(i, i + 7));
    }
 
    // --- classify events: multi-day (spanning bars) vs single-day (in-cell pills) ---
    const multiDay: { ev: CalendarEvent; start: Date; end: Date }[] = [];
    const singleByDate: Record<string, CalendarEvent[]> = {};
 
    events.forEach(ev => {
        const start = dateOnly(new Date(ev.start));
        const end   = inclusiveEndDate(ev);
        if (end.getTime() > start.getTime()) {
            multiDay.push({ ev, start, end });
        } else {
            const key = start.toDateString();
            if (!singleByDate[key]) singleByDate[key] = [];
            singleByDate[key].push(ev);
        }
    });
 
    // Flat, sorted list of events intersecting the displayed month (mobile agenda view)
    const monthStart = new Date(year, month, 1);
    const monthEnd   = new Date(year, month + 1, 0);
    const monthEvents = events
        .filter(ev => {
            const s = dateOnly(new Date(ev.start));
            const e = inclusiveEndDate(ev);
            return s.getTime() <= monthEnd.getTime() && e.getTime() >= monthStart.getTime();
        })
        .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
 
    // For one week row, compute which multi-day events cross it, their column
    // spans, and assign stacking lanes so overlapping bars don't collide.
    function computeSpans(row: { date: Date }[]) {
        const weekStart = row[0].date;
        const weekEnd   = row[6].date;
 
        const spans: { ev: CalendarEvent; startCol: number; endCol: number; lane: number }[] = [];
        for (const { ev, start, end } of multiDay) {
            if (start.getTime() <= weekEnd.getTime() && end.getTime() >= weekStart.getTime()) {
                const startCol = start.getTime() <= weekStart.getTime() ? 0 : diffDays(weekStart, start);
                const endCol   = end.getTime()   >= weekEnd.getTime()   ? 6 : diffDays(weekStart, end);
                spans.push({ ev, startCol, endCol, lane: 0 });
            }
        }
 
        // Greedy lane assignment: first available lane without overlap
        spans.sort((a, b) =>
            a.startCol - b.startCol ||
            (b.endCol - b.startCol) - (a.endCol - a.startCol)
        );
        const laneOccupancy: Array<Array<[number, number]>> = [];
        for (const s of spans) {
            let lane = 0;
            while (
                laneOccupancy[lane] &&
                laneOccupancy[lane].some(([a, b]) => !(s.endCol < a || s.startCol > b))
            ) {
                lane++;
            }
            if (!laneOccupancy[lane]) laneOccupancy[lane] = [];
            laneOccupancy[lane].push([s.startCol, s.endCol]);
            s.lane = lane;
        }
        return spans;
    }
 
    function changeMonth(dir: number) {
        let m = month + dir;
        let y = year;
        if (m > 11) { m = 0; y++; }
        if (m < 0)  { m = 11; y--; }
        setMonth(m);
        setYear(y);
        setDropdownOpen(false);
        setSelectedEvent(null);
    }
 
    function applyDropdown() {
        setMonth(dropdownMonth);
        setYear(dropdownYear);
        setDropdownOpen(false);
        setSelectedEvent(null);
    }
 
    function getDateRange(event: CalendarEvent): string {
        const start   = new Date(event.start);
        const endIncl = inclusiveEndDate(event);
        const isMultiday = endIncl.getTime() > dateOnly(start).getTime();
        const dOpts = { month: 'long', day: 'numeric' } as const;
 
        if (event.allDay) {
            if (!isMultiday) return 'All day';
            return `${start.toLocaleDateString('en-CA', dOpts)} – ${endIncl.toLocaleDateString('en-CA', dOpts)} (all day)`;
        }
 
        const end = new Date(event.end);
        const t = (d: Date) => d.toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit', hour12: true });
        if (!isMultiday) return `${t(start)} – ${t(end)}`;
        return `${start.toLocaleDateString('en-CA', dOpts)}, ${t(start)} – ${end.toLocaleDateString('en-CA', dOpts)}, ${t(end)}`;
    }
 
    return (
        <div ref={sectionRef} className="z-10 relative flex flex-col px-4 lg:px-20 pb-12 overflow-hidden min-h-[80vh] lg:min-h-0 lg:aspect-[16/9]">
 
            {/* Image background */}
            <img
                src="/assets/backgrounds/staticVectorBkg.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover z-0"
            />
 
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black z-0" style={{ opacity: 0.2 }} />
 
            {/* All content sits above the background.
                Height is driven by min-h-[80vh] on mobile (so the background fills a
                stable area regardless of event count) and by the aspect ratio on desktop. */}
            <div className="relative z-10 flex flex-col min-h-0 lg:h-full">
 
                {/* Section label */}
                <div className="flex overflow-hidden mb-4">
                    <h2 className="flow_in_top px-3 py-3 bg-white rounded-b-2xl text-xl font-bold w-72">
                        Upcoming Events
                    </h2>
                </div>
 
                {/* Calendar */}
                <div className="flex-1 flex flex-col px-2 pb-2 min-h-0">
 
                    {/* Header: arrows + month label + chevron dropdown.
                        relative z-50 lifts the whole header (and its dropdown) above the
                        calendar grid / agenda list that follow it in the DOM. */}
                    <div className="fade_in flex items-center justify-between mb-2 relative z-50">
                        <button
                            onClick={() => changeMonth(-1)}
                            aria-label="Previous month"
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-white border-opacity-20 text-white text-lg hover:bg-white hover:bg-opacity-10 transition-colors"
                        >
                            ‹
                        </button>
 
                        <div className="relative flex items-center gap-2">
                            <span className="text-white text-base font-medium">
                                {MONTHS[month]} {year}
                            </span>
                            <button
                                onClick={() => setDropdownOpen(v => !v)}
                                aria-label="Select month and year"
                                className="text-white opacity-50 hover:opacity-100 transition-opacity text-sm"
                            >
                                ▾
                            </button>
 
                            {dropdownOpen && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-emerald-900 border border-white border-opacity-20 rounded-xl p-3 z-50 w-48">
                                    <select
                                        value={dropdownMonth}
                                        onChange={e => setDropdownMonth(Number(e.target.value))}
                                        className="w-full bg-emerald-950 text-white border border-white border-opacity-20 rounded-md px-2 py-1.5 text-sm mb-2"
                                    >
                                        {MONTHS.map((m, i) => (
                                            <option key={m} value={i}>{m}</option>
                                        ))}
                                    </select>
                                    <select
                                        value={dropdownYear}
                                        onChange={e => setDropdownYear(Number(e.target.value))}
                                        className="w-full bg-emerald-950 text-white border border-white border-opacity-20 rounded-md px-2 py-1.5 text-sm mb-2"
                                    >
                                        {[now.getFullYear() - 1, now.getFullYear(), now.getFullYear() + 1].map(y => (
                                            <option key={y} value={y}>{y}</option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={applyDropdown}
                                        className="w-full bg-yellow-400 text-emerald-950 font-medium rounded-md py-1.5 text-sm"
                                    >
                                        Go
                                    </button>
                                </div>
                            )}
                        </div>
 
                        <button
                            onClick={() => changeMonth(1)}
                            aria-label="Next month"
                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-white border-opacity-20 text-white text-lg hover:bg-white hover:bg-opacity-10 transition-colors"
                        >
                            ›
                        </button>
                    </div>
 
                    {/* Day-of-week headers — desktop only */}
                    <div className="fade_in delay-200 hidden lg:grid grid-cols-7 border-t border-l border-white border-opacity-20">
                        {DAYS.map(d => (
                            <div
                                key={d}
                                className="border-r border-b border-white border-opacity-20 text-center text-xs py-1 uppercase tracking-wider"
                                style={{ color: 'rgba(255,255,255,0.5)' }}
                            >
                                {d}
                            </div>
                        ))}
                    </div>
 
                    {/* Calendar grid — desktop only */}
                    <div className="fade_in delay-400 hidden lg:flex flex-1 flex-col border-l border-white border-opacity-20 min-h-0">
                        {rows.map((row, ri) => {
                            const spans = computeSpans(row);
                            const laneCount = spans.reduce((m, s) => Math.max(m, s.lane + 1), 0);
 
                            return (
                                <div key={ri} className="relative flex-1 min-h-0">
 
                                    {/* Border/background layer — keeps vertical lines continuous */}
                                    <div className="absolute inset-0 grid grid-cols-7">
                                        {row.map((_, ci) => (
                                            <div key={ci} className="border-r border-b border-white border-opacity-20" />
                                        ))}
                                    </div>
 
                                    {/* Content layer */}
                                    <div className="relative h-full flex flex-col min-h-0">
 
                                        {/* Day numbers */}
                                        <div className="grid grid-cols-7">
                                            {row.map((cell, ci) => (
                                                <div
                                                    key={ci}
                                                    className="px-1 pt-1"
                                                    style={{ fontSize: 'clamp(0.65rem, 0.8vw, 0.95rem)' }}
                                                >
                                                    <div
                                                        className={`font-medium rounded-full flex items-center justify-center
                                                            ${cell.isToday
                                                                ? 'bg-yellow-400 text-black'
                                                                : cell.currentMonth
                                                                    ? 'text-white opacity-70'
                                                                    : 'text-white opacity-20'}
                                                        `}
                                                        style={{ width: '1.7em', height: '1.7em' }}
                                                    >
                                                        {cell.date.getDate()}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
 
                                        {/* Multi-day spanning bars */}
                                        {laneCount > 0 && (
                                            <div
                                                className="grid grid-cols-7"
                                                style={{
                                                    gridAutoRows: 'clamp(1.15rem, 1.5vw, 1.6rem)',
                                                    rowGap: '2px',
                                                }}
                                            >
                                                {spans.map(s => (
                                                    <button
                                                        key={`${s.ev.id}-${ri}`}
                                                        onClick={() => setSelectedEvent(s.ev)}
                                                        className={`mx-0.5 text-left rounded px-1 truncate ${colorFor(s.ev)}`}
                                                        style={{
                                                            gridColumn: `${s.startCol + 1} / ${s.endCol + 2}`,
                                                            gridRow: s.lane + 1,
                                                            fontSize: 'clamp(0.6rem, 0.75vw, 0.9rem)',
                                                        }}
                                                    >
                                                        {s.ev.title}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
 
                                        {/* Single-day events — scrollable within the cell */}
                                        <div className="grid grid-cols-7 flex-1 min-h-0">
                                            {row.map((cell, ci) => {
                                                const dayEvents = singleByDate[cell.date.toDateString()] || [];
                                                return (
                                                    <div
                                                        key={ci}
                                                        className="min-h-0 overflow-y-auto px-1 pb-1 pt-0.5 flex flex-col gap-0.5"
                                                        style={{ scrollbarWidth: 'thin' }}
                                                    >
                                                        {dayEvents.map(ev => (
                                                            <button
                                                                key={ev.id}
                                                                onClick={() => setSelectedEvent(ev)}
                                                                className={`w-full shrink-0 text-left rounded px-1 py-0.5 truncate ${colorFor(ev)}`}
                                                                style={{ fontSize: 'clamp(0.6rem, 0.75vw, 0.9rem)' }}
                                                            >
                                                                {ev.title}
                                                            </button>
                                                        ))}
                                                    </div>
                                                );
                                            })}
                                        </div>
 
                                    </div>
                                </div>
                            );
                        })}
                    </div>
 
                    {/* Mobile: agenda list (7-col grid is unusable at phone widths) */}
                    <div
                        className="lg:hidden fade_in delay-400 flex flex-col gap-2 overflow-y-auto pr-1"
                        style={{ maxHeight: '65vh', scrollbarWidth: 'thin' }}
                    >
                        {monthEvents.length === 0 ? (
                            <p className="text-center py-10 text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
                                No events this month
                            </p>
                        ) : (
                            monthEvents.map(ev => {
                                const start = new Date(ev.start);
                                return (
                                    <button
                                        key={ev.id}
                                        onClick={() => setSelectedEvent(ev)}
                                        className="flex items-center gap-3 text-left border border-white border-opacity-20 rounded-xl px-3 py-2.5"
                                    >
                                        {/* Color bar — same per-event color as the grid pills */}
                                        <div className={`w-1.5 self-stretch rounded-full shrink-0 ${colorFor(ev)}`} />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white text-sm font-medium truncate">{ev.title}</p>
                                            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                                                {ev.allDay
                                                    ? 'All day'
                                                    : start.toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit', hour12: true })}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end shrink-0">
                                            <span className="text-yellow-400 text-lg font-medium leading-none">
                                                {start.getDate()}
                                            </span>
                                            <span className="text-xs uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
                                                {start.toLocaleString('default', { month: 'short' })}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>
 
                {/* Event detail modal */}
                {selectedEvent && (
                    <div
                        className="absolute inset-0 z-30 flex items-center justify-center"
                        style={{ background: 'rgba(0,0,0,0.5)' }}
                        onClick={() => setSelectedEvent(null)}
                    >
                        <div
                            className="bg-emerald-900 border border-white border-opacity-20 rounded-2xl p-6 flex flex-col overflow-hidden w-[85%] max-w-[22rem] lg:max-w-[55%]"
                            style={{ maxHeight: '65%' }}
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Title + close. Title wraps; past ~4 lines it scrolls. */}
                            <div className="flex items-start justify-between gap-3 mb-4 shrink-0">
                                <h3
                                    className="text-white font-medium text-lg leading-tight break-words overflow-y-auto pr-1"
                                    style={{ maxHeight: '5.6em', scrollbarWidth: 'thin' }}
                                >
                                    {selectedEvent.title}
                                </h3>
                                <button
                                    onClick={() => setSelectedEvent(null)}
                                    className="text-white opacity-50 hover:opacity-100 text-xl leading-none shrink-0"
                                    aria-label="Close"
                                >
                                    ×
                                </button>
                            </div>
 
                            {/* Date / time / location */}
                            <div className="flex flex-col gap-2 text-sm shrink-0">
                                <div className="flex items-start gap-2 text-white opacity-70">
                                    <span className="shrink-0">🗓</span>
                                    <span className="min-w-0 break-words">
                                        {new Date(selectedEvent.start).toLocaleDateString('en-CA', {
                                            weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
                                        })}
                                    </span>
                                </div>
                                <div className="flex items-start gap-2 text-white opacity-70">
                                    <span className="shrink-0">🕐</span>
                                    <span className="min-w-0 break-words">{getDateRange(selectedEvent)}</span>
                                </div>
                                {selectedEvent.location && (
                                    <div className="flex items-start gap-2 text-white opacity-70">
                                        <span className="shrink-0">📍</span>
                                        <span className="min-w-0 break-words">{selectedEvent.location}</span>
                                    </div>
                                )}
                            </div>
 
                            {/* Description — only rendered if one exists; scrolls when it can't fit */}
                            {selectedEvent.description && (
                                <div
                                    className="mt-4 pt-4 border-t border-white border-opacity-10 overflow-y-auto min-h-0 text-sm text-white opacity-80"
                                    style={{ scrollbarWidth: 'thin' }}
                                >
                                    <p className="whitespace-pre-wrap break-words">
                                        {selectedEvent.description}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
 
            </div>
        </div>
    );
}