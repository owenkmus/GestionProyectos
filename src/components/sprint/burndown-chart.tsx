"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Día 1", actual: 100, ideal: 100 },
  { name: "Día 2", actual: 95, ideal: 85 },
  { name: "Día 3", actual: 80, ideal: 70 },
  { name: "Día 4", actual: 75, ideal: 55 },
  { name: "Día 5", actual: 50, ideal: 40 },
  { name: "Día 6", actual: 30, ideal: 25 },
  { name: "Día 7", actual: 10, ideal: 10 },
];

export const BurndownChart = () => {
  return (
    <div className="w-full h-[300px] bg-white dark:bg-zinc-900/50 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800">
      <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500 mb-6">Burndown Chart</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#71717a", fontSize: 10, fontWeight: 700 }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#71717a", fontSize: 10, fontWeight: 700 }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: "#18181b", border: "none", borderRadius: "12px", fontSize: "12px" }}
            itemStyle={{ fontWeight: "bold" }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="ideal" 
            stroke="#71717a" 
            strokeDasharray="5 5" 
            name="Ideal" 
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            dataKey="actual" 
            stroke="#3b82f6" 
            strokeWidth={4} 
            name="Actual" 
            dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 8, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
