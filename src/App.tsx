import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import WhereToStay from "./pages/WhereToStay.tsx";
import AreaPage from "./pages/AreaPage.tsx";
import HotelTypePage from "./pages/HotelTypePage.tsx";
import HotelDetailPage from "./pages/HotelDetailPage.tsx";
import About from "./pages/About.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import Admin from "./pages/Admin.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/where-to-stay" element={<WhereToStay />} />

            {/* Canonical Swedish routes */}
            <Route path="/hotell/:slug" element={<AreaPage />} />
            <Route path="/hotell/:slug/:type" element={<HotelTypePage />} />
            <Route path="/hotell/:area/:type/:hotelSlug" element={<HotelDetailPage />} />

            {/* Legacy English routes — kept working */}
            <Route path="/hotels/:slug" element={<AreaPage />} />
            <Route path="/hotels/:slug/:type" element={<HotelTypePage />} />
            <Route path="/hotels/:area/:type/:hotelSlug" element={<HotelDetailPage />} />

            <Route path="/about" element={<About />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
