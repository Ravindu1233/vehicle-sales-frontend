import { Link } from "react-router-dom";
import { Heart, Fuel, Gauge, Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Vehicle {
  id: string;
  title: string;
  price: number;
  year: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  location: string;
  image: string;
  source: string;
  isVerified?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
}

interface VehicleCardProps {
  vehicle: Vehicle;
  onSave?: (id: string) => void;
  isSaved?: boolean;
  className?: string;
}

export function VehicleCard({
  vehicle,
  onSave,
  isSaved = false,
  className,
}: VehicleCardProps) {
  // ✅ LKR price formatting
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat("en-US").format(mileage);
  };

  return (
    <div className={cn("vehicle-card group", className)}>
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={vehicle.image}
          alt={vehicle.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {vehicle.isVerified && <Badge variant="verified">Verified</Badge>}
          {vehicle.isFeatured && <Badge variant="featured">Featured</Badge>}
          {vehicle.isNew && <Badge variant="new">New</Badge>}
        </div>

        {/* Source Badge */}
        <Badge variant="source" className="absolute bottom-3 left-3">
          {vehicle.source}
        </Badge>

        {/* ❤️ Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault(); // stop card navigation
            e.stopPropagation();
            onSave?.(vehicle.id);
          }}
          aria-label="Save to favorites"
          className={cn(
            "absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow",
            isSaved
              ? "bg-red-500 text-white"
              : "bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-red-500 hover:bg-background"
          )}
        >
          <Heart
            className={cn(
              "w-5 h-5 transition-colors",
              isSaved && "fill-current"
            )}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Price & Title */}
        <div>
          <p className="price-tag">{formatPrice(vehicle.price)}</p>
          <Link to={`/vehicle/${vehicle.id}`}>
            <h3 className="font-semibold text-foreground hover:text-accent transition-colors line-clamp-1">
              {vehicle.title}
            </h3>
          </Link>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="spec-item flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{vehicle.year}</span>
          </div>
          <div className="spec-item flex items-center gap-1">
            <Gauge className="w-4 h-4" />
            <span>{formatMileage(vehicle.mileage)} km</span>
          </div>
          <div className="spec-item flex items-center gap-1">
            <Fuel className="w-4 h-4" />
            <span>{vehicle.fuelType}</span>
          </div>
          <div className="spec-item flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{vehicle.location}</span>
          </div>
        </div>

        {/* Action */}
        <Button variant="outline" className="w-full" asChild>
          <Link to={`/vehicle/${vehicle.id}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
}
