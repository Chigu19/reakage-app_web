interface WaterSourceBadgeProps {
  source: string;
}

export default function WaterSourceBadge({ source }: WaterSourceBadgeProps) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
      {source}
    </span>
  );
}