import { useState, useEffect } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Demo from "@/components/Demo";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    window.location.href = "/login";
  };

  return (
    <>
      {/* ✅ Navbar */}
      <nav className="flex justify-between items-center p-4 bg-gray-800 text-white fixed w-full shadow-lg">
        <div className="text-lg font-bold">
          <Link href="/">FinanceApp</Link>
        </div>
        <div className="space-x-6">
          <Link className="hover:underline" href="/">Home</Link>
          {token ? (
            <>
              <Link className="hover:underline" href="/dashboard">Dashboard</Link>
              <Link className="hover:underline" href="/add-financial-data">Add Data</Link>
              <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-700">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="hover:underline" href="/signup">Signup</Link>
              <Link className="hover:underline bg-blue-500 px-3 py-1 rounded-md hover:bg-blue-700" href="/login">
                Login
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* ✅ Page Content */}
      <div className="pt-16">
        <Hero />
        <Features />
        <Demo />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
