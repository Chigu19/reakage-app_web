"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatusBadge } from './status-badge';
import { SeverityBadge } from './severity-badge';
import { supabase } from '@/lib/supabase/client';
import { Eye, MapPin } from 'lucide-react';
import Link from 'next/link';

interface RecentIssue {
  id: string;
  location_name: string;
  location_district: string;
  location_region: string;
  reported_by: string;
  reported_at: string;
  description: string;
  issue_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'investigating' | 'in_progress' | 'resolved' | 'rejected';
}

export function RecentIssues() {
  const [issues, setIssues] = useState<RecentIssue[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRecentIssues();
  }, []);

  const fetchRecentIssues = async () => {
    try {
      const { data, error } = await supabase
        .from('water_quality_issues')
        .select('*')
        .order('reported_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching recent issues:', error);
        return;
      }

      setIssues(data || []);
    } catch (error) {
      console.error('Error in fetchRecentIssues:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Issues</CardTitle>
          <CardDescription>Latest water quality issues reported</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (issues.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Issues</CardTitle>
          <CardDescription>Latest water quality issues reported</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">No recent issues to display</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Issues</CardTitle>
        <CardDescription>Latest water quality issues reported</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {issues.map((issue) => (
            <div key={issue.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium">{issue.location_name}</h4>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {issue.location_district}, {issue.location_region}
                  </div>
                </div>
                <div className="flex gap-2">
                  <StatusBadge status={issue.status} />
                  <SeverityBadge severity={issue.severity} />
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-2">
                {issue.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {issue.issue_type.charAt(0).toUpperCase() + issue.issue_type.slice(1)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    by {issue.reported_by}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {new Date(issue.reported_at).toLocaleDateString()}
                  </span>
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/dashboard/issues/${issue.id}`}>
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <Button asChild variant="outline">
            <Link href="/dashboard/issues">View All Issues</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default RecentIssues;