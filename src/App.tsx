
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import JobBrowsing from "./pages/JobBrowsing";
import JobDetails from "./pages/JobDetails";
import JobSeekerProfiles from "./pages/JobSeekerProfiles";
import PostJob from "./pages/PostJob";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import ApplicationsManagement from "./pages/ApplicationsManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/jobs" element={<JobBrowsing />} />
            <Route path="/jobs/:jobId" element={<JobDetails />} />
            <Route path="/job-seekers" element={<JobSeekerProfiles />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/applications/:jobId" element={<ApplicationsManagement />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
