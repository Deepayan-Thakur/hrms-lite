export default function AttendanceTable({ records }) {
  if (records.length === 0) {
    return <p className="text-gray-500">No attendance records found.</p>;
  }

  return (
    <table className="w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2">Date</th>
          <th className="border p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {records.map((r, idx) => (
          <tr key={idx}>
            <td className="border p-2">{r.date}</td>
            <td className="border p-2">{r.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
