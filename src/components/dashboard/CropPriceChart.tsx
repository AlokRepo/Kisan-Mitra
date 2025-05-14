"use client"

import type { CropPriceTrend, StatePriceHistory } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { useTheme } from "next-themes"; // Assuming next-themes is or can be used for theme detection
import { useEffect, useState } from "react";


interface CropPriceChartProps {
  data: CropPriceTrend | null;
  isLoading: boolean;
}

// Helper to get chart colors from CSS variables
const getChartColor = (index: number, theme: string | undefined) => {
  if (typeof window === "undefined") return `hsl(var(--chart-${index + 1}))`; // Fallback for SSR
  
  const style = getComputedStyle(document.documentElement);
  // For dark theme, ShadCN chart component might automatically use dark theme variables if defined.
  // However, explicitly checking theme can be more robust.
  // For simplicity here, we assume CSS variables handle light/dark theming correctly.
  return style.getPropertyValue(`--chart-${index + 1}`).trim();
};


export function CropPriceChart({ data, isLoading }: CropPriceChartProps) {
  const { theme } = useTheme(); // Get current theme
  const [chartColors, setChartColors] = useState<string[]>([]);

  useEffect(() => {
    // Update chart colors when theme changes or data is available
    if (data?.trends.length) {
      const colors = data.trends.map((_, i) => getChartColor(i % 5, theme)); // Cycle through 5 chart colors
      setChartColors(colors);
    }
  }, [theme, data]);


  if (isLoading) {
    return (
      <Card className="shadow-lg bg-card">
        <CardHeader>
          <CardTitle>Loading Price Trends...</CardTitle>
          <CardDescription>Fetching historical price data.</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <div className="h-full w-full bg-muted animate-pulse rounded-md" />
        </CardContent>
      </Card>
    );
  }

  if (!data || !data.trends || data.trends.length === 0) {
    return (
      <Card className="shadow-lg bg-card">
        <CardHeader>
          <CardTitle>No Price Data Available</CardTitle>
          <CardDescription>Could not load price trends for {data?.cropName || "the selected crop"}.</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <p className="text-muted-foreground">Please try selecting another crop or check back later.</p>
        </CardContent>
      </Card>
    );
  }
  
  const chartConfig = data.trends.reduce((config, trend, index) => {
    config[trend.state] = {
      label: trend.state,
      color: chartColors[index] || getChartColor(index % 5, theme), // Fallback color
    };
    return config;
  }, {} as any);


  // Flatten data for Recharts: [{date: 'Jan', Punjab: 2000, Haryana: 2100}, ...]
  const chartData = data.trends[0].data.map((_, i) => {
    const entry: { [key: string]: string | number } = { date: data.trends[0].data[i].date };
    data.trends.forEach(trend => {
      entry[trend.state] = trend.data[i]?.price || 0;
    });
    return entry;
  });


  return (
    <Card className="shadow-lg bg-card">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Price Trends: {data.cropName}</CardTitle>
        <CardDescription>Fluctuations across different states over the last 12 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)} // Show first 3 letters of month for brevity
                stroke="hsl(var(--foreground))"
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={80}
                tickFormatter={(value) => `₹${value / 1000}k`} 
                stroke="hsl(var(--foreground))"
              />
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent indicator="line" labelClassName="text-foreground" className="bg-card text-card-foreground border-border" />}
              />
              <ChartLegend content={<ChartLegendContent wrapperStyle={{ color: 'hsl(var(--foreground))' }} />} />
              {data.trends.map((trend, index) => (
                <Line
                  key={trend.state}
                  dataKey={trend.state}
                  type="monotone"
                  stroke={chartColors[index] || `var(--chart-${(index % 5) + 1})`}
                  strokeWidth={2}
                  dot={{
                    r: 4,
                    fill: chartColors[index] || `var(--chart-${(index % 5) + 1})`,
                    stroke: "hsl(var(--background))",
                    strokeWidth: 2,
                  }}
                  activeDot={{
                    r: 6,
                    fill: chartColors[index] || `var(--chart-${(index % 5) + 1})`,
                    stroke: "hsl(var(--background))",
                    strokeWidth: 2,
                  }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
