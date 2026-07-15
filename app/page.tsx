import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/Hero";
import { ShelfSection } from "@/components/sections/Shelf";
import { ProductSection } from "@/components/sections/Product";
import { ShowcaseSection } from "@/components/sections/Showcase";
import { TestimonialSection } from "@/components/sections/Testimonials";
import { TimelineSection } from "@/components/sections/Timeline";
import { FAQSection } from "@/components/sections/Faq";

export default function Home() {
  return (
    <div className="page">
      <Navbar />
      <main className="pageMain">
        <HeroSection />
        <ShelfSection />
        <ProductSection />
        <ShowcaseSection />
        <TestimonialSection />
        <TimelineSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
