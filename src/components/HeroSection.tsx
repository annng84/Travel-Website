import React from 'react';
import { ArrowRight, BookOpen, Users, Calendar, Award, Shield, FileText, Compass } from 'lucide-react';
import { SocietyBrandConfig, SocietyEvent } from '../data/societyData';

interface HeroSectionProps {
  brand: SocietyBrandConfig;
  onNavigate: (tab: 'home' | 'history' | 'committee' | 'events') => void;
  onOpenDocManager: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ brand, onNavigate, onOpenDocManager }) => {
  return (
    <div className="relative">
      {/* Hero Banner with Cinematic Photo Background */}
      <div className="relative min-h-[580px] sm:min-h-[640px] flex items-center justify-center bg-stone-950 text-white overflow-hidden">
        {/* Background Image with refined overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/heritage_hero_banner_1791619968238.jpg"
            alt="Heritage Society Grand Assembly Hall"
            className="w-full h-full object-cover object-center filter brightness-90 contrast-105 scale-100 hover:scale-102 transition-transform duration-1000 ease-out"
          />
          {/* Subtle multi-layer gradient vignette */}
          <div className="absolute inset-0 bg-stone-950/70 backdrop-brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-950/80" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
          {/* Institution Heritage Kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/40 border border-red-500/40 text-red-500 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-6 backdrop-blur-sm">
            <Shield className="w-3.5 h-3.5 text-red-500" />
            <span className="text-red-500">Chartered {brand.establishedYear} &bull; Over 136 Years of Cultural Guardianship</span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif-title text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-4xl leading-[1.15] mb-6 drop-shadow-sm">
            Preserving History. Empowering Fellowship. Inspiring the Future.
          </h1>

          {/* Motto / Latin Proverb */}
          <p className="font-display text-amber-200/90 text-sm sm:text-base tracking-widest uppercase max-w-2xl mb-4 italic">
            &ldquo;{brand.motto}&rdquo;
          </p>

          {/* Introduction Narrative */}
          <p className="text-stone-300 text-sm sm:text-lg max-w-2xl leading-relaxed mb-8">
            {brand.heroSubtitle}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('history')}
              className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-lg hover:shadow-amber-400/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Archival History</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('committee')}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-white hover:text-amber-300 bg-stone-900/80 hover:bg-stone-900 border border-stone-700 hover:border-amber-400/40 rounded-lg backdrop-blur-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>Leadership &amp; Committee</span>
            </button>

            <button
              onClick={() => onNavigate('events')}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-stone-300 hover:text-white bg-transparent hover:bg-white/10 border border-white/20 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Assembly Calendar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Institutional Statistics Bar */}
      <div className="bg-stone-900 border-y border-stone-800 text-stone-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-stone-800">
            <div className="pt-2 md:pt-0">
              <span className="block font-serif-title text-2xl sm:text-3xl font-bold text-amber-400">1888</span>
              <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">Founding Charter</span>
            </div>
            <div className="pt-2 md:pt-0">
              <span className="block font-serif-title text-2xl sm:text-3xl font-bold text-amber-400">4,200+</span>
              <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">Active Global Members</span>
            </div>
            <div className="pt-2 md:pt-0">
              <span className="block font-serif-title text-2xl sm:text-3xl font-bold text-amber-400">$1.4M+</span>
              <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">Scholarships Endowed</span>
            </div>
            <div className="pt-2 md:pt-0">
              <span className="block font-serif-title text-2xl sm:text-3xl font-bold text-amber-400">25,000+</span>
              <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">Preserved Manuscripts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Institutional Pillars Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-800 mb-2">Our Sacred Mandate</div>
          <h2 className="font-serif-title text-3xl font-bold text-stone-900">Four Pillars of the Society</h2>
          <p className="text-sm text-stone-600 mt-2">
            Structured in accordance with the 1888 Founding Articles and stewarded by our standing committees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-serif-title text-lg font-bold text-stone-900 mb-2">
                Archival Custody
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Operating high-security, climate-controlled reading rooms housing municipal charters, genealogy records, and photographic glass plates dating to 1850.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 text-xs font-semibold text-stone-700 flex items-center gap-1">
              <span>Managed by Archives Committee</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-serif-title text-lg font-bold text-stone-900 mb-2">
                Civic Stewardship
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Advocating for landmark preservation, architectural designations, and historical plaques honoring the pioneering men and women of our region.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 text-xs font-semibold text-stone-700 flex items-center gap-1">
              <span>Preservation Council</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-serif-title text-lg font-bold text-stone-900 mb-2">
                Collegiate Fellowships
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Providing annual research stipends, collegiate scholarships, and youth apprenticeships for doctoral candidates in humanities and regional heritage.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 text-xs font-semibold text-stone-700 flex items-center gap-1">
              <span>Youth &amp; Scholarship Directorate</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center mb-4">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-serif-title text-lg font-bold text-stone-900 mb-2">
                Banquets &amp; Convocations
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Convocations of memory, annual galas, historical symposiums, and public chamber recitals fostering cross-generational camaraderie.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 text-xs font-semibold text-stone-700 flex items-center gap-1">
              <span>Assemblies &amp; Gala Directorate</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
