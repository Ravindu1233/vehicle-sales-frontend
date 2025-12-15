import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { mockVehicles } from "@/data/mockVehicles";

const SavedListings = () => {
  const [savedVehicles, setSavedVehicles] = useState(mockVehicles.slice(0, 6));

  const handleRemove = (id: string) => {
    setSavedVehicles((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Saved Listings</h1>
          <p className="text-muted-foreground mt-1">
            {savedVehicles.length} vehicles saved
          </p>
        </div>
        {savedVehicles.length > 0 && (
          <Button variant="ghost" className="text-destructive">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {/* Vehicle Grid */}
      {savedVehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {savedVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              isSaved={true}
              onSave={() => handleRemove(vehicle.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Heart className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              No saved listings yet
            </h2>
            <p className="text-muted-foreground mb-6">
              Start browsing and save vehicles you're interested in to see them here.
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

import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default SavedListings;
