import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Catalog } from "@/features/catalog/Catalog";
import { Services } from "@/features/services/Services";
import { About } from "@/features/about/About";
import { Testimonials } from "@/features/testimonials/Testimonials";
import { WorkProcess } from "@/features/workprocess/WorkProcess";
import { Contact } from "@/features/contact/Contact";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main>
        <Hero />
        <Catalog />
        <Services />
        <WorkProcess />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
