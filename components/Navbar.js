// components/Navbar.js
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { NavLinks } from "./NavLinks";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <span className="text-white text-2xl font-clash font-semibold tracking-wider">
              CHIAKY
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex space-x-12 text-white"
          >
            <NavLinks />
          </motion.div>

          <div className="hidden md:flex space-x-6 text-white">
            {[FaGithub, FaLinkedin, FaInstagram].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ scale: 1.2, color: "#ec4899" }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 z-10"
          >
            {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed top-0 right-0 h-screen w-full bg-black/95 backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8 text-white">
              <NavLinks isMobile closeMenu={() => setIsOpen(false)} />
              <div className="flex space-x-8 mt-8 text-white">
                {[FaGithub, FaLinkedin, FaInstagram].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.2, color: "#ec4899" }}
                  >
                    <Icon size={28} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
