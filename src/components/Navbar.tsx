import React, { useState } from 'react';
import { Landmark, Calendar, Clock, Menu, X, Sliders, BookOpen, Users, Sparkles } from 'lucide-react';
import { SocietyBrandConfig, SocietyEvent } from '../data/societyData';

interface NavbarProps {
  brand: SocietyBrandConfig;
  currentTab: 'home' | 'history' | 'committee' | 'events';
  onSelectTab: (tab: 'home' | 'history' | 'committee' | 'events') => void;
  nextEvent?: SocietyEvent;
  onOpenDocManager: () => void;
  onOpenRSVP: (event: SocietyEvent) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  brand,
  currentTab,
  onSelectTab,
  nextEvent,
  onOpenDocManager,
  onOpenRSVP,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: 'home' | 'history' | 'committee' | 'events'; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Landmark className="w-4 h-4" /> },
    { id: 'history', label: 'History & Archive', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'committee', label: 'Committee & Leadership', icon: <Users className="w-4 h-4" /> },
    { id: 'events', label: 'Events & Galas', icon: <Calendar className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all">
      {/* Top Banner Notice for Next Event */}
      {nextEvent && (
        <div className="bg-stone-900 text-stone-200 text-xs py-1.5 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="font-semibold text-amber-300 uppercase tracking-wider text-[11px]">Upcoming Gathering:</span>
              <span className="truncate max-w-md text-stone-300 font-medium">{nextEvent.title}</span>
              <span className="text-stone-500 hidden md:inline">· {nextEvent.date}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenRSVP(nextEvent)}
                className="text-amber-400 hover:text-amber-300 font-medium underline underline-offset-2 transition-colors cursor-pointer text-xs"
              >
                Reserve Seat &amp; Tickets &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Seal & Title */}
          <div
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            {/* Heraldic Shield Seal */}
            <div className="w-12 h-12 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center shadow-md border border-amber-500/30 group-hover:border-amber-400 transition-all">
              <div className="relative flex items-center justify-center">
                <Landmark className="w-6 h-6 stroke-[1.8]" />
                <span className="absolute -bottom-1 -right-1 text-[8px] font-bold bg-amber-500 text-stone-950 px-1 py-0.2 rounded font-mono">
                  {brand.establishedYear}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-display tracking-widest text-xs uppercase text-amber-800 font-bold">
                  Est. {brand.establishedYear}
                </span>
                <span className="text-stone-300">·</span>
                <span className="text-[11px] text-stone-500 font-medium tracking-wide">Chartered Institution</span>
              </div>
              <h1 className="font-serif-title text-lg sm:text-xl font-bold text-stone-900 tracking-tight leading-tight group-hover:text-amber-900 transition-colors">
                {brand.organizationName}
              </h1>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors cursor-pointer rounded-lg ${
                    active
                      ? 'text-stone-950 font-semibold bg-stone-100'
                      : 'text-stone-600 hover:text-stone-950 hover:bg-stone-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.icon}
                    {item.label}
                  </span>
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-amber-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Archive Manager / Brand Customize */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenDocManager}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-lg transition-all cursor-pointer"
              title="Upload PDFs, parse committee rosters, or customize brand colors"
            >
              <Sliders className="w-3.5 h-3.5 text-stone-600" />
              <span>Archive &amp; Data Hub</span>
            </button>

            {nextEvent && (
              <button
                onClick={() => onOpenRSVP(nextEvent)}
                className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>RSVP to Gala</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenDocManager}
              className="p-2 text-stone-600 hover:bg-stone-100 rounded-lg text-xs"
              title="Archive Hub"
            >
              <Sliders className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:bg-stone-100 rounded-lg"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-stone-50 px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => {
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-lg font-medium text-left transition-colors ${
                  active ? 'bg-stone-900 text-white font-semibold' : 'text-stone-700 hover:bg-stone-200'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}

          <div className="pt-2 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenDocManager();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-stone-800 bg-stone-200 rounded-lg"
            >
              <Sliders className="w-4 h-4" />
              <span>Archive &amp; Document Ingestion Hub</span>
            </button>
            {nextEvent && (
              <button
                onClick={() => {
                  onOpenRSVP(nextEvent);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-amber-800 rounded-lg"
              >
                <span>RSVP: 136th Annual Gala</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
