import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 p-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
