// components/Footer.js
"use client";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <footer id="footer" className="bg-black relative overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500 rounded-full filter blur-[128px] -translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-[128px] translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Brand Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
            className="space-y-6"
          >
            <h2 className="text-white text-2xl font-clash font-semibold tracking-wider">
              CHIAKY
            </h2>
            <p className="text-gray-300 font-grotesk">
              Creating digital experiences that inspire and transform ideas into
              reality.
            </p>
            <div className="flex space-x-6">
              {[FaGithub, FaLinkedin, FaInstagram].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.2, color: "#ec4899" }}
                  className="text-white hover:text-pink-500 transition-colors"
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
            className="space-y-6"
          >
            <h3 className="text-white text-lg font-clash font-semibold">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {["Home", "About", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-pink-500 transition-colors font-grotesk"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
            className="space-y-6"
          >
            <h3 className="text-white text-lg font-clash font-semibold">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:hello@chiaky.com"
                  className="text-gray-300 hover:text-pink-500 transition-colors font-grotesk flex items-center"
                >
                  <Mail size={16} className="mr-2" />
                  hello@chiaky.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="text-gray-300 hover:text-pink-500 transition-colors font-grotesk flex items-center"
                >
                  <Phone size={16} className="mr-2" />
                  +233 55 066 2793
                </a>
              </li>
              <li>
                <span className="text-gray-300 font-grotesk flex items-center">
                  <MapPin size={16} className="mr-2" />
                  Accra, Ghana
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
          className="pt-8 mt-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 font-grotesk text-sm">
              © {currentYear} Chiaky. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-pink-500 transition-colors text-sm font-grotesk"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-pink-500 transition-colors text-sm font-grotesk"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
