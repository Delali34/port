// components/About.js
"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
    <section
      id="about"
      className="py-20 md:py-32 bg-black relative overflow-hidden"
    >
      {/* Background Design Element */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500 rounded-full filter blur-[128px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-[128px] translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Image Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-4 relative"
          >
            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative h-64 rounded-2xl overflow-hidden"
              >
                <img
                  src="/chikay (1).jpg"
                  alt="Portfolio Image 1"
                  className="object-cover w-full h-full"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative h-40 rounded-2xl overflow-hidden"
              >
                <img
                  src="/chikay (2).jpg"
                  alt="Portfolio Image 2"
                  className="object-cover w-full h-full"
                />
              </motion.div>
            </div>
            <div className="space-y-4 pt-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative h-40 rounded-2xl overflow-hidden"
              >
                <img
                  src="/chikay (3).jpg"
                  alt="Portfolio Image 3"
                  className="object-cover w-full h-full"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative h-64 rounded-2xl overflow-hidden"
              >
                <img
                  src="/chikay (4).jpg"
                  alt="Portfolio Image 4"
                  className="object-cover w-full h-full"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div variants={itemVariants} className="text-white space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-clash font-bold tracking-tight">
                Crafting Digital
                <span className="text-pink-500"> Experiences</span>
              </h2>
              <div className="w-20 h-1.5 bg-pink-500 rounded-full" />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-300 font-grotesk leading-relaxed"
            >
              As a Creative Developer and Digital Artist, I blend technical
              expertise with artistic vision to create immersive digital
              experiences. With a passion for innovative design and cutting-edge
              technology, I transform ideas into captivating realities.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-8 py-8"
            >
              <div>
                <h3 className="text-3xl font-clash font-bold text-pink-500 mb-2">
                  5+
                </h3>
                <p className="text-gray-300 font-grotesk">
                  Years of Experience
                </p>
              </div>
              <div>
                <h3 className="text-3xl font-clash font-bold text-pink-500 mb-2">
                  100+
                </h3>
                <p className="text-gray-300 font-grotesk">Projects Completed</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-clash font-bold">Expertise</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "UI/UX Design",
                  "Web Development",
                  "Digital Art",
                  "3D Modeling",
                  "Motion Graphics",
                  "Brand Identity",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-white/10 rounded-full text-sm font-grotesk hover:bg-pink-500 transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
