import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { mockVehicles } from "@/data/mockVehicles";

export function TrendingCars() {
  const trendingVehicles = mockVehicles.slice(0, 4);

  return (
    <section className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Top Picks
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground">
              Trending Vehicles
            </h2>
            <p className="mt-2 text-muted-foreground">
              Explore the most popular vehicles on our platform right now.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/search">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingVehicles.map((vehicle, index) => (
            <div
              key={vehicle.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <VehicleCard vehicle={vehicle} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-card border border-border">
            <div className="text-center sm:text-left">
              <p className="text-lg font-semibold text-foreground">
                Can't find what you're looking for?
              </p>
              <p className="text-muted-foreground">
                Set up alerts and get notified when matching vehicles are listed.
              </p>
            </div>
            <Button variant="accent" size="lg" asChild>
              <Link to="/dashboard/alerts">Create Alert</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
