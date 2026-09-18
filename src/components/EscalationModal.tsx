import React, { useState } from 'react';
import { UserCheck, Shield, CheckCircle2, FileText, Download } from 'lucide-react';

interface EscalationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillQuery?: string;
  prefillProduct?: string;
}

export const EscalationModal: React.FC<EscalationModalProps> = ({
  isOpen,
  onClose,
  prefillQuery = '',
  prefillProduct = 'HerbNova Arthrosoul Joint Extract',
}) => {
  const [name, setName] = useState('Dr. Anand Varma');
  const [org, setOrg] = useState('HerbNova Ayurveda Innovations Pvt Ltd');
  const [desk, setDesk] = useState('AIIA-IP');
  const [notes, setNotes] = useState(
    prefillQuery ||
      'Seeking formal IP opinion regarding Section 3(p) prior art objection risk and NBA Form III submission timing for synergistic Boswellia-Rasna formulation.'
  );
  const [docketNumber, setDocketNumber] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generated = 'AIIA-IPR-' + Math.floor(100000 + Math.random() * 900000);
    setDocketNumber(generated);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-stone-200">
        {!docketNumber ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">
                    Escalate to Ayush IP Facilitator
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    All India Institute of Ayurveda (AIIA) / NRDC Ayush Facilitation Desk
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-stone-400 hover:text-stone-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Innovator / Authorized Representative Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Enterprise / Organization / Institution
                </label>
                <input
                  type="text"
                  required
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Target Facilitation Desk
                </label>
                <select
                  value={desk}
                  onChange={(e) => setDesk(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-900 focus:outline-none cursor-pointer"
                >
                  <option value="AIIA-IP">All India Institute of Ayurveda (AIIA) IP Cell</option>
                  <option value="NRDC-AYUSH">National Research Development Corporation (NRDC) Ayush Desk</option>
                  <option value="NBA-TECH">National Biodiversity Authority (NBA) Technical Support Cell</option>
                  <option value="PIC-STATE">Patent Information Centre (PIC) / State S&T Council</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Escalation Issue / Patentability & Regulatory Query
                </label>
                <textarea
                  rows={3}
                  required
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-stone-900 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
              <span className="text-[10px] text-stone-400">
                Routed under Ministry of Ayush facilitation framework.
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-sm"
                >
                  Generate Official Docket
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="space-y-4 text-center py-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-stone-900">
                Escalation Docket Registered Successfully!
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Your inquiry has been assigned an official reference tracking ID.
              </p>
            </div>

            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-left text-xs space-y-2 font-mono">
              <div className="flex justify-between border-b border-stone-200 pb-1.5">
                <span className="text-stone-400 font-sans">Docket Tracking ID:</span>
                <span className="font-bold text-emerald-800">{docketNumber}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-1.5">
                <span className="text-stone-400 font-sans">Assigned Desk:</span>
                <span className="font-semibold text-stone-800">{desk}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-1.5">
                <span className="text-stone-400 font-sans">Applicant:</span>
                <span className="text-stone-800">{name} ({org})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400 font-sans">Timestamp:</span>
                <span className="text-stone-600">{new Date().toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-center gap-2">
              <button
                onClick={() => {
                  setDocketNumber(null);
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold"
              >
                Done & Return to Assistant
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
