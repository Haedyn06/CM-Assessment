
import { HeroSection } from "@/components/sections/Hero";
import { ShelfSection } from "@/components/sections/Shelf";
import { ProductSection } from "@/components/sections/Product";
import { ShowcaseSection } from "@/components/sections/Showcase";
import { TestimonialSection } from "@/components/sections/Testimonials";
import { TimelineSection } from "@/components/sections/Timeline";
import { FAQSection } from "@/components/sections/Faq";

import Image from "next/image";


export default function Home() {
  return (
    <div className="">
      <main className="">
        <HeroSection />
        <ShelfSection />
        <ProductSection />
        <TestimonialSection />
      </main>
    </div>
  );
}
