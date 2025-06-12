export default function RecentIssues() {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Recent Issues</h3>
      <div className="space-y-3">
        <div className="text-gray-600 text-sm">No recent issues to display</div>
      </div>
    </div>
  );
}

export { RecentIssues }