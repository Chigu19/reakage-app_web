"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '@/lib/supabase/client';

interface RegionData {
  region: string;
  count: number;
}

export function RegionDistribution() {
  const [data, setData] = useState<RegionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRegionDistribution();
  }, []);

  const fetchRegionDistribution = async () => {
    try {
      const { data: issues, error } = await supabase
        .from('water_quality_issues')
        .select('location_region');

      if (error) {
        console.error('Error fetching region distribution:', error);
        return;
      }

      // Count issues by region
      const regionCounts = issues.reduce((acc, issue) => {
        const region = issue.location_region;
        acc[region] = (acc[region] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const chartData = Object.entries(regionCounts).map(([region, count]) => ({
        region,
        count,
      }));

      setData(chartData);
    } catch (error) {
      console.error('Error in fetchRegionDistribution:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Regional Distribution</CardTitle>
          <CardDescription>Water quality issues by region</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-pulse">Loading chart...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Regional Distribution</CardTitle>
        <CardDescription>Water quality issues by region</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="region" type="category" width={100} />
            <Tooltip />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default RegionDistribution;