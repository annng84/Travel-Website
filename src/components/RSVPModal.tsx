import React, { useState } from 'react';
import { X, CheckCircle2, Ticket, Calendar, MapPin, User, Mail, Shield, Download, Printer } from 'lucide-react';
import { SocietyEvent } from '../data/societyData';

interface RSVPModalProps {
  event: SocietyEvent | null;
  onClose: () => void;
  onSuccessRSVP: (event: SocietyEvent, guestData: any) => void;
}

export const RSVPModal: React.FC<RSVPModalProps> = ({ event, onClose, onSuccessRSVP }) => {
  if (!event) return null;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    ticketCount: 1,
    affiliation: 'Member',
    dietary: 'None',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim()) return;

    const generatedPass = `SOC-${event.id.replace('evt-', '').toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketNumber(generatedPass);
    setSubmitted(true);
    onSuccessRSVP(event, { ...formData, ticketNumber: generatedPass });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200">
        {/* Modal Header */}
        <div className="relative p-6 bg-stone-900 text-white rounded-t-2xl flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-amber-400 font-semibold mb-1">
              Official Society Convocation Registration
            </div>
            <h3 className="font-serif-title text-xl sm:text-2xl font-bold leading-tight">
              {event.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg bg-stone-800 hover:bg-stone-700 transition-colors cursor-pointer shrink-0 ml-4"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Event Quick Info Banner */}
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-xs text-stone-700 space-y-1">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
                  <span className="font-medium text-stone-900">{event.date} &bull; {event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>{event.venue} &bull; {event.address}</span>
                </div>
                {event.ticketPrice && (
                  <div className="flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Contribution: <strong className="text-stone-900">{event.ticketPrice}</strong></span>
                  </div>
                )}
              </div>

              {/* Guest Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Primary Attendee Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Arthur Vance"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Official Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="vance@institution.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Number of Seats
                  </label>
                  <select
                    value={formData.ticketCount}
                    onChange={(e) => setFormData({ ...formData, ticketCount: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 bg-white"
                  >
                    <option value={1}>1 Seat (Single)</option>
                    <option value={2}>2 Seats (Pair)</option>
                    <option value={4}>4 Seats (Patron Party)</option>
                    <option value={10}>10 Seats (Full Table)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Affiliation
                  </label>
                  <select
                    value={formData.affiliation}
                    onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 bg-white"
                  >
                    <option value="Society Fellow">Society Fellow</option>
                    <option value="Member">Regular Member</option>
                    <option value="Junior Fellow">Junior Fellow (Collegiate)</option>
                    <option value="Guest">Distinguished Guest</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Dietary Requirement
                  </label>
                  <select
                    value={formData.dietary}
                    onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 bg-white"
                  >
                    <option value="None">None (Standard Menu)</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Gluten-Free">Gluten-Free</option>
                    <option value="Kosher/Halal">Kosher / Halal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Table Seating Requests or Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Requests to sit near particular delegations, accessibility accommodations..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Reservation &amp; Generate Pass</span>
                </button>
                <p className="text-[11px] text-stone-400 text-center mt-2">
                  Official confirmation and admission pass will be logged into your society profile.
                </p>
              </div>
            </form>
          ) : (
            /* Digital Admission Pass Display */
            <div className="space-y-6 animate-in zoom-in-95 duration-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-serif-title text-xl font-bold text-stone-900">
                  Reservation Confirmed
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  Your seat has been reserved in the official registry.
                </p>
              </div>

              {/* Physical/Digital Ticket Voucher Graphic */}
              <div className="border-2 border-dashed border-amber-600/40 rounded-xl p-5 bg-stone-900 text-white relative shadow-lg">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold block">
                      Official Admission Pass
                    </span>
                    <span className="font-serif-title text-lg font-bold text-white">
                      {event.title}
                    </span>
                  </div>
                  <Shield className="w-8 h-8 text-amber-400 opacity-80" />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                  <div>
                    <span className="text-stone-400 block text-[10px]">Attendee Name</span>
                    <span className="font-semibold text-white">{formData.fullName}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Pass Reference</span>
                    <span className="font-mono text-amber-300 font-bold">{ticketNumber}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Date &amp; Time</span>
                    <span className="text-white">{event.date}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Seats &amp; Category</span>
                    <span className="text-white">{formData.ticketCount} Seat(s) &bull; {formData.affiliation}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-800 text-[10px] text-stone-400 flex items-center justify-between">
                  <span>Venue: {event.venue}</span>
                  <span className="text-amber-400 font-mono">Present upon entry</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Ticket</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
