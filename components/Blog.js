// components/Blog.js
"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Clock, User } from "lucide-react";

export const Blog = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const blogPosts = [
    {
      title: "The Art of Digital Storytelling",
      excerpt:
        "Exploring how visual narratives shape our digital experiences and connect with audiences on a deeper level.",
      category: "Digital Art",
      readTime: "5 min read",
      author: "Chiaky",
      image: "/chikay (1).jpg",
      date: "Apr 15, 2024",
    },
    {
      title: "Creative Process Unveiled",
      excerpt:
        "A behind-the-scenes look at my creative workflow and how I bring digital art projects to life.",
      category: "Process",
      readTime: "8 min read",
      author: "Chiaky",
      image: "/chikay (2).jpg",
      date: "Apr 10, 2024",
    },
    {
      title: "Future of Interactive Design",
      excerpt:
        "Discussing emerging trends in interactive design and what they mean for digital artists.",
      category: "Design",
      readTime: "6 min read",
      author: "Chiaky",
      image: "/chikay (3).jpg",
      date: "Apr 5, 2024",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-black to-gray-900">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto px-6 lg:px-8"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-clash font-bold text-white mb-6">
            Latest from the <span className="text-pink-500">Blog</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 font-grotesk max-w-2xl mx-auto">
            Dive into my thoughts on art, design, and creativity. Discover
            insights, tips, and behind-the-scenes looks at my creative process.
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              variants={itemVariants}
              className="group relative bg-gray-900/50 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-800"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={post.image}
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

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-clash font-bold text-white group-hover:text-pink-500 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-300 font-grotesk line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta Information */}
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
                  <span>{post.date}</span>
                </div>

                {/* Read More Link */}
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
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div variants={itemVariants} className="text-center mt-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-pink-500 text-white rounded-full font-grotesk font-medium text-lg hover:bg-pink-600 transition-colors inline-flex items-center"
          >
            View All Posts
            <ArrowRight size={20} className="ml-2" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};
