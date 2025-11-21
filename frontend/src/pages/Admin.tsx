import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Table from "../components/Table";
import { adminApi, type TableType } from "../api/admin";

const tableOptions: { type: TableType; label: string }[] = [
  { type: "users", label: "Users" },
  { type: "courts", label: "Courts" },
  { type: "bookings", label: "Bookings" },
  { type: "court-types", label: "Court Types" },
];

export default function Admin() {
  const { user } = useAuth();
  const [selectedTable, setSelectedTable] = useState<TableType>("users");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (tableType: TableType) => {
    setLoading(true);
    setError(null);
    try {
      const response = await adminApi.getTable(tableType);
      setData(response.data);
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData("users");
  }, []);

  const handleTableSelect = (tableType: TableType) => {
    setSelectedTable(tableType);
    fetchData(tableType);
  };

  if (!user || user.role !== "admin") {
    return <div>Access denied. Admin role required.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="mb-6">
        <div className="flex gap-2 flex-wrap">
          {tableOptions.map(({ type, label }) => (
            <button
              key={type}
              onClick={() => handleTableSelect(type)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTable === type
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4">
          {tableOptions.find((opt) => opt.type === selectedTable)?.label}
        </h2>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {!loading && !error && <Table tableType={selectedTable} data={data} />}
      </section>
    </div>
  );
}
