import React, { useState } from 'react';
import { Calendar, Search, BookOpen, FileText, ChevronRight, Bookmark, ArrowUpRight, Award, Compass, Eye } from 'lucide-react';
import { HistoricalEvent, SocietyBrandConfig } from '../data/societyData';

interface HistoryPageProps {
  historyEvents: HistoricalEvent[];
  brand: SocietyBrandConfig;
  onOpenDocumentReader: (event: HistoricalEvent) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  historyEvents,
  brand,
  onOpenDocumentReader,
}) => {
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'timeline' | 'story'>('timeline');

  const eras = [
    { id: 'all', label: 'All Eras (1888–Present)' },
    { id: 'founding', label: 'Founding (1888–1910)' },
    { id: 'civic_expansion', label: 'Resilience (1911–1945)' },
    { id: 'mid_century', label: 'Golden Jubilee (1946–1975)' },
    { id: 'modern_growth', label: 'Modern Growth (1976–2000)' },
    { id: 'centennial', label: '21st Century (2001–Present)' },
  ];

  const filteredEvents = historyEvents
    .filter((e) => selectedEra === 'all' || e.era === selectedEra)
    .filter((e) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        e.title.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q) ||
        e.year.toString().includes(q) ||
        (e.documentTitle && e.documentTitle.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => a.year - b.year);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-bold mb-3">
          <BookOpen className="w-4 h-4" />
          <span>Archival Chronicles &bull; 136 Years of Record</span>
        </div>
        <h1 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight mb-4">
          The Chronicles of Our Fellowship
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          From fourteen visionary civic guardians convening in 1888 to an international custodial network: explore the charters, deeds, assemblies, and triumphs that shaped our society.
        </p>
      </div>

      {/* Controls Bar: Era Filters, Search, and View Mode Toggle */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm mb-12 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search historical records, charters, years..."
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

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg w-full md:w-auto justify-center">
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                viewMode === 'timeline'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Chronological Timeline
            </button>
            <button
              onClick={() => setViewMode('story')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                viewMode === 'story'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Narrative Chapters
            </button>
          </div>
        </div>

        {/* Era Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-t border-stone-100 pt-3">
          <span className="text-[11px] uppercase font-bold text-stone-400 mr-2 shrink-0">Filter Era:</span>
          {eras.map((era) => {
            const active = selectedEra === era.id;
            return (
              <button
                key={era.id}
                onClick={() => setSelectedEra(era.id)}
                className={`px-3 py-1 text-xs rounded-lg transition-colors shrink-0 cursor-pointer ${
                  active
                    ? 'bg-stone-900 text-amber-300 font-semibold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {era.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Rendering based on viewMode */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-stone-200">
          <BookOpen className="w-10 h-10 text-stone-400 mx-auto mb-3" />
          <h3 className="font-serif-title text-lg font-bold text-stone-800">No Historical Records Found</h3>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search terms or selecting a different historical era.
          </p>
          <button
            onClick={() => { setSelectedEra('all'); setSearchQuery(''); }}
            className="mt-4 px-4 py-2 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-lg cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'timeline' ? (
        /* ================= CHRONOLOGICAL TIMELINE VIEW ================= */
        <div className="relative border-l-2 border-stone-200 ml-4 sm:ml-8 md:ml-32 pl-6 sm:pl-8 space-y-12">
          {filteredEvents.map((evt, idx) => (
            <div key={evt.id} className="relative group">
              {/* Year Marker Badge on the left */}
              <div className="absolute -left-[35px] sm:-left-[43px] md:-left-[153px] top-1.5 flex items-center md:w-28 md:justify-end">
                <span className="hidden md:inline-block font-display font-bold text-stone-700 text-sm tracking-wider mr-3">
                  {evt.year}
                </span>
                <div className="w-5 h-5 rounded-full bg-stone-900 border-4 border-amber-400 flex items-center justify-center shadow-sm group-hover:scale-125 transition-transform" />
              </div>

              {/* Event Card */}
              <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm hover:border-amber-300 hover:shadow-md transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 text-xs text-amber-800 font-semibold">
                    <span className="md:hidden font-display text-stone-900 font-bold">{evt.year}</span>
                    <span className="md:hidden" aria-hidden="true">&bull;</span>
                    <span>{evt.dateStr}</span>
                    <span aria-hidden="true">&bull;</span>
                    <span className="text-stone-500 font-normal">{evt.eraLabel}</span>
                  </div>

                  {evt.documentType && (
                    <span className="text-[11px] font-medium text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded-md border border-stone-200">
                      Archival {evt.documentType}
                    </span>
                  )}
                </div>

                <h3 className="font-serif-title text-xl font-bold text-stone-900 mb-2 group-hover:text-amber-900 transition-colors">
                  {evt.title}
                </h3>

                <p className="text-stone-600 text-sm leading-relaxed mb-4">
                  {evt.summary}
                </p>

                {/* Narrative Excerpt */}
                <p className="text-stone-500 text-xs leading-relaxed italic border-l-2 border-amber-400 pl-3 mb-4 bg-stone-50/50 py-1.5 rounded-r">
                  &ldquo;{evt.documentExcerpt || evt.fullNarrative.slice(0, 180)}...&rdquo;
                </p>

                {/* Image and Signatories if present */}
                {evt.imageUrl && (
                  <div className="my-4 rounded-lg overflow-hidden border border-stone-200 max-h-64">
                    <img
                      src={evt.imageUrl}
                      alt={evt.title}
                      className="w-full h-full object-cover filter brightness-95 hover:brightness-100 transition-all"
                    />
                  </div>
                )}

                {/* Footer with Document Action */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-stone-100 text-xs">
                  {evt.signatories && (
                    <div className="text-stone-500">
                      <span className="font-semibold text-stone-700">Archival Signatories: </span>
                      {evt.signatories.slice(0, 2).join(', ')}
                      {evt.signatories.length > 2 && ` and ${evt.signatories.length - 2} others`}
                    </div>
                  )}

                  <button
                    onClick={() => onOpenDocumentReader(evt)}
                    className="ml-auto inline-flex items-center gap-1.5 font-semibold text-amber-800 hover:text-amber-900 cursor-pointer transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Examine Primary Document</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ================= NARRATIVE STORY CHAPTERS VIEW ================= */
        <div className="space-y-16 max-w-4xl mx-auto">
          {filteredEvents.map((evt, idx) => (
            <article
              key={evt.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {evt.imageUrl && (
                <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                  <img
                    src={evt.imageUrl}
                    alt={evt.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="font-display text-amber-300 text-xs tracking-widest uppercase font-bold block mb-1">
                      Chapter {idx + 1} &bull; Anno Domini {evt.year}
                    </span>
                    <h2 className="font-serif-title text-2xl sm:text-3xl font-bold leading-tight drop-shadow-sm">
                      {evt.title}
                    </h2>
                  </div>
                </div>
              )}

              <div className="p-6 sm:p-8">
                {!evt.imageUrl && (
                  <div className="mb-4">
                    <span className="font-display text-amber-800 text-xs tracking-widest uppercase font-bold block mb-1">
                      Chapter {idx + 1} &bull; Anno Domini {evt.year}
                    </span>
                    <h2 className="font-serif-title text-2xl font-bold text-stone-900 leading-tight">
                      {evt.title}
                    </h2>
                  </div>
                )}

                <div className="flex items-center gap-3 text-xs text-stone-500 mb-6 pb-4 border-b border-stone-100">
                  <span>{evt.dateStr}</span>
                  <span aria-hidden="true">&bull;</span>
                  <span>{evt.eraLabel}</span>
                  {evt.documentType && (
                    <>
                      <span aria-hidden="true">&bull;</span>
                      <span className="text-amber-800 font-medium">{evt.documentType} Record</span>
                    </>
                  )}
                </div>

                <div className="prose prose-stone max-w-none text-stone-700 text-sm sm:text-base leading-relaxed space-y-4">
                  <p className="font-medium text-stone-900">{evt.summary}</p>
                  <p>{evt.fullNarrative}</p>

                  {evt.documentExcerpt && (
                    <blockquote className="my-6 p-4 rounded-xl bg-amber-50/50 border-l-4 border-amber-600 text-stone-800 italic text-sm">
                      &ldquo;{evt.documentExcerpt}&rdquo;
                      <footer className="mt-2 text-xs font-semibold text-stone-600 not-italic">
                        &mdash; {evt.documentTitle || 'From the Society Archives'}
                      </footer>
                    </blockquote>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {evt.signatories && (
                    <div className="text-xs text-stone-500">
                      <span className="font-semibold text-stone-700">Signatories on parchment: </span>
                      {evt.signatories.join(', ')}
                    </div>
                  )}

                  <button
                    onClick={() => onOpenDocumentReader(evt)}
                    className="px-4 py-2 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-700" />
                    <span>View Archival Record &amp; Proof</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
