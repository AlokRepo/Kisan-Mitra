
"use client";

import { useEffect, useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/contexts/LanguageContext';
import type { GovernmentScheme, SocialCategory, GenderTarget } from '@/types';
import { CROPS, STATES, SOCIAL_CATEGORIES, GENDER_TARGETS } from '@/types';
import { getGovernmentSchemes } from '@/lib/schemeData';
import { SchemeDetailCard } from '@/components/schemes/SchemeDetailCard';
import { ScrollText, FilterX, SearchX } from 'lucide-react';

export default function SchemesPage() {
  const { translate } = useLanguage();
  const [allSchemes, setAllSchemes] = useState<GovernmentScheme[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [keywords, setKeywords] = useState<string>('');
  const [selectedSocialCategory, setSelectedSocialCategory] = useState<SocialCategory | '' >('');
  const [selectedGender, setSelectedGender] = useState<GenderTarget | ''>('');


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const schemes = await getGovernmentSchemes();
      setAllSchemes(schemes);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const filteredSchemes = useMemo(() => {
    return allSchemes.filter(scheme => {
      const stateMatch = selectedState === '' || selectedState === 'All' || scheme.targetStates?.includes(selectedState) || scheme.targetStates?.includes("All");
      const cropMatch = selectedCrop === '' || selectedCrop === 'All' || scheme.relevantCrops?.includes(selectedCrop) || scheme.relevantCrops?.includes("All");
      
      const keywordTerms = keywords.toLowerCase().split(' ').filter(term => term.length > 0);
      const keywordMatch = keywords.trim() === '' || keywordTerms.every(term => 
        scheme.tags.some(tag => tag.toLowerCase().includes(term)) ||
        translate(scheme.titleKey).toLowerCase().includes(term) ||
        translate(scheme.shortDescriptionKey).toLowerCase().includes(term)
      );

      const socialCategoryMatch = selectedSocialCategory === '' || selectedSocialCategory === 'Any' || !scheme.socialCategories || scheme.socialCategories.includes('Any') || scheme.socialCategories.includes(selectedSocialCategory);
      const genderMatch = selectedGender === '' || selectedGender === 'Any' || !scheme.genderTargets || scheme.genderTargets.includes('Any') || scheme.genderTargets.includes(selectedGender);

      return stateMatch && cropMatch && keywordMatch && socialCategoryMatch && genderMatch;
    });
  }, [allSchemes, selectedState, selectedCrop, keywords, selectedSocialCategory, selectedGender, translate]);

  const resetFilters = () => {
    setSelectedState('');
    setSelectedCrop('');
    setKeywords('');
    setSelectedSocialCategory('');
    setSelectedGender('');
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <ScrollText className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">{translate('schemesPageTitle')}</h1>
      </div>
      <Card className="bg-card text-card-foreground shadow-lg">
        <CardHeader>
          <CardTitle>{translate('schemesPageDescription')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
            <div>
              <Label htmlFor="state-filter">{translate('filterByStateLabel')}</Label>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger id="state-filter" className="bg-input">
                  <SelectValue placeholder={translate('selectStatePlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">{translate('allStates')}</SelectItem>
                  {STATES.map(state => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="crop-filter">{translate('filterByCropLabel')}</Label>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger id="crop-filter" className="bg-input">
                  <SelectValue placeholder={translate('selectCropPlaceholderForm')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">{translate('allCrops')}</SelectItem>
                  {CROPS.map(crop => (
                    <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="social-category-filter">{translate('filterBySocialCategoryLabel')}</Label>
              <Select value={selectedSocialCategory} onValueChange={(value) => setSelectedSocialCategory(value as SocialCategory | '')}>
                <SelectTrigger id="social-category-filter" className="bg-input">
                  <SelectValue placeholder={translate('selectSocialCategoryPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  {SOCIAL_CATEGORIES.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === "Any" ? translate('anyOption') : 
                       category === "General" ? translate('generalOption') :
                       category === "SC" ? translate('scOption') :
                       category === "ST" ? translate('stOption') :
                       category === "OBC" ? translate('obcOption') :
                       category === "EWS" ? translate('ewsOption') :
                       category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
             <div>
              <Label htmlFor="gender-filter">{translate('filterByGenderLabel')}</Label>
              <Select value={selectedGender} onValueChange={(value) => setSelectedGender(value as GenderTarget | '')}>
                <SelectTrigger id="gender-filter" className="bg-input">
                  <SelectValue placeholder={translate('selectGenderPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  {GENDER_TARGETS.map(gender => (
                    <SelectItem key={gender} value={gender}>
                      {gender === "Any" ? translate('anyOption') :
                       gender === "Male" ? translate('maleOption') :
                       gender === "Female" ? translate('femaleOption') :
                       gender === "Transgender" ? translate('transgenderOption') :
                       gender}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="lg:col-span-2"> {/* Making keyword span 2 columns on larger screens */}
              <Label htmlFor="keyword-filter">{translate('filterByKeywordsLabel')}</Label>
              <Input
                id="keyword-filter"
                type="text"
                placeholder={translate('keywordsPlaceholder')}
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="bg-input"
              />
            </div>
          </div>
           <Button onClick={resetFilters} variant="outline" className="mt-4">
            <FilterX className="mr-2 h-4 w-4" /> {translate('resetFiltersButton')}
          </Button>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => ( // Increased skeleton count
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map(scheme => (
            <SchemeDetailCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      ) : (
        <Card className="text-center p-8 bg-card shadow-md">
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
