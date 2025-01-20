"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import Dialog from "../components/Dialog";
import PostCard from "../components/PostCard";
import {Button} from "@heroui/react";
import { IconChefHat } from "@tabler/icons-react";


export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  const handleAddPost = (post) => {
    const updatedPosts = [...posts, post];
    updatedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    setPosts(updatedPosts);
  };

  return (
    <main className="min-h-screen flex flex-col items-center">
      <Header onAddClick={() => setIsDialogOpen(true)} />
      {posts.length === 0 && (
        <div className="flex flex-col items-center justify-center flex-grow">
          <h1 className="text-4xl font-semibold mb-2">
            Welcome in your cooking diary!
          </h1>
          <h3 className="text-xl text-gray-500 mb-8">
            Here you can document your cooking journey by adding posts including
            photos, guests, the dishes you cooked.
          </h3>
          <Button color="primary" variant="shadow" size="lg"  endContent={<IconChefHat />} onClick={() => setIsDialogOpen(true)}>
            Post your first memory
          </Button>
        </div>
      )}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleAddPost}
      />
      <div className="container mx-auto flex flex-col items-center gap-16">
        {posts.map((post, index) => (
          <PostCard key={index} {...post} />
        ))}
      </div>
    </main>
  );
}
