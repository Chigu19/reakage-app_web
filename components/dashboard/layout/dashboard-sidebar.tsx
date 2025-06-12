"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  AreaChart, 
  Droplets, 
  Home, 
  Settings, 
  AlertTriangle 
} from "lucide-react";

export function DashboardSidebar() {
  const pathname = usePathname();

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
      current: pathname === "/dashboard",
    },
    {
      name: "Water Quality Issues",
      href: "/dashboard/issues",
      icon: Droplets,
      current: pathname === "/dashboard/issues",
    },
    {
      name: "Reports",
      href: "/dashboard/reports",
      icon: AreaChart,
      current: pathname === "/dashboard/reports",
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      current: pathname === "/dashboard/settings",
    },
  ];

  return (
    <div className="flex h-full flex-col border-r bg-muted/40">
      <div className="flex h-14 items-center border-b px-4">
        <Link 
          href="/dashboard" 
          className="flex items-center gap-2 font-semibold"
        >
          <Droplets className="h-6 w-6 text-blue-600" />
          <span className="text-lg">Water Watch</span>
        </Link>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 pt-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted transition-colors",
                item.current ? "bg-muted text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5", item.current ? "text-primary" : "text-muted-foreground")} />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <div>
              <h5 className="font-medium">Need Help?</h5>
              <p className="text-xs text-muted-foreground">
                Contact system support
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}