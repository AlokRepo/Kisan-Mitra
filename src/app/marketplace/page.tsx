
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
// Removed AlertDialog for delete confirmation as edit/delete is removed for now
// Removed useAuth

export default function MarketplacePage() {
  const { translate } = useLanguage();
  const [posts, setPosts] = useState<MarketplacePost[]>([]);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<MarketplacePost | null>(null);
  // Removed auth and delete related states

  useEffect(() => {
    // Try to load posts from localStorage
    const storedPosts = localStorage.getItem('marketplacePosts');
    let initialMockPosts: MarketplacePost[] = [];
    if (storedPosts) {
      try {
        initialMockPosts = JSON.parse(storedPosts);
      } catch (e) {
        console.error("Error parsing posts from localStorage", e);
        initialMockPosts = []; // Fallback to empty if parsing fails
      }
    }
    
    if (initialMockPosts.length === 0) { // Only set default mock if localStorage is empty or invalid
       initialMockPosts = [
        {
          id: 'post1',
          cropName: 'Wheat',
          quantity: 50,
          price: 2200,
          description: 'High-quality Sharbati wheat, harvested last week. Low moisture content.',
          sellerName: 'Ramesh Kumar', // Keep sellerName, can be user-provided or default
          postDate: '2024-07-28',
          location: 'Hoshangabad, Madhya Pradesh',
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
    }
    setPosts(initialMockPosts);
  }, []);

  useEffect(() => {
    // Save posts to localStorage whenever they change
    if (posts.length > 0) { // Avoid saving empty array on initial load if localStorage was populated
        localStorage.setItem('marketplacePosts', JSON.stringify(posts));
    }
  }, [posts]);

  const handleAddPost = (newPostData: Omit<MarketplacePost, 'id' | 'postDate' | 'location'>) => {
    const fullPost: MarketplacePost = {
      ...newPostData, // This includes cropName, quantity, price, description, sellerName, and optional imageUrl
      id: `post-${Date.now()}`,
      postDate: new Date().toISOString().split('T')[0],
      location: newPostData.location || 'Current Location', // Use provided or mock location
    };
    setPosts(prevPosts => [fullPost, ...prevPosts]);
  };

  const openPostDetails = (post: MarketplacePost) => {
    setSelectedPost(post);
  };

  // Removed handleDeletePost, handleConfirmDelete, etc.

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <ShoppingBag className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">{translate('marketplaceTitle')}</h1>
        </div>
        {/* "Create New Post" button always visible now */}
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
                <PostCard 
                  key={post.id} 
                  post={post} 
                  onViewDetails={() => openPostDetails(post)}
                  // Removed onEdit, onDelete, isOwner props
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
          // Removed onEdit, onDelete, isOwner props
        />
      )}
      {/* Removed AlertDialog for delete confirmation */}
    </div>
  );
}
