"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, User, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Fonts } from "@/styles/fonts";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);

      // Extract unique categories
      const uniqueCategories = [
        "All",
        ...new Set(data.map((post) => post.category)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="bg-gray-900/50 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-800 animate-pulse">
      <div className="h-64 bg-gray-800" />
      <div className="p-6 space-y-4">
        <div className="h-8 bg-gray-800 rounded w-3/4" />
        <div className="h-4 bg-gray-800 rounded w-full" />
        <div className="h-4 bg-gray-800 rounded w-2/3" />
        <div className="flex justify-between items-center pt-4">
          <div className="h-4 bg-gray-800 rounded w-1/4" />
          <div className="h-4 bg-gray-800 rounded w-1/4" />
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-44 bg-gradient-to-b from-black to-gray-900">
      <Fonts />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-clash font-bold text-white mb-6">
            My <span className="text-pink-500">Blog</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-grotesk max-w-2xl mx-auto mb-12">
            Explore my latest thoughts, ideas, and updates
          </p>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-grotesk text-sm transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-pink-500 text-white shadow-lg shadow-pink-500/25"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {filteredPosts.length > 0 ? (
              <motion.div
                key="posts-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative bg-gray-900/50 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-800"
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                  >
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="relative h-64 overflow-hidden">
                        <motion.img
                          src={post.coverImage}
                          alt={post.title}
                          className="object-cover w-full h-full"
                          animate={{
                            scale: hoveredIndex === index ? 1.1 : 1,
                          }}
                          transition={{ duration: 0.4 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-pink-500 text-white text-sm font-grotesk rounded-full">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <h3 className="text-2xl font-clash font-bold text-white group-hover:text-pink-500 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-300 font-grotesk line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-sm text-gray-400 font-grotesk">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Clock size={16} className="mr-2" />
                              {post.readTime}
                            </div>
                            <div className="flex items-center">
                              <User size={16} className="mr-2" />
                              {post.author}
                            </div>
                          </div>
                          <span>
                            {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <motion.div
                          className="pt-4 flex items-center text-pink-500 font-grotesk font-medium"
                          animate={{
                            x: hoveredIndex === index ? 5 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          Read More
                          <ArrowRight size={16} className="ml-2" />
                        </motion.div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-posts"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <div className="bg-gray-900/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-800 inline-block">
                  <h3 className="text-xl font-clash font-bold text-white mb-2">
                    No Posts Available
                  </h3>
                  <p className="text-gray-400 font-grotesk">
                    There are currently no posts in the {selectedCategory}{" "}
                    category.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
