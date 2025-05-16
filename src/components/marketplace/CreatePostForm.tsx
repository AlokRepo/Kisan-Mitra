
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
import { useEffect, useState, useTransition, ChangeEvent, useRef } from "react";
import { getRealTimePrices } from "@/lib/mockApi";
import { Loader2, UploadCloud, XCircle } from "lucide-react";
import Image from "next/image";

const createFormSchema = (translate: (key: string) => string) => z.object({
  cropName: z.string().min(1, translate('cropNotSelectedError')),
  quantity: z.coerce.number().positive(translate('quantityNotEnteredError')),
  price: z.coerce.number().positive("Price must be a positive number."),
  description: z.string().min(10, "Description must be at least 10 characters.").max(500, "Description too long."),
  imageUrl: z.string().optional(),
});

interface CreatePostFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPost: (postData: Omit<MarketplacePost, 'id' | 'sellerName' | 'postDate' | 'location'>) => void;
}

export function CreatePostForm({ isOpen, onClose, onAddPost }: CreatePostFormProps) {
  const { translate } = useLanguage();
  const { toast } = useToast();
  const formSchema = createFormSchema(translate);
  const [suggestedPrice, setSuggestedPrice] = useState<number | null>(null);
  const [isFetchingPrice, startPriceFetchTransition] = useTransition();
  const [selectedImagePreview, setSelectedImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cropName: "",
      quantity: 10,
      price: undefined,
      description: "",
      imageUrl: undefined,
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
            if (!form.getValues("price")) {
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

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setSelectedImagePreview(dataUri);
        form.setValue("imageUrl", dataUri, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImagePreview(null);
      form.setValue("imageUrl", undefined, { shouldValidate: true });
    }
  };

  const removeSelectedImage = () => {
    setSelectedImagePreview(null);
    form.setValue("imageUrl", undefined, { shouldValidate: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddPost(values);
    toast({
      title: translate('postSubmittedToastTitle'),
      description: translate('postSubmittedToastDesc'),
    });
    form.reset();
    setSelectedImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClose();
  }

  // Reset preview and form field when dialog closes or form resets
  useEffect(() => {
    if (!isOpen) {
      setSelectedImagePreview(null);
      form.reset(); // This will reset imageUrl in form state as well
       if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);


  return (
    <Dialog open={isOpen} onOpenChange={
      (open) => {
        if (!open) {
          form.reset();
          setSelectedImagePreview(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }
        onClose();
      }
    }>
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
                    <Textarea placeholder={translate('descriptionMarketplacePlaceholder')} {...field} rows={3}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
                <FormLabel>{translate('uploadImageLabel')}</FormLabel>
                <FormControl>
                   <Input 
                    id="product-image-upload"
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    className="block w-full text-sm text-slate-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary/10 file:text-primary
                      hover:file:bg-primary/20"
                  />
                </FormControl>
                {selectedImagePreview && (
                  <div className="mt-2 relative group w-32 h-32 border rounded-md overflow-hidden">
                    <Image src={selectedImagePreview} alt="Preview" layout="fill" objectFit="cover" />
                    <Button 
                      type="button"
                      variant="destructive" 
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={removeSelectedImage}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <FormDescription className="text-xs">
                    {selectedImagePreview ? translate('changeImageHint') : translate('selectImageHint')}
                </FormDescription>
                <FormMessage />
            </FormItem>

            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline" onClick={() => {
                  form.reset();
                  setSelectedImagePreview(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                  onClose();
                }}>{translate('cancelButton')}</Button>
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
