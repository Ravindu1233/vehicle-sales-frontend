import { useState } from "react";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const popularMakes = ["BMW", "Mercedes", "Audi", "Tesla", "Porsche", "Toyota"];

export function Hero() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Premium vehicles"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-accent-foreground text-sm font-medium">
              AI-Powered Fraud Detection
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in-up">
            Find Your Perfect Vehicle from{" "}
            <span className="text-gradient">1M+ Listings</span>
          </h1>

          <p className="text-lg sm:text-xl text-primary-foreground/80 mb-10 max-w-2xl animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Search across dealerships, classifieds, and private sellers. All in one place, with verified listings and transparent pricing.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-2 sm:p-3">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                  <Input
                    variant="glass"
                    placeholder="Search by make, model, or keyword..."
                    className="pl-12 h-12 sm:h-14"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="relative sm:w-48">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                  <Input
                    variant="glass"
                    placeholder="Location"
                    className="pl-12 h-12 sm:h-14"
                  />
                </div>
                <Button variant="hero" size="lg" type="submit" className="h-12 sm:h-14 px-8">
                  <Search className="w-5 h-5 sm:mr-2" />
                  <span className="hidden sm:inline">Search</span>
                </Button>
              </div>
            </div>
          </form>

          {/* Popular Makes */}
          <div className="mt-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <p className="text-primary-foreground/60 text-sm mb-3">Popular Makes:</p>
            <div className="flex flex-wrap gap-2">
              {popularMakes.map((make) => (
                <button
                  key={make}
                  onClick={() => navigate(`/search?make=${make}`)}
                  className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-primary-foreground text-sm font-medium hover:bg-white/20 transition-colors"
                >
                  {make}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          {[
            { value: "1M+", label: "Verified Listings" },
            { value: "50K+", label: "Trusted Dealers" },
            { value: "99%", label: "Fraud Detection" },
            { value: "24/7", label: "Support" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-1">
                {stat.value}
              </p>
              <p className="text-primary-foreground/60 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <ChevronDown className="w-8 h-8 text-primary-foreground/60" />
      </div>
    </section>
  );
}
