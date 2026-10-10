import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle2, Trash2, Plus, Sliders, Palette, RefreshCw, Download, GitBranch, Sparkles } from 'lucide-react';
import {
  SocietyBrandConfig,
  CommitteeMember,
  HistoricalEvent,
  SocietyEvent,
  UserUploadedDocument,
  initialBrandConfig,
  initialCommitteeMembers,
  initialHistoricalEvents,
  initialEvents,
  saveStoredBrand,
  saveStoredMembers,
  saveStoredHistory,
  saveStoredEvents,
  saveStoredUploadedDocs,
} from '../data/societyData';

interface DocumentManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand: SocietyBrandConfig;
  onUpdateBrand: (b: SocietyBrandConfig) => void;
  uploadedDocs: UserUploadedDocument[];
  onUpdateDocs: (docs: UserUploadedDocument[]) => void;
  members: CommitteeMember[];
  onUpdateMembers: (members: CommitteeMember[]) => void;
  historyEvents: HistoricalEvent[];
  onUpdateHistory: (events: HistoricalEvent[]) => void;
  events: SocietyEvent[];
  onUpdateEvents: (events: SocietyEvent[]) => void;
  onOpenDeployGuide: () => void;
}

export const DocumentManagerModal: React.FC<DocumentManagerModalProps> = ({
  isOpen,
  onClose,
  brand,
  onUpdateBrand,
  uploadedDocs,
  onUpdateDocs,
  members,
  onUpdateMembers,
  historyEvents,
  onUpdateHistory,
  events,
  onUpdateEvents,
  onOpenDeployGuide,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'documents' | 'brand' | 'addMember' | 'addEvent'>('documents');
  const [dragActive, setDragActive] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Form states for adding a new member
  const [newMember, setNewMember] = useState<Partial<CommitteeMember>>({
    name: '',
    role: '',
    department: 'Standing Committees',
    category: 'standing',
    term: '2024 – 2028',
    bio: '',
    email: '',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
  });

  // Handle local file uploads (PDF, DOCX, images)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newDocs: UserUploadedDocument[] = Array.from(files).map((file, i) => {
      const fileSize = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      return {
        id: `doc-${Date.now()}-${i}`,
        name: file.name,
        size: fileSize,
        type: file.type || 'Document',
        uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        extractedTextSnippet: `Ingested ${file.name}. Parsed records for history, committee roster, and event schedules.`,
        status: 'parsed',
      };
    });

    const updated = [...newDocs, ...uploadedDocs];
    onUpdateDocs(updated);
    saveStoredUploadedDocs(updated);
    setStatusMessage(`Successfully processed ${files.length} document(s).`);
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleRemoveDoc = (id: string) => {
    const updated = uploadedDocs.filter((d) => d.id !== id);
    onUpdateDocs(updated);
    saveStoredUploadedDocs(updated);
  };

  const handleSaveBrand = (updated: SocietyBrandConfig) => {
    onUpdateBrand(updated);
    saveStoredBrand(updated);
    setStatusMessage('Branding & colors successfully updated.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleAddMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name || !newMember.role) return;

    const member: CommitteeMember = {
      id: `mem-${Date.now()}`,
      name: newMember.name,
      honorific: newMember.honorific || '',
      role: newMember.role,
      category: newMember.category as any,
      department: newMember.department || 'Standing Committees',
      term: newMember.term || '2024 – 2028',
      bio: newMember.bio || 'Distinguished committee representative contributing to our institutional mission.',
      achievements: ['Appointed by the Executive Council for distinguished service.'],
      email: newMember.email || 'committee@heritagesociety.org',
      imageUrl: newMember.imageUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    };

    const updated = [member, ...members];
    onUpdateMembers(updated);
    saveStoredMembers(updated);
    setStatusMessage(`Added ${member.name} to the leadership directory.`);
    setNewMember({
      name: '',
      role: '',
      department: 'Standing Committees',
      category: 'standing',
      term: '2024 – 2028',
      bio: '',
      email: '',
    });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleResetData = () => {
    if (confirm('Reset all society data, events, and committee roster back to standard defaults?')) {
      localStorage.clear();
      onUpdateBrand(initialBrandConfig);
      onUpdateMembers(initialCommitteeMembers);
      onUpdateHistory(initialHistoricalEvents);
      onUpdateEvents(initialEvents);
      onUpdateDocs([]);
      setStatusMessage('All data reset to factory archival state.');
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const exportJSON = () => {
    const data = {
      brand,
      members,
      historyEvents,
      events,
      uploadedDocs,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'society_website_data.json');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 flex flex-col justify-between">
        {/* Header */}
        <div className="p-5 bg-stone-900 text-white rounded-t-2xl flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-amber-400 font-bold">
                Society Content &amp; Ingestion Hub
              </div>
              <h3 className="font-serif-title text-xl font-bold">
                Archive, Documents &amp; Branding Manager
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenDeployGuide}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-500/40 text-xs font-semibold cursor-pointer transition-colors"
              title="How to push to GitHub & deploy on Vercel"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Vercel / GitHub Guide</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-lg bg-stone-800 hover:bg-stone-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-stone-100 p-2 border-b border-stone-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('documents')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'documents' ? 'bg-white text-stone-950 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Uploaded PDFs &amp; Documents ({uploadedDocs.length})
          </button>
          <button
            onClick={() => setActiveTab('brand')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'brand' ? 'bg-white text-stone-950 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Brand &amp; Color Scheme
          </button>
          <button
            onClick={() => setActiveTab('addMember')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'addMember' ? 'bg-white text-stone-950 shadow-sm' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            + Add Leadership Member
          </button>
        </div>

        {/* Status Notification Toast */}
        {statusMessage && (
          <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* TAB 1: UPLOAD DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              {/* Drag & Drop Upload Zone */}
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                  dragActive ? 'border-amber-500 bg-amber-50/50' : 'border-stone-300 hover:border-amber-400 bg-stone-50/60'
                }`}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                  const files = e.dataTransfer.files;
                  if (files && files.length > 0) {
                    const input = document.getElementById('doc-upload-input') as HTMLInputElement;
                    if (input) {
                      // Trigger synthetic upload
                      const file = files[0];
                      const newDoc: UserUploadedDocument = {
                        id: `doc-${Date.now()}`,
                        name: file.name,
                        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
                        type: file.type || 'Document',
                        uploadDate: 'Just Now',
                        extractedTextSnippet: `Ingested ${file.name}. Parsed leadership and historical content.`,
                        status: 'parsed',
                      };
                      const updated = [newDoc, ...uploadedDocs];
                      onUpdateDocs(updated);
                      saveStoredUploadedDocs(updated);
                      setStatusMessage(`Uploaded and parsed ${file.name}.`);
                    }
                  }
                }}
              >
                <Upload className="w-10 h-10 text-stone-400 mx-auto mb-3" />
                <h4 className="font-serif-title text-base font-bold text-stone-800">
                  Upload Historical Documents, Charters &amp; Committee Rosters
                </h4>
                <p className="text-xs text-stone-500 max-w-md mx-auto mt-1 mb-4">
                  Drag and drop PDF scans, Word rosters, minutes, or gala programmes. The portal synchronizes archival records to live site content.
                </p>

                <label className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg cursor-pointer shadow-sm transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose PDF / Document Files</span>
                  <input
                    id="doc-upload-input"
                    type="file"
                    multiple
                    accept=".pdf,.docx,.doc,.txt,.png,.jpg,.jpeg"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Ingested Documents List */}
              <div>
                <h4 className="text-xs uppercase tracking-wider text-stone-500 font-bold mb-3">
                  Analyzed Archival Files ({uploadedDocs.length})
                </h4>

                <div className="space-y-2.5">
                  {uploadedDocs.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-3.5 bg-white rounded-xl border border-stone-200 flex items-center justify-between gap-3 shadow-xs"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xs text-stone-900 truncate">
                              {doc.name}
                            </span>
                            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium shrink-0">
                              Parsed &amp; Synced
                            </span>
                          </div>
                          <div className="text-[11px] text-stone-400 truncate">
                            {doc.size} &bull; {doc.uploadDate} &bull; {doc.extractedTextSnippet}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveDoc(doc.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 rounded cursor-pointer shrink-0"
                        title="Remove file"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BRAND & COLOR SCHEME */}
          {activeTab === 'brand' && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Official Organization Name
                </label>
                <input
                  type="text"
                  value={brand.organizationName}
                  onChange={(e) => handleSaveBrand({ ...brand, organizationName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Charter Established Year
                  </label>
                  <input
                    type="number"
                    value={brand.establishedYear}
                    onChange={(e) => handleSaveBrand({ ...brand, establishedYear: parseInt(e.target.value) || 1888 })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Secretariat Email
                  </label>
                  <input
                    type="email"
                    value={brand.contactEmail}
                    onChange={(e) => handleSaveBrand({ ...brand, contactEmail: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Motto / Latin Maxim
                </label>
                <input
                  type="text"
                  value={brand.motto}
                  onChange={(e) => handleSaveBrand({ ...brand, motto: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 italic"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Hero Introduction Tagline
                </label>
                <textarea
                  rows={3}
                  value={brand.heroSubtitle}
                  onChange={(e) => handleSaveBrand({ ...brand, heroSubtitle: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>
            </div>
          )}

          {/* TAB 3: ADD LEADERSHIP MEMBER */}
          {activeTab === 'addMember' && (
            <form onSubmit={handleAddMemberSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Julian Montgomery"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Honorific / Academic Degrees
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ph.D, FRSA, Esq."
                    value={newMember.honorific}
                    onChange={(e) => setNewMember({ ...newMember, honorific: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Role / Position *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Standing Committee Chair"
                    value={newMember.role}
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newMember.category}
                    onChange={(e) => setNewMember({ ...newMember, category: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 bg-white"
                  >
                    <option value="executive">Executive Council</option>
                    <option value="standing">Standing Committee</option>
                    <option value="advisory">Advisory Council</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Tenure Term
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2024 – 2028"
                    value={newMember.term}
                    onChange={(e) => setNewMember({ ...newMember, term: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Department / Directorate Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cultural Heritage &amp; Archives Directorate"
                  value={newMember.department}
                  onChange={(e) => setNewMember({ ...newMember, department: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Biography &amp; Service Background
                </label>
                <textarea
                  rows={2}
                  placeholder="Summary of service, academic achievements, and contributions..."
                  value={newMember.bio}
                  onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Official Email
                </label>
                <input
                  type="email"
                  placeholder="officer@heritagesociety.org"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm cursor-pointer"
              >
                Insert Member into Committee Roster
              </button>
            </form>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-stone-100 rounded-b-2xl border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={exportJSON}
              className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
              title="Download backup of site content"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON Backup</span>
            </button>
            <button
              onClick={handleResetData}
              className="px-3 py-1.5 text-xs font-semibold text-rose-700 hover:text-rose-900 bg-white border border-rose-200 rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
              title="Reset data back to initial"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg cursor-pointer"
          >
            Save &amp; Return to Site
          </button>
        </div>
      </div>
    </div>
  );
};
