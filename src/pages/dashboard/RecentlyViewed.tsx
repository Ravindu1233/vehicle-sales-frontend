import { useState } from "react";
import { Clock, Trash2, Eye, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { mockVehicles } from "@/data/mockVehicles";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface ViewedVehicle {
  id: string;
  vehicle: typeof mockVehicles[0];
  viewedAt: Date;
}

const RecentlyViewed = () => {
  const { toast } = useToast();
  
  // Mock recently viewed data with timestamps
  const [viewedVehicles, setViewedVehicles] = useState<ViewedVehicle[]>(
    mockVehicles.slice(0, 6).map((vehicle, index) => ({
      id: `viewed-${vehicle.id}`,
      vehicle,
      viewedAt: new Date(Date.now() - index * 1000 * 60 * 60 * (index + 1)), // Stagger times
    }))
  );

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  const handleRemove = (id: string) => {
    setViewedVehicles((prev) => prev.filter((item) => item.id !== id));
    toast({
      title: "Removed from history",
      description: "Vehicle has been removed from your recently viewed.",
    });
  };

  const handleClearAll = () => {
    setViewedVehicles([]);
    toast({
      title: "History cleared",
      description: "All recently viewed vehicles have been cleared.",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Recently Viewed</h1>
          <p className="text-muted-foreground mt-1">
            Vehicles you've viewed recently
          </p>
        </div>
        {viewedVehicles.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear History
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear viewing history?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove all vehicles from your recently viewed list.
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleClearAll}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Clear All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Eye className="w-5 h-5 text-accent" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{viewedVehicles.length}</p>
          <p className="text-sm text-muted-foreground">Total Viewed</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-success" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {viewedVehicles.filter((v) => {
              const hourAgo = new Date(Date.now() - 1000 * 60 * 60 * 24);
              return v.viewedAt > hourAgo;
            }).length}
          </p>
          <p className="text-sm text-muted-foreground">Last 24 Hours</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-6 col-span-2 md:col-span-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-warning" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {viewedVehicles.filter((v) => {
              const weekAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);
              return v.viewedAt > weekAgo;
            }).length}
          </p>
          <p className="text-sm text-muted-foreground">Last 7 Days</p>
        </div>
      </div>

      {/* Vehicle List */}
      {viewedVehicles.length > 0 ? (
        <div className="space-y-4">
          {viewedVehicles.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-xl border border-border p-4"
            >
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Vehicle Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Clock className="w-4 h-4" />
                    <span>Viewed {formatTimeAgo(item.viewedAt)}</span>
                  </div>
                  <VehicleCard vehicle={item.vehicle} />
                </div>
                
                {/* Actions */}
                <div className="flex lg:flex-col gap-2 lg:justify-start">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleRemove(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No recently viewed vehicles
          </h3>
          <p className="text-muted-foreground mb-6">
            Vehicles you view will appear here for easy access
          </p>
          <Button asChild>
            <a href="/search">Browse Vehicles</a>
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentlyViewed;
