"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import Dialog from "../components/Dialog";
import PostCard from "../components/PostCard";

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  const handleAddPost = (post) => {
    const updatedPosts = [...posts, post];
    updatedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    setPosts(updatedPosts);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col items-center py-36">
      <Header onAddClick={() => setIsDialogOpen(true)} />
      {posts.length === 0 && (
        <div className="text-center text-2xl font-semibold">
          Welcome in your cooking diary!
        </div>
      )}
      {posts.length === 0 && (
        <div className="text-center text-base">
          <p>
            Here you can document your cooking journey by adding posts with
            photos, guests, dishes you cooked.
          </p>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded mx-auto mt-4"
          >
            Add Cooking Entry
          </button>
        </div>
      )}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleAddPost}
      />
      <div className="container mx-auto p-4 flex flex-col items-center">
        {posts.map((post, index) => (
          <PostCard key={index} {...post} />
        ))}
      </div>
    </div>
  );
}
