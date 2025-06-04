import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsOverview } from "@/components/dashboard/statistics/stats-overview";
import { RecentIssues } from "@/components/dashboard/issues/recent-issues";
import { StatusDistributionChart } from "@/components/dashboard/charts/status-distribution";
import { RegionDistributionChart } from "@/components/dashboard/charts/region-distribution";
import { IssueTypesChart } from "@/components/dashboard/charts/issue-types-chart";
import { getRecentIssues, getHighPriorityIssues } from "@/lib/data/mock-data";

export const metadata: Metadata = {
  title: "Dashboard | Tanzania Water Quality",
  description: "Admin dashboard for monitoring water quality issues in Tanzania",
};

export default function DashboardPage() {
  const recentIssues = getRecentIssues(5);
  const highPriorityIssues = getHighPriorityIssues().slice(0, 5);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <StatsOverview />

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-1 md:col-span-2 lg:col-span-4">
              <CardHeader>
                <CardTitle>Water Quality Overview</CardTitle>
                <CardDescription>
                  Current status of water quality across Tanzania
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  The dashboard shows that the majority of water quality issues are being addressed, with 30% already resolved. However, there are several critical issues in Dar es Salaam region requiring immediate attention. The most common problems are related to infrastructure and contamination.
                </p>
                <p className="text-sm text-muted-foreground">
                  Regional teams are actively investigating reported issues, with a focus on addressing high severity problems in densely populated areas first. Monthly water quality tests are being conducted in collaboration with local authorities.
                </p>
              </CardContent>
            </Card>

            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <RecentIssues issues={recentIssues} />
            </div>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-1 md:col-span-2 lg:col-span-4">
              <RecentIssues 
                issues={highPriorityIssues} 
                title="High Priority Issues" 
                description="Critical and high severity issues requiring immediate attention"
              />
            </div>
            <Card className="col-span-1 md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle>Action Items</CardTitle>
                <CardDescription>Tasks requiring your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <div className="font-medium">Water Sample Analysis</div>
                    <div className="text-sm text-muted-foreground">
                      Review laboratory results for Msasani Peninsula samples
                    </div>
                    <div className="text-xs text-muted-foreground">Due: Today</div>
                  </div>
                  <div className="grid gap-2">
                    <div className="font-medium">Community Borehole Repair</div>
                    <div className="text-sm text-muted-foreground">
                      Approve budget for Tandale borehole repair
                    </div>
                    <div className="text-xs text-muted-foreground">Due: Tomorrow</div>
                  </div>
                  <div className="grid gap-2">
                    <div className="font-medium">Contamination Report</div>
                    <div className="text-sm text-muted-foreground">
                      Prepare report on river contamination in Magomeni
                    </div>
                    <div className="text-xs text-muted-foreground">Due: 20 May 2025</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <StatsOverview />

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <StatusDistributionChart />
            <IssueTypesChart />
          </div>

          <div className="grid gap-4 grid-cols-1">
            <RegionDistributionChart />
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <StatsOverview />

          <Card>
            <CardHeader>
              <CardTitle>Monthly Reports</CardTitle>
              <CardDescription>
                Download monthly water quality reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">April 2025</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Monthly water quality assessment across all regions
                      </p>
                      <div className="flex justify-between text-sm">
                        <span>PDF, 4.2 MB</span>
                        <span className="text-blue-600 cursor-pointer">Download</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">March 2025</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Monthly water quality assessment across all regions
                      </p>
                      <div className="flex justify-between text-sm">
                        <span>PDF, 3.8 MB</span>
                        <span className="text-blue-600 cursor-pointer">Download</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">February 2025</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Monthly water quality assessment across all regions
                      </p>
                      <div className="flex justify-between text-sm">
                        <span>PDF, 4.5 MB</span>
                        <span className="text-blue-600 cursor-pointer">Download</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}