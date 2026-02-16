import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Analyze from "./pages/Analyze";
import Results from "./pages/Results";
import HistoryPage from "./pages/History";
import Practice from "./pages/Practice";
import Assessments from "./pages/Assessments";
import Resources from "./pages/Resources";
import ProfilePage from "./pages/Profile";
import TestChecklist from "./pages/TestChecklist";
import Proof from "./pages/Proof";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analyze" element={<Analyze />} />
              <Route path="/results/:id" element={<Results />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/practice" element={<Practice />} />
              <Route path="/assessments" element={<Assessments />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/test-checklist" element={<TestChecklist />} />
              <Route path="/proof" element={<Proof />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
