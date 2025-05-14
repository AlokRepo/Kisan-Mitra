import { RecommendationClientForm } from "@/components/forms/RecommendationClientForm";
import { Lightbulb } from "lucide-react";

export default function RecommendationsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-3 mb-8">
        <Lightbulb className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">AI Powered Recommendations</h1>
      </div>
      <RecommendationClientForm />
    </div>
  );
}
