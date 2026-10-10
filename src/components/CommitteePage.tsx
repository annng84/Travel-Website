import React, { useState } from 'react';
import { Users, Mail, Phone, Linkedin, Search, Award, ShieldCheck, ChevronRight, UserPlus, Filter, X } from 'lucide-react';
import { CommitteeMember, SocietyBrandConfig } from '../data/societyData';

interface CommitteePageProps {
  members: CommitteeMember[];
  brand: SocietyBrandConfig;
  onOpenDocManager: () => void;
}

export const CommitteePage: React.FC<CommitteePageProps> = ({
  members,
  brand,
  onOpenDocManager,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'executive' | 'standing' | 'advisory'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState<CommitteeMember | null>(null);

  const categories = [
    { id: 'all', label: 'All Leadership' },
    { id: 'executive', label: 'Executive Council' },
    { id: 'standing', label: 'Standing Committees' },
    { id: 'advisory', label: 'Advisory Council & Trustees' },
  ];

  const filteredMembers = members
    .filter((m) => selectedCategory === 'all' || m.category === selectedCategory)
    .filter((m) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.department.toLowerCase().includes(q) ||
        (m.honorific && m.honorific.toLowerCase().includes(q))
      );
    });

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-bold mb-3">
          <ShieldCheck className="w-4 h-4" />
          <span>Institutional Governance &bull; 2024–2028 Directorate</span>
        </div>
        <h1 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight mb-4">
          Leadership &amp; Committee Directory
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Elected officers, standing committee chairs, and veteran trustees dedicated to upholding our statutory mission and stewarding the society's endowment.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all shrink-0 cursor-pointer ${
                  active
                    ? 'bg-stone-900 text-amber-300 shadow-sm'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search member, role, title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-stone-50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
              >
                &times;
              </button>
            )}
          </div>

          <button
            onClick={onOpenDocManager}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg border border-stone-200 shrink-0 cursor-pointer"
            title="Import or update leadership roster"
          >
            <UserPlus className="w-3.5 h-3.5 text-stone-600" />
            <span className="hidden sm:inline">Update Roster</span>
          </button>
        </div>
      </div>

      {/* Members Grid */}
      {filteredMembers.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-stone-200">
          <Users className="w-10 h-10 text-stone-400 mx-auto mb-3" />
          <h3 className="font-serif-title text-lg font-bold text-stone-800">No Committee Members Found</h3>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query or department filter.
          </p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="mt-4 px-4 py-2 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-lg cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Photo & Role Header */}
                <div className="relative h-64 bg-stone-100 overflow-hidden">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

                  {/* Category Chip */}
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-900/80 backdrop-blur-sm text-amber-300 border border-stone-700">
                      {member.category === 'executive' ? 'Executive Officer' : member.category === 'standing' ? 'Standing Committee' : 'Trustee'}
                    </span>
                  </div>

                  {/* Name overlay at bottom of photo */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <div className="text-xs text-amber-300 font-medium">
                      {member.department}
                    </div>
                    <h3 className="font-serif-title text-xl font-bold leading-tight flex items-baseline gap-1.5">
                      <span>{member.name}</span>
                      {member.honorific && (
                        <span className="text-xs font-normal text-stone-300">{member.honorific}</span>
                      )}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-3 pb-3 border-b border-stone-100">
                    <span className="font-semibold text-stone-800">{member.role}</span>
                    <span className="text-[11px] font-mono text-stone-400">{member.term}</span>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 mb-4">
                    {member.bio}
                  </p>

                  {member.quote && (
                    <div className="text-[11px] italic text-stone-500 border-l-2 border-amber-500 pl-2.5 mb-4 line-clamp-2">
                      &ldquo;{member.quote}&rdquo;
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer with Quick Contact & Dossier Button */}
              <div className="px-5 py-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${member.email}`}
                    className="p-1.5 text-stone-500 hover:text-amber-800 hover:bg-stone-200 rounded transition-colors"
                    title={`Email ${member.name}`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-stone-500 hover:text-amber-800 hover:bg-stone-200 rounded transition-colors"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setSelectedMember(member)}
                  className="text-xs font-semibold text-stone-800 hover:text-amber-900 inline-flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>View Full Dossier</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Leadership Dossier Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200">
            {/* Header with Photo & Close Button */}
            <div className="relative p-6 bg-stone-900 text-white rounded-t-2xl">
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-lg bg-stone-800 hover:bg-stone-700 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <img
                  src={selectedMember.imageUrl}
                  alt={selectedMember.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover border-2 border-amber-400 shadow-md shrink-0"
                />
                <div className="text-center sm:text-left">
                  <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
                    {selectedMember.department}
                  </div>
                  <h2 className="font-serif-title text-2xl font-bold text-white">
                    {selectedMember.name}
                  </h2>
                  {selectedMember.honorific && (
                    <div className="text-xs text-stone-300 mt-0.5">{selectedMember.honorific}</div>
                  )}
                  <div className="mt-2 inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                    {selectedMember.role} &bull; Term: {selectedMember.term}
                  </div>
                </div>
              </div>
            </div>

            {/* Dossier Content */}
            <div className="p-6 space-y-6">
              {/* Quote */}
              {selectedMember.quote && (
                <div className="bg-stone-50 p-4 rounded-xl border-l-4 border-amber-500 italic text-stone-700 text-sm">
                  &ldquo;{selectedMember.quote}&rdquo;
                </div>
              )}

              {/* Biography */}
              <div>
                <h4 className="text-xs uppercase tracking-wider text-stone-400 font-bold mb-2">
                  Curriculum &amp; Society Background
                </h4>
                <p className="text-stone-700 text-sm leading-relaxed">
                  {selectedMember.bio}
                </p>
              </div>

              {/* Achievements */}
              {selectedMember.achievements && selectedMember.achievements.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-stone-400 font-bold mb-2">
                    Key Committee Initiatives &amp; Honors
                  </h4>
                  <ul className="space-y-2">
                    {selectedMember.achievements.map((ach, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-700">
                        <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Official Contact Details */}
              <div className="pt-4 border-t border-stone-200">
                <h4 className="text-xs uppercase tracking-wider text-stone-400 font-bold mb-3">
                  Official Communication Channels
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-3">
                    <Mail className="w-4 h-4 text-amber-700 shrink-0" />
                    <div>
                      <span className="block text-[10px] text-stone-400 uppercase">Executive Inquiries</span>
                      <a href={`mailto:${selectedMember.email}`} className="text-stone-900 font-medium hover:underline">
                        {selectedMember.email}
                      </a>
                    </div>
                  </div>

                  {selectedMember.phone && (
                    <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-3">
                      <Phone className="w-4 h-4 text-amber-700 shrink-0" />
                      <div>
                        <span className="block text-[10px] text-stone-400 uppercase">Secretariat Line</span>
                        <span className="text-stone-900 font-medium">{selectedMember.phone}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-100 rounded-b-2xl border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setSelectedMember(null)}
                className="px-5 py-2 text-xs font-semibold text-stone-700 hover:text-stone-950 bg-white border border-stone-300 rounded-lg cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
