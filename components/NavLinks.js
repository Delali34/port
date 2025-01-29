"use client";
import { motion } from "framer-motion";

export const NavLinks = ({ isMobile, closeMenu }) => {
  const links = [
    { title: "Home", href: "/" },
    { title: "Blog", href: "/blog" },
    { title: "Projects", href: "#projects" },
    { title: "Contact", href: "#contact" },
  ];

  return links.map((link) => (
    <motion.a
      key={link.title}
      href={link.href}
      className={`relative font-grotesk ${
        isMobile ? "text-2xl my-4" : "text-lg"
      }`}
      onClick={closeMenu}
      whileHover="hover"
      variants={{
        hover: {
          scale: 1.05,
          transition: { duration: 0.2 },
        },
      }}
    >
      {link.title}
      <motion.span
        className="absolute left-0 bottom-0 w-full h-[2px] bg-pink-500 origin-left"
        initial={{ scaleX: 0 }}
        variants={{
          hover: {
            scaleX: 1,
            transition: { duration: 0.2 },
          },
        }}
      />
    </motion.a>
  ));
};
