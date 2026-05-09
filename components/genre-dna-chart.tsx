"use client"

import { GenreDNA } from "@/lib/personality/analyzer"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

interface GenreDNAChartProps {
  data: GenreDNA[]
}

export function GenreDNAChart({ data }: GenreDNAChartProps) {
  if (data.length === 0) {
    return <p className="text-center text-slate-400 py-8">No genre data available</p>
  }

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={40}
            paddingAngle={2}
            dataKey="percentage"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "8px",
            }}
            itemStyle={{ color: "#fff" }}
            formatter={(value: number, name: string) => [`${value}%`, name]}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {data.slice(0, 6).map((genre) => (
          <div key={genre.genre} className="flex items-center gap-2 min-w-0">
            <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: genre.color }} />
            <span className="text-xs text-white/70 capitalize truncate font-medium">{genre.genre}</span>
            <span className="text-[10px] text-white/30 ml-auto font-mono">{genre.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}