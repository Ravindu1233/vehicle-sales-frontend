import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Search from "./pages/Search";
import VehicleDetails from "./pages/VehicleDetails";
import Compare from "./pages/Compare";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddListing from "./pages/AddListing";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import SavedListings from "./pages/dashboard/SavedListings";
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
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="saved" element={<SavedListings />} />
            <Route path="alerts" element={<DashboardOverview />} />
            <Route path="history" element={<DashboardOverview />} />
            <Route path="settings" element={<DashboardOverview />} />
            <Route path="profile" element={<DashboardOverview />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
