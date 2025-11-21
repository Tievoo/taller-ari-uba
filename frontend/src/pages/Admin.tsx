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

const getFields = (tableType: TableType): string[] => {
  switch (tableType) {
    case "users":
      return ["email", "first_name", "last_name", "password", "role"];
    case "courts":
      return ["id", "name", "court_type_id", "image"];
    case "bookings":
      return ["user_id", "court_id", "booking_date", "start_time", "end_time"];
    case "court-types":
      return ["id", "name", "price"];
  }
};

export default function Admin() {
  const { user } = useAuth();
  const [selectedTable, setSelectedTable] = useState<TableType>("users");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [newData, setNewData] = useState<Record<string, any>>({});
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState<string | number | null>(null);
  const [courtTypes, setCourtTypes] = useState<any[]>([]);

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
    // Fetch court types for select
    adminApi
      .getTable("court-types")
      .then((res) => setCourtTypes(res.data))
      .catch(() => {});
  }, []);

  const handleTableSelect = (tableType: TableType) => {
    setSelectedTable(tableType);
    setAdding(false);
    setEditing(false);
    setEditId(null);
    setNewData({});
    fetchData(tableType);
  };

  const handleDelete = async (id: string | number) => {
    try {
      await adminApi.deleteTable(selectedTable, id);
      fetchData(selectedTable);
    } catch (err) {
      setError("Failed to delete entry");
    }
  };

  const handleNew = () => {
    setAdding(true);
    setEditing(false);
    setEditId(null);
    const initialData: Record<string, any> = {};
    fields.forEach((field) => {
      initialData[field] = "";
    });
    setNewData(initialData);
  };

  const handleEdit = (row: any) => {
    setAdding(true);
    setEditing(true);
    setEditId(row.id);
    setNewData({ ...row });
  };

  const handleSave = async () => {
    const dataToSend = { ...newData };
    Object.keys(dataToSend).forEach((key) => {
      if (dataToSend[key] === "") delete dataToSend[key];
    });
    try {
      if (editing && editId) {
        await adminApi.updateTable(selectedTable, editId, dataToSend);
      } else {
        await adminApi.createTable(selectedTable, dataToSend);
      }
      fetchData(selectedTable);
      setAdding(false);
      setEditing(false);
      setEditId(null);
      setNewData({});
    } catch (err) {
      setError("Failed to save entry");
    }
  };

  const handleCancel = () => {
    setAdding(false);
    setEditing(false);
    setEditId(null);
    setNewData({});
  };

  if (!user || user.role !== "admin") {
    return <div>Access denied. Admin role required.</div>;
  }

  const fields = getFields(selectedTable);

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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {tableOptions.find((opt) => opt.type === selectedTable)?.label}
          </h2>
          <button
            onClick={handleNew}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Nuevo
          </button>
        </div>

        {adding && (
          <div className="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
            <h3 className="text-lg font-medium mb-2">
              {editing ? "Editar entrada" : "Nueva entrada"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {fields.map((field) => {
                let inputType = "text";
                if (field === "booking_date") inputType = "date";
                if (field === "start_time" || field === "end_time")
                  inputType = "time";
                if (field === "court_type_id") {
                  return (
                    <div key={field}>
                      <label className="block text-sm font-medium mb-1">
                        {field}
                      </label>
                      <select
                        value={newData[field] || ""}
                        onChange={(e) =>
                          setNewData((prev) => ({
                            ...prev,
                            [field]: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select Court Type</option>
                        {courtTypes.map((ct: any) => (
                          <option key={ct.id} value={ct.id}>
                            {ct.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                }
                return (
                  <div key={field}>
                    <label className="block text-sm font-medium mb-1">
                      {field}
                    </label>
                    <input
                      type={inputType}
                      value={newData[field] || ""}
                      onChange={(e) =>
                        setNewData((prev) => ({
                          ...prev,
                          [field]: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editing ? "Actualizar" : "Guardar"}
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {!loading && !error && (
          <Table
            tableType={selectedTable}
            data={data}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
      </section>
    </div>
  );
}
