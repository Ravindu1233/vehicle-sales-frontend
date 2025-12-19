import { useState, useEffect } from "react";
import {
  Bell,
  Plus,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Car,
  Edit2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import api from "@/lib/api";

interface Alert {
  _id: string;
  user_id: string;
  make: string;
  model: string;
  min_price: number;
  max_price: number;
  created_at: Date;
  active_status: boolean;
}

const Alerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [editingAlert, setEditingAlert] = useState<Alert | null>(null);
  const { toast } = useToast();

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

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await api.get("/api/alerts/mine");
      console.log("Fetched alerts:", res.data);
      setAlerts(res.data);
    } catch (error) {
      console.error("Failed to fetch alerts", error);
      toast({
        title: "Error",
        description: "Failed to fetch alerts. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCreateAlert = async () => {
    if (!selectedMake) {
      toast({
        title: "Error",
        description: "Please select a make",
        variant: "destructive",
      });
      return;
    }

    const newAlert = {
      make: selectedMake,
      model: selectedModel || "",
      min_price: minPrice ? parseInt(minPrice) : 0,
      max_price: maxPrice ? parseInt(maxPrice) : 0,
    };

    try {
      const res = await api.post("/api/alerts", newAlert);
      console.log("Created alert:", res.data);
      setAlerts([res.data, ...alerts]);
      setIsDialogOpen(false);
      resetForm();
      toast({
        title: "Alert Created",
        description: "You will be notified when matching vehicles are listed.",
      });
    } catch (error) {
      console.error("Failed to create alert", error);
      toast({
        title: "Error",
        description: "Failed to create alert. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditAlertSubmit = async () => {
    if (!selectedMake) {
      toast({
        title: "Error",
        description: "Please select a make",
        variant: "destructive",
      });
      return;
    }

    if (!editingAlert) {
      toast({
        title: "Error",
        description: "No alert selected for editing",
        variant: "destructive",
      });
      return;
    }

    const updatedAlert = {
      make: selectedMake,
      model: selectedModel || "",
      min_price: minPrice ? parseInt(minPrice) : 0,
      max_price: maxPrice ? parseInt(maxPrice) : 0,
      active_status: editingAlert.active_status,
    };

    try {
      console.log("Updating alert:", editingAlert._id, updatedAlert);
      const res = await api.put(
        `/api/alerts/${editingAlert._id}`,
        updatedAlert
      );
      console.log("Updated alert response:", res.data);
      setAlerts(
        alerts.map((alert) =>
          alert._id === editingAlert._id ? res.data : alert
        )
      );
      setIsDialogOpen(false);
      resetForm();
      toast({
        title: "Alert Updated",
        description: "The alert has been updated successfully.",
      });
    } catch (error) {
      console.error("Failed to update alert", error);
      toast({
        title: "Error",
        description: "Failed to update alert. Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setSelectedMake("");
    setSelectedModel("");
    setMinPrice("");
    setMaxPrice("");
    setEditingAlert(null);
  };

  const handleEditAlert = (alert: Alert) => {
    console.log("Editing alert:", alert);
    setEditingAlert(alert);
    setSelectedMake(alert.make);
    setSelectedModel(alert.model || "");
    setMinPrice(alert.min_price ? alert.min_price.toString() : "");
    setMaxPrice(alert.max_price ? alert.max_price.toString() : "");
    setIsDialogOpen(true);
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const toggleAlertStatus = async (id: string) => {
    console.log("Toggling alert status for ID:", id);
    const alert = alerts.find((a) => a._id === id);
    if (!alert) {
      toast({
        title: "Error",
        description: "Alert not found",
        variant: "destructive",
      });
      return;
    }

    const updatedAlert = {
      make: alert.make,
      model: alert.model || "",
      min_price: alert.min_price,
      max_price: alert.max_price,
      active_status: !alert.active_status,
    };

    try {
      console.log("Sending update:", id, updatedAlert);
      const res = await api.put(`/api/alerts/${id}`, updatedAlert);
      console.log("Toggle response:", res.data);
      setAlerts(alerts.map((a) => (a._id === id ? res.data : a)));
      toast({
        title: "Alert Updated",
        description: `Alert ${
          res.data.active_status ? "activated" : "paused"
        } successfully.`,
      });
    } catch (error) {
      console.error("Failed to update alert", error);
      toast({
        title: "Error",
        description: "Failed to update alert status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const deleteAlert = async (id: string) => {
    console.log("Deleting alert ID:", id);
    if (!id) {
      toast({
        title: "Error",
        description: "Alert ID is missing.",
        variant: "destructive",
      });
      return;
    }

    try {
      await api.delete(`/api/alerts/${id}`);
      setAlerts(alerts.filter((alert) => alert._id !== id));
      toast({
        title: "Alert Deleted",
        description: "The alert has been removed successfully.",
      });
    } catch (error) {
      console.error("Failed to delete alert", error);
      toast({
        title: "Error",
        description: "Failed to delete alert. Please try again.",
        variant: "destructive",
      });
    }
  };

  const activeAlerts = alerts.filter((a) => a.active_status).length;

  const formatPrice = (price: number) => {
    return price ? `Rs ${price.toLocaleString()}` : "Any";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Alerts</h1>
          <p className="text-muted-foreground">
            Get notified when vehicles matching your criteria are listed
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={() => resetForm()}>
              <Plus className="h-4 w-4" />
              Create Alert
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingAlert ? "Edit Alert" : "Create New Alert"}
              </DialogTitle>
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
                  <Label htmlFor="minPrice">Min Price (LKR)</Label>
                  <Input
                    id="minPrice"
                    type="number"
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxPrice">Max Price (LKR)</Label>
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
              <Button
                variant="outline"
                onClick={() => handleDialogOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={
                  editingAlert ? handleEditAlertSubmit : handleCreateAlert
                }
              >
                {editingAlert ? "Update Alert" : "Create Alert"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

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
              key={alert._id}
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
                      Price Range: {formatPrice(alert.min_price)} -{" "}
                      {formatPrice(alert.max_price)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Created: {new Date(alert.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleAlertStatus(alert._id)}
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditAlert(alert)}
                  >
                    <Edit2 className="h-4 w-4" />
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
                          onClick={() => deleteAlert(alert._id)}
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
