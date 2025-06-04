import { AlertTriangle, CheckCircle, Clock, Filter, Users } from "lucide-react";
import { StatCard } from "./stat-card";
import {
  getTotalIssuesCount,
  getResolvedIssuesCount,
  getPendingIssuesCount,
  getCriticalIssuesCount,
} from "@/lib/data/mock-data";

export function StatsOverview() {
  // Get data from the mock data functions
  const totalIssues = getTotalIssuesCount();
  const resolvedIssues = getResolvedIssuesCount();
  const pendingIssues = getPendingIssuesCount();
  const criticalIssues = getCriticalIssuesCount();

  // Calculate resolution rate
  const resolutionRate = Math.round((resolvedIssues / totalIssues) * 100);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Reports"
        value={totalIssues}
        icon={Filter}
        description="All water quality issues"
        iconColor="text-blue-600"
      />
      <StatCard
        title="Resolved Issues"
        value={resolvedIssues}
        icon={CheckCircle}
        description={`${resolutionRate}% resolution rate`}
        trend={{ value: resolutionRate, isPositive: true }}
        iconColor="text-green-600"
      />
      <StatCard
        title="Pending Review"
        value={pendingIssues}
        icon={Clock}
        description="Awaiting assessment"
        iconColor="text-amber-600"
      />
      <StatCard
        title="Critical Issues"
        value={criticalIssues}
        icon={AlertTriangle}
        description="Require immediate attention"
        iconColor="text-red-600"
      />
    </div>
  );
}