import Link from "next/link";
import { useState, useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
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
      {/* Header / Nav */}
      <nav className="bg-gray-800 text-white p-4 fixed w-full flex justify-between items-center shadow-md">
        <Link href="/" className="text-lg font-bold">FinanceApp</Link>
        <div className="space-x-4">
          <Link href="/">Home</Link>
          {token ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/add-financial-data">Add Data</Link>
              <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/signup">Signup</Link>
              <Link href="/login" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">Login</Link>
            </>
          )}
        </div>
      </nav>

      {/* Page Content */}
      <main className="pt-16 min-h-screen bg-gray-100">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        © 2025 FinanceApp - All Rights Reserved
      </footer>
    </>
  );
}
