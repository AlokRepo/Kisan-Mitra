
"use client";

import type { GovernmentScheme } from '@/types';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink, Info } from 'lucide-react';

interface SchemeDetailCardProps {
  scheme: GovernmentScheme;
}

export function SchemeDetailCard({ scheme }: SchemeDetailCardProps) {
  const { translate } = useLanguage();

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col bg-card h-full">
      <div className="relative h-48 w-full">
        <Image
          src={scheme.imageUrl}
          alt={translate(scheme.titleKey)}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          data-ai-hint={scheme.aiHint}
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl text-primary">{translate(scheme.titleKey)}</CardTitle>
        <CardDescription className="text-sm text-card-foreground/90">{translate(scheme.shortDescriptionKey)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="details">
            <AccordionTrigger className="text-base text-primary hover:text-accent">
              <Info className="mr-2 h-5 w-5" /> {translate('viewDetailsButton')}
            </AccordionTrigger>
            <AccordionContent className="space-y-3 text-sm text-card-foreground/80">
              <div>
                <h4 className="font-semibold text-card-foreground mb-1">{translate('detailedDescriptionKey')}</h4>
                <p>{translate(scheme.detailedDescriptionKey)}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-card-foreground mb-1">{translate('schemeCardEligibilityTitle')}</h4>
                <ul className="list-disc list-inside space-y-0.5">
                  {scheme.eligibilityCriteriaKeys.map((key, index) => (
                    <li key={`eligibility-${scheme.id}-${index}`}>{translate(key)}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-card-foreground mb-1">{translate('schemeCardBenefitsTitle')}</h4>
                <ul className="list-disc list-inside space-y-0.5">
                  {scheme.benefitsKeys.map((key, index) => (
                    <li key={`benefit-${scheme.id}-${index}`}>{translate(key)}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-card-foreground mb-1">{translate('schemeCardHowToApplyTitle')}</h4>
                <p>{translate(scheme.howToApplyKey)}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" size="sm" className="w-full bg-background hover:bg-accent hover:text-accent-foreground">
          <a href={scheme.linkUrl} target="_blank" rel="noopener noreferrer">
            {translate('visitSchemeWebsiteButton')}
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
