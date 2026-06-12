// components/AnalyticsChart.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { BarChart3, FileText } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Site {
  id: string;
  name: string;
}

interface AnalyticsChartProps {
  sites: Site[];
}

export default function AnalyticsChart({ sites }: AnalyticsChartProps) {
  const [chartData, setChartData] = useState<{
    labels: string[];
    data: number[];
  } | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filter state
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [siteId, setSiteId] = useState("");

  // Fetch data when filters change
  useEffect(() => {
    fetchData();
  }, [from, to, siteId]);

  async function fetchData() {
    setLoading(true);
    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    if (siteId) params.set("siteId", siteId);

    try {
      const res = await fetch(`/api/analytics?${params.toString()}`);
      const json = await res.json();
      setChartData(json);
      const sum = (json.data as number[]).reduce((a: number, b: number) => a + b, 0);
      setTotal(sum);
    } catch (error) {
      console.error("Analytics fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  function applyFilter(e: React.FormEvent) {
    e.preventDefault();
    fetchData();
  }

  function exportCSV() {
    if (!chartData) return;
    const rows = chartData.labels.map((label, i) => [label, chartData.data[i]]);
    const csv = [["Date", "Visitors"], ...rows]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `visitors_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  if (loading && !chartData) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!chartData) {
    return <p className="text-slate-400 text-center py-12">No data available.</p>;
  }

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Visitors",
        data: chartData.data,
        backgroundColor: "rgba(14, 165, 233, 0.7)",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, color: "#94a3b8" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      x: {
        ticks: { color: "#94a3b8" },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <form onSubmit={applyFilter}>
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-xs text-slate-400 mb-1">From</label>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">To</label>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Site</label>
            <select
              value={siteId}
              onChange={(e) => setSiteId(e.target.value)}
              className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200"
            >
              <option value="">All sites</option>
              {sites.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Apply
          </button>
        </div>
      </form>

      {/* Summary */}
      <div className="bg-sky-500/10 backdrop-blur-md rounded-2xl border border-sky-400/30 p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BarChart3 className="w-8 h-8 text-sky-400" />
          <div>
            <p className="text-sm text-sky-200">Total visitors</p>
            <p className="text-3xl font-bold text-white">{total}</p>
          </div>
        </div>
        <button
          onClick={exportCSV}
          className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
        >
          <FileText className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Chart */}
      <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}