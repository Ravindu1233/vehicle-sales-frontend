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

export function VehicleCard({ vehicle, onSave, isSaved = false, className }: VehicleCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
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
          {vehicle.isVerified && (
            <Badge variant="verified">Verified</Badge>
          )}
          {vehicle.isFeatured && (
            <Badge variant="featured">Featured</Badge>
          )}
          {vehicle.isNew && (
            <Badge variant="new">New</Badge>
          )}
        </div>

        {/* Source Badge */}
        <Badge variant="source" className="absolute bottom-3 left-3">
          {vehicle.source}
        </Badge>

        {/* Save Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onSave?.(vehicle.id);
          }}
          className={cn(
            "absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all",
            isSaved
              ? "bg-destructive text-destructive-foreground"
              : "bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-destructive hover:bg-background"
          )}
        >
          <Heart className={cn("w-5 h-5", isSaved && "fill-current")} />
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
          <div className="spec-item">
            <Calendar className="w-4 h-4" />
            <span>{vehicle.year}</span>
          </div>
          <div className="spec-item">
            <Gauge className="w-4 h-4" />
            <span>{formatMileage(vehicle.mileage)} mi</span>
          </div>
          <div className="spec-item">
            <Fuel className="w-4 h-4" />
            <span>{vehicle.fuelType}</span>
          </div>
          <div className="spec-item">
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
