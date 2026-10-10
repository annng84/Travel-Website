/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { UpcomingEventSpotlight } from './components/UpcomingEventSpotlight';
import { HistoryPage } from './components/HistoryPage';
import { CommitteePage } from './components/CommitteePage';
import { EventsPage } from './components/EventsPage';
import { RSVPModal } from './components/RSVPModal';
import { DocumentReaderModal } from './components/DocumentReaderModal';
import { DocumentManagerModal } from './components/DocumentManagerModal';
import { DeployGuideModal } from './components/DeployGuideModal';

import {
  SocietyBrandConfig,
  CommitteeMember,
  HistoricalEvent,
  SocietyEvent,
  UserUploadedDocument,
  getStoredBrand,
  getStoredMembers,
  getStoredHistory,
  getStoredEvents,
  getStoredUploadedDocs,
} from './data/societyData';

import {
  BookOpen,
  Users,
  Calendar,
  ArrowRight,
  Shield,
  Award,
  Landmark,
  FileText,
  Clock,
  Sparkles,
  CheckCircle2,
  Sliders,
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'history' | 'committee' | 'events'>('home');
  const [brand, setBrand] = useState<SocietyBrandConfig>(getStoredBrand);
  const [members, setMembers] = useState<CommitteeMember[]>(getStoredMembers);
  const [historyEvents, setHistoryEvents] = useState<HistoricalEvent[]>(getStoredHistory);
  const [events, setEvents] = useState<SocietyEvent[]>(getStoredEvents);
  const [uploadedDocs, setUploadedDocs] = useState<UserUploadedDocument[]>(getStoredUploadedDocs);

  // Modal states
  const [rsvpEvent, setRsvpEvent] = useState<SocietyEvent | null>(null);
  const [readingDocEvent, setReadingDocEvent] = useState<HistoricalEvent | null>(null);
  const [isDocManagerOpen, setIsDocManagerOpen] = useState(false);
  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState(false);

  // Upcoming Event Spotlight
  const nextUpcomingEvent = events.find((e) => e.type === 'upcoming') || events[0];

  const handleRSVPSuccess = (event: SocietyEvent, guestData: any) => {
    // Increment registration count locally
    setEvents((prev) =>
      prev.map((e) => (e.id === event.id ? { ...e, registeredCount: e.registeredCount + 1 } : e))
    );
  };

  // Scroll to top upon tab switch
  const handleSelectTab = (tab: 'home' | 'history' | 'committee' | 'events') => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-amber-200 selection:text-amber-950 font-sans">
      {/* Navigation Bar */}
      <Navbar
        brand={brand}
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        nextEvent={nextUpcomingEvent}
        onOpenDocManager={() => setIsDocManagerOpen(true)}
        onOpenRSVP={(evt) => setRsvpEvent(evt)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* ======================= TAB: HOME ======================= */}
        {currentTab === 'home' && (
          <div>
            {/* 1. Hero Section using uploaded/generated images */}
            <HeroSection
              brand={brand}
              onNavigate={handleSelectTab}
              onOpenDocManager={() => setIsDocManagerOpen(true)}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
              {/* 2. Next Upcoming Event Spotlight with Countdown */}
              {nextUpcomingEvent && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                        Official Calendar Spotlight
                      </span>
                      <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-stone-900">
                        Next Upcoming Gathering
                      </h2>
                    </div>
                    <button
                      onClick={() => handleSelectTab('events')}
                      className="text-xs font-semibold text-amber-900 hover:text-amber-700 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All Assemblies</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <UpcomingEventSpotlight
                    event={nextUpcomingEvent}
                    onOpenRSVP={(evt) => setRsvpEvent(evt)}
                  />
                </div>
              )}

              {/* 3. Brief Introduction & Historical Charter Preview */}
              <section className="bg-white rounded-2xl border border-stone-200 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
                    <Landmark className="w-4 h-4" />
                    <span>A Century of Heritage</span>
                  </div>

                  <h2 className="font-serif-title text-2xl sm:text-4xl font-bold text-stone-900 leading-tight">
                    Preserving the Cultural Fabric of Our City for 136 Years
                  </h2>

                  <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                    Founded in October 1888, the {brand.organizationName} serves as the enduring guardian of our metropolitan historical records, monumental architecture, and civic memory. We steward over 25,000 cataloged manuscripts in climate-controlled vaults, sponsor annual collegiate fellowships in the humanities, and host distinguished convocations for our 4,200 worldwide members.
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
                    <div className="p-3 bg-stone-50 rounded-lg border border-stone-100 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-stone-900">Perpetual Charter</strong>
                        <span className="text-stone-500">Established 1888 under permanent civic seal</span>
                      </div>
                    </div>
                    <div className="p-3 bg-stone-50 rounded-lg border border-stone-100 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-stone-900">Endowed Grants</strong>
                        <span className="text-stone-500">$1.4M+ invested in youth fellowships</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => handleSelectTab('history')}
                      className="px-5 py-2.5 text-xs font-semibold text-stone-950 bg-stone-100 hover:bg-stone-200 rounded-lg border border-stone-200 transition-all cursor-pointer inline-flex items-center gap-2"
                    >
                      <BookOpen className="w-4 h-4 text-amber-700" />
                      <span>Explore the 1888 Founding Story &amp; Timeline</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 relative">
                  <div className="rounded-xl overflow-hidden border border-stone-200 shadow-md">
                    <img
                      src="/src/assets/images/history_archive_vintage_1791619991115.jpg"
                      alt="Signing of the 1888 Founding Charter"
                      className="w-full h-72 sm:h-80 object-cover filter contrast-105"
                    />
                    <div className="p-3.5 bg-stone-900 text-stone-200 text-xs">
                      <span className="font-semibold text-amber-300 block">October 1888 Archival Record</span>
                      <span className="text-[11px] text-stone-400">
                        The fourteen founders executing the Perpetual Articles in the Great Council Room.
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* 4. Leadership & Committee Snapshot */}
              <section className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                      Democratic Governance
                    </span>
                    <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-stone-900">
                      Executive Leadership Directory
                    </h2>
                  </div>
                  <button
                    onClick={() => handleSelectTab('committee')}
                    className="text-xs font-semibold text-amber-900 hover:text-amber-700 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All {members.length} Committee Members</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {members.slice(0, 3).map((member) => (
                    <div
                      key={member.id}
                      className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-3.5 mb-3">
                          <img
                            src={member.imageUrl}
                            alt={member.name}
                            className="w-14 h-14 rounded-full object-cover border border-amber-300 shadow-xs"
                          />
                          <div>
                            <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block">
                              {member.role}
                            </span>
                            <h3 className="font-serif-title text-base font-bold text-stone-900 leading-tight">
                              {member.name}
                            </h3>
                            <span className="text-[11px] text-stone-400">{member.department}</span>
                          </div>
                        </div>

                        <p className="text-xs text-stone-600 line-clamp-3 mb-3">
                          {member.bio}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                        <span className="text-[11px] font-mono text-stone-400">{member.term}</span>
                        <button
                          onClick={() => handleSelectTab('committee')}
                          className="font-semibold text-amber-900 hover:text-amber-700 cursor-pointer"
                        >
                          Dossier &rarr;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 5. Ingestion Hub & Customizer Banner */}
              <section className="bg-gradient-to-r from-stone-900 to-stone-950 text-white rounded-2xl p-8 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
                    <Sliders className="w-4 h-4" />
                    <span>Real-Time Ingestion &amp; Archive Hub</span>
                  </div>
                  <h3 className="font-serif-title text-xl sm:text-2xl font-bold">
                    Need to add real PDFs, modify rosters, or tweak colors?
                  </h3>
                  <p className="text-xs text-stone-400 max-w-xl">
                    Use our built-in Archive Hub to upload official documents, adjust leadership rosters, customize brand palettes, or export JSON backups for your team.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => setIsDocManagerOpen(true)}
                    className="px-5 py-2.5 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg cursor-pointer transition-colors shadow-sm"
                  >
                    Open Archive Hub
                  </button>
                  <button
                    onClick={() => setIsDeployGuideOpen(true)}
                    className="px-4 py-2.5 text-xs font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/30 rounded-lg cursor-pointer transition-colors"
                  >
                    GitHub &amp; Vercel Guide
                  </button>
                </div>
              </section>
            </div>
          </div>
        )}

        {/* ======================= TAB: HISTORY ======================= */}
        {currentTab === 'history' && (
          <HistoryPage
            historyEvents={historyEvents}
            brand={brand}
            onOpenDocumentReader={(evt) => setReadingDocEvent(evt)}
          />
        )}

        {/* ======================= TAB: COMMITTEE ======================= */}
        {currentTab === 'committee' && (
          <CommitteePage
            members={members}
            brand={brand}
            onOpenDocManager={() => setIsDocManagerOpen(true)}
          />
        )}

        {/* ======================= TAB: EVENTS ======================= */}
        {currentTab === 'events' && (
          <EventsPage
            events={events}
            brand={brand}
            onOpenRSVP={(evt) => setRsvpEvent(evt)}
          />
        )}
      </main>

      {/* Global Interactive Modals */}
      <RSVPModal
        event={rsvpEvent}
        onClose={() => setRsvpEvent(null)}
        onSuccessRSVP={handleRSVPSuccess}
      />

      <DocumentReaderModal
        event={readingDocEvent}
        onClose={() => setReadingDocEvent(null)}
      />

      <DocumentManagerModal
        isOpen={isDocManagerOpen}
        onClose={() => setIsDocManagerOpen(false)}
        brand={brand}
        onUpdateBrand={setBrand}
        uploadedDocs={uploadedDocs}
        onUpdateDocs={setUploadedDocs}
        members={members}
        onUpdateMembers={setMembers}
        historyEvents={historyEvents}
        onUpdateHistory={setHistoryEvents}
        events={events}
        onUpdateEvents={setEvents}
        onOpenDeployGuide={() => {
          setIsDocManagerOpen(false);
          setIsDeployGuideOpen(true);
        }}
      />

      <DeployGuideModal
        isOpen={isDeployGuideOpen}
        onClose={() => setIsDeployGuideOpen(false)}
      />

      {/* Institutional Footer */}
      <Footer
        brand={brand}
        onSelectTab={handleSelectTab}
        onOpenDocManager={() => setIsDocManagerOpen(true)}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
      />
    </div>
  );
}
