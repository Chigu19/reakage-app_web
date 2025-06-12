import { StatsOverview } from '@/components/dashboard/statistics/stats-overview'
import { RecentIssues } from '@/components/dashboard/issues/recent-issues'
import { IssueTypesChart } from '@/components/dashboard/charts/issue-types-chart'
import { StatusDistribution } from '@/components/dashboard/charts/status-distribution'
import { RegionDistribution } from '@/components/dashboard/charts/region-distribution'

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      
      {/* Statistics Overview */}
      <StatsOverview />
      
      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <IssueTypesChart />
        <StatusDistribution />
        <RegionDistribution />
      </div>
      
      {/* Recent Issues */}
      <RecentIssues />
    </div>
  )
}