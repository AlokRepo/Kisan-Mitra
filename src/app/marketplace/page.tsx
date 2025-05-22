
"use client";

import React, { useState, useEffect, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, ShoppingBag, Loader2, AlertTriangle } from 'lucide-react';
import type { MarketplacePost } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { CreatePostForm } from '@/components/marketplace/CreatePostForm';
import { PostCard } from '@/components/marketplace/PostCard';
import { PostDetailDialog } from '@/components/marketplace/PostDetailDialog';
import { useToast } from '@/hooks/use-toast';

export default function MarketplacePage() {
  const { translate } = useLanguage();
  const { toast } = useToast();
  const [posts, setPosts] = useState<MarketplacePost[]>([]);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<MarketplacePost | null>(null);
  const [isLoading, startLoadingTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = () => {
    startLoadingTransition(async () => {
      setError(null);
      try {
        const response = await fetch('/api/marketplace/posts');
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred";
        console.error("Error fetching posts:", e);
        setError(translate('formErrorOccurred', { errorMessage }));
        toast({
          title: translate('toastErrorTitle'),
          description: translate('formErrorOccurred', { errorMessage }),
          variant: "destructive",
        });
      }
    });
  };

  useEffect(() => {
    fetchPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddPost = async (newPostData: Omit<MarketplacePost, 'id' | 'postDate'>) => {
    setError(null);
    try {
      const response = await fetch('/api/marketplace/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPostData),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(errorData.message || 'Failed to create post');
      }
      const createdPost = await response.json();
      setPosts(prevPosts => [createdPost, ...prevPosts]);
      toast({
        title: translate('postSubmittedToastTitle'),
        description: translate('postSubmittedToastDesc'),
      });
      setIsCreatePostOpen(false); // Close form on success
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred";
      console.error("Error creating post:", e);
      setError(translate('formErrorOccurred', { errorMessage })); // Show error in the main page as well
      toast({
        title: translate('toastErrorTitle'),
        description: translate('formErrorOccurred', { errorMessage }),
        variant: "destructive",
      });
    }
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

      {error && (
        <div className="mt-4 p-3 bg-destructive/10 border border-destructive/30 rounded-md text-sm text-destructive flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      )}

      <Card className="bg-card shadow-lg">
        <CardHeader>
          <CardDescription>{translate('marketplaceDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && posts.length === 0 ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-2 text-muted-foreground">{translate('loading')}</p>
            </div>
          ) : !isLoading && posts.length === 0 && !error ? (
            <p className="text-center text-muted-foreground py-10">{translate('noPostsAvailable')}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  onViewDetails={() => openPostDetails(post)}
                />
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
