import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { OrganizationSchema, WebSiteSchema } from "./SchemaJsonLd";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-background text-foreground flex flex-col">
    <OrganizationSchema />
    <WebSiteSchema />
    <Navbar />
    <main className="flex-1 pt-20">{children}</main>
    <Footer />
  </div>
);

export default Layout;
