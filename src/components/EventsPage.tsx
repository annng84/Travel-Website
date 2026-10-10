import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Ticket, Download, Search, CheckCircle2, History, Sparkles, Filter, ChevronRight, Award } from 'lucide-react';
import { SocietyEvent, SocietyBrandConfig } from '../data/societyData';

interface EventsPageProps {
  events: SocietyEvent[];
  brand: SocietyBrandConfig;
  onOpenRSVP: (event: SocietyEvent) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ events, brand, onOpenRSVP }) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Activities' },
    { id: 'Gala & Banquets', label: 'Gala & Banquets' },
    { id: 'Cultural Lectures', label: 'Cultural Lectures' },
    { id: 'Youth & Scholarship', label: 'Youth & Scholarships' },
    { id: 'General Assembly', label: 'General Assemblies' },
    { id: 'Community Service', label: 'Community Service' },
  ];

  const filteredEvents = events
    .filter((e) => e.type === activeTab)
    .filter((e) => selectedCategory === 'all' || e.category === selectedCategory)
    .filter((e) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        (e.keynoteSpeaker && e.keynoteSpeaker.toLowerCase().includes(q))
      );
    });

  const downloadICS = (event: SocietyEvent) => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Heritage Society//Events//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description.replace(/\n/g, ' ')}`,
      `LOCATION:${event.venue}, ${event.address}`,
      `DTSTART:${event.timestamp.replace(/[-:]/g, '')}Z`,
      `DTEND:${event.timestamp.replace(/[-:]/g, '')}Z`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.title.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-bold mb-3">
          <Calendar className="w-4 h-4" />
          <span>Assemblies &bull; Banquets &bull; Symposiums</span>
        </div>
        <h1 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight mb-4">
          Society Events &amp; Convocations
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          From black-tie anniversary banquets in the Sovereign Guildhall to open archival colloquiums and community walking circuits, join in our fellowship.
        </p>
      </div>

      {/* Primary Toggle: Upcoming vs Past Activities */}
      <div className="flex justify-center mb-8">
        <div className="bg-stone-200/80 p-1.5 rounded-xl flex items-center gap-1 shadow-inner">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'upcoming'
                ? 'bg-stone-900 text-amber-300 shadow-md'
                : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Upcoming Assemblies ({events.filter((e) => e.type === 'upcoming').length})</span>
          </button>

          <button
            onClick={() => setActiveTab('past')}
            className={`flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'past'
                ? 'bg-stone-900 text-amber-300 shadow-md'
                : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Past Archives &amp; Recaps ({events.filter((e) => e.type === 'past').length})</span>
          </button>
        </div>
      </div>

      {/* Search and Category Filters */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm mb-10 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by event title, speaker, venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-stone-50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
              >
                Clear
              </button>
            )}
          </div>

          <div className="text-xs text-stone-500 font-medium">
            Showing {filteredEvents.length} {activeTab} {filteredEvents.length === 1 ? 'event' : 'events'}
          </div>
        </div>

        {/* Category Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-t border-stone-100 pt-3">
          <span className="text-[11px] uppercase font-bold text-stone-400 mr-2 shrink-0">Filter:</span>
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 text-xs rounded-lg transition-colors shrink-0 cursor-pointer ${
                  active
                    ? 'bg-amber-800 text-white font-semibold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Events List Grid */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-stone-200">
          <Calendar className="w-10 h-10 text-stone-400 mx-auto mb-3" />
          <h3 className="font-serif-title text-lg font-bold text-stone-800">No Events Found</h3>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            No events match your current filter and search criteria.
          </p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="mt-4 px-4 py-2 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-lg cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredEvents.map((evt) => {
            const isExpanded = expandedEventId === evt.id;
            const percentageFilled = evt.capacity
              ? Math.min(100, Math.round((evt.registeredCount / evt.capacity) * 100))
              : 80;

            return (
              <div
                key={evt.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:border-amber-300 hover:shadow-md transition-all grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Event Thumbnail */}
                <div className="lg:col-span-4 relative min-h-[220px] lg:min-h-full">
                  <img
                    src={evt.imageUrl}
                    alt={evt.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                  
                  {/* Category Badge on Image */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-stone-900/90 text-amber-300 backdrop-blur-sm border border-stone-700">
                      {evt.category}
                    </span>
                  </div>

                  {/* Registered count pill on past/upcoming */}
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs flex items-center justify-between">
                    <span className="font-mono text-[11px] text-amber-300">
                      {evt.type === 'upcoming'
                        ? `${evt.registeredCount} / ${evt.capacity || 200} Attending`
                        : `${evt.registeredCount} Dignitaries Attended`}
                    </span>
                    <span className="text-[10px] uppercase text-stone-300">
                      {evt.type === 'upcoming' ? 'Confirmed Seats' : 'Archived Record'}
                    </span>
                  </div>
                </div>

                {/* Event Main Content */}
                <div className="lg:col-span-8 p-6 sm:p-7 flex flex-col justify-between">
                  <div>
                    {/* Date and Time Header */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-amber-800 font-semibold mb-2">
                      <span className="font-mono">{evt.date}</span>
                      <span aria-hidden="true">&bull;</span>
                      <span>{evt.time}</span>
                    </div>

                    <h2 className="font-serif-title text-xl sm:text-2xl font-bold text-stone-900 mb-3">
                      {evt.title}
                    </h2>

                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
                      {evt.description}
                    </p>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-600 bg-stone-50 p-3.5 rounded-xl border border-stone-100 mb-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <span className="block font-semibold text-stone-900">{evt.venue}</span>
                          <span className="text-stone-500 truncate">{evt.address}</span>
                        </div>
                      </div>

                      {evt.ticketPrice && (
                        <div className="flex items-start gap-2">
                          <Ticket className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                          <div>
                            <span className="block font-semibold text-stone-900">Admission Fee</span>
                            <span className="text-stone-500">{evt.ticketPrice}</span>
                          </div>
                        </div>
                      )}

                      {evt.keynoteSpeaker && (
                        <div className="flex items-start gap-2">
                          <Users className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                          <div>
                            <span className="block font-semibold text-stone-900">Keynote Speaker</span>
                            <span className="text-stone-500">{evt.keynoteSpeaker}</span>
                          </div>
                        </div>
                      )}

                      {evt.dressCode && (
                        <div className="flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                          <div>
                            <span className="block font-semibold text-stone-900">Attire Protocol</span>
                            <span className="text-stone-500">{evt.dressCode}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Past Event Recap Notice */}
                    {evt.type === 'past' && evt.recapNotes && (
                      <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl text-xs text-amber-950 mb-4">
                        <span className="font-bold block uppercase tracking-wider text-[10px] text-amber-800 mb-0.5">
                          Archival Convocation Notes
                        </span>
                        {evt.recapNotes}
                      </div>
                    )}

                    {/* Expandable Schedule Itinerary */}
                    {isExpanded && evt.schedule && evt.schedule.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-stone-200 animate-in fade-in duration-200">
                        <h4 className="text-xs uppercase tracking-wider text-stone-500 font-bold mb-3">
                          Official Order of Proceedings
                        </h4>
                        <div className="space-y-2.5">
                          {evt.schedule.map((slot, sIdx) => (
                            <div key={sIdx} className="flex items-start gap-3 text-xs">
                              <span className="font-mono font-bold text-amber-800 shrink-0 w-16">
                                {slot.time}
                              </span>
                              <span className="text-stone-700">{slot.activity}</span>
                            </div>
                          ))}
                        </div>

                        {evt.highlights && (
                          <div className="mt-4 pt-3 border-t border-stone-100">
                            <span className="text-[11px] font-bold uppercase text-stone-500 block mb-2">
                              Distinctions &amp; Features:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                              {evt.highlights.map((h, hIdx) => (
                                <div key={hIdx} className="flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                  <span>{h}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-stone-100 mt-4">
                    <button
                      onClick={() => setExpandedEventId(isExpanded ? null : evt.id)}
                      className="text-xs font-semibold text-stone-600 hover:text-stone-900 inline-flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>{isExpanded ? 'Hide Detailed Schedule' : 'View Full Schedule & Itinerary'}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      {evt.type === 'upcoming' ? (
                        <>
                          <button
                            onClick={() => downloadICS(evt)}
                            className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg border border-stone-200 cursor-pointer"
                            title="Export Calendar File (.ics)"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onOpenRSVP(evt)}
                            className="flex-1 sm:flex-none px-5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <span>Reserve Seat / RSVP</span>
                            <span aria-hidden="true">&rarr;</span>
                          </button>
                        </>
                      ) : (
                        <div className="flex items-center gap-2 text-xs text-stone-500">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Concluded &bull; Preserved in Annals</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
