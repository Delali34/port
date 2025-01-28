// app/page.js
"use client";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Blog } from "@/components/Blog";
import { Footer } from "@/components/Footer";
import { Fonts } from "@/styles/fonts";

const Page = () => {
  return (
    <>
      <Fonts />
      <div>
        <Navbar />
        <Hero />
        <About />
        <Blog />
        <Footer />
      </div>
    </>
  );
};

export default Page;
