import { useState } from "react";
import { User, Mail, Phone, MapPin, Lock, Edit2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
  });

  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile((prev) => ({ ...prev, [field]: value }));
  };

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
              <AvatarImage src="" />
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
                  Change Profile Photo
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
              <Label htmlFor="state">State</Label>
              {isEditing ? (
                <Input
                  id="state"
                  value={editedProfile.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                />
              ) : (
                <p className="text-foreground py-2">{profile.state}</p>
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
