"use client";

import { MandiInfoCard } from "@/components/locator/MandiInfoCard";
import { getMandiLocations } from "@/lib/mockApi";
import type { MandiLocation } from "@/types";
import { MapPin, RefreshCw } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LocatorPage() {
  const [mandiList, setMandiList] = useState<MandiLocation[]>([]);
  const [isPending, startTransition] = useTransition();

  const fetchMandis = () => {
    startTransition(async () => {
      const data = await getMandiLocations();
      setMandiList(data);
    });
  };

  useEffect(() => {
    fetchMandis();
  }, []);

  const handleRefresh = () => {
    fetchMandis();
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-3">
          <MapPin className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Mandi Locator</h1>
        </div>
         <Button onClick={handleRefresh} disabled={isPending} variant="outline" className="bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground">
            <RefreshCw className={`mr-2 h-4 w-4 ${isPending ? 'animate-spin' : ''}`} />
            Refresh Mandis
          </Button>
      </div>

      {/* Placeholder for map integration */}
      <Card className="mb-8 bg-muted/50 border-dashed">
        <CardHeader>
          <CardTitle className="text-lg">Interactive Map View</CardTitle>
          <CardDescription>
            Future enhancement: An interactive map will display mandi locations visually. 
            For now, please see the list below.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-48 flex items-center justify-center rounded-md bg-muted">
          <p className="text-muted-foreground">[Map Placeholder - requires Google Maps API setup]</p>
        </CardContent>
      </Card>


      {isPending && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-40 w-full" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
              <CardContent> {/* Using CardContent for CardFooter like spacing */}
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isPending && mandiList.length === 0 && (
         <Card className="text-center p-8">
          <CardTitle>No Mandis Found</CardTitle>
          <CardDescription>Could not fetch mandi locations. Please try refreshing.</CardDescription>
        </Card>
      )}

      {!isPending && mandiList.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mandiList.map(mandi => (
            <MandiInfoCard key={mandi.id} mandi={mandi} />
          ))}
        </div>
      )}
    </div>
  );
}
