import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Ticket, Download, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SocietyEvent } from '../data/societyData';

interface UpcomingEventSpotlightProps {
  event: SocietyEvent;
  onOpenRSVP: (event: SocietyEvent) => void;
}

export const UpcomingEventSpotlight: React.FC<UpcomingEventSpotlightProps> = ({ event, onOpenRSVP }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(event.timestamp).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [event.timestamp]);

  const downloadICS = () => {
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

  const percentageFilled = event.capacity
    ? Math.min(100, Math.round((event.registeredCount / event.capacity) * 100))
    : 85;

  return (
    <section className="bg-stone-900 text-stone-100 rounded-2xl overflow-hidden shadow-2xl border border-stone-800 my-12">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Col: Event Imagery & Countdown Overlay */}
        <div className="lg:col-span-5 relative min-h-[340px] lg:min-h-full">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-stone-950" />

          {/* Countdown Clock Box */}
          <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-stone-950/80 backdrop-blur-md border border-amber-500/30">
            <div className="text-[11px] uppercase tracking-widest text-amber-400 font-semibold mb-2 flex items-center justify-between">
              <span>Time Until Convocation</span>
              <span className="text-stone-400 font-mono">EDT Local</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-stone-900/90 rounded-lg p-2 border border-stone-800">
                <span className="block text-2xl sm:text-3xl font-bold font-mono text-white">
                  {timeLeft.days}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Days</span>
              </div>
              <div className="bg-stone-900/90 rounded-lg p-2 border border-stone-800">
                <span className="block text-2xl sm:text-3xl font-bold font-mono text-white">
                  {timeLeft.hours}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Hours</span>
              </div>
              <div className="bg-stone-900/90 rounded-lg p-2 border border-stone-800">
                <span className="block text-2xl sm:text-3xl font-bold font-mono text-white">
                  {timeLeft.minutes}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Mins</span>
              </div>
              <div className="bg-stone-900/90 rounded-lg p-2 border border-stone-800">
                <span className="block text-2xl sm:text-3xl font-bold font-mono text-amber-400">
                  {timeLeft.seconds}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Secs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Event Details & Action */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-amber-400 font-medium mb-3">
              <span className="uppercase tracking-widest font-semibold">{event.category}</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-400">Official Society Calendar</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400 font-medium">Reservations Open</span>
            </div>

            <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug mb-3">
              {event.title}
            </h3>

            <p className="text-stone-300 text-sm leading-relaxed mb-6">
              {event.description}
            </p>

            {/* Logistics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-stone-800 text-xs text-stone-300 mb-6">
              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-400 block text-[11px]">Date &amp; Schedule</span>
                  <span className="text-white font-medium">{event.date}</span>
                  <div className="text-stone-400">{event.time}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-400 block text-[11px]">Assembly Venue</span>
                  <span className="text-white font-medium">{event.venue}</span>
                  <div className="text-stone-400 truncate">{event.address}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Ticket className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-400 block text-[11px]">Ticket &amp; Admission</span>
                  <span className="text-white font-medium">{event.ticketPrice || 'Formal RSVP Required'}</span>
                  <div className="text-stone-400">{event.dressCode}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Users className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-400 block text-[11px]">Seating Capacity</span>
                  <span className="text-white font-medium">
                    {event.registeredCount} of {event.capacity} Registered
                  </span>
                  <div className="w-32 bg-stone-800 rounded-full h-1.5 mt-1.5 overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full"
                      style={{ width: `${percentageFilled}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Highlights bullet points */}
            {event.highlights && (
              <div className="space-y-1.5 mb-6">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block">
                  Evening Highlights &amp; Honors
                </span>
                {event.highlights.slice(0, 2).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-stone-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-stone-800">
            <button
              onClick={() => onOpenRSVP(event)}
              className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>RSVP &amp; Reserve Seats</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={downloadICS}
              className="w-full sm:w-auto px-4 py-3 text-xs font-semibold text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 rounded-lg border border-stone-700 transition-all cursor-pointer flex items-center justify-center gap-2"
              title="Add to Apple Calendar, Google Calendar, or Outlook"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Add to Calendar (.ics)</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
