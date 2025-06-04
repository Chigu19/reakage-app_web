import { DashboardHeader } from "@/components/dashboard/layout/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/layout/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <div className="hidden lg:block">
          <div className="h-[calc(100vh-4rem)] w-64">
            <DashboardSidebar />
          </div>
        </div>
        <main className="flex-1 bg-muted/20">{children}</main>
      </div>
    </div>
  );
}