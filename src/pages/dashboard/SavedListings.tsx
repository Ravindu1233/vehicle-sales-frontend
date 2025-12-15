import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import api from "@/lib/api";

const SavedListings = () => {
  const [savedVehicles, setSavedVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Load saved listings from backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return; // not logged in -> show empty state

    const fetchFavorites = async () => {
      setLoading(true);
      setError("");

      try {
        // GET /api/favorites/mine (protect route)
        const res = await api.get("/api/favorites/mine");

        // backend returns: [{ _id, user_id, listing_id: { ...VehicleListing } }]
        const listings = Array.isArray(res.data)
          ? res.data.map((f: any) => f?.listing_id).filter(Boolean)
          : [];

        setSavedVehicles(listings);
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            err?.response?.data?.error ||
            "Failed to load saved listings."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // ✅ Remove one favorite
  const handleRemove = async (listingId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to manage favorites");
      return;
    }

    try {
      await api.delete(`/api/favorites/${listingId}`);
      setSavedVehicles((prev) => prev.filter((v) => v?._id !== listingId));
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to remove favorite");
    }
  };

  // ✅ Clear all favorites
  const handleClearAll = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to manage favorites");
      return;
    }

    try {
      await Promise.all(
        savedVehicles.map((v) => api.delete(`/api/favorites/${v?._id}`))
      );
      setSavedVehicles([]);
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to clear favorites");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Saved Listings</h1>
          <p className="text-muted-foreground mt-1">
            {loading ? "Loading..." : `${savedVehicles.length} vehicles saved`}
          </p>
        </div>

        {!loading && savedVehicles.length > 0 && (
          <Button
            variant="ghost"
            className="text-destructive"
            onClick={handleClearAll}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {/* Error */}
      {error ? (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {/* Vehicle Grid */}
      {!loading && savedVehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {savedVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle?._id}
              vehicle={vehicle}
              isSaved={true}
              onSave={() => handleRemove(vehicle?._id)}
            />
          ))}
        </div>
      ) : loading ? null : (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Heart className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              No saved listings yet
            </h2>
            <p className="text-muted-foreground mb-6">
              Start browsing and save vehicles you're interested in to see them
              here.
            </p>
            <Button variant="accent" asChild>
              <Link to="/search">Browse Vehicles</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedListings;
