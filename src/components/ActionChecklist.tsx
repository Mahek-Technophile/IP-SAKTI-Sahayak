import React, { useState } from 'react';
import {
  Download,
  Printer,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Plus,
  Trash2,
  FileSpreadsheet,
  Share2,
} from 'lucide-react';
import { ActionChecklistItem } from '../types/index.ts';

interface ActionChecklistProps {
  initialItems?: ActionChecklistItem[];
}

export const ActionChecklist: React.FC<ActionChecklistProps> = ({ initialItems }) => {
  const [items, setItems] = useState<ActionChecklistItem[]>(
    initialItems && initialItems.length > 0
      ? initialItems
      : [
          {
            id: 'chk-1',
            issue: 'Patentability Exclusion under Section 3(p) (Traditional Knowledge)',
            action:
              'Perform comparative synergy assay (in-vitro / in-vivo) demonstrating combination index < 1 to prove non-obvious synergistic therapeutic efficacy over classical texts.',
            authority: 'Office of CGPDTM / Patent Office',
            requiredDocument: 'Comparative Synergistic Pharmacology Study Report & HPLC Fingerprint Dossier',
            sourceCitation: 'Indian Patents Act 1970 — Section 3(p) & Section 3(e)',
            status: 'in_progress',
            priority: 'critical',
            deadlineInfo: 'Prior to Complete Specification filing',
          },
          {
            id: 'chk-2',
            issue: 'Mandatory Prior Approval for IPR Filing / Grant',
            action:
              'Submit Form III application with prescribed fees to the National Biodiversity Authority (NBA) before patent grant or foreign PCT national phase filing.',
            authority: 'National Biodiversity Authority (NBA), Chennai',
            requiredDocument: 'NBA Form III Application, Herbarium Authentication, & Draft Specification',
            sourceCitation: 'Biological Diversity Act 2002 — Section 6 & Rule 14',
            status: 'pending',
            priority: 'critical',
            deadlineInfo: 'Mandatory prior to Indian Patent Grant / Foreign Filing',
          },
          {
            id: 'chk-3',
            issue: 'Manufacturing License for Ayurvedic Proprietary Medicine',
            action:
              'Apply for Form 25D license with the State Ayush Licensing Authority (SLA) under Rule 158B including textual citations from First Schedule books.',
            authority: 'State Ayush Licensing Authority (SLA)',
            requiredDocument: 'Form 25D, Schedule T GMP Certificate, Heavy Metal / Stability Test Reports',
            sourceCitation: 'Drugs and Cosmetics Rules, 1945 — Rule 158B & Schedule T',
            status: 'pending',
            priority: 'high',
            deadlineInfo: 'Prior to commercial manufacturing or distribution',
          },
          {
            id: 'chk-4',
            issue: 'Biological Resource Sourcing & SBB Prior Intimation',
            action:
              'Submit prior intimation to the concerned State Biodiversity Board for wild-harvested raw botanical procurement from forest divisions.',
            authority: 'State Biodiversity Board (SBB)',
            requiredDocument: 'SBB Intimation Form, Forest Transit Permits, & Procurement Invoices',
            sourceCitation: 'Biological Diversity Act 2002 — Section 7',
            status: 'pending',
            priority: 'high',
            deadlineInfo: 'Prior to commercial procurement / batch production',
          },
          {
            id: 'chk-5',
            issue: 'Brand Protection & Trademark Distinctiveness',
            action:
              'File trademark application for coined brand name (e.g., "Arthrosoul") in Nice Class 5 (Medicines) and Class 30 (Aahar if applicable).',
            authority: 'Trade Marks Registry (CGPDTM)',
            requiredDocument: 'Form TM-A & User Affidavit with proof of distinctive use',
            sourceCitation: 'Trade Marks Act, 1999 — Section 28 & Class 5',
            status: 'in_progress',
            priority: 'medium',
            deadlineInfo: 'Immediate to safeguard brand equity',
          },
          {
            id: 'chk-6',
            issue: 'Quality Certification for Export Markets',
            action:
              'Apply for AYUSH Premium Mark certification through Quality Council of India (QCI) accredited inspection agencies.',
            authority: 'Ministry of Ayush / Quality Council of India (QCI)',
            requiredDocument: 'WHO-GMP Certificate, Batch Heavy Metal/Pesticide/Aflatoxin Residue Dossier',
            sourceCitation: 'Ministry of Ayush Voluntary Certification Scheme Notification',
            status: 'pending',
            priority: 'medium',
            deadlineInfo: 'Prior to executing US / EU export shipments',
          },
        ]
  );

  const toggleStatus = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus =
            item.status === 'pending'
              ? 'in_progress'
              : item.status === 'in_progress'
              ? 'completed'
              : 'pending';
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Export structured checklist as JSON
  const exportAsJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(items, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `IP_SAKTI_Action_Checklist_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Print/PDF View
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header & Export CTAs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900 font-serif">
            IP & Regulatory Action Checklist
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Structured roadmap covering statutory compliance, patent hurdles, regulatory licensing, and ABS clearances
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportAsJSON}
            className="inline-flex items-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 px-3 py-1.5 rounded-xl text-xs font-semibold transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold transition shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Checklist Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-100 text-stone-600 uppercase tracking-wider text-[10px] border-b border-stone-200">
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 font-bold">Priority</th>
                <th className="py-3.5 px-4 font-bold">Regulatory Issue & Statutory Basis</th>
                <th className="py-3.5 px-4 font-bold">Mandated Action</th>
                <th className="py-3.5 px-4 font-bold">Authority & Source</th>
                <th className="py-3.5 px-4 font-bold">Required Evidence / Document</th>
                <th className="py-3.5 px-4 font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-800">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-stone-50/80 transition">
                  {/* Status Toggle */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleStatus(item.id)}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase transition ${
                        item.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : item.status === 'in_progress'
                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                          : 'bg-stone-100 text-stone-600 border border-stone-300'
                      }`}
                    >
                      {item.status === 'completed' ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      ) : item.status === 'in_progress' ? (
                        <Clock className="w-3 h-3 text-blue-600" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-stone-400" />
                      )}
                      <span>{item.status.replace('_', ' ')}</span>
                    </button>
                  </td>

                  {/* Priority */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        item.priority === 'critical'
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : item.priority === 'high'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : item.priority === 'medium'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {item.priority}
                    </span>
                  </td>

                  {/* Issue */}
                  <td className="py-3.5 px-4 min-w-[200px]">
                    <div className="font-bold text-stone-900">{item.issue}</div>
                    <div className="text-[11px] text-stone-500 font-mono mt-0.5">{item.sourceCitation}</div>
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 min-w-[240px] text-stone-700 leading-relaxed">
                    {item.action}
                  </td>

                  {/* Authority */}
                  <td className="py-3.5 px-4 min-w-[140px]">
                    <div className="font-semibold text-stone-900">{item.authority}</div>
                    {item.deadlineInfo && (
                      <div className="text-[10px] text-amber-700 font-medium mt-0.5">
                        {item.deadlineInfo}
                      </div>
                    )}
                  </td>

                  {/* Required Evidence */}
                  <td className="py-3.5 px-4 min-w-[180px] text-stone-600 text-[11px]">
                    {item.requiredDocument}
                  </td>

                  {/* Delete Item */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-stone-300 hover:text-rose-600 p-1 rounded transition"
                      title="Delete item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="bg-stone-50 px-6 py-3 text-[11px] text-stone-500 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200">
          <span>Click on status badge to toggle: Pending → In Progress → Completed</span>
          <span>Generated by IP-SAKTI Sahayak (Ministry of Ayush / AIIA SIH 2026)</span>
        </div>
      </div>
    </div>
  );
};
