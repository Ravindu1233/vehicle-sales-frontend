import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, Grid3X3, List, X } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { carMakes, fuelTypes, transmissions } from "@/data/mockVehicles";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import api from "@/lib/api"; // ✅ ADD

const PRICE_MAX = 100000000; // ✅ 100 million LKR

const SearchPage = () => {
  // ✅ IMPORTANT: use setSearchParams too
  const [searchParams, setSearchParams] = useSearchParams();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // ✅ IMPORTANT: default should match PRICE_MAX so it doesn't look "filtered" by default
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0,
    PRICE_MAX,
  ]);

  const [selectedMakes, setSelectedMakes] = useState<string[]>([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // ✅ backend data
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [sortBy, setSortBy] = useState<
    "latest" | "price-low" | "price-high" | "mileage" | "year"
  >("latest");

  const query = searchParams.get("q") || "";
  const make = searchParams.get("make") || "";

  // ✅ 1) Read filters from URL on first mount (refresh/back keeps filters)
  useEffect(() => {
    const makesFromUrl =
      searchParams.get("makes")?.split(",").filter(Boolean) || [];
    const fuelsFromUrl =
      searchParams.get("fuels")?.split(",").filter(Boolean) || [];

    const minPrice = Number(searchParams.get("minPrice") ?? 0);
    const maxPrice = Number(searchParams.get("maxPrice") ?? PRICE_MAX);

    setSelectedMakes(makesFromUrl);
    setSelectedFuelTypes(fuelsFromUrl);

    // guard invalid numbers
    const safeMin = Number.isFinite(minPrice) ? minPrice : 0;
    const safeMax = Number.isFinite(maxPrice) ? maxPrice : PRICE_MAX;

    setPriceRange([safeMin, safeMax]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only once

  // ✅ 2) Sync current filters -> URL (so refresh/back persists them)
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (selectedMakes.length) params.set("makes", selectedMakes.join(","));
    else params.delete("makes");

    if (selectedFuelTypes.length)
      params.set("fuels", selectedFuelTypes.join(","));
    else params.delete("fuels");

    params.set("minPrice", String(priceRange[0] ?? 0));
    params.set("maxPrice", String(priceRange[1] ?? PRICE_MAX));

    setSearchParams(params, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMakes, selectedFuelTypes, priceRange]);

  const toggleMake = (makeName: string) => {
    setSelectedMakes((prev) =>
      prev.includes(makeName)
        ? prev.filter((m) => m !== makeName)
        : [...prev, makeName]
    );
  };

  const toggleFuelType = (fuel: string) => {
    setSelectedFuelTypes((prev) =>
      prev.includes(fuel) ? prev.filter((f) => f !== fuel) : [...prev, fuel]
    );
  };

  const clearFilters = () => {
    setSelectedMakes([]);
    setSelectedFuelTypes([]);
    setPriceRange([0, PRICE_MAX]); // ✅ changed max
  };

  const activeFiltersCount =
    selectedMakes.length +
    selectedFuelTypes.length +
    (priceRange[0] > 0 || priceRange[1] < PRICE_MAX ? 1 : 0); // ✅ changed max

  // ✅ Fetch approved listings (backend already filters admin_status for public users)
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

  // ✅ helper: convert /uploads/file.jpg -> full URL
  const apiUrl = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

  // ✅ Map backend listing -> VehicleCard-friendly object
  const mappedVehicles = useMemo(() => {
    return vehicles.map((l) => {
      // backend returns images as array of objects: { image_url: "/uploads/xx" }
      const firstImgPath =
        l?.images?.[0]?.image_url ||
        l?.images?.[0]?.url ||
        (typeof l?.images?.[0] === "string" ? l.images[0] : "") ||
        "";

      const image =
        typeof firstImgPath === "string" && firstImgPath.startsWith("/uploads")
          ? `${apiUrl}${firstImgPath}`
          : firstImgPath;

      // also map every image in images[] to full URL (optional but good)
      const mappedImages = Array.isArray(l?.images)
        ? l.images.map((img: any) => {
            const p = img?.image_url || img?.url || img;
            const full =
              typeof p === "string" && p.startsWith("/uploads")
                ? `${apiUrl}${p}`
                : p;
            return {
              ...img,
              image_url: full,
              url: full,
            };
          })
        : [];

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
        fuelType: l?.fuel_type || l?.fuelType || "",
        transmission: l?.transmission || "",
        location: l?.location || "",
        color: l?.colour || l?.color || "",
        description: l?.description || "",
        features: Array.isArray(l?.features) ? l.features : [],

        // ✅ required for VehicleCard TS type (fixes your error)
        source: l?.source_url || "direct",

        // ✅ card main image
        image: image || "",

        // keep extra fields
        images: mappedImages,
        admin_status: l?.admin_status,
      };
    });
  }, [vehicles, apiUrl]);

  // ✅ Apply frontend filtering (UI unchanged)
  const filteredVehicles = useMemo(() => {
    const q = (query || make || "").toLowerCase().trim();

    return mappedVehicles.filter((v) => {
      const matchesQuery =
        !q || `${v.make} ${v.model} ${v.title}`.toLowerCase().includes(q);

      const matchesMake =
        selectedMakes.length === 0 || selectedMakes.includes(v.make);

      const matchesFuel =
        selectedFuelTypes.length === 0 ||
        selectedFuelTypes.includes(v.fuelType);

      const matchesPrice =
        (Number(v.price) || 0) >= priceRange[0] &&
        (Number(v.price) || 0) <= priceRange[1];

      return matchesQuery && matchesMake && matchesFuel && matchesPrice;
    });
  }, [
    mappedVehicles,
    query,
    make,
    selectedMakes,
    selectedFuelTypes,
    priceRange,
  ]);

  const sortedVehicles = useMemo(() => {
    const list = [...filteredVehicles];

    switch (sortBy) {
      case "price-low":
        return list.sort((a, b) => a.price - b.price);
      case "price-high":
        return list.sort((a, b) => b.price - a.price);
      case "mileage":
        return list.sort((a, b) => a.mileage - b.mileage);
      case "year":
        return list.sort((a, b) => b.year - a.year);
      case "latest":
      default:
        // Mongo ObjectId timestamp order (safe fallback)
        return list.sort((a, b) => String(b._id).localeCompare(String(a._id)));
    }
  }, [filteredVehicles, sortBy]);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div className="filter-section">
        <h3 className="font-semibold text-foreground mb-4">Price Range</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={(val) => {
              const next: [number, number] = [val[0] ?? 0, val[1] ?? PRICE_MAX];
              setPriceRange(next);
            }}
            min={0}
            max={PRICE_MAX}
            step={50000}
            className="w-full"
          />

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              LKR {priceRange[0].toLocaleString()}
            </span>
            <span className="text-muted-foreground">
              LKR {priceRange[1].toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Make */}
      <div className="filter-section">
        <h3 className="font-semibold text-foreground mb-4">Make</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin">
          {carMakes.slice(0, 15).map((makeName) => (
            <div key={makeName} className="flex items-center gap-2">
              <Checkbox
                id={`make-${makeName}`}
                checked={selectedMakes.includes(makeName)}
                onCheckedChange={() => toggleMake(makeName)}
              />
              <Label
                htmlFor={`make-${makeName}`}
                className="text-sm text-muted-foreground cursor-pointer"
              >
                {makeName}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Fuel Type */}
      <div className="filter-section">
        <h3 className="font-semibold text-foreground mb-4">Fuel Type</h3>
        <div className="space-y-2">
          {fuelTypes.map((fuel) => (
            <div key={fuel} className="flex items-center gap-2">
              <Checkbox
                id={`fuel-${fuel}`}
                checked={selectedFuelTypes.includes(fuel)}
                onCheckedChange={() => toggleFuelType(fuel)}
              />
              <Label
                htmlFor={`fuel-${fuel}`}
                className="text-sm text-muted-foreground cursor-pointer"
              >
                {fuel}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Year Range (UI only - not wired) */}
      <div className="filter-section">
        <h3 className="font-semibold text-foreground mb-4">Year</h3>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Min" />
            </SelectTrigger>
            <SelectContent>
              {[2024, 2023, 2022, 2021, 2020, 2019, 2018].map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Max" />
            </SelectTrigger>
            <SelectContent>
              {[2024, 2023, 2022, 2021, 2020, 2019, 2018].map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 space-y-2">
        <Button variant="accent" className="w-full">
          Apply Filters
        </Button>
        <Button variant="ghost" className="w-full" onClick={clearFilters}>
          Reset Filters
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />

      <main className="flex-1 pt-16">
        {/* Search Header */}
        <div className="bg-background border-b border-border py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by make, model, or keyword..."
                  className="pl-12 h-12"
                  defaultValue={query || make}
                />
              </div>

              <Sheet
                open={mobileFiltersOpen}
                onOpenChange={setMobileFiltersOpen}
              >
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden h-12">
                    <SlidersHorizontal className="w-5 h-5 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge variant="featured" className="ml-2">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>

                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24 bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-foreground">Filters</h2>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-accent hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <FilterContent />
              </div>
            </aside>

            {/* Results */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    {query || make
                      ? `Results for "${query || make}"`
                      : "All Vehicles"}
                  </h1>
                  <p className="text-muted-foreground">
                    {loading
                      ? "Loading..."
                      : `${sortedVehicles.length} vehicles found

`}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Select
                    value={sortBy}
                    onValueChange={(v) => setSortBy(v as any)}
                  >
                    <SelectTrigger className="w-44">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">Latest</SelectItem>
                      <SelectItem value="price-low">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-high">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="mileage">Lowest Mileage</SelectItem>
                      <SelectItem value="year">Newest Year</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="hidden sm:flex items-center border border-border rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded ${
                        viewMode === "grid"
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded ${
                        viewMode === "list"
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Error */}
              {error ? (
                <div className="mb-6 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
              ) : null}

              {/* Active Filters */}
              {(selectedMakes.length > 0 || selectedFuelTypes.length > 0) && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedMakes.map((makeName) => (
                    <Badge
                      key={makeName}
                      variant="secondary"
                      className="gap-1 cursor-pointer"
                      onClick={() => toggleMake(makeName)}
                    >
                      {makeName}
                      <X className="w-3 h-3" />
                    </Badge>
                  ))}
                  {selectedFuelTypes.map((fuel) => (
                    <Badge
                      key={fuel}
                      variant="secondary"
                      className="gap-1 cursor-pointer"
                      onClick={() => toggleFuelType(fuel)}
                    >
                      {fuel}
                      <X className="w-3 h-3" />
                    </Badge>
                  ))}
                </div>
              )}

              {/* Vehicle Grid */}
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {loading
                  ? null
                  : sortedVehicles.map((vehicle) => (
                      <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
              </div>

              {/* Pagination (UI kept same) */}
              <div className="flex items-center justify-center gap-2 mt-12">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <Button
                    key={page}
                    variant={page === 1 ? "accent" : "ghost"}
                    size="sm"
                    className="w-10"
                  >
                    {page}
                  </Button>
                ))}
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchPage;
