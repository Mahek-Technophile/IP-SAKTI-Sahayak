import React, { useState, useEffect } from 'react';
import {
  Play,
  CheckCircle2,
  XCircle,
  RefreshCw,
} from 'lucide-react';
import { EvaluationReport, EvaluationMetric } from '../types/index.ts';

export const EvaluationDashboard: React.FC = () => {
  const [report, setReport] = useState<EvaluationReport | null>(null);
  const [running, setRunning] = useState(false);

  const fetchMetrics = async () => {
    try {
      const res = await fetch('/api/evaluate');
      if (res.ok) {
        const data: EvaluationReport = await res.json();
        setReport(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const handleRunEvaluation = async () => {
    setRunning(true);
    try {
      const res = await fetch('/api/evaluate');
      if (res.ok) {
        const data: EvaluationReport = await res.json();
        setReport(data);
      }
    } finally {
      setTimeout(() => setRunning(false), 600);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header & Run Trigger */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-stone-900 font-serif">
              SIH 2026 Evaluation & Benchmark Dashboard
            </h2>
            <span className="text-[10px] uppercase font-bold bg-purple-100 text-purple-800 border border-purple-200 px-2 py-0.5 rounded">
              Judge Suite
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Empirical quality benchmarks, citation coverage, safe abstention precision, and latency for Problem Statement 26045
          </p>
        </div>

        <button
          onClick={handleRunEvaluation}
          disabled={running}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition ${
            running
              ? 'bg-stone-300 text-stone-600 cursor-not-allowed'
              : 'bg-emerald-700 hover:bg-emerald-800 text-white'
          }`}
        >
          {running ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Executing Evaluation Suite...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Re-Run Benchmark Suite</span>
            </>
          )}
        </button>
      </div>

      {/* Primary Quantitative KPIs */}
      {report && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Grounded Answer Rate */}
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
              Grounded Rate
            </span>
            <div className="text-xl font-bold text-emerald-700 font-mono">
              {report.summary.groundedAnswerRate.toFixed(1)}%
            </div>
            <span className="text-[10px] text-stone-500">100% verified citations</span>
          </div>

          {/* Citation Integrity */}
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
              Citation Integrity
            </span>
            <div className="text-xl font-bold text-blue-700 font-mono">
              {report.summary.citationIntegrityRate.toFixed(1)}%
            </div>
            <span className="text-[10px] text-stone-500">Tier 1 & 2 sources</span>
          </div>

          {/* Abstention Precision */}
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
              Abstention Precision
            </span>
            <div className="text-xl font-bold text-purple-700 font-mono">
              {report.summary.abstentionPrecision.toFixed(1)}%
            </div>
            <span className="text-[10px] text-stone-500">Refuses to hallucinate</span>
          </div>

          {/* Accuracy Score */}
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
              Statutory Accuracy
            </span>
            <div className="text-xl font-bold text-emerald-800 font-mono">
              {report.summary.accuracyRate.toFixed(1)}%
            </div>
            <span className="text-[10px] text-stone-500">Exact legal matching</span>
          </div>

          {/* Avg Latency */}
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
              Average Latency
            </span>
            <div className="text-xl font-bold text-amber-700 font-mono">
              {report.summary.averageLatencyMs}ms
            </div>
            <span className="text-[10px] text-stone-500">Hybrid BM25 + cache</span>
          </div>

          {/* Total Benchmarks */}
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
              Test Cases Run
            </span>
            <div className="text-xl font-bold text-stone-900 font-mono">
              {report.summary.totalTests}
            </div>
            <span className="text-[10px] text-stone-500">Pre-configured SIH set</span>
          </div>
        </div>
      )}

      {/* Benchmark Execution Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-md overflow-hidden">
        <div className="p-4 border-b border-stone-200 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
            Gold-Standard Benchmark Test Cases & Statutory Grounding Verification
          </h3>
          <span className="text-[11px] text-stone-400">Evaluated on live corpus at runtime</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-stone-50 text-stone-500 uppercase tracking-wider text-[10px] border-b border-stone-200">
                <th className="py-3 px-4 font-bold">Query ID & Test Case</th>
                <th className="py-3 px-4 font-bold">Jurisdiction</th>
                <th className="py-3 px-4 font-bold">Expected Category / Key Statutes</th>
                <th className="py-3 px-4 font-bold">Grounding Status</th>
                <th className="py-3 px-4 font-bold">Citations</th>
                <th className="py-3 px-4 font-bold">Latency</th>
                <th className="py-3 px-4 font-bold text-center">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-800">
              {report?.details.map((item: EvaluationMetric, idx: number) => (
                <tr key={item.id} className="hover:bg-stone-50/80 transition">
                  <td className="py-3 px-4 font-medium text-stone-900 max-w-[280px]">
                    <div className="font-mono text-[10px] text-stone-400">{item.id} • {item.testCaseName}</div>
                    <div className="text-xs leading-snug">{item.query}</div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.jurisdiction === 'INDIA'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {item.jurisdiction}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-stone-600 font-mono text-[11px]">
                    <div>{item.expectedCategory}</div>
                    <div className="text-[10px] text-stone-400 truncate max-w-[180px]">
                      {item.keyStatutesExpected.join(', ')}
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.actualGroundingStatus === 'Source Grounded'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.actualGroundingStatus === 'Partially Grounded'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {item.actualGroundingStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-stone-700">
                    {item.citationCoverage} verified
                  </td>
                  <td className="py-3 px-4 font-mono text-stone-600">
                    {item.latencyMs}ms
                  </td>
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    {item.passed ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[10px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        PASS
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 text-[10px]">
                        <XCircle className="w-3.5 h-3.5 text-rose-600" />
                        FAIL
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
