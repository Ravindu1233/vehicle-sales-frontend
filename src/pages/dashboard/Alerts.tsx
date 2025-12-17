import { useState } from "react";
import { Bell, Plus, Trash2, ToggleLeft, ToggleRight, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: string;
  user_id: string;
  make: string;
  model: string;
  min_price: number;
  max_price: number;
  created_at: Date;
  active_status: boolean;
}

const carMakes = [
  "Toyota",
  "Honda",
  "Ford",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Chevrolet",
  "Nissan",
  "Hyundai",
  "Kia",
];

const carModels: Record<string, string[]> = {
  Toyota: ["Camry", "Corolla", "RAV4", "Highlander", "Prius"],
  Honda: ["Civic", "Accord", "CR-V", "Pilot", "HR-V"],
  Ford: ["F-150", "Mustang", "Explorer", "Escape", "Focus"],
  BMW: ["3 Series", "5 Series", "X3", "X5", "7 Series"],
  "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLE", "GLC"],
  Audi: ["A4", "A6", "Q5", "Q7", "A3"],
  Chevrolet: ["Silverado", "Malibu", "Equinox", "Tahoe", "Camaro"],
  Nissan: ["Altima", "Sentra", "Rogue", "Pathfinder", "Maxima"],
  Hyundai: ["Elantra", "Sonata", "Tucson", "Santa Fe", "Kona"],
  Kia: ["Optima", "Forte", "Sportage", "Sorento", "Telluride"],
};

// Mock alerts data
const initialAlerts: Alert[] = [
  {
    id: "1",
    user_id: "user1",
    make: "Toyota",
    model: "Camry",
    min_price: 15000,
    max_price: 30000,
    created_at: new Date("2024-01-15"),
    active_status: true,
  },
  {
    id: "2",
    user_id: "user1",
    make: "Honda",
    model: "Civic",
    min_price: 10000,
    max_price: 25000,
    created_at: new Date("2024-02-20"),
    active_status: true,
  },
  {
    id: "3",
    user_id: "user1",
    make: "BMW",
    model: "3 Series",
    min_price: 25000,
    max_price: 50000,
    created_at: new Date("2024-03-10"),
    active_status: false,
  },
];

const Alerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const { toast } = useToast();

  const handleCreateAlert = () => {
    if (!selectedMake) {
      toast({
        title: "Error",
        description: "Please select a make",
        variant: "destructive",
      });
      return;
    }

    const newAlert: Alert = {
      id: Date.now().toString(),
      user_id: "user1",
      make: selectedMake,
      model: selectedModel,
      min_price: minPrice ? parseInt(minPrice) : 0,
      max_price: maxPrice ? parseInt(maxPrice) : 0,
      created_at: new Date(),
      active_status: true,
    };

    setAlerts([newAlert, ...alerts]);
    setIsDialogOpen(false);
    resetForm();
    toast({
      title: "Alert Created",
      description: "You will be notified when matching vehicles are listed.",
    });
  };

  const resetForm = () => {
    setSelectedMake("");
    setSelectedModel("");
    setMinPrice("");
    setMaxPrice("");
  };

  const toggleAlertStatus = (id: string) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id
          ? { ...alert, active_status: !alert.active_status }
          : alert
      )
    );
    toast({
      title: "Alert Updated",
      description: "Alert status has been changed.",
    });
  };

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
    toast({
      title: "Alert Deleted",
      description: "The alert has been removed.",
    });
  };

  const activeAlerts = alerts.filter((a) => a.active_status).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Alerts</h1>
          <p className="text-muted-foreground">
            Get notified when vehicles matching your criteria are listed
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Alert
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Alert</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="make">Make</Label>
                <Select
                  value={selectedMake}
                  onValueChange={(value) => {
                    setSelectedMake(value);
                    setSelectedModel("");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select make" />
                  </SelectTrigger>
                  <SelectContent>
                    {carMakes.map((make) => (
                      <SelectItem key={make} value={make}>
                        {make}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model (Optional)</Label>
                <Select
                  value={selectedModel}
                  onValueChange={setSelectedModel}
                  disabled={!selectedMake}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedMake &&
                      carModels[selectedMake]?.map((model) => (
                        <SelectItem key={model} value={model}>
                          {model}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minPrice">Min Price ($)</Label>
                  <Input
                    id="minPrice"
                    type="number"
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxPrice">Max Price ($)</Label>
                  <Input
                    id="maxPrice"
                    type="number"
                    placeholder="Any"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateAlert}>Create Alert</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-primary/10 p-3">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{alerts.length}</p>
              <p className="text-sm text-muted-foreground">Total Alerts</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-green-500/10 p-3">
              <ToggleRight className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{activeAlerts}</p>
              <p className="text-sm text-muted-foreground">Active Alerts</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-full bg-muted p-3">
              <ToggleLeft className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {alerts.length - activeAlerts}
              </p>
              <p className="text-sm text-muted-foreground">Paused Alerts</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No Alerts Yet</h3>
              <p className="text-muted-foreground text-center max-w-sm mt-2">
                Create your first alert to get notified when vehicles matching
                your criteria are listed.
              </p>
            </CardContent>
          </Card>
        ) : (
          alerts.map((alert) => (
            <Card
              key={alert.id}
              className={!alert.active_status ? "opacity-60" : ""}
            >
              <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Car className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">
                        {alert.make} {alert.model && `- ${alert.model}`}
                      </h3>
                      <Badge
                        variant={alert.active_status ? "default" : "secondary"}
                      >
                        {alert.active_status ? "Active" : "Paused"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Price Range: ${alert.min_price.toLocaleString()} -{" "}
                      {alert.max_price
                        ? `$${alert.max_price.toLocaleString()}`
                        : "Any"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Created: {alert.created_at.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleAlertStatus(alert.id)}
                  >
                    {alert.active_status ? (
                      <>
                        <ToggleLeft className="h-4 w-4 mr-1" />
                        Pause
                      </>
                    ) : (
                      <>
                        <ToggleRight className="h-4 w-4 mr-1" />
                        Activate
                      </>
                    )}
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Alert</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this alert? You will
                          no longer receive notifications for {alert.make}{" "}
                          {alert.model}.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteAlert(alert.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Alerts;
