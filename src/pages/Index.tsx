import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { TrendingCars } from "@/components/home/TrendingCars";
import { TrustedDealers } from "@/components/home/TrustedDealers";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <WhyChooseUs />
        <TrendingCars />
        <TrustedDealers />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
