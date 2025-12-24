import { useState } from "react";
import { Eye, Mail, Phone, MapPin, Calendar } from "lucide-react";
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

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinedAt: string;
  listingsCount: number;
  status: "active" | "inactive";
  avatar: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "Los Angeles, CA",
    joinedAt: "2023-06-15",
    listingsCount: 5,
    status: "active",
    avatar: "JD",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    joinedAt: "2023-08-22",
    listingsCount: 3,
    status: "active",
    avatar: "JS",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1 (555) 345-6789",
    location: "New York, NY",
    joinedAt: "2023-09-10",
    listingsCount: 8,
    status: "active",
    avatar: "MJ",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+1 (555) 456-7890",
    location: "Chicago, IL",
    joinedAt: "2023-11-05",
    listingsCount: 2,
    status: "inactive",
    avatar: "SW",
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@example.com",
    phone: "+1 (555) 567-8901",
    location: "Miami, FL",
    joinedAt: "2024-01-02",
    listingsCount: 1,
    status: "active",
    avatar: "DB",
  },
];

const AdminUsers = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleView = (user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const getStatusBadge = (status: User["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/20 text-success border-success/30">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Manage Users</h1>
        <p className="text-muted-foreground">View user information (read-only)</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Listings</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-accent-foreground">
                        {user.avatar}
                      </div>
                      {user.name}
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.location}</TableCell>
                  <TableCell>{user.listingsCount}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.joinedAt}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleView(user)}
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

      {/* View Details Dialog - View Only, No Actions */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              {/* User Avatar */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-xl font-bold text-accent-foreground">
                  {selectedUser.avatar}
                </div>
                <div>
                  <p className="text-lg font-semibold">{selectedUser.name}</p>
                  {getStatusBadge(selectedUser.status)}
                </div>
              </div>

              {/* User Info */}
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedUser.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{selectedUser.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{selectedUser.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Joined</p>
                    <p className="font-medium">{selectedUser.joinedAt}</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="pt-4 border-t border-border">
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Total Listings</p>
                  <p className="text-2xl font-bold text-foreground">{selectedUser.listingsCount}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsers;
