import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  User, 
  Clock, 
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/dashboard/issues/status-badge";
import { SeverityBadge } from "@/components/dashboard/issues/severity-badge";
import { IssueTypeBadge } from "@/components/dashboard/issues/issue-type-badge";
import { WaterSourceBadge } from "@/components/dashboard/issues/water-source-badge";
import { mockWaterQualityIssues } from "@/lib/data/mock-data";

export const metadata: Metadata = {
  title: "Issue Details | Tanzania Water Quality",
  description: "Detailed view of a water quality issue report",
};

export default function IssueDetailsPage({ params }: { params: { id: string } }) {
  const issue = mockWaterQualityIssues.find(issue => issue.id === params.id);
  
  if (!issue) {
    notFound();
  }

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/issues">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Issues
          </Link>
        </Button>
      </div>
      
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight">{issue.id}</h2>
          <StatusBadge status={issue.status} />
          <SeverityBadge severity={issue.severity} />
        </div>
        <p className="text-lg text-muted-foreground">{issue.description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Issue Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">Issue Type</div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    <IssueTypeBadge type={issue.issueType} />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">Water Source</div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    <WaterSourceBadge source={issue.waterSource} />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">Reported By</div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{issue.reportedBy}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">Reported At</div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(issue.reportedAt)}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">Location</div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {issue.location.name}, {issue.location.district}, {issue.location.region}
                    </span>
                  </div>
                </div>
                {issue.assignedTo && (
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">Assigned To</div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{issue.assignedTo}</span>
                    </div>
                  </div>
                )}
                {issue.updatedAt && (
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">Last Updated</div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(issue.updatedAt)}</span>
                    </div>
                  </div>
                )}
                {issue.resolvedAt && (
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">Resolved At</div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(issue.resolvedAt)}</span>
                    </div>
                  </div>
                )}
              </div>

              {issue.images && issue.images.length > 0 && (
                <div className="mt-6">
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" />
                      <span>Images</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {issue.images.map((image, index) => (
                      <div key={index} className="relative aspect-video rounded-md overflow-hidden">
                        <img
                          src={image}
                          alt={`Water quality issue ${issue.id} - image ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Comments & Activity</CardTitle>
              <CardDescription>
                Updates and communication regarding this issue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {issue.comments.length > 0 ? (
                  issue.comments.map((comment) => (
                    <div key={comment.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium">{comment.createdBy}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(comment.createdAt)}
                        </div>
                      </div>
                      <p className="text-sm">{comment.text}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-4 text-muted-foreground">
                    No comments yet.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full">Update Status</Button>
              <Button variant="outline" className="w-full">Assign Engineer</Button>
              <Button variant="outline" className="w-full">Add Comment</Button>
              <Separator className="my-2" />
              <Button variant="destructive" className="w-full">Mark as Spam</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              {issue.location.coordinates ? (
                <div className="aspect-square rounded-md border overflow-hidden">
                  <img
                    src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${issue.location.coordinates.lng},${issue.location.coordinates.lat},12,0/300x300?access_token=pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xsaWYwYmh4MGkxOTNsbHlod2N6eGdvbCJ9.t5FiKyy9vQYO5rZKb6O4Ug`}
                    alt={`Map location of ${issue.location.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="text-center p-4 text-muted-foreground">
                  No location coordinates available
                </div>
              )}
              <div className="mt-2 text-sm">
                <div className="font-medium">{issue.location.name}</div>
                <div className="text-muted-foreground">
                  {issue.location.district}, {issue.location.region}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                {mockWaterQualityIssues
                  .filter(i => 
                    i.id !== issue.id && 
                    (i.location.district === issue.location.district || 
                     i.issueType === issue.issueType)
                  )
                  .slice(0, 3)
                  .map(relatedIssue => (
                    <div key={relatedIssue.id} className="p-2 border rounded hover:bg-muted">
                      <Link href={`/dashboard/issues/${relatedIssue.id}`} className="block">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{relatedIssue.id}</div>
                          <StatusBadge status={relatedIssue.status} className="text-xs" />
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {relatedIssue.location.name}, {relatedIssue.location.district}
                        </div>
                      </Link>
                    </div>
                  ))}
                {mockWaterQualityIssues.filter(i => 
                  i.id !== issue.id && 
                  (i.location.district === issue.location.district || 
                   i.issueType === issue.issueType)
                ).length === 0 && (
                  <div className="text-center p-2 text-muted-foreground">
                    No related issues found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}