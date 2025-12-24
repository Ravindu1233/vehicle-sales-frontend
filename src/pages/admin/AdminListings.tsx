import { useState } from "react";
import { Eye, CheckCircle, XCircle, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Listing {
  id: string;
  title: string;
  seller: string;
  price: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  image: string;
  year: number;
  mileage: string;
  location: string;
}

const mockListings: Listing[] = [
  {
    id: "1",
    title: "2023 Toyota Camry XSE",
    seller: "John Doe",
    price: "$35,000",
    status: "pending",
    submittedAt: "2024-01-15",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400",
    year: 2023,
    mileage: "12,000 mi",
    location: "Los Angeles, CA",
  },
  {
    id: "2",
    title: "2022 Honda Accord Sport",
    seller: "Jane Smith",
    price: "$32,500",
    status: "pending",
    submittedAt: "2024-01-14",
    image: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=400",
    year: 2022,
    mileage: "18,500 mi",
    location: "San Francisco, CA",
  },
  {
    id: "3",
    title: "2021 BMW 3 Series",
    seller: "Mike Johnson",
    price: "$42,000",
    status: "approved",
    submittedAt: "2024-01-13",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400",
    year: 2021,
    mileage: "25,000 mi",
    location: "New York, NY",
  },
  {
    id: "4",
    title: "2020 Mercedes-Benz C-Class",
    seller: "Sarah Williams",
    price: "$38,500",
    status: "rejected",
    submittedAt: "2024-01-12",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400",
    year: 2020,
    mileage: "32,000 mi",
    location: "Chicago, IL",
  },
  {
    id: "5",
    title: "2023 Audi A4 Premium",
    seller: "David Brown",
    price: "$45,000",
    status: "pending",
    submittedAt: "2024-01-11",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400",
    year: 2023,
    mileage: "8,000 mi",
    location: "Miami, FL",
  },
];

const AdminListings = () => {
  const [listings, setListings] = useState<Listing[]>(mockListings);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleView = (listing: Listing) => {
    setSelectedListing(listing);
    setIsDialogOpen(true);
  };

  const handleApprove = (id: string) => {
    setListings((prev) =>
      prev.map((listing) =>
        listing.id === id ? { ...listing, status: "approved" as const } : listing
      )
    );
    setIsDialogOpen(false);
    toast({
      title: "Listing Approved",
      description: "The listing has been approved successfully.",
    });
  };

  const handleReject = (id: string) => {
    setListings((prev) =>
      prev.map((listing) =>
        listing.id === id ? { ...listing, status: "rejected" as const } : listing
      )
    );
    setIsDialogOpen(false);
    toast({
      title: "Listing Rejected",
      description: "The listing has been rejected.",
      variant: "destructive",
    });
  };

  const getStatusBadge = (status: Listing["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "approved":
        return <Badge className="bg-success/20 text-success border-success/30">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Manage Listings</h1>
        <p className="text-muted-foreground">Review and approve/reject vehicle listings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listings.map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell className="font-medium">{listing.title}</TableCell>
                  <TableCell>{listing.seller}</TableCell>
                  <TableCell>{listing.price}</TableCell>
                  <TableCell>{getStatusBadge(listing.status)}</TableCell>
                  <TableCell>{listing.submittedAt}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleView(listing)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Listing Details</DialogTitle>
          </DialogHeader>
          {selectedListing && (
            <div className="space-y-4">
              <img
                src={selectedListing.image}
                alt={selectedListing.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Title</p>
                  <p className="font-medium">{selectedListing.title}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Seller</p>
                  <p className="font-medium">{selectedListing.seller}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="font-medium">{selectedListing.price}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Year</p>
                  <p className="font-medium">{selectedListing.year}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mileage</p>
                  <p className="font-medium">{selectedListing.mileage}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{selectedListing.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  {getStatusBadge(selectedListing.status)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Submitted</p>
                  <p className="font-medium">{selectedListing.submittedAt}</p>
                </div>
              </div>

              {/* Approve/Reject Buttons */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <Button
                  className="flex-1 bg-success hover:bg-success/90"
                  onClick={() => handleApprove(selectedListing.id)}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => handleReject(selectedListing.id)}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminListings;
