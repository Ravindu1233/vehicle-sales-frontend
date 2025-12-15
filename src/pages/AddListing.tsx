import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Car,
  FileText,
  Image as ImageIcon,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Upload,
  X,
  Plus,
} from "lucide-react";
import { carMakes, fuelTypes } from "@/data/mockVehicles";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";

const steps = [
  { id: 1, title: "Basic Info", icon: Car },
  { id: 2, title: "Specifications", icon: FileText },
  { id: 3, title: "Images", icon: ImageIcon },
  { id: 4, title: "Review", icon: CheckCircle },
];

const transmissionTypes = ["Automatic", "Manual", "CVT", "Semi-Automatic"];
const conditions = ["New", "Used"];
const bodyTypes = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Coupe",
  "Truck",
  "Van",
  "Wagon",
  "Convertible",
];

const commonFeatures = [
  "Air Conditioning",
  "Power Steering",
  "Power Windows",
  "ABS",
  "Airbags",
  "Sunroof",
  "Leather Seats",
  "Navigation System",
  "Bluetooth",
  "Backup Camera",
  "Cruise Control",
  "Alloy Wheels",
  "Keyless Entry",
  "Push Start",
  "Parking Sensors",
  "Lane Assist",
];

const AddListing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);

  // preview (base64 strings)
  const [images, setImages] = useState<string[]>([]);
  // real files for backend upload
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    transmission: "",
    fuelType: "",
    condition: "",
    color: "",
    description: "",
    location: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArr = Array.from(files);

      // keep files for uploading
      setImageFiles((prev) => [...prev, ...fileArr].slice(0, 10));

      // create preview for each file
      fileArr.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setImages((prev) => [...prev, event.target!.result as string].slice(0, 10));
          }
        };
        reader.readAsDataURL(file);
      });

      // reset input so same file can be selected again
      e.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    // backend required: title, make, model, year, price, location
    if (!formData.make || !formData.model || !formData.year || !formData.price || !formData.location) {
      toast({
        variant: "destructive",
        title: "Missing required fields",
        description: "Make, model, year, price, and location are required.",
      });
      setCurrentStep(1);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        variant: "destructive",
        title: "Login required",
        description: "Please login before creating a listing.",
      });
      navigate("/login");
      return;
    }

    try {
      setSubmitting(true);

      const fd = new FormData();

      // title required by backend
      fd.append("title", `${formData.year} ${formData.make} ${formData.model}`);

      fd.append("make", formData.make);
      fd.append("model", formData.model);
      fd.append("year", String(formData.year));
      fd.append("price", String(formData.price));
      fd.append("location", formData.location);

      // optional fields
      if (formData.mileage) fd.append("mileage", String(formData.mileage));
      if (formData.fuelType) fd.append("fuel_type", formData.fuelType);
      if (formData.transmission) fd.append("transmission", formData.transmission);
      if (formData.description) fd.append("description", formData.description);

      // schema uses "colour"
      if (formData.color) fd.append("colour", formData.color);

      // features array - backend supports JSON string too
      fd.append("features", JSON.stringify(selectedFeatures));

      // attach images using key "images" (must match upload.array("images", 10))
      imageFiles.slice(0, 10).forEach((file) => {
        fd.append("images", file);
      });

      await api.post("/api/listings", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast({
        title: "Listing Submitted!",
        description: "Your vehicle listing has been submitted for review.",
      });

      navigate("/dashboard");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to submit listing.";
      toast({
        variant: "destructive",
        title: "Submit failed",
        description: msg,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Add New Vehicle Listing
            </h1>
            <p className="text-muted-foreground">
              Fill in the details below to list your vehicle
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                        currentStep >= step.id
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <step.icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-sm mt-2 font-medium ${
                        currentStep >= step.id
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 w-16 sm:w-24 mx-2 rounded ${
                        currentStep > step.id ? "bg-accent" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-card rounded-xl border border-border p-6 sm:p-8">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Basic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="make">Make *</Label>
                    <Select
                      value={formData.make}
                      onValueChange={(value) => handleInputChange("make", value)}
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
                    <Label htmlFor="model">Model *</Label>
                    <Input
                      id="model"
                      placeholder="e.g., Civic, Camry"
                      value={formData.model}
                      onChange={(e) => handleInputChange("model", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year">Year *</Label>
                    <Select
                      value={formData.year}
                      onValueChange={(value) => handleInputChange("year", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price (LKR) *</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="e.g., 5500000"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition *</Label>
                    <Select
                      value={formData.condition}
                      onValueChange={(value) => handleInputChange("condition", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map((condition) => (
                          <SelectItem key={condition} value={condition}>
                            {condition}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Colombo, Sri Lanka"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Specifications */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Vehicle Specifications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="mileage">Mileage (km) *</Label>
                    <Input
                      id="mileage"
                      type="number"
                      placeholder="e.g., 45000"
                      value={formData.mileage}
                      onChange={(e) => handleInputChange("mileage", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transmission">Transmission *</Label>
                    <Select
                      value={formData.transmission}
                      onValueChange={(value) => handleInputChange("transmission", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select transmission" />
                      </SelectTrigger>
                      <SelectContent>
                        {transmissionTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fuelType">Fuel Type *</Label>
                    <Select
                      value={formData.fuelType}
                      onValueChange={(value) => handleInputChange("fuelType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        {fuelTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

   


                  <div className="space-y-2">
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      placeholder="e.g., Pearl White"
                      value={formData.color}
                      onChange={(e) => handleInputChange("color", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Features</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {commonFeatures.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox
                          id={feature}
                          checked={selectedFeatures.includes(feature)}
                          onCheckedChange={() => handleFeatureToggle(feature)}
                        />
                        <label
                          htmlFor={feature}
                          className="text-sm text-foreground cursor-pointer"
                        >
                          {feature}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your vehicle in detail..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Images */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Upload Images
                </h2>

                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-accent/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-foreground font-medium mb-1">
                      Drop images here or click to upload
                    </p>
                    <p className="text-sm text-muted-foreground">
                      PNG, JPG up to 10MB each
                    </p>
                  </label>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="relative group aspect-video rounded-lg overflow-hidden border border-border"
                      >
                        <img
                          src={image}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1 bg-destructive rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4 text-destructive-foreground" />
                        </button>
                        {index === 0 && (
                          <Badge className="absolute bottom-2 left-2" variant="default">
                            Primary
                          </Badge>
                        )}
                      </div>
                    ))}
                    <label
                      htmlFor="image-upload"
                      className="aspect-video rounded-lg border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-accent/50 transition-colors"
                    >
                      <Plus className="w-8 h-8 text-muted-foreground" />
                    </label>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Review Your Listing
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Images Preview */}
                  <div>
                    {images.length > 0 ? (
                      <img
                        src={images[0]}
                        alt="Vehicle"
                        className="w-full aspect-video object-cover rounded-lg border border-border"
                      />
                    ) : (
                      <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                    {images.length > 1 && (
                      <div className="flex gap-2 mt-2">
                        {images.slice(1, 4).map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt={`Preview ${i + 2}`}
                            className="w-16 h-16 object-cover rounded-md border border-border"
                          />
                        ))}
                        {images.length > 4 && (
                          <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                            <span className="text-sm text-muted-foreground">
                              +{images.length - 4}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {formData.year} {formData.make} {formData.model}
                      </h3>
                      <p className="text-3xl font-bold text-accent mt-1">
                        LKR {parseInt(formData.price || "0").toLocaleString()}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Mileage:</span>
                        <p className="font-medium text-foreground">
                          {parseInt(formData.mileage || "0").toLocaleString()} km
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Transmission:</span>
                        <p className="font-medium text-foreground">
                          {formData.transmission || "N/A"}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Fuel Type:</span>
                        <p className="font-medium text-foreground">
                          {formData.fuelType || "N/A"}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Condition:</span>
                        <p className="font-medium text-foreground">
                          {formData.condition || "N/A"}
                        </p>
                      </div>
                  
                      <div>
                        <span className="text-muted-foreground">Location:</span>
                        <p className="font-medium text-foreground">
                          {formData.location || "N/A"}
                        </p>
                      </div>
                    </div>

                    {selectedFeatures.length > 0 && (
                      <div>
                        <span className="text-muted-foreground text-sm">
                          Features:
                        </span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedFeatures.map((feature) => (
                            <Badge key={feature} variant="secondary">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {formData.description && (
                      <div>
                        <span className="text-muted-foreground text-sm">
                          Description:
                        </span>
                        <p className="text-foreground mt-1">
                          {formData.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1 || submitting}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              {currentStep < 4 ? (
                <Button onClick={nextStep} className="gap-2" disabled={submitting}>
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="gap-2" disabled={submitting}>
                  <CheckCircle className="w-4 h-4" />
                  {submitting ? "Submitting..." : "Submit Listing"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AddListing;
