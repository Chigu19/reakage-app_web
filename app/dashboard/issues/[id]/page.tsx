export default function IssueDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Issue Detail</h1>
      <div className="text-gray-600">Issue detail for ID: {params.id}</div>
    </div>
  );
}