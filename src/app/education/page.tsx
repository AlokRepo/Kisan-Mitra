"use client";

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { GraduationCap, BookOpen, Users, ExternalLink, Lightbulb } from 'lucide-react';

interface InfoCardProps {
  title: string;
  description: string;
  imageUrl: string;
  aiHint: string;
  linkUrl?: string;
  buttonTextKey: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description, imageUrl, aiHint, linkUrl, buttonTextKey }) => {
  const { translate } = useLanguage();
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col bg-card">
      <div className="relative h-40 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          data-ai-hint={aiHint}
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-card-foreground">{description}</p>
      </CardContent>
      {linkUrl && (
        <CardFooter>
          <Button asChild variant="outline" size="sm" className="w-full bg-background hover:bg-accent hover:text-accent-foreground">
            <a href={linkUrl} target="_blank" rel="noopener noreferrer">
              {translate(buttonTextKey)}
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};


export default function EducationPage() {
  const { translate } = useLanguage();

  const guides = [
    {
      id: "guide1",
      titleKey: "sampleGuideTitle1",
      descriptionKey: "sampleGuideDesc1",
      imageUrl: "https://placehold.co/600x400.png",
      aiHint: "market chart",
      linkUrl: "#", // Placeholder link
      buttonTextKey: "viewGuideButton",
    },
    {
      id: "guide2",
      titleKey: "sampleGuideTitle2",
      descriptionKey: "sampleGuideDesc2",
      imageUrl: "https://placehold.co/600x400.png",
      aiHint: "app interface",
      linkUrl: "#", // Placeholder link
      buttonTextKey: "viewGuideButton",
    },
  ];

  const schemes = [
    {
      id: "scheme1",
      titleKey: "sampleSchemeTitle1",
      descriptionKey: "sampleSchemeDesc1",
      imageUrl: "https://placehold.co/600x400.png",
      aiHint: "government building",
      linkUrl: "#", // Placeholder link
      buttonTextKey: "learnMoreButton",
    },
    {
      id: "scheme2",
      titleKey: "sampleSchemeTitle2",
      descriptionKey: "sampleSchemeDesc2",
      imageUrl: "https://placehold.co/600x400.png",
      aiHint: "digital india",
      linkUrl: "#", // Placeholder link
      buttonTextKey: "learnMoreButton",
    },
  ];

  const faqs = [
    { id: "faq1", qKey: "faqQ1", aKey: "faqA1" },
    { id: "faq2", qKey: "faqQ2", aKey: "faqA2" },
    { id: "faq3", qKey: "faqQ3", aKey: "faqA3" },
  ];

  return (
    <div className="container mx-auto py-8 space-y-12">
      <div className="flex items-center gap-3 mb-8">
        <GraduationCap className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">{translate('educationTitle')}</h1>
      </div>

      {/* Guides & Tutorials Section */}
      <Card className="bg-card text-card-foreground shadow-xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <BookOpen className="h-7 w-7 text-primary" />
            <CardTitle className="text-2xl text-primary">{translate('guidesTitle')}</CardTitle>
          </div>
          <CardDescription>{translate('guidesDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map(guide => (
              <InfoCard
                key={guide.id}
                title={translate(guide.titleKey)}
                description={translate(guide.descriptionKey)}
                imageUrl={guide.imageUrl}
                aiHint={guide.aiHint}
                linkUrl={guide.linkUrl}
                buttonTextKey={guide.buttonTextKey}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Government Schemes Section */}
      <Card className="bg-card text-card-foreground shadow-xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Lightbulb className="h-7 w-7 text-primary" /> {/* Using Lightbulb for schemes */}
            <CardTitle className="text-2xl text-primary">{translate('schemesTitle')}</CardTitle>
          </div>
          <CardDescription>{translate('schemesDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schemes.map(scheme => (
              <InfoCard
                key={scheme.id}
                title={translate(scheme.titleKey)}
                description={translate(scheme.descriptionKey)}
                imageUrl={scheme.imageUrl}
                aiHint={scheme.aiHint}
                linkUrl={scheme.linkUrl}
                buttonTextKey={scheme.buttonTextKey}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="bg-card text-card-foreground shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">{translate('faqTitle')}</CardTitle>
          <CardDescription>{translate('faqDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map(faq => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left hover:text-accent">{translate(faq.qKey)}</AccordionTrigger>
                <AccordionContent className="text-card-foreground/90">
                  {translate(faq.aKey)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Community Forum Section */}
      <Card className="bg-card text-card-foreground shadow-xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Users className="h-7 w-7 text-primary" />
            <CardTitle className="text-2xl text-primary">{translate('forumTitle')}</CardTitle>
          </div>
          <CardDescription>{translate('forumDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-card-foreground/90 mb-4">
            {translate('forumPlaceholderText')}
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild variant="default" size="lg">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer"> {/* Placeholder link to X */}
              {translate('visitForumButton')}
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
