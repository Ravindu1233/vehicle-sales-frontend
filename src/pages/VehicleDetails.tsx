import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Scale,
  MapPin,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Palette,
  Car,
  Shield,
  CheckCircle,
  ExternalLink,
  Phone,
  MessageSquare,
  Star,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { mockVehicles } from "@/data/mockVehicles";

const VehicleDetails = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const vehicle = mockVehicles.find((v) => v.id === id) || mockVehicles[0];
  const similarVehicles = mockVehicles.filter((v) => v.id !== vehicle.id).slice(0, 4);

  const images = [
    vehicle.image,
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&auto=format&fit=crop&q=60",
  ];

  const specs = [
    { icon: Calendar, label: "Year", value: vehicle.year },
    { icon: Gauge, label: "Mileage", value: `${vehicle.mileage.toLocaleString()} mi` },
    { icon: Fuel, label: "Fuel Type", value: vehicle.fuelType },
    { icon: Settings, label: "Transmission", value: vehicle.transmission },
    { icon: Palette, label: "Exterior Color", value: "Silver" },
    { icon: Car, label: "Body Type", value: "Sedan" },
  ];

  const features = [
    "Leather Seats",
    "Navigation System",
    "Bluetooth",
    "Backup Camera",
    "Heated Seats",
    "Sunroof",
    "Apple CarPlay",
    "Android Auto",
    "Lane Departure Warning",
    "Adaptive Cruise Control",
    "Blind Spot Monitor",
    "Parking Sensors",
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-16">
        {/* Breadcrumb */}
        <div className="bg-muted/50 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link to="/search" className="text-muted-foreground hover:text-foreground">
                Search
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">{vehicle.title}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Images & Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-muted">
                  <img
                    src={images[currentImageIndex]}
                    alt={vehicle.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Navigation */}
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {vehicle.isVerified && <Badge variant="verified">Verified</Badge>}
                    {vehicle.isFeatured && <Badge variant="featured">Featured</Badge>}
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        idx === currentImageIndex
                          ? "border-accent"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`View ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Specifications
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {specs.map((spec) => (
                    <div key={spec.label} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <spec.icon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{spec.label}</p>
                        <p className="font-medium text-foreground">{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Features
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Description
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  This stunning {vehicle.year} {vehicle.title} is in excellent condition with only{" "}
                  {vehicle.mileage.toLocaleString()} miles on the odometer. Features include premium
                  leather interior, advanced safety systems, and the latest technology package.
                  Well-maintained with full service history available. Clean title, no accidents.
                  Serious inquiries only.
                </p>
              </div>
            </div>

            {/* Right Column - Price & Actions */}
            <div className="space-y-6">
              {/* Price Card */}
              <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
                <div className="mb-6">
                  <p className="text-4xl font-bold text-accent mb-2">
                    {formatPrice(vehicle.price)}
                  </p>
                  <h1 className="text-xl font-semibold text-foreground">
                    {vehicle.title}
                  </h1>
                  <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{vehicle.location}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 mb-6">
                  <Button variant="hero" size="lg" className="w-full">
                    <Phone className="w-5 h-5 mr-2" />
                    Contact Seller
                  </Button>
                  <Button variant="outline" size="lg" className="w-full">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </div>

                {/* Secondary Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    className="flex-1"
                    onClick={() => setIsSaved(!isSaved)}
                  >
                    <Heart
                      className={`w-4 h-4 mr-2 ${isSaved ? "fill-destructive text-destructive" : ""}`}
                    />
                    {isSaved ? "Saved" : "Save"}
                  </Button>
                  <Button variant="ghost" className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="ghost" className="flex-1">
                    <Scale className="w-4 h-4 mr-2" />
                    Compare
                  </Button>
                </div>

                <div className="border-t border-border my-6" />

                {/* Seller Info */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Seller</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-xl font-bold text-primary-foreground">P</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">Premium Auto</p>
                        <Badge variant="verified" className="text-xs">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="w-4 h-4 text-warning fill-warning" />
                        <span>4.9 (128 reviews)</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/dealer/1">
                      View Dealer Profile
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>

                <div className="border-t border-border my-6" />

                {/* Trust Indicators */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Shield className="w-5 h-5 text-success" />
                    <span className="text-foreground">AI Fraud Check Passed</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-foreground">Vehicle History Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Vehicles */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Similar Vehicles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarVehicles.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VehicleDetails;
