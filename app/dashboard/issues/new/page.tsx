"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/components/auth/auth-provider';
import { supabase } from '@/lib/supabase/client';
import { ArrowLeft, Save, Loader2, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function NewIssuePage() {
  const router = useRouter();
  const { profile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    locationName: '',
    locationDistrict: '',
    locationRegion: '',
    locationLat: '',
    locationLng: '',
    reportedBy: profile?.name || '',
    description: '',
    waterSource: '',
    issueType: '',
    severity: '',
    images: [] as string[],
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setIsSubmitting(true);
    setError('');

    try {
      const issueData = {
        id: `WQI-${Date.now()}`,
        location_name: formData.locationName,
        location_district: formData.locationDistrict,
        location_region: formData.locationRegion,
        location_lat: formData.locationLat ? parseFloat(formData.locationLat) : null,
        location_lng: formData.locationLng ? parseFloat(formData.locationLng) : null,
        reported_by: formData.reportedBy,
        reported_at: new Date().toISOString(),
        description: formData.description,
        water_source: formData.waterSource,
        issue_type: formData.issueType,
        severity: formData.severity,
        status: 'pending',
        assigned_to: null,
        updated_at: new Date().toISOString(),
        resolved_at: null,
        images: formData.images,
      };

      const { error } = await supabase
        .from('water_quality_issues')
        .insert(issueData);

      if (error) {
        setError('Failed to create issue: ' + error.message);
        return;
      }

      router.push('/dashboard/issues');
    } catch (error) {
      console.error('Error creating issue:', error);
      setError('Failed to create issue');
    } finally {
      setIsSubmitting(false);
    }
  };

  const regions = [
    'Dar es Salaam', 'Arusha', 'Mwanza', 'Dodoma', 'Mbeya', 'Morogoro',
    'Tanga', 'Kagera', 'Shinyanga', 'Tabora', 'Rukwa', 'Ruvuma',
    'Iringa', 'Mara', 'Lindi', 'Mtwara', 'Pwani', 'Kigoma',
    'Singida', 'Katavi', 'Njombe', 'Simiyu', 'Geita', 'Songwe'
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/issues">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Report New Issue</h2>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Water Quality Issue Report</CardTitle>
          <CardDescription>
            Report a new water quality issue in your area
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Location Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location Information
              </h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="locationName">Location Name *</Label>
                  <Input
                    id="locationName"
                    value={formData.locationName}
                    onChange={(e) => handleInputChange('locationName', e.target.value)}
                    placeholder="e.g., Msasani Peninsula"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="locationDistrict">District *</Label>
                  <Input
                    id="locationDistrict"
                    value={formData.locationDistrict}
                    onChange={(e) => handleInputChange('locationDistrict', e.target.value)}
                    placeholder="e.g., Kinondoni"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="locationRegion">Region *</Label>
                  <Select value={formData.locationRegion} onValueChange={(value) => handleInputChange('locationRegion', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map(region => (
                        <SelectItem key={region} value={region}>{region}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reportedBy">Reported By *</Label>
                  <Input
                    id="reportedBy"
                    value={formData.reportedBy}
                    onChange={(e) => handleInputChange('reportedBy', e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="locationLat">Latitude (optional)</Label>
                  <Input
                    id="locationLat"
                    type="number"
                    step="any"
                    value={formData.locationLat}
                    onChange={(e) => handleInputChange('locationLat', e.target.value)}
                    placeholder="e.g., -6.7611"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="locationLng">Longitude (optional)</Label>
                  <Input
                    id="locationLng"
                    type="number"
                    step="any"
                    value={formData.locationLng}
                    onChange={(e) => handleInputChange('locationLng', e.target.value)}
                    placeholder="e.g., 39.2486"
                  />
                </div>
              </div>
            </div>

            {/* Issue Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Issue Details</h3>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the water quality issue in detail..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="waterSource">Water Source *</Label>
                  <Select value={formData.waterSource} onValueChange={(value) => handleInputChange('waterSource', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tap">Tap Water</SelectItem>
                      <SelectItem value="well">Well</SelectItem>
                      <SelectItem value="river">River</SelectItem>
                      <SelectItem value="lake">Lake</SelectItem>
                      <SelectItem value="borehole">Borehole</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="issueType">Issue Type *</Label>
                  <Select value={formData.issueType} onValueChange={(value) => handleInputChange('issueType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contamination">Contamination</SelectItem>
                      <SelectItem value="shortage">Water Shortage</SelectItem>
                      <SelectItem value="infrastructure">Infrastructure</SelectItem>
                      <SelectItem value="taste">Taste Issues</SelectItem>
                      <SelectItem value="color">Color Issues</SelectItem>
                      <SelectItem value="odor">Odor Issues</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="severity">Severity *</Label>
                  <Select value={formData.severity} onValueChange={(value) => handleInputChange('severity', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <Select value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Submit Report
                  </>
                )}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/issues">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}