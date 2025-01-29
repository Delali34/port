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
        <Hero />
        <About />
        <Blog />
      </div>
    </>
  );
};

export default Page;
