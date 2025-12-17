import { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Lock, Edit2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import api from "@/lib/api"; // Assuming api is set up to handle requests

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  profileImage: string; // Add profile image URL
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null); // Initially null until data is fetched
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null); // Store the new profile image file

  // Fetch user profile from API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/users/me");
        const userData = res.data;
        const fetchedProfile: UserProfile = {
          firstName: userData.first_name,
          lastName: userData.last_name,
          email: userData.email,
          phone: userData.contact_number || "",
          address: userData.address || "",
          city: userData.city || "",
          state: userData.state || "",
          zipCode: userData.zip_code || "",
          profileImage: userData.profile_image || "", // Set the profile image URL
        };
        setProfile(fetchedProfile);
        setEditedProfile(fetchedProfile);
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const data = new FormData();
      // Append all fields to FormData, including the profile image if it exists
      data.append("first_name", editedProfile?.firstName || "");
      data.append("last_name", editedProfile?.lastName || "");
      data.append("email", editedProfile?.email || "");
      data.append("contact_number", editedProfile?.phone || "");
      data.append("address", editedProfile?.address || "");
      data.append("city", editedProfile?.city || "");
      data.append("zip_code", editedProfile?.zipCode || "");

      if (profileImage) {
        data.append("profile_image", profileImage); // Append the profile image if available
      }

      // Send the updated profile to the backend
      await api.put("/api/users/me", data, {
        headers: {
          "Content-Type": "multipart/form-data", // Set correct header for FormData
        },
      });

      setProfile(editedProfile);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile); // Reset to the original profile
    setIsEditing(false);
  };

  const handleChange = (field: keyof UserProfile, value: string) => {
    if (editedProfile) {
      setEditedProfile((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file); // Set the new profile image
    }
  };

  if (!profile) return <div>Loading...</div>; // Show loading state until profile data is fetched

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information
          </p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="gap-2">
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel} className="gap-2">
              <X className="w-4 h-4" />
              Cancel
            </Button>
            <Button onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24">
              {/* Display profile image if available */}
              <AvatarImage
                src={
                  profile.profileImage ? `/uploads/${profile.profileImage}` : ""
                }
              />
              <AvatarFallback className="text-2xl bg-accent text-accent-foreground">
                {profile.firstName[0]}
                {profile.lastName[0]}
              </AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-muted-foreground">{profile.email}</p>
              {isEditing && (
                <Button variant="link" className="px-0 text-accent">
                  <label htmlFor="profileImage">Change Profile Photo</label>
                  <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-accent" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              {isEditing ? (
                <Input
                  id="firstName"
                  value={editedProfile.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                />
              ) : (
                <p className="text-foreground py-2">{profile.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              {isEditing ? (
                <Input
                  id="lastName"
                  value={editedProfile.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                />
              ) : (
                <p className="text-foreground py-2">{profile.lastName}</p>
              )}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              Email Address
            </Label>
            {isEditing ? (
              <Input
                id="email"
                type="email"
                value={editedProfile.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            ) : (
              <p className="text-foreground py-2">{profile.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              Contact Number
            </Label>
            {isEditing ? (
              <Input
                id="phone"
                type="tel"
                value={editedProfile.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            ) : (
              <p className="text-foreground py-2">{profile.phone}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-accent" />
            Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="address">Street Address</Label>
            {isEditing ? (
              <Input
                id="address"
                value={editedProfile.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            ) : (
              <p className="text-foreground py-2">{profile.address}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              {isEditing ? (
                <Input
                  id="city"
                  value={editedProfile.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                />
              ) : (
                <p className="text-foreground py-2">{profile.city}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP Code</Label>
              {isEditing ? (
                <Input
                  id="zipCode"
                  value={editedProfile.zipCode}
                  onChange={(e) => handleChange("zipCode", e.target.value)}
                />
              ) : (
                <p className="text-foreground py-2">{profile.zipCode}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-accent" />
            Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground">••••••••••••</p>
              <p className="text-sm text-muted-foreground">
                Last changed 30 days ago
              </p>
            </div>
            <Button variant="outline">Change Password</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
