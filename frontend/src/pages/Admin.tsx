import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Table from "../components/Table";
import { adminApi, type TableType } from "../api/admin";

type Column = {
  key: string;
  type: "string" | "number" | "date" | "time";
  optional?: boolean;
}

const tableOptions: { type: TableType; label: string }[] = [
  { type: "users", label: "Users" },
  { type: "courts", label: "Courts" },
  { type: "bookings", label: "Bookings" },
  { type: "court-types", label: "Court Types" },
];

const getFields = (tableType: TableType): Column[] => {
  switch (tableType) {
    case "users":
      return [
        { key: "id", type: "number" },
        { key: "email", type: "string" },
        { key: "first_name", type: "string" },
        { key: "last_name", type: "string" },
        { key: "password", type: "string" },
        { key: "role", type: "string" },
      ];
    case "courts":
      return [
        { key: "id", type: "number" },
        { key: "name", type: "string" },
        { key: "court_type_id", type: "number" },
        { key: "image", type: "string" },
      ];
    case "bookings":
      return [
        { key: "id", type: "number" },
        { key: "user_id", type: "string" },
        { key: "court_id", type: "string" },
        { key: "booking_date", type: "date" },
        { key: "start_time", type: "time" },
        { key: "end_time", type: "time" },
      ];
    case "court-types":
      return [
        { key: "id", type: "number" },
        { key: "name", type: "string" },
        { key: "price", type: "number" },
      ];
  }
};

export default function Admin() {
  const { user } = useAuth();
  const [selectedTable, setSelectedTable] = useState<TableType>("users");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [newData, setNewData] = useState<Record<string, any>>({});
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState<string | number | null>(null);

  const fetchData = async (tableType: TableType) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await adminApi.getTable(tableType);
      setData(response.data);
    } catch (err) {
      setErrorMessage("Failed to load data: " + err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("New data:", newData);
  }, [newData]);

  useEffect(() => {
    fetchData("users");
    setSelectedTable("users");
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
      setErrorMessage("Failed to delete data: " + err);
    }
  };

  const handleNew = () => {
    setAdding(true);
    setEditing(false);
    setEditId(null);
    const initialData: Record<string, any> = {};
    fields.forEach((field) => {
      initialData[field.key] = "";
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
      setErrorMessage("Failed to save data: " + err);
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
                let inputType = field.type
                if (field.key === "id") return null;
                return (
                  <div key={field.key}>
                    <label className="block text-sm font-medium mb-1">
                      {field.key}
                    </label>
                    <input
                      type={inputType}
                      value={inputType === "date" ? newData[field.key]?.split("T")[0] || "" : newData[field.key] || ""}
                      onChange={(e) =>
                        setNewData((prev) => ({
                          ...prev,
                          [field.key]: e.target.value,
                        }))
                      }
                      disabled={adding && field.key === "id"}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-200"
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                disabled={fields.some((field) => field.key !== "id" && !field.optional && !newData[field.key])}
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
        {errorMessage && <span className="text-red-600">{errorMessage}</span>}
        {!loading && !errorMessage && (
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
