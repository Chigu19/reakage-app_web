"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { getIssuesByType } from "@/lib/data/mock-data";

const ISSUE_TYPE_COLORS = {
  contamination: "hsl(var(--chart-3))",
  shortage: "hsl(var(--chart-4))",
  infrastructure: "hsl(var(--chart-5))",
  taste: "hsl(var(--chart-1))",
  color: "hsl(var(--chart-2))",
  odor: "hsl(220, 70%, 60%)",
  other: "hsl(260, 60%, 60%)",
};

const ISSUE_TYPE_LABELS = {
  contamination: "Contamination",
  shortage: "Shortage",
  infrastructure: "Infrastructure",
  taste: "Taste",
  color: "Color",
  odor: "Odor",
  other: "Other",
};

export function IssueTypesChart() {
  const data = getIssuesByType().map((item) => ({
    name: ISSUE_TYPE_LABELS[item.type as keyof typeof ISSUE_TYPE_LABELS],
    value: item.count,
    color: ISSUE_TYPE_COLORS[item.type as keyof typeof ISSUE_TYPE_COLORS],
  }));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Issue Types</CardTitle>
        <CardDescription>
          Distribution of water quality problems by type
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
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={true}
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