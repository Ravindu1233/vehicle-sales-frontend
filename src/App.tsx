import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom"; // Added Navigate import
import Index from "./pages/Index";
import Search from "./pages/Search";
import VehicleDetails from "./pages/VehicleDetails";
import Compare from "./pages/Compare";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import AddListing from "./pages/AddListing";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import SavedListings from "./pages/dashboard/SavedListings";
import MyListings from "./pages/dashboard/MyListings";
import Profile from "./pages/dashboard/Profile";
import Alerts from "./pages/dashboard/Alerts";
import Settings from "./pages/dashboard/Settings";
import RecentlyViewed from "./pages/dashboard/RecentlyViewed";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminListings from "./pages/admin/AdminListings";
import AdminUsers from "./pages/admin/AdminUsers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<Search />} />
          <Route path="/vehicle/:id" element={<VehicleDetails />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/add-listing" element={<AddListing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* Check the user role and route accordingly */}
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route index element={<DashboardOverview />} />
            <Route path="listings" element={<MyListings />} />
            <Route path="saved" element={<SavedListings />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="history" element={<RecentlyViewed />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/admin" element={<AdminRoute />}>
            <Route index element={<AdminDashboard />} />
            <Route path="listings" element={<AdminListings />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const PrivateRoute = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.role === "admin") {
    navigate("/admin"); // Redirect admin to the admin dashboard
  }

  return <DashboardLayout />;
};

const AdminRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    return <Navigate to="/dashboard" />; // Redirect non-admin to the user dashboard
  }

  return <AdminLayout />;
};

export default App;
