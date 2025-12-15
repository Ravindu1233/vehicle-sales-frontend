import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { X, Plus, Check, Minus, Car, ArrowLeft, Search } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import api from "@/lib/api";

interface CompareVehicle {
  id: string;
  title: string;
  price: number;
  year: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  image: string;

  condition: string;
  color: string;
  features: string[];
}

type BackendListing = any;

const Compare = () => {
  const [selectedVehicles, setSelectedVehicles] = useState<CompareVehicle[]>(
    []
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ backend data
  const [vehicles, setVehicles] = useState<BackendListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const maxVehicles = 4;

  // ✅ helper: convert /uploads/file.jpg -> full URL
  const apiUrl = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

  // ✅ Fetch approved listings
  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/api/listings");
        const data = Array.isArray(res.data) ? res.data : [];
        setVehicles(data);
      } catch (err: any) {
        const msg =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to load listings.";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // ✅ Map backend -> selection objects
  const mappedVehicles = useMemo(() => {
    return vehicles.map((l: any) => {
      const firstImgPath =
        l?.images?.[0]?.image_url ||
        l?.images?.[0]?.url ||
        (typeof l?.images?.[0] === "string" ? l.images[0] : "") ||
        "";

      const image =
        typeof firstImgPath === "string" && firstImgPath.startsWith("/uploads")
          ? `${apiUrl}${firstImgPath}`
          : firstImgPath;

      // ✅ sanitize features (remove empty strings, trim, ensure array)
      const rawFeatures = Array.isArray(l?.features) ? l.features : [];
      const cleanedFeatures = rawFeatures
        .map((f: any) => (typeof f === "string" ? f.trim() : ""))
        .filter((f: string) => !!f);

      return {
        id: l?._id || l?.id,
        title:
          l?.title ||
          `${l?.year || ""} ${l?.make || ""} ${l?.model || ""}`.trim(),
        price: Number(l?.price) || 0,
        year: Number(l?.year) || 0,
        mileage: Number(l?.mileage) || 0,
        fuelType: l?.fuel_type || l?.fuelType || "",
        transmission: l?.transmission || "",
        image: image || "",

        color: l?.colour || l?.color || "—",
        features: cleanedFeatures, // ✅ use cleaned features only
      };
    });
  }, [vehicles, apiUrl]);

  const addVehicle = (vehicle: (typeof mappedVehicles)[0]) => {
    if (selectedVehicles.length >= maxVehicles) return;

    const compareVehicle: CompareVehicle = {
      id: vehicle.id,
      title: vehicle.title,
      price: vehicle.price,
      year: vehicle.year,
      mileage: vehicle.mileage,
      fuelType: vehicle.fuelType,
      transmission: vehicle.transmission,
      image: vehicle.image,

      // UI-only label (backend doesn't have it)
      condition: "Used",
      color: vehicle.color || "—",

      // ✅ IMPORTANT: no fallback features
      features: Array.isArray(vehicle.features) ? vehicle.features : [],
    };

    setSelectedVehicles((prev) => [...prev, compareVehicle]);
    setDialogOpen(false);
    setSearchQuery("");
  };

  const removeVehicle = (id: string) => {
    setSelectedVehicles((prev) => prev.filter((v) => v.id !== id));
  };

  const availableVehicles = useMemo(() => {
    return mappedVehicles.filter(
      (v) => !selectedVehicles.find((sv) => sv.id === v.id)
    );
  }, [mappedVehicles, selectedVehicles]);

  const filteredVehicles = useMemo(() => {
    if (!searchQuery.trim()) return availableVehicles;
    const q = searchQuery.toLowerCase();
    return availableVehicles.filter((v) => v.title.toLowerCase().includes(q));
  }, [availableVehicles, searchQuery]);

  const VehicleSelectionContent = () => (
    <>
      <DialogHeader>
        <DialogTitle>Select a Vehicle to Compare</DialogTitle>
      </DialogHeader>

      <div className="relative mt-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by model name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {error ? (
        <div className="mt-3 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {error}
        </div>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 max-h-[50vh] overflow-y-auto">
        {loading ? (
          <div className="col-span-2 py-8 text-center text-muted-foreground">
            Loading vehicles...
          </div>
        ) : filteredVehicles.length > 0 ? (
          filteredVehicles.map((v) => (
            <button
              key={v.id}
              onClick={() => addVehicle(v)}
              className="flex gap-3 p-3 rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition-all text-left"
            >
              <img
                src={v.image}
                alt={v.title}
                className="w-20 h-16 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-foreground line-clamp-2">
                  {v.title}
                </h4>
                <p className="text-accent font-semibold mt-1">
                  Rs. {v.price.toLocaleString()}
                </p>
              </div>
            </button>
          ))
        ) : (
          <div className="col-span-2 py-8 text-center text-muted-foreground">
            No vehicles found matching "{searchQuery}"
          </div>
        )}
      </div>
    </>
  );

  const specRows = [
    {
      label: "Price",
      key: "price",
      format: (v: number) => `Rs. ${v.toLocaleString()}`,
    },
    { label: "Year", key: "year", format: (v: number) => v.toString() },
    {
      label: "Mileage",
      key: "mileage",
      format: (v: number) => `${v.toLocaleString()} km`,
    },
    { label: "Fuel Type", key: "fuelType", format: (v: string) => v },
    { label: "Transmission", key: "transmission", format: (v: string) => v },
    { label: "Condition", key: "condition", format: (v: string) => v },
    { label: "Color", key: "color", format: (v: string) => v },
  ];

  // ✅ features section should appear only if at least one vehicle has features
  const hasAnyFeatures = selectedVehicles.some(
    (v) => (v.features?.length || 0) > 0
  );

  const allFeatures = useMemo(() => {
    if (!hasAnyFeatures) return [];
    return Array.from(new Set(selectedVehicles.flatMap((v) => v.features)))
      .map((f) => (typeof f === "string" ? f.trim() : ""))
      .filter((f) => !!f)
      .sort();
  }, [selectedVehicles, hasAnyFeatures]);

  const getBestValue = (key: string) => {
    if (selectedVehicles.length < 2) return null;

    if (key === "price") {
      const min = Math.min(...selectedVehicles.map((v) => v.price));
      return selectedVehicles.find((v) => v.price === min)?.id;
    }
    if (key === "year") {
      const max = Math.max(...selectedVehicles.map((v) => v.year));
      return selectedVehicles.find((v) => v.year === max)?.id;
    }
    if (key === "mileage") {
      const min = Math.min(...selectedVehicles.map((v) => v.mileage));
      return selectedVehicles.find((v) => v.mileage === min)?.id;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/search"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Search
            </Link>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Compare Vehicles
            </h1>
            <p className="text-muted-foreground">
              Select up to {maxVehicles} vehicles to compare side by side
            </p>
          </div>

          {/* Vehicle Selection Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[...Array(maxVehicles)].map((_, index) => {
              const vehicle = selectedVehicles[index];
              return (
                <Card
                  key={index}
                  className="relative overflow-hidden border-2 border-dashed border-border hover:border-accent/50 transition-colors"
                >
                  {vehicle ? (
                    <div className="relative">
                      <button
                        onClick={() => removeVehicle(vehicle.id)}
                        className="absolute top-2 right-2 z-10 p-1.5 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <img
                        src={vehicle.image}
                        alt={vehicle.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-3">
                        <h3 className="font-semibold text-sm text-foreground line-clamp-2 mb-1">
                          {vehicle.title}
                        </h3>
                        <p className="text-accent font-bold text-lg">
                          Rs. {vehicle.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <Dialog
                      open={dialogOpen && selectedVehicles.length === index}
                      onOpenChange={(open) => {
                        setDialogOpen(open);
                        if (!open) setSearchQuery("");
                      }}
                    >
                      <DialogTrigger asChild>
                        <button className="w-full h-48 flex flex-col items-center justify-center gap-3 text-muted-foreground hover:text-accent transition-colors">
                          <div className="w-12 h-12 rounded-full border-2 border-dashed border-current flex items-center justify-center">
                            <Plus className="w-6 h-6" />
                          </div>
                          <span className="text-sm font-medium">
                            Add Vehicle
                          </span>
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh]">
                        <VehicleSelectionContent />
                      </DialogContent>
                    </Dialog>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Comparison Table */}
          {selectedVehicles.length > 0 ? (
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              {/* Specifications */}
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">
                  Specifications
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed">
                    <tbody>
                      {specRows.map((row) => {
                        const bestId = getBestValue(row.key);
                        return (
                          <tr
                            key={row.key}
                            className="border-b border-border last:border-0"
                          >
                            <td className="py-3 pr-4 font-medium text-muted-foreground w-32">
                              {row.label}
                            </td>
                            {selectedVehicles.map((vehicle) => (
                              <td
                                key={vehicle.id}
                                className={`w-1/4 py-3 px-4 text-center ${
                                  bestId === vehicle.id
                                    ? "text-success font-semibold"
                                    : "text-foreground"
                                }`}
                              >
                                {row.format(
                                  vehicle[
                                    row.key as keyof CompareVehicle
                                  ] as never
                                )}
                                {bestId === vehicle.id && (
                                  <Badge
                                    variant="verified"
                                    className="ml-2 text-xs"
                                  >
                                    Best
                                  </Badge>
                                )}
                              </td>
                            ))}
                            {[
                              ...Array(maxVehicles - selectedVehicles.length),
                            ].map((_, i) => (
                              <td
                                key={`empty-${i}`}
                                className="w-1/4 py-3 px-4 text-center text-muted-foreground"
                              >
                                —
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Features Comparison */}
              {hasAnyFeatures && allFeatures.length > 0 && (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    Features
                  </h2>

                  <div className="overflow-x-auto">
                    <table className="w-full table-fixed">
                      <tbody>
                        {allFeatures.map((feature) => (
                          <tr
                            key={feature}
                            className="border-b border-border last:border-0"
                          >
                            <td className="py-3 pr-4 font-medium text-muted-foreground w-32">
                              {feature}
                            </td>

                            {selectedVehicles.map((vehicle) => (
                              <td
                                key={vehicle.id}
                                className="w-1/4 py-3 px-4 text-center"
                              >
                                {vehicle.features.includes(feature) ? (
                                  <Check className="w-5 h-5 text-success mx-auto" />
                                ) : (
                                  <Minus className="w-5 h-5 text-muted-foreground mx-auto" />
                                )}
                              </td>
                            ))}

                            {[
                              ...Array(maxVehicles - selectedVehicles.length),
                            ].map((_, i) => (
                              <td
                                key={`empty-feature-${feature}-${i}`}
                                className="w-1/4 py-3 px-4 text-center text-muted-foreground"
                              >
                                —
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <Car className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                No Vehicles Selected
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Add vehicles to compare their specifications, features, and
                prices side by side.
              </p>
              <Dialog
                open={dialogOpen}
                onOpenChange={(open) => {
                  setDialogOpen(open);
                  if (!open) setSearchQuery("");
                }}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Vehicle
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh]">
                  <VehicleSelectionContent />
                </DialogContent>
              </Dialog>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Compare;
