import React, { useState } from 'react';
import { PhoneCall, ShieldAlert, Copy, Check, X, MapPin, Truck, AlertTriangle } from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const contacts = [
    {
      agency: 'Murree City Traffic Police Control Room',
      number: '051-9269200',
      description: '24/7 Road clearance, traffic guidance, accident reporting & recovery vehicles',
      badge: 'Immediate Response',
      type: 'Traffic'
    },
    {
      agency: 'Rescue 1122 Murree Disaster Unit',
      number: '1122',
      description: 'Medical emergencies, avalanche response, stranded passenger rescue',
      badge: 'Emergency SOS',
      type: 'Medical & Rescue'
    },
    {
      agency: 'Punjab Tourism Police Helpline',
      number: '1422',
      description: 'Tourist safety, hotel dispute resolution, visitor facilitation and guidance',
      badge: 'Toll-Free',
      type: 'Tourist Support'
    },
    {
      agency: 'National Highways & Motorway Police (M-75 Expressway)',
      number: '130',
      description: 'Expressway breakdown help, tire punctures, towing service on M-75',
      badge: 'Motorway',
      type: 'Highway'
    },
    {
      agency: 'Assistant Commissioner Office Murree Control',
      number: '051-9269015',
      description: 'District administration emergency cell, snow clearance monitoring',
      badge: 'District Admin',
      type: 'Administration'
    },
    {
      agency: 'Tehsil Headquarters Hospital (THQ) Murree',
      number: '051-9269101',
      description: 'Emergency ward, frostbite treatment, 24/7 mountain trauma unit',
      badge: 'Hospital',
      type: 'Medical'
    }
  ];

  const handleCopy = (num: string, idx: number) => {
    navigator.clipboard.writeText(num);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Murree Emergency Directory</h3>
              <p className="text-xs text-slate-500">Official 24/7 emergency control rooms & helplines</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Advisory banner */}
        <div className="p-4 bg-amber-50 border-b border-amber-200/70 flex items-start gap-3 text-xs text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Before Traveling in Snow or Dense Fog:</p>
            <p className="text-amber-800 mt-0.5">Ensure your vehicle has at least half a tank of fuel, warm blankets, functional defrosters, and tire snow chains. Never leave vehicle engines idling in closed snowdrifts.</p>
          </div>
        </div>

        {/* Contacts list */}
        <div className="p-6 space-y-3">
          {contacts.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors bg-slate-50/50"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-semibold text-slate-800">{item.agency}</span>
                <span className="text-[11px] text-slate-500">{item.type}</span>
              </div>
              <p className="text-xs text-slate-500 mb-2.5 leading-relaxed">{item.description}</p>
              
              <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-200/60">
                <span className="font-mono font-bold text-slate-900 text-sm tracking-wide">
                  {item.number}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(item.number, idx)}
                    className="p-1.5 text-xs text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-md hover:bg-slate-100 transition-colors flex items-center gap-1 cursor-pointer"
                    title="Copy Number"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 text-[11px] font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Copy</span>
                      </>
                    )}
                  </button>
                  <a
                    href={`tel:${item.number.replace(/[^0-9]/g, '')}`}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-slate-900 rounded-md hover:bg-slate-800 transition-colors flex items-center gap-1"
                  >
                    <PhoneCall className="w-3 h-3" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-600 font-medium">
            Murree Snow Clearance Control Center: <span className="font-mono text-slate-900 font-semibold">051-9269016</span>
          </p>
        </div>
      </div>
    </div>
  );
};
