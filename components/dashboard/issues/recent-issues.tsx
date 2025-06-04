import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "./status-badge";
import { SeverityBadge } from "./severity-badge";
import { Button } from "@/components/ui/button";
import { Clock, Eye } from "lucide-react";
import { WaterQualityIssue } from "@/lib/data/mock-data";

interface RecentIssuesProps {
  issues: WaterQualityIssue[];
  title?: string;
  description?: string;
  className?: string;
}

export function RecentIssues({
  issues,
  title = "Recent Issues",
  description = "Latest reported water quality problems",
  className,
}: RecentIssuesProps) {
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    
    // Calculate the difference in milliseconds
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    if (diffMinutes < 60) {
      return `${diffMinutes} min${diffMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
      }).format(date);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {issues.map((issue) => (
            <div key={issue.id} className="flex flex-col gap-2">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{issue.id}</h4>
                    <StatusBadge status={issue.status} />
                    <SeverityBadge severity={issue.severity} />
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {issue.description}
                  </p>
                </div>
                <Button size="sm" variant="ghost" asChild>
                  <Link href={`/dashboard/issues/${issue.id}`}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Link>
                </Button>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatDate(issue.reportedAt)}</span>
                </div>
                <div>{issue.location.name}, {issue.location.district}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}