"use client";

import { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, Filter } from "lucide-react";
import { StatCard } from "./stat-card";
import { supabase } from '@/lib/supabase/client';

interface StatsData {
  totalIssues: number;
  resolvedIssues: number;
  pendingIssues: number;
  criticalIssues: number;
}

export function StatsOverview() {
  const [stats, setStats] = useState<StatsData>({
    totalIssues: 0,
    resolvedIssues: 0,
    pendingIssues: 0,
    criticalIssues: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: issues, error } = await supabase
        .from('water_quality_issues')
        .select('status, severity');

      if (error) {
        console.error('Error fetching stats:', error);
        return;
      }

      const totalIssues = issues.length;
      const resolvedIssues = issues.filter(issue => issue.status === 'resolved').length;
      const pendingIssues = issues.filter(issue => issue.status === 'pending').length;
      const criticalIssues = issues.filter(
        issue => issue.severity === 'critical' && issue.status !== 'resolved'
      ).length;

      setStats({
        totalIssues,
        resolvedIssues,
        pendingIssues,
        criticalIssues,
      });
    } catch (error) {
      console.error('Error in fetchStats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  const resolutionRate = stats.totalIssues > 0 
    ? Math.round((stats.resolvedIssues / stats.totalIssues) * 100) 
    : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Reports"
        value={stats.totalIssues}
        icon={Filter}
        description="All water quality issues"
        iconColor="text-blue-600"
      />
      <StatCard
        title="Resolved Issues"
        value={stats.resolvedIssues}
        icon={CheckCircle}
        description={`${resolutionRate}% resolution rate`}
        trend={{ value: resolutionRate, isPositive: true }}
        iconColor="text-green-600"
      />
      <StatCard
        title="Pending Review"
        value={stats.pendingIssues}
        icon={Clock}
        description="Awaiting assessment"
        iconColor="text-amber-600"
      />
      <StatCard
        title="Critical Issues"
        value={stats.criticalIssues}
        icon={AlertTriangle}
        description="Require immediate attention"
        iconColor="text-red-600"
      />
    </div>
  );
}