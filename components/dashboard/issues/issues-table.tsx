export default function IssuesTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Issue
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              No issues to display
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              -
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              -
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}