import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate, useParams } from "react-router-dom";
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
import AdminImportHotels from "./pages/AdminImportHotels.tsx";
import AdminQA from "./pages/AdminQA.tsx";
import OmOss from "./pages/OmOss.tsx";
import Kontakt from "./pages/Kontakt.tsx";
import Integritetspolicy from "./pages/Integritetspolicy.tsx";
import CookiesPage from "./pages/Cookies.tsx";
import Villkor from "./pages/Villkor.tsx";

const queryClient = new QueryClient();

// Legacy /hotels/* → /hotell/* canonical redirect (client-side).
const LegacyAreaRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={`/hotell/${slug}`} replace />;
};
const LegacyTypeRedirect = () => {
  const { slug, type } = useParams();
  return <Navigate to={`/hotell/${slug}/${type}`} replace />;
};
const LegacyDetailRedirect = () => {
  const { area, type, hotelSlug } = useParams();
  return <Navigate to={`/hotell/${area}/${type}/${hotelSlug}`} replace />;
};

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

            {/* Canonical routes */}
            <Route path="/hotell/:slug" element={<AreaPage />} />
            <Route path="/hotell/:slug/:type" element={<HotelTypePage />} />
            <Route path="/hotell/:area/:type/:hotelSlug" element={<HotelDetailPage />} />

            {/* Legacy English routes — canonicalize to /hotell */}
            <Route path="/hotels/:slug" element={<LegacyAreaRedirect />} />
            <Route path="/hotels/:slug/:type" element={<LegacyTypeRedirect />} />
            <Route path="/hotels/:area/:type/:hotelSlug" element={<LegacyDetailRedirect />} />

            <Route path="/about" element={<About />} />
            <Route path="/om-oss" element={<OmOss />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/integritetspolicy" element={<Integritetspolicy />} />
            <Route path="/cookies" element={<CookiesPage />} />
            <Route path="/villkor" element={<Villkor />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/import-hotels" element={<AdminImportHotels />} />
            <Route path="/admin/qa" element={<AdminQA />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
