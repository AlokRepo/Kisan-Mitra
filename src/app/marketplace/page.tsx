
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, ShoppingBag } from 'lucide-react';
import type { MarketplacePost } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { CreatePostForm } from '@/components/marketplace/CreatePostForm';
import { PostCard } from '@/components/marketplace/PostCard';
import { PostDetailDialog } from '@/components/marketplace/PostDetailDialog';

export default function MarketplacePage() {
  const { translate } = useLanguage();
  const [posts, setPosts] = useState<MarketplacePost[]>([]);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<MarketplacePost | null>(null);

  // Load mock posts on mount - in a real app, this would be an API call
  useEffect(() => {
    const initialMockPosts: MarketplacePost[] = [
      {
        id: 'post1',
        cropName: 'Wheat',
        quantity: 50,
        price: 2200,
        description: 'High-quality Sharbati wheat, harvested last week. Low moisture content.',
        sellerName: 'Ramesh Kumar',
        postDate: '2024-07-28',
        location: 'Hoshangabad, Madhya Pradesh',
        // imageUrl will be handled by PostCard using getCropImageDetails if not provided
      },
      {
        id: 'post2',
        cropName: 'Rice',
        quantity: 100,
        price: 3500,
        description: 'Basmati rice, long grain, aromatic. Ready for immediate pickup.',
        sellerName: 'Sunita Devi',
        postDate: '2024-07-27',
        location: 'Karnal, Haryana',
      },
    ];
    setPosts(initialMockPosts);
  }, []);

  const handleAddPost = (newPostData: Omit<MarketplacePost, 'id' | 'sellerName' | 'postDate' | 'location'>) => {
    const fullPost: MarketplacePost = {
      ...newPostData, // This includes cropName, quantity, price, description, and optional imageUrl
      id: `post-${Date.now()}`,
      sellerName: 'Local Farmer', // Mock seller name
      postDate: new Date().toISOString().split('T')[0],
      location: 'Current Location', // Mock location
    };
    setPosts(prevPosts => [fullPost, ...prevPosts]);
  };

  const openPostDetails = (post: MarketplacePost) => {
    setSelectedPost(post);
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <ShoppingBag className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">{translate('marketplaceTitle')}</h1>
        </div>
        <Button onClick={() => setIsCreatePostOpen(true)}>
          <PlusCircle className="mr-2 h-5 w-5" />
          {translate('createNewPostButton')}
        </Button>
      </div>

      <Card className="bg-card shadow-lg">
        <CardHeader>
          <CardDescription>{translate('marketplaceDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground py-10">{translate('noPostsAvailable')}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => (
                <PostCard key={post.id} post={post} onViewDetails={() => openPostDetails(post)} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <CreatePostForm
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onAddPost={handleAddPost}
      />

      {selectedPost && (
        <PostDetailDialog
          post={selectedPost}
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
}
