import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface IssueTypeBadgeProps {
  type: 'contamination' | 'shortage' | 'infrastructure' | 'taste' | 'color' | 'odor' | 'other';
  className?: string;
}

export function IssueTypeBadge({ type, className }: IssueTypeBadgeProps) {
  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'contamination':
        return {
          label: 'Contamination',
          className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
        };
      case 'shortage':
        return {
          label: 'Shortage',
          className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
        };
      case 'infrastructure':
        return {
          label: 'Infrastructure',
          className: 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300'
        };
      case 'taste':
        return {
          label: 'Taste',
          className: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
        };
      case 'color':
        return {
          label: 'Color',
          className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
        };
      case 'odor':
        return {
          label: 'Odor',
          className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
        };
      case 'other':
        return {
          label: 'Other',
          className: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
        };
      default:
        return {
          label: type,
          className: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
        };
    }
  };

  const config = getTypeConfig(type);

  return (
    <Badge 
      variant="secondary"
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  );
}