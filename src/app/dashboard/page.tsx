"use client";

import { CropPriceChart } from "@/components/dashboard/CropPriceChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getPriceTrends } from "@/lib/mockApi";
import type { CropPriceTrend } from "@/types";
import { CROPS } from "@/types";
import { BarChart3, RefreshCw } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [selectedCrop, setSelectedCrop] = useState<string>(CROPS[0]);
  const [priceTrendData, setPriceTrendData] = useState<CropPriceTrend | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchTrends = (crop: string) => {
    startTransition(async () => {
      const data = await getPriceTrends(crop);
      setPriceTrendData(data);
    });
  };

  useEffect(() => {
    if (selectedCrop) {
      fetchTrends(selectedCrop);
    }
  }, [selectedCrop]);
  
  const handleRefresh = () => {
    if (selectedCrop) {
      fetchTrends(selectedCrop);
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Price Fluctuation Dashboard</h1>
        </div>
        <div className="flex gap-2 items-center w-full sm:w-auto">
          <Select onValueChange={setSelectedCrop} defaultValue={selectedCrop}>
            <SelectTrigger className="w-full sm:w-[200px] bg-card text-card-foreground">
              <SelectValue placeholder="Select a crop" />
            </SelectTrigger>
            <SelectContent>
              {CROPS.map(crop => (
                <SelectItem key={crop} value={crop}>{crop}</SelectItem>
              ))}
            </SelectContent>
          </Select>
           <Button onClick={handleRefresh} disabled={isPending} variant="outline" size="icon" className="bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground">
            <RefreshCw className={`h-4 w-4 ${isPending ? 'animate-spin' : ''}`} />
             <span className="sr-only">Refresh</span>
          </Button>
        </div>
      </div>
      
      <CropPriceChart data={priceTrendData} isLoading={isPending} />

      {/* Placeholder for more charts or data visualizations */}
      {/* 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Another Chart</CardTitle></CardHeader>
          <CardContent className="h-[300px] bg-muted rounded-md flex items-center justify-center">
            <p className="text-muted-foreground">Future chart placeholder</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Key Insights</CardTitle></CardHeader>
          <CardContent className="h-[300px] bg-muted rounded-md p-4">
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Insight 1...</li>
              <li>Insight 2...</li>
            </ul>
          </CardContent>
        </Card>
      </div> 
      */}
    </div>
  );
}
