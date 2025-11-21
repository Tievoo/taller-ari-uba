import { type TableType } from "../api/admin";

interface TableProps {
  tableType: TableType;
  data: any[];
  onDelete: (id: string | number) => void;
  onEdit: (row: any) => void;
}

export default function Table({
  tableType,
  data,
  onDelete,
  onEdit,
}: TableProps) {
  const getTableConfig = () => {
    switch (tableType) {
      case "users":
        return {
          headers: [
            "id",
            "email",
            "first_name",
            "last_name",
            "password",
            "google_id",
            "created_at",
            "role",
          ],
          keys: [
            "id",
            "email",
            "first_name",
            "last_name",
            "password",
            "google_id",
            "created_at",
            "role",
          ],
        };
      case "courts":
        return {
          headers: ["id", "name", "court_type_id", "image", "created_at"],
          keys: ["id", "name", "court_type_id", "image", "created_at"],
        };
      case "bookings":
        return {
          headers: [
            "id",
            "user_id",
            "court_id",
            "booking_date",
            "start_time",
            "end_time",
            "created_at",
          ],
          keys: [
            "id",
            "user_id",
            "court_id",
            "booking_date",
            "start_time",
            "end_time",
            "created_at",
          ],
        };
      case "court-types":
        return {
          headers: ["id", "name", "price"],
          keys: ["id", "name", "price"],
        };
    }
  };

  const { headers, keys } = getTableConfig();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((header) => (
              <th key={header} className="py-2 px-4 border">
                {header}
              </th>
            ))}
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {keys.map((key) => (
                <td key={key} className="py-2 px-4 border">
                  {row[key]}
                </td>
              ))}
              <td className="py-2 px-4 border">
                <button
                  onClick={() => onEdit(row)}
                  className="px-2 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this item?"
                      )
                    ) {
                      onDelete(row.id);
                    }
                  }}
                  className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
