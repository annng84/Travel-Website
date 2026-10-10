import React, { useState } from 'react';
import { X, FileText, Download, ZoomIn, ZoomOut, Shield, Award, CheckCircle } from 'lucide-react';
import { HistoricalEvent } from '../data/societyData';

interface DocumentReaderModalProps {
  event: HistoricalEvent | null;
  onClose: () => void;
}

export const DocumentReaderModal: React.FC<DocumentReaderModalProps> = ({ event, onClose }) => {
  if (!event) return null;

  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#fcfaf7] rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-300 flex flex-col justify-between">
        {/* Document Header Bar */}
        <div className="p-5 bg-stone-900 text-white rounded-t-2xl flex items-center justify-between border-b border-amber-900/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-amber-400 font-bold">
                Archival Repository &bull; Certified Record
              </div>
              <h3 className="font-serif-title text-lg sm:text-xl font-bold leading-tight">
                {event.documentTitle || event.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
              className="p-1.5 text-stone-300 hover:text-white rounded bg-stone-800 text-xs flex items-center gap-1 cursor-pointer"
              title="Toggle reading font size"
            >
              {fontSize === 'normal' ? <ZoomIn className="w-4 h-4" /> : <ZoomOut className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-lg bg-stone-800 hover:bg-stone-700 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Body - Styled as an Archival Parchment */}
        <div className="p-6 sm:p-10 space-y-6">
          {/* Metadata & Cataloging Strip */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-stone-300 text-xs text-stone-600">
            <div>
              <span className="font-bold text-stone-800">Archive Reference: </span>
              <span className="font-mono">ARC-{event.year}-MS{event.id.replace('hist-', '')}</span>
            </div>
            <div>
              <span className="font-bold text-stone-800">Classification: </span>
              <span className="italic">{event.documentType || 'Historical Manuscript'}</span>
            </div>
            <div>
              <span className="font-bold text-stone-800">Date Registered: </span>
              <span>{event.dateStr}</span>
            </div>
          </div>

          {/* Archival Photo if present */}
          {event.imageUrl && (
            <div className="rounded-xl overflow-hidden border border-stone-300 shadow-sm max-h-72">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover filter sepia-[0.15] contrast-105"
              />
            </div>
          )}

          {/* Parchment Quoted Text / Excerpt */}
          <div className="bg-[#f7f2e7] p-6 rounded-xl border border-[#e2d5c0] shadow-inner font-serif-title relative">
            <div className="text-center mb-4">
              <span className="text-[11px] uppercase tracking-widest text-stone-600 font-bold block mb-1">
                Official Charter Transcript &bull; Sovereign Vaults
              </span>
              <div className="w-16 h-0.5 bg-amber-600 mx-auto" />
            </div>

            <p className={`text-stone-900 leading-relaxed italic ${fontSize === 'large' ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'}`}>
              &ldquo;{event.documentExcerpt || event.fullNarrative}&rdquo;
            </p>

            <div className="mt-6 pt-4 border-t border-[#e0d3be] flex items-center justify-between text-xs text-stone-600">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-amber-700" />
                <span>Wax Seal of the Sovereign Council Affixed</span>
              </div>
              <span className="font-mono text-[11px]">Certified Provenance</span>
            </div>
          </div>

          {/* Full Narrative Context */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-stone-500 font-bold mb-2">
              Historical Context &amp; Significance
            </h4>
            <p className="text-stone-800 text-xs sm:text-sm leading-relaxed">
              {event.fullNarrative}
            </p>
          </div>

          {/* Signatories List */}
          {event.signatories && event.signatories.length > 0 && (
            <div className="bg-white p-4 rounded-xl border border-stone-200">
              <h4 className="text-xs uppercase tracking-wider text-stone-500 font-bold mb-2">
                Signatories Recorded on Parchment ({event.signatories.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                {event.signatories.map((sig, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span className="font-medium">{sig}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-100 rounded-b-2xl border-t border-stone-200 flex items-center justify-between">
          <span className="text-[11px] text-stone-500">
            Preserved in the Guildhall Archival Vaults, Room 102.
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
