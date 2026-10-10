import React from 'react';
import { Landmark, Mail, Phone, MapPin, Shield, GitBranch, ArrowUpRight, BookOpen, Users, Calendar } from 'lucide-react';
import { SocietyBrandConfig } from '../data/societyData';

interface FooterProps {
  brand: SocietyBrandConfig;
  onSelectTab: (tab: 'home' | 'history' | 'committee' | 'events') => void;
  onOpenDocManager: () => void;
  onOpenDeployGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  brand,
  onSelectTab,
  onOpenDocManager,
  onOpenDeployGuide,
}) => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Info (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-stone-900 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-display uppercase tracking-widest text-red-500 font-bold block">
                  Chartered {brand.establishedYear}
                </span>
                <h3 className="font-serif-title text-lg font-bold text-white">
                  {brand.organizationName}
                </h3>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              An enduring fellowship devoted to safeguarding municipal archives, granting youth academic fellowships, and cultivating community across centuries.
            </p>

            <p className="font-display text-[11px] text-amber-300/80 uppercase tracking-wider italic">
              &ldquo;{brand.motto}&rdquo;
            </p>

            {/* Vercel & GitHub Ready Badge */}
            <div className="pt-2">
              <button
                onClick={onOpenDeployGuide}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-[11px] text-emerald-400 font-medium cursor-pointer transition-colors"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>Zero-Config Vercel &amp; GitHub Ready &rarr;</span>
              </button>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Portal Directory
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onSelectTab('home')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Home &bull; Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('history')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  History &bull; 1888 Archive
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('committee')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Leadership &bull; Committee
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('events')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Events &bull; 136th Gala
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDocManager}
                  className="hover:text-amber-300 text-amber-400 font-medium transition-colors cursor-pointer"
                >
                  Document Ingestion Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Institutional Governance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Governance &amp; Trust
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>Board of Trustees</li>
              <li>Executive Secretariat</li>
              <li>Permanent Endowment Trust</li>
              <li>Rare Manuscripts Vault</li>
              <li>Collegiate Fellowships</li>
              <li>Statutory Bylaws &amp; 1888 Charter</li>
            </ul>
          </div>

          {/* Contact & Secretariat */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Secretariat Guild
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{brand.headquarters}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${brand.contactEmail}`} className="hover:text-white">
                  {brand.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{brand.contactPhone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-amber-500" />
            <span>&copy; {brand.establishedYear} – {new Date().getFullYear()} {brand.organizationName}. All archival rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={onOpenDeployGuide} className="hover:text-stone-300 cursor-pointer">
              Deploy to Vercel
            </button>
            <span aria-hidden="true">&bull;</span>
            <button onClick={onOpenDocManager} className="hover:text-stone-300 cursor-pointer">
              Upload Files
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
