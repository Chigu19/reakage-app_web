"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "./status-badge";
import { SeverityBadge } from "./severity-badge";
import { IssueTypeBadge } from "./issue-type-badge";
import { WaterSourceBadge } from "./water-source-badge";
import { Eye, Filter, Search } from "lucide-react";
import { WaterQualityIssue } from "@/lib/data/mock-data";
import { cn } from "@/lib/utils";

interface IssuesTableProps {
  issues: WaterQualityIssue[];
  className?: string;
}

export function IssuesTable({ issues, className }: IssuesTableProps) {
  const [filteredIssues, setFilteredIssues] = useState<WaterQualityIssue[]>(issues);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    applyFilters(query, statusFilter, severityFilter);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    applyFilters(searchQuery, value, severityFilter);
  };

  const handleSeverityFilter = (value: string) => {
    setSeverityFilter(value);
    applyFilters(searchQuery, statusFilter, value);
  };

  const applyFilters = (query: string, status: string, severity: string) => {
    let filtered = issues;

    // Apply search query filter
    if (query) {
      filtered = filtered.filter(
        (issue) =>
          issue.id.toLowerCase().includes(query) ||
          issue.location.name.toLowerCase().includes(query) ||
          issue.location.district.toLowerCase().includes(query) ||
          issue.location.region.toLowerCase().includes(query) ||
          issue.description.toLowerCase().includes(query) ||
          (issue.reportedBy && issue.reportedBy.toLowerCase().includes(query))
      );
    }

    // Apply status filter
    if (status !== "all") {
      filtered = filtered.filter((issue) => issue.status === status);
    }

    // Apply severity filter
    if (severity !== "all") {
      filtered = filtered.filter((issue) => issue.severity === severity);
    }

    setFilteredIssues(filtered);
  };

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search issues..."
            className="pl-8"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="flex gap-2">
          <div className="w-40">
            <Select defaultValue="all" onValueChange={handleStatusFilter}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-40">
            <Select defaultValue="all" onValueChange={handleSeverityFilter}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Severity" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Issue Type</TableHead>
              <TableHead>Water Source</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reported</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIssues.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No issues found.
                </TableCell>
              </TableRow>
            ) : (
              filteredIssues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell className="font-medium">{issue.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{issue.location.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {issue.location.district}, {issue.location.region}
                    </div>
                  </TableCell>
                  <TableCell>
                    <IssueTypeBadge type={issue.issueType} />
                  </TableCell>
                  <TableCell>
                    <WaterSourceBadge source={issue.waterSource} />
                  </TableCell>
                  <TableCell>
                    <SeverityBadge severity={issue.severity} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={issue.status} />
                  </TableCell>
                  <TableCell>
                    <div>{formatDate(issue.reportedAt)}</div>
                    <div className="text-xs text-muted-foreground">{issue.reportedBy}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost" asChild>
                      <Link href={`/dashboard/issues/${issue.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}