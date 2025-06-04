import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface WaterSourceBadgeProps {
  source: 'tap' | 'well' | 'river' | 'lake' | 'borehole' | 'other';
  className?: string;
}

export function WaterSourceBadge({ source, className }: WaterSourceBadgeProps) {
  const getSourceConfig = (source: string) => {
    switch (source) {
      case 'tap':
        return {
          label: 'Tap Water',
          className: 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300'
        };
      case 'well':
        return {
          label: 'Well',
          className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
        };
      case 'river':
        return {
          label: 'River',
          className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
        };
      case 'lake':
        return {
          label: 'Lake',
          className: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300'
        };
      case 'borehole':
        return {
          label: 'Borehole',
          className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
        };
      case 'other':
        return {
          label: 'Other Source',
          className: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
        };
      default:
        return {
          label: source,
          className: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
        };
    }
  };

  const config = getSourceConfig(source);

  return (
    <Badge 
      variant="secondary"
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  );
}