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
      <table className="min-w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <thead>
          <tr className="bg-primary-50 border-b border-gray-200">
            {headers.map((header) => (
              <th key={header} className="py-4 px-6 text-left text-sm font-semibold text-primary-800 uppercase tracking-wider">
                {header.replace('_', ' ')}
              </th>
            ))}
            <th className="py-4 px-6 text-left text-sm font-semibold text-primary-800 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
              {keys.map((key) => (
                <td key={key} className="py-4 px-6 border-b border-gray-100 text-sm text-gray-900">
                  {row[key]}
                </td>
              ))}
              <td className="py-4 px-6 border-b border-gray-100">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(row)}
                    className="px-3 py-2 rounded-lg font-medium transition-all duration-200 bg-primary-600 text-white hover:bg-primary-700 hover:shadow-md active:scale-95"
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
                    className="px-3 py-2 rounded-lg font-medium transition-all duration-200 bg-red-600 text-white hover:bg-red-700 hover:shadow-md active:scale-95"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
