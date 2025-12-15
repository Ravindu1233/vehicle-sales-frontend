import { useEffect, useMemo, useState } from "react";
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
import api from "@/lib/api";

type BackendImage = {
  _id?: string;
  image_url?: string;
  url?: string;
};

type BackendUser = {
  _id?: string;
  full_name?: string;
};

type BackendListing = {
  _id?: string;
  id?: string;

  user_id?: BackendUser;

  title?: string;
  make?: string;
  model?: string;
  year?: number;
  price?: number;
  mileage?: number;

  fuel_type?: string;
  transmission?: string;

  location?: string;
  colour?: string;

  description?: string;
  source_url?: string;

  features?: string[];

  admin_status?: string;

  images?: BackendImage[];
};

const VehicleDetails = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const [vehicle, setVehicle] = useState<BackendListing | null>(null);
  const [similar, setSimilar] = useState<BackendListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ make /uploads/... to full URL
  const apiUrl = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

  const toFullUrl = (p?: string) => {
    if (!p) return "";
    if (p.startsWith("http://") || p.startsWith("https://")) return p;
    if (p.startsWith("/uploads")) return `${apiUrl}${p}`;
    return p;
  };

  // ✅ LKR formatter
  const formatLKR = (price: number) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      maximumFractionDigits: 0,
    }).format(price || 0);
  };

  // ✅ Load listing details
  useEffect(() => {
    if (!id) return;

    const fetchOne = async () => {
      setLoading(true);
      setError("");
      setCurrentImageIndex(0);

      try {
        const res = await api.get(`/api/listings/${id}`);
        setVehicle(res.data);
      } catch (err: any) {
        const msg =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to load vehicle details.";
        setError(msg);
        setVehicle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOne();
  }, [id]);

  // ✅ Load similar (approved) vehicles
  useEffect(() => {
    const fetchSimilar = async () => {
      try {
        const res = await api.get("/api/listings"); // public approved
        const data: BackendListing[] = Array.isArray(res.data) ? res.data : [];
        setSimilar(data);
      } catch {
        // don’t block UI if similar fails
        setSimilar([]);
      }
    };

    fetchSimilar();
  }, []);

  const vehicleId = vehicle?._id || vehicle?.id || "";

  // ✅ Build images array ONLY from backend
  const images = useMemo(() => {
    const imgs = Array.isArray(vehicle?.images) ? vehicle!.images : [];
    const mapped = imgs
      .map((img) => toFullUrl(img?.image_url || img?.url))
      .filter(Boolean);

    // If no images, use a simple fallback (keeps UI)
    if (mapped.length === 0) return ["/placeholder-car.jpg"]; // put a placeholder in /public
    return mapped;
  }, [vehicle, apiUrl]);

  const similarVehicles = useMemo(() => {
    const list = Array.isArray(similar) ? similar : [];
    return list
      .filter((v) => (v?._id || v?.id) !== vehicleId)
      .slice(0, 4)
      .map((l) => {
        const firstImgPath =
          l?.images?.[0]?.image_url ||
          l?.images?.[0]?.url ||
          (typeof (l as any)?.images?.[0] === "string" ? (l as any).images[0] : "") ||
          "";

        const image = toFullUrl(firstImgPath);

        return {
          id: l?._id || l?.id,
          _id: l?._id || l?.id,
          title:
            l?.title ||
            `${l?.year || ""} ${l?.make || ""} ${l?.model || ""}`.trim(),
          make: l?.make || "",
          model: l?.model || "",
          year: l?.year || 0,
          price: l?.price || 0,
          mileage: l?.mileage || 0,
          fuelType: l?.fuel_type || "",
          transmission: l?.transmission || "",
          location: l?.location || "",
          color: l?.colour || "",
          description: l?.description || "",
          features: Array.isArray(l?.features) ? l!.features : [],
          source: l?.source_url || "direct",
          image: image || "",
          images: l?.images || [],
          admin_status: l?.admin_status,
        };
      });
  }, [similar, vehicleId]);

  // ✅ Specs from backend
  const specs = useMemo(() => {
    if (!vehicle) return [];
    return [
      { icon: Calendar, label: "Year", value: vehicle.year ?? "-" },
      {
        icon: Gauge,
        label: "Mileage",
        value: `${(vehicle.mileage ?? 0).toLocaleString()} km`,
      },
      { icon: Fuel, label: "Fuel Type", value: vehicle.fuel_type || "-" },
      { icon: Settings, label: "Transmission", value: vehicle.transmission || "-" },
      { icon: Palette, label: "Exterior Color", value: vehicle.colour || "-" },
      { icon: Car, label: "Model", value: vehicle.model || "-" },
    ];
  }, [vehicle]);

  const features = useMemo(() => {
    const f = vehicle?.features;
    return Array.isArray(f) && f.length > 0 ? f : [];
  }, [vehicle]);

  const title = vehicle?.title
    ? vehicle.title
    : `${vehicle?.year || ""} ${vehicle?.make || ""} ${vehicle?.model || ""}`.trim();

  // Optional: you can show verified badges based on your verification_id or admin_status
  const isApproved = vehicle?.admin_status === "approved";

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
              <span className="text-foreground font-medium">
                {loading ? "Loading..." : title || "Vehicle"}
              </span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Error */}
          {error ? (
            <div className="mb-6 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          ) : null}

          {/* If no vehicle */}
          {!loading && !vehicle ? null : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Image Gallery */}
                <div className="space-y-4">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-muted">
                    <img
                      src={images[currentImageIndex]}
                      alt={title}
                      className="w-full h-full object-cover"
                    />

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

                    <div className="absolute top-4 left-4 flex gap-2">
                      {isApproved && <Badge variant="verified">Approved</Badge>}
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

                  {features.length === 0 ? (
                    <p className="text-muted-foreground text-sm">
                      No features added by seller.
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Description
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {vehicle?.description || "No description provided."}
                  </p>

                  {vehicle?.source_url ? (
                    <div className="mt-4">
                      <a
                        href={vehicle.source_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center text-sm text-accent hover:underline"
                      >
                        View source link <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
                  <div className="mb-6">
                    <p className="text-4xl font-bold text-accent mb-2">
                      {formatLKR(vehicle?.price || 0)}
                    </p>
                    <h1 className="text-xl font-semibold text-foreground">{title}</h1>
                    <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{vehicle?.location || "Location not provided"}</span>
                    </div>
                  </div>

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

                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      className="flex-1"
                      onClick={() => setIsSaved(!isSaved)}
                    >
                      <Heart
                        className={`w-4 h-4 mr-2 ${
                          isSaved ? "fill-destructive text-destructive" : ""
                        }`}
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

                  {/* Seller Info (from backend if available) */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-4">Seller</h3>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-xl font-bold text-primary-foreground">
                          {(vehicle?.user_id?.full_name?.[0] || "U").toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">
                            {vehicle?.user_id?.full_name || "Unknown"}
                          </p>
                          {isApproved && (
                            <Badge variant="verified" className="text-xs">
                              <Shield className="w-3 h-3 mr-1" />
                              Approved
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="w-4 h-4 text-warning fill-warning" />
                          <span>4.9 (demo)</span>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/dealer/1">
                        View Seller Profile
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>

                  <div className="border-t border-border my-6" />

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Shield className="w-5 h-5 text-success" />
                      <span className="text-foreground">Admin Approved Listing</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span className="text-foreground">Images loaded from server</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Similar Vehicles */}
          {!loading && similarVehicles.length > 0 ? (
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Similar Vehicles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarVehicles.map((v) => (
                  <VehicleCard key={v.id} vehicle={v as any} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VehicleDetails;
