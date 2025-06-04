"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { getIssuesByStatus } from "@/lib/data/mock-data";

const STATUS_COLORS = {
  pending: "hsl(var(--chart-4))",
  investigating: "hsl(var(--chart-1))",
  in_progress: "hsl(var(--chart-5))",
  resolved: "hsl(var(--chart-2))",
  rejected: "hsl(var(--chart-3))",
};

const STATUS_LABELS = {
  pending: "Pending",
  investigating: "Investigating",
  in_progress: "In Progress",
  resolved: "Resolved",
  rejected: "Rejected",
};

export function StatusDistributionChart() {
  const data = getIssuesByStatus().map((item) => ({
    name: STATUS_LABELS[item.status as keyof typeof STATUS_LABELS],
    value: item.count,
    color: STATUS_COLORS[item.status as keyof typeof STATUS_COLORS],
  }));

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Status Distribution</CardTitle>
        <CardDescription>
          Current status of all reported water quality issues
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value} issues`, ""]}
                contentStyle={{
                  borderRadius: "0.5rem",
                  border: "1px solid hsl(var(--border))",
                  backgroundColor: "hsl(var(--card))",
                  color: "hsl(var(--card-foreground))",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}