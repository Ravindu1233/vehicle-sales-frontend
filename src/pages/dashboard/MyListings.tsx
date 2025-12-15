import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, Eye, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import api from "@/lib/api";

type BackendListing = any;

type UiListing = {
  id: string;
  title: string;
  year: number;
  mileage: number;
  price: number;
  image: string;
  admin_status: "pending" | "approved" | "rejected";
};

const MyListings = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<string | null>(null);

  // ✅ backend data
  const [listings, setListings] = useState<UiListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ helper: convert /uploads/file.jpg -> full URL
  const apiUrl = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // ✅ Fetch user's own listings (protected route)
  useEffect(() => {
    const fetchMine = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/api/listings/mine");
        const data: BackendListing[] = Array.isArray(res.data) ? res.data : [];

        const mapped: UiListing[] = data.map((l: any) => {
          const firstImgPath =
            l?.images?.[0]?.image_url ||
            l?.images?.[0]?.url ||
            (typeof l?.images?.[0] === "string" ? l.images[0] : "") ||
            "";

          const image =
            typeof firstImgPath === "string" &&
            firstImgPath.startsWith("/uploads")
              ? `${apiUrl}${firstImgPath}`
              : firstImgPath || "";

          return {
            id: l?._id || l?.id,
            title:
              l?.title ||
              `${l?.year || ""} ${l?.make || ""} ${l?.model || ""}`.trim(),
            year: Number(l?.year) || 0,
            mileage: Number(l?.mileage) || 0,
            price: Number(l?.price) || 0,
            image,
            admin_status: (l?.admin_status ||
              "pending") as UiListing["admin_status"],
          };
        });

        setListings(mapped);
      } catch (err: any) {
        const msg =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to load your listings.";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchMine();
  }, [apiUrl]);

  const userListings = listings; // keep your variable name usage

  const handleDelete = (id: string) => {
    setSelectedListing(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedListing) return;

    try {
      await api.delete(`/api/listings/${selectedListing}`);
      setListings((prev) => prev.filter((l) => l.id !== selectedListing));
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to delete listing.";
      setError(msg);
    } finally {
      setDeleteDialogOpen(false);
      setSelectedListing(null);
    }
  };

  // ✅ Stats
  const stats = useMemo(() => {
    const total = userListings.length;
    const active = userListings.filter(
      (l) => l.admin_status === "approved"
    ).length;
    const pending = userListings.filter(
      (l) => l.admin_status === "pending"
    ).length;

    return { total, active, pending };
  }, [userListings]);

  const statusBadge = (status: UiListing["admin_status"]) => {
    if (status === "approved") {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          Approved
        </Badge>
      );
    }
    if (status === "rejected") {
      return (
        <Badge variant="secondary" className="bg-red-100 text-red-800">
          Rejected
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
        Pending
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Listings</h1>
          <p className="text-muted-foreground">Manage your vehicle listings</p>
        </div>
        <Button asChild className="gap-2">
          <Link to="/add-listing">
            <Plus className="w-4 h-4" />
            Add New Listing
          </Link>
        </Button>
      </div>

      {/* Error */}
      {error ? (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Listings</p>
            <p className="text-2xl font-bold text-foreground">
              {loading ? "…" : stats.total}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Active</p>
            <p className="text-2xl font-bold text-green-600">
              {loading ? "…" : stats.active}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {loading ? "…" : stats.pending}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Views</p>
            <p className="text-2xl font-bold text-foreground">—</p>
          </CardContent>
        </Card>
      </div>

      {/* Listings Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left p-4 font-medium text-muted-foreground">
                    Vehicle
                  </th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">
                    Price
                  </th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden sm:table-cell">
                    Status
                  </th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">
                    Views
                  </th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">
                    Inquiries
                  </th>
                  <th className="text-right p-4 font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {loading ? (
                  <tr>
                    <td className="p-6 text-muted-foreground" colSpan={6}>
                      Loading your listings...
                    </td>
                  </tr>
                ) : (
                  userListings.map((listing) => (
                    <tr
                      key={listing.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={listing.image || "/placeholder-car.jpg"}
                            alt={listing.title}
                            className="w-16 h-12 object-cover rounded-lg"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                "/placeholder-car.jpg";
                            }}
                          />
                          <div>
                            <p className="font-medium text-foreground line-clamp-1">
                              {listing.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {listing.year || "—"} •{" "}
                              {listing.mileage
                                ? listing.mileage.toLocaleString()
                                : "—"}{" "}
                              km
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 hidden md:table-cell">
                        <span className="font-semibold text-foreground">
                          {formatPrice(listing.price)}
                        </span>
                      </td>

                      <td className="p-4 hidden sm:table-cell">
                        {statusBadge(listing.admin_status)}
                      </td>

                      <td className="p-4 hidden lg:table-cell">
                        <span className="text-muted-foreground">—</span>
                      </td>

                      <td className="p-4 hidden lg:table-cell">
                        <span className="text-muted-foreground">—</span>
                      </td>

                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link
                                to={`/vehicle/${listing.id}`}
                                className="flex items-center gap-2"
                              >
                                <Eye className="w-4 h-4" />
                                View
                              </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild>
                              <Link
                                to={`/edit-listing/${listing.id}`}
                                className="flex items-center gap-2"
                              >
                                <Edit className="w-4 h-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              className="flex items-center gap-2 text-destructive focus:text-destructive"
                              onClick={() => handleDelete(listing.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!loading && userListings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                You haven't created any listings yet
              </p>
              <Button asChild>
                <Link to="/add-listing">Create Your First Listing</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Listing</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this listing? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyListings;
