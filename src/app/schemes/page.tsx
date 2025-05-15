
"use client";

import { useEffect, useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/contexts/LanguageContext';
import type { GovernmentScheme, UserDemographics } from '@/types';
import { getGovernmentSchemes } from '@/lib/schemeData';
import { SchemeDetailCard } from '@/components/schemes/SchemeDetailCard';
import { SchemeFinderWizard } from '@/components/schemes/SchemeFinderWizard';
import { ScrollText, FilterX, SearchX } from 'lucide-react';
import { Accordion } from "@/components/ui/accordion";

export default function SchemesPage() {
  const { translate } = useLanguage();
  const [allSchemes, setAllSchemes] = useState<GovernmentScheme[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState<Partial<UserDemographics>>({});

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const schemes = await getGovernmentSchemes();
      setAllSchemes(schemes);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleWizardSubmit = (data: UserDemographics) => {
    setFilters(data);
  };

  const resetAllFilters = () => {
    setFilters({});
    // If SchemeFinderWizard had an internal reset, we'd call it here too.
    // For now, resetting filters state is the main action.
  };

  const filteredSchemes = useMemo(() => {
    return allSchemes.filter(scheme => {
      const genderMatch = !filters.gender || filters.gender === 'Any' || !scheme.genderTargets || scheme.genderTargets.includes('Any') || scheme.genderTargets.includes(filters.gender);
      const ageMatch = !filters.age || (
        (!scheme.minAge || filters.age >= scheme.minAge) &&
        (!scheme.maxAge || filters.age <= scheme.maxAge)
      );
      // Add other filter criteria here as the wizard expands (state, crop, keywords, socialCategory)
      // For now, only gender and age from the wizard are considered.
      // We need to integrate the old filters if they are still intended to be used alongside the wizard,
      // or if the wizard is meant to replace them entirely.
      // Assuming wizard filters are primary for now:
      return genderMatch && ageMatch;
    });
  }, [allSchemes, filters]);


  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <ScrollText className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">{translate('schemesPageTitle')}</h1>
      </div>
      
      <SchemeFinderWizard 
        onSubmit={handleWizardSubmit} 
        onReset={resetAllFilters} 
        currentFilters={filters}
      />

      {filters.gender && filters.age !== undefined && (
         <Button onClick={resetAllFilters} variant="outline" className="mt-4">
           <FilterX className="mr-2 h-4 w-4" /> {translate('resetFiltersButton')}
         </Button>
      )}


      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={`skeleton-${i}`} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3 mt-1" />
              </CardHeader>
              <CardContent><Skeleton className="h-10 w-full" /></CardContent>
              <CardFooter><Skeleton className="h-10 w-full" /></CardFooter>
            </Card>
          ))}
        </div>
      ) : filteredSchemes.length > 0 ? (
        <Accordion type="single" collapsible className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {filteredSchemes.map(scheme => (
            <SchemeDetailCard key={scheme.id} scheme={scheme} />
          ))}
        </Accordion>
      ) : (
        <Card className="text-center p-8 bg-card shadow-md md:col-span-2 lg:col-span-3">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <SearchX className="h-16 w-16 text-muted-foreground" />
            </div>
            <CardTitle>{translate('noSchemesFoundTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{translate('noSchemesFoundDesc')}</CardDescription>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
