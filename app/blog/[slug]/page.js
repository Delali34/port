"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, User, Calendar } from "lucide-react";
import { Fonts } from "@/styles/fonts";
import ReactMarkdown from "react-markdown";

export default function BlogPost({ params }) {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/slug/${params.slug}`);
        if (!response.ok) {
          throw new Error("Post not found");
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPost();
  }, [params.slug]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Error: {error}</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-44">
      <Fonts />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-6 lg:px-8"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <span className="px-3 py-1 bg-pink-500 text-white text-sm font-grotesk rounded-full">
              {post.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-clash font-bold text-white mb-6">
            {post.title}
          </h1>
          <div className="flex items-center justify-center space-x-6 text-gray-400 font-grotesk">
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-2" />
              {post.readTime}
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12">
          <motion.img
            src={post.coverImage}
            alt={post.title}
            className="object-cover w-full h-full"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/20" />
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-invert max-w-none">
          <ReactMarkdown
            components={{
              // Style headers
              h1: ({ node, ...props }) => (
                <h1 {...props} className="text-3xl font-bold mt-8 mb-4" />
              ),
              h2: ({ node, ...props }) => (
                <h2 {...props} className="text-2xl font-bold mt-6 mb-4" />
              ),
              h3: ({ node, ...props }) => (
                <h3 {...props} className="text-xl font-bold mt-4 mb-3" />
              ),
              // Style paragraphs
              p: ({ node, ...props }) => (
                <p {...props} className="mb-4 leading-relaxed" />
              ),
              // Style links
              a: ({ node, ...props }) => (
                <a
                  {...props}
                  target="_blank"
                  className="text-pink-500 hover:text-pink-400 underline"
                />
              ),
              // Style images
              img: ({ node, ...props }) => (
                <img {...props} className="rounded-lg max-w-full h-auto my-6" />
              ),
              // Style lists
              ul: ({ node, ...props }) => (
                <ul
                  {...props}
                  className="list-disc list-inside mb-4 space-y-2"
                />
              ),
              ol: ({ node, ...props }) => (
                <ol
                  {...props}
                  className="list-decimal list-inside mb-4 space-y-2"
                />
              ),
              // Style list items
              li: ({ node, ...props }) => (
                <li {...props} className="text-gray-300" />
              ),
              // Style blockquotes
              blockquote: ({ node, ...props }) => (
                <blockquote
                  {...props}
                  className="border-l-4 border-pink-500 pl-4 my-4 italic text-gray-300"
                />
              ),
              // Style code blocks
              code: ({ node, inline, ...props }) =>
                inline ? (
                  <code
                    {...props}
                    className="bg-gray-800 text-pink-500 px-1 py-0.5 rounded text-sm"
                  />
                ) : (
                  <code
                    {...props}
                    className="block bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto"
                  />
                ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </motion.div>
    </article>
  );
}
