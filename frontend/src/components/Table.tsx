import { type TableType } from "../api/admin";

interface TableProps {
  tableType: TableType;
  data: any[];
}

export default function Table({ tableType, data }: TableProps) {
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
