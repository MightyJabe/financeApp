import { useEffect, useState } from "react";

interface Record {
  name: string;
  category: string;
  amount: number;
}

const Dashboard = () => {
  const [netWorth, setNetWorth] = useState<number | null>(null);
  const [records, setRecords] = useState<Record[]>([]);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) {
      alert("Unauthorized! Please log in.");
      window.location.href = "/login"; // Redirect to login page
      return;
    }

    fetch("http://localhost:8000/net-worth/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setNetWorth(data.net_worth))
      .catch((err) => console.error("Error fetching net worth:", err));

    fetch("http://localhost:8000/financial-records/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRecords(data);
        } else {
          console.error("Invalid data format:", data);
          setRecords([]);
        }
      })
      .catch((err) => console.error("Error fetching financial records:", err));
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-10">
      <h1 className="text-3xl font-bold">Finance Dashboard</h1>
      <p className="text-xl my-4">
        Net Worth: {netWorth !== null ? `$${netWorth}` : "Loading..."}
      </p>

      <h2 className="text-2xl font-semibold mt-6">Financial Records</h2>
      {records.length > 0 ? (
        <table className="table-auto mt-4">
          <thead>
            <tr>
              <th className="px-4">Name</th>
              <th className="px-4">Category</th>
              <th className="px-4">Amount</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, idx) => (
              <tr key={idx}>
                <td className="border px-4">{record.name}</td>
                <td className="border px-4">{record.category}</td>
                <td className="border px-4">${record.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No financial records found.</p>
      )}
    </div>
  );
};

export default Dashboard;
