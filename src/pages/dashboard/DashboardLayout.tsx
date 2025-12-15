import { useEffect, useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  Heart,
  Bell,
  Clock,
  Sparkles,
  Settings,
  User,
  Menu,
  X,
  Car,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import api from "@/lib/api";

/* ❌ REMOVED hardcoded count for listings */
const sidebarItems = [
  { href: "/dashboard", label: "Overview", icon: Sparkles },
  { href: "/dashboard/listings", label: "My Listings", icon: Car },
  { href: "/dashboard/saved", label: "Saved Listings", icon: Heart, count: 12 },
  { href: "/dashboard/alerts", label: "Alerts", icon: Bell, count: 3 },
  { href: "/dashboard/history", label: "Recently Viewed", icon: Clock },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

const DashboardLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ✅ REAL listing count */
  const [myListingsCount, setMyListingsCount] = useState<number>(0);

  /* ✅ Fetch logged-in user's listings */
  useEffect(() => {
    const fetchMyListingsCount = async () => {
      try {
        const res = await api.get("/api/listings/mine");
        setMyListingsCount(Array.isArray(res.data) ? res.data.length : 0);
      } catch (error) {
        console.error("Failed to fetch listing count");
      }
    };

    fetchMyListingsCount();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />

      <div className="flex-1 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Mobile Sidebar Toggle */}
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full shadow-lg"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>

            {/* Sidebar */}
            <aside
              className={cn(
                "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-card border-r border-border lg:border lg:rounded-xl transform transition-transform lg:transform-none",
                sidebarOpen
                  ? "translate-x-0"
                  : "-translate-x-full lg:translate-x-0"
              )}
            >
              <div className="h-full lg:h-auto p-4 pt-20 lg:pt-4 overflow-y-auto">
                {/* User Info */}
                <div className="flex items-center gap-3 p-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                    <span className="text-lg font-bold text-accent-foreground">
                      JD
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">John Doe</p>
                    <p className="text-sm text-muted-foreground">
                      john@example.com
                    </p>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                  {sidebarItems.map((item) => {
                    const count =
                      item.href === "/dashboard/listings"
                        ? myListingsCount
                        : item.count;

                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                          "flex items-center justify-between px-4 py-3 rounded-lg transition-colors",
                          location.pathname === item.href
                            ? "bg-accent/10 text-accent"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                        </div>

                        {typeof count === "number" && count > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {count}
                          </Badge>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Overlay */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-foreground/50 z-30 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              <Outlet />
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
