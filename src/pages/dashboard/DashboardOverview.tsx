import { Link } from "react-router-dom";
import { Heart, Bell, Clock, Eye, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { mockVehicles } from "@/data/mockVehicles";

const stats = [
  { label: "Saved Listings", value: 12, icon: Heart, color: "text-destructive" },
  { label: "Active Alerts", value: 3, icon: Bell, color: "text-accent" },
  { label: "Recently Viewed", value: 28, icon: Clock, color: "text-success" },
  { label: "Total Views", value: 156, icon: Eye, color: "text-warning" },
];

const DashboardOverview = () => {
  const recentVehicles = mockVehicles.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's what's happening with your searches.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card rounded-xl border border-border p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <TrendingUp className="w-4 h-4 text-success" />
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            Recently Viewed
          </h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard/history">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-accent to-blue-600 rounded-xl p-6 text-accent-foreground">
          <h3 className="text-xl font-semibold mb-2">Set Up Alerts</h3>
          <p className="text-accent-foreground/80 mb-4">
            Get notified instantly when vehicles matching your criteria are listed.
          </p>
          <Button variant="glass" asChild>
            <Link to="/dashboard/alerts">Create Alert</Link>
          </Button>
        </div>
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Complete Your Profile
          </h3>
          <p className="text-muted-foreground mb-4">
            Add your contact preferences to receive better recommendations.
          </p>
          <Button variant="outline" asChild>
            <Link to="/dashboard/profile">Update Profile</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
