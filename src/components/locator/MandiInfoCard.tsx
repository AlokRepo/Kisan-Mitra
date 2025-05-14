import type { MandiLocation } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { MapPin, ExternalLink } from 'lucide-react';

interface MandiInfoCardProps {
  mandi: MandiLocation;
}

export function MandiInfoCard({ mandi }: MandiInfoCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
      {mandi.imageUrl && (
        <div className="relative h-40 w-full">
          <Image 
            src={mandi.imageUrl} 
            alt={mandi.name} 
            layout="fill" 
            objectFit="cover"
            data-ai-hint={mandi.aiHint || "market agriculture"}
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl text-primary">{mandi.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          <MapPin className="inline-block h-4 w-4 mr-1" />
          {mandi.district}, {mandi.state}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {mandi.currentPrices && mandi.currentPrices.length > 0 && (
          <div>
            <h4 className="font-semibold mb-1 text-foreground">Current Prices:</h4>
            <ul className="list-disc list-inside text-sm text-foreground/80 space-y-0.5">
              {mandi.currentPrices.slice(0,3).map((price, index) => ( // Show max 3 prices
                <li key={`${price.crop}-${index}`}>{price.crop}: ₹{price.price}/{price.unit}</li>
              ))}
            </ul>
          </div>
        )}
        {!mandi.currentPrices || mandi.currentPrices.length === 0 && (
          <p className="text-sm text-muted-foreground">No current price data available.</p>
        )}
      </CardContent>
      <CardFooter>
        {/* In a real app, this could link to a detailed page or Google Maps */}
        <Button variant="outline" size="sm" className="w-full bg-background hover:bg-accent hover:text-accent-foreground">
          View Details
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
