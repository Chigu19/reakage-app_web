interface IssueTypeBadgeProps {
  type: string;
}

export default function IssueTypeBadge({ type }: IssueTypeBadgeProps) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
      {type}
    </span>
  );
}