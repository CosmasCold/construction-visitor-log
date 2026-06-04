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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsChart() {
  const [chartData, setChartData] = useState<{
    labels: string[];
    data: number[];
  } | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((json) => {
        setChartData(json);
        const sum = (json.data as number[]).reduce((a, b) => a + b, 0);
        setTotal(sum);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!chartData) {
    return (
      <p className="text-slate-400 text-center py-12">No data available.</p>
    );
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
      <div className="bg-sky-500/10 backdrop-blur-md rounded-2xl border border-sky-400/30 p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BarChart3 className="w-8 h-8 text-sky-400" />
          <div>
            <p className="text-sm text-sky-200">
              Total visitors (last 30 days)
            </p>
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
      <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}