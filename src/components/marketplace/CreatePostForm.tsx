
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CROPS } from "@/types";
import type { MarketplacePost } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState, useTransition } from "react";
import { getRealTimePrices } from "@/lib/mockApi";
import { Loader2 } from "lucide-react";

const createFormSchema = (translate: (key: string) => string) => z.object({
  cropName: z.string().min(1, translate('cropNotSelectedError')),
  quantity: z.coerce.number().positive(translate('quantityNotEnteredError')),
  price: z.coerce.number().positive("Price must be a positive number."),
  description: z.string().min(10, "Description must be at least 10 characters.").max(500, "Description too long."),
  // image (file upload) would be here in a real app
});

interface CreatePostFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPost: (postData: Omit<MarketplacePost, 'id' | 'sellerName' | 'postDate' | 'location' | 'imageUrl'>) => void;
}

export function CreatePostForm({ isOpen, onClose, onAddPost }: CreatePostFormProps) {
  const { translate } = useLanguage();
  const { toast } = useToast();
  const formSchema = createFormSchema(translate);
  const [suggestedPrice, setSuggestedPrice] = useState<number | null>(null);
  const [isFetchingPrice, startPriceFetchTransition] = useTransition();


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cropName: "",
      quantity: 10, // Default quantity
      price: undefined, // Default to empty
      description: "",
    },
  });

  const selectedCrop = form.watch("cropName");

  useEffect(() => {
    if (selectedCrop) {
      startPriceFetchTransition(async () => {
        try {
          const prices = await getRealTimePrices(selectedCrop);
          if (prices.length > 0) {
            const modalPrice = prices[0].modalPrice;
            setSuggestedPrice(modalPrice);
            if (!form.getValues("price")) { // Only set if user hasn't typed a price
                 form.setValue("price", modalPrice, { shouldValidate: true });
            }
          } else {
            setSuggestedPrice(null);
          }
        } catch (error) {
          console.error("Failed to fetch suggested price:", error);
          setSuggestedPrice(null);
          toast({
            variant: "destructive",
            title: translate('toastErrorTitle'),
            description: translate('errorFetchingPriceToast'),
          });
        }
      });
    } else {
      setSuggestedPrice(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCrop, form.setValue, toast, translate]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddPost(values);
    toast({
      title: translate('postSubmittedToastTitle'),
      description: translate('postSubmittedToastDesc'),
    });
    form.reset();
    setSuggestedPrice(null);
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px] bg-card">
        <DialogHeader>
          <DialogTitle>{translate('createPostDialogTitle')}</DialogTitle>
          <DialogDescription>{translate('createPostDialogDescription')}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="cropName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate('productNameLabel')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={translate('selectProductPlaceholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CROPS.map(crop => (
                        <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate('quantityMarketplaceLabel')}</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate('pricePerQuintalLabel')}</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder={translate('priceMarketplacePlaceholder')} {...field} />
                  </FormControl>
                  {isFetchingPrice && <FormDescription className="flex items-center text-xs"><Loader2 className="mr-1 h-3 w-3 animate-spin" />{translate('fetchingPrice')}</FormDescription>}
                  {!isFetchingPrice && suggestedPrice !== null && (
                    <FormDescription className="text-xs">
                      {translate('suggestedPriceLabel', { price: suggestedPrice })}
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate('descriptionLabel')}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={translate('descriptionMarketplacePlaceholder')} {...field} rows={4}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
                <FormLabel>{translate('uploadImageLabel')}</FormLabel>
                <Button type="button" variant="outline" className="w-full" disabled>
                    {translate('uploadImageButton')}
                </Button>
                <FormDescription className="text-xs">{translate('imageUploadNotImplemented')}</FormDescription>
            </FormItem>

            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">{translate('cancelButton')}</Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {translate('submitPostButton')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
