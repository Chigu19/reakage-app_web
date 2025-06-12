"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { StatusBadge } from '@/components/dashboard/issues/status-badge';
import { SeverityBadge } from '@/components/dashboard/issues/severity-badge';
import { useAuth } from '@/components/auth/auth-provider';
import { supabase } from '@/lib/supabase/client';
import { ArrowLeft, MapPin, Calendar, User, MessageSquare, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface WaterQualityIssue {
  id: string;
  location_name: string;
  location_district: string;
  location_region: string;
  location_lat: number | null;
  location_lng: number | null;
  reported_by: string;
  reported_at: string;
  description: string;
  water_source: string;
  issue_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'investigating' | 'in_progress' | 'resolved' | 'rejected';
  assigned_to: string | null;
  updated_at: string;
  resolved_at: string | null;
  images: string[];
}

interface Comment {
  id: string;
  issue_id: string;
  text: string;
  created_at: string;
  created_by: string;
}

export default function IssueDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { profile } = useAuth();
  const [issue, setIssue] = useState<WaterQualityIssue | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Form states for editing
  const [status, setStatus] = useState<string>('');
  const [severity, setSeverity] = useState<string>('');
  const [assignedTo, setAssignedTo] = useState<string>('');

  useEffect(() => {
    if (params.id) {
      fetchIssue(params.id as string);
      fetchComments(params.id as string);
    }
  }, [params.id]);

  useEffect(() => {
    if (issue) {
      setStatus(issue.status);
      setSeverity(issue.severity);
      setAssignedTo(issue.assigned_to || '');
    }
  }, [issue]);

  const fetchIssue = async (issueId: string) => {
    try {
      const { data, error } = await supabase
        .from('water_quality_issues')
        .select('*')
        .eq('id', issueId)
        .single();

      if (error) {
        console.error('Error fetching issue:', error);
        setError('Issue not found');
        return;
      }

      setIssue(data);
    } catch (error) {
      console.error('Error in fetchIssue:', error);
      setError('Failed to load issue');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchComments = async (issueId: string) => {
    try {
      const { data, error } = await supabase
        .from('water_quality_comments')
        .select('*')
        .eq('issue_id', issueId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching comments:', error);
        return;
      }

      setComments(data || []);
    } catch (error) {
      console.error('Error in fetchComments:', error);
    }
  };

  const handleUpdateIssue = async () => {
    if (!issue || !profile) return;

    setIsUpdating(true);
    setMessage('');
    setError('');

    try {
      const updates: any = {
        status,
        severity,
        assigned_to: assignedTo || null,
        updated_at: new Date().toISOString(),
      };

      if (status === 'resolved' && issue.status !== 'resolved') {
        updates.resolved_at = new Date().toISOString();
      } else if (status !== 'resolved') {
        updates.resolved_at = null;
      }

      const { error } = await supabase
        .from('water_quality_issues')
        .update(updates)
        .eq('id', issue.id);

      if (error) {
        setError('Failed to update issue');
        return;
      }

      setIssue({ ...issue, ...updates });
      setMessage('Issue updated successfully');
    } catch (error) {
      console.error('Error updating issue:', error);
      setError('Failed to update issue');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !issue || !profile) return;

    try {
      const comment = {
        id: `c-${Date.now()}`,
        issue_id: issue.id,
        text: newComment,
        created_at: new Date().toISOString(),
        created_by: profile.name,
      };

      const { error } = await supabase
        .from('water_quality_comments')
        .insert(comment);

      if (error) {
        setError('Failed to add comment');
        return;
      }

      setComments([...comments, comment]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
      setError('Failed to add comment');
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !issue) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <Alert variant="destructive">
          <AlertDescription>{error || 'Issue not found'}</AlertDescription>
        </Alert>
        <Button asChild variant="outline">
          <Link href="/dashboard/issues">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Issues
          </Link>
        </Button>
      </div>
    );
  }

  const canEdit = profile?.role === 'admin' || profile?.role === 'engineer';

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/issues">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Issue Details</h2>
      </div>

      {message && (
        <Alert>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Issue Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Issue Information
              <Badge variant="outline">{issue.id}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Location</Label>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{issue.location_name}, {issue.location_district}, {issue.location_region}</span>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">Description</Label>
              <p className="mt-1 text-sm">{issue.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Water Source</Label>
                <Badge variant="outline" className="mt-1">
                  {issue.water_source.charAt(0).toUpperCase() + issue.water_source.slice(1)}
                </Badge>
              </div>
              <div>
                <Label className="text-sm font-medium">Issue Type</Label>
                <Badge variant="outline" className="mt-1">
                  {issue.issue_type.charAt(0).toUpperCase() + issue.issue_type.slice(1)}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Reported By</Label>
                <div className="flex items-center gap-2 mt-1">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{issue.reported_by}</span>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Reported Date</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{new Date(issue.reported_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {issue.images && issue.images.length > 0 && (
              <div>
                <Label className="text-sm font-medium">Images</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {issue.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Issue image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Status and Management */}
        <Card>
          <CardHeader>
            <CardTitle>Status & Management</CardTitle>
            {canEdit && (
              <CardDescription>
                Update issue status and assignment
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Current Status</Label>
                <div className="mt-1">
                  <StatusBadge status={issue.status} />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Severity</Label>
                <div className="mt-1">
                  <SeverityBadge severity={issue.severity} />
                </div>
              </div>
            </div>

            {issue.assigned_to && (
              <div>
                <Label className="text-sm font-medium">Assigned To</Label>
                <p className="mt-1 text-sm">{issue.assigned_to}</p>
              </div>
            )}

            {issue.resolved_at && (
              <div>
                <Label className="text-sm font-medium">Resolved Date</Label>
                <p className="mt-1 text-sm">{new Date(issue.resolved_at).toLocaleDateString()}</p>
              </div>
            )}

            {canEdit && (
              <>
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Update Issue</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="investigating">Investigating</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="severity">Severity</Label>
                      <Select value={severity} onValueChange={setSeverity}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="assignedTo">Assigned To</Label>
                      <Input
                        id="assignedTo"
                        value={assignedTo}
                        onChange={(e) => setAssignedTo(e.target.value)}
                        placeholder="Enter engineer name"
                      />
                    </div>

                    <Button onClick={handleUpdateIssue} disabled={isUpdating} className="w-full">
                      {isUpdating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Update Issue
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Comments Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Comments & Updates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No comments yet</p>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{comment.created_by}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(comment.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm">{comment.text}</p>
                </div>
              ))}
            </div>
          )}

          {profile && (
            <div className="border-t pt-4">
              <Label htmlFor="newComment">Add Comment</Label>
              <div className="flex gap-2 mt-2">
                <Textarea
                  id="newComment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment or update..."
                  className="flex-1"
                />
                <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                  Post
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}