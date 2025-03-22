import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AddFinancialData() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Redirect if user is not authenticated
  useEffect(() => {
    if (!token) {
      alert("Unauthorized! Please log in.");
      router.push("/login");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized! Please log in.");
      window.location.href = "/login";
      return;
    }
  
    const response = await fetch("http://localhost:8000/add-financial-data/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, category, amount: parseFloat(amount) }),
    });
  
    if (response.ok) {
      router.push("/dashboard");
    } else {
      alert("Failed to add financial data. Please try again.");
    }
  };
  

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Add Financial Data</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="number"
          className="border p-2 w-full"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Add to Dashboard</button>
      </form>
    </div>
  );
}
