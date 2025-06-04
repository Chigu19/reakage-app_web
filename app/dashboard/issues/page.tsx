import { Metadata } from "next";
import { IssuesTable } from "@/components/dashboard/issues/issues-table";
import { mockWaterQualityIssues } from "@/lib/data/mock-data";

export const metadata: Metadata = {
  title: "Water Quality Issues | Tanzania Water Quality",
  description: "Manage and track water quality issues across Tanzania",
};

export default function IssuesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Water Quality Issues</h2>
      </div>
      
      <div className="p-4 bg-card rounded-lg border shadow-sm">
        <IssuesTable issues={mockWaterQualityIssues} />
      </div>
    </div>
  );
}