
"use client";

import type { MandiLocation } from '@/types';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import { useState, useMemo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface GoogleMapComponentProps {
  mandis: MandiLocation[];
  defaultCenter: { lat: number; lng: number };
  apiKey: string | undefined;
}

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '0.5rem', // Match card radius from theme
};

export function GoogleMapComponent({ mandis, defaultCenter, apiKey }: GoogleMapComponentProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedMandi, setSelectedMandi] = useState<MandiLocation | null>(null);

  const validMandis = useMemo(() =>
    mandis.filter(mandi => typeof mandi.latitude === 'number' && typeof mandi.longitude === 'number'),
  [mandis]);

  if (!apiKey) {
    return (
      <Card className="h-[400px] w-full flex flex-col items-center justify-center bg-destructive/10 border-destructive/30">
        <CardHeader>
          <CardTitle className="text-destructive">Google Maps API Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive-foreground p-4 bg-destructive rounded-md text-center">
            Google Maps API key is missing. <br />
            Please set <code className="bg-destructive/80 px-1 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> in your <code className="bg-destructive/80 px-1 rounded">.env</code> file.
          </p>
          <CardDescription className="text-center mt-2 text-destructive/80">
            You may need to restart your development server after adding the key.
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <LoadScript
      googleMapsApiKey={apiKey}
      loadingElement={<Skeleton className="h-[400px] w-full rounded-md" />}
      onError={(error) => {
        console.error("Error loading Google Maps script:", error);
      }}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={validMandis.length > 0 ? 7 : 5} // Zoom out if no specific mandis, zoom in slightly if there are
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {validMandis.map((mandi) => (
          <MarkerF
            key={mandi.id}
            position={{ lat: mandi.latitude!, lng: mandi.longitude! }}
            title={mandi.name}
            onClick={() => {
              setSelectedMandi(mandi);
              // Future: Show InfoWindow or navigate to mandi details
              // console.log("Clicked mandi:", mandi.name);
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
