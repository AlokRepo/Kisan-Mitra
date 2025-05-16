
"use client";

import Image from 'next/image';
import type { MarketplacePost } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { getCropImageDetails, APP_IMAGES } from '@/lib/image-config';
import { CalendarDays, MapPinIcon, Tag, Package, User, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PostDetailDialogProps {
  post: MarketplacePost | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PostDetailDialog({ post, isOpen, onClose }: PostDetailDialogProps) {
  const { translate } = useLanguage();
  const { toast } = useToast();

  if (!post) return null;

  const imageDetails = post.imageUrl ? {src: post.imageUrl, aiHint: 'marketplace item'} : getCropImageDetails(post.cropName, 0);
  const displayImage = imageDetails.src || APP_IMAGES.MARKETPLACE_ITEM_DEFAULT.src;
  const displayAiHint = imageDetails.aiHint || APP_IMAGES.MARKETPLACE_ITEM_DEFAULT.aiHint;

  const handleContactSeller = () => {
    toast({
        title: "Feature Coming Soon",
        description: translate('contactSellerToast'),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary">{translate('productDetailsTitle')}: {post.cropName}</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="relative h-60 w-full rounded-md overflow-hidden bg-muted">
            <Image
              src={displayImage}
              alt={post.cropName}
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint={displayAiHint}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div>
              <p className="font-semibold text-foreground">{translate('pricePerQuintalLabel')}</p>
              <p className="text-accent-foreground text-lg font-bold">₹{post.price.toLocaleString()}</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">{translate('quantityMarketplaceLabel')}</p>
              <p>{post.quantity}</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">{translate('sellerLabel')}</p>
              <p>{post.sellerName}</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">{translate('locationMarketplaceLabel')}</p>
              <p>{post.location}</p>
            </div>
            <div className="col-span-2">
              <p className="font-semibold text-foreground">{translate('postedOnLabel')}</p>
              <p>{new Date(post.postDate).toLocaleDateString()}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-1">{translate('descriptionLabel')}</h4>
            <p className="text-sm text-card-foreground/90 whitespace-pre-wrap">{post.description || translate('noDataAvailable')}</p>
          </div>
        </div>
        <DialogFooter className="sm:justify-start gap-2">
          <Button type="button" onClick={handleContactSeller}>
            {translate('contactSellerButton')}
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              {translate('cancelButton')}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
