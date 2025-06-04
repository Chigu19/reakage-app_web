import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SeverityBadgeProps {
  severity: 'low' | 'medium' | 'high' | 'critical';
  className?: string;
}

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'low':
        return {
          label: 'Low',
          variant: 'outline',
          className: 'border-green-500 text-green-700 bg-green-50 hover:bg-green-100 dark:bg-green-950/20 dark:text-green-400 dark:border-green-800'
        };
      case 'medium':
        return {
          label: 'Medium',
          variant: 'outline',
          className: 'border-blue-500 text-blue-700 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-800'
        };
      case 'high':
        return {
          label: 'High',
          variant: 'outline',
          className: 'border-amber-500 text-amber-700 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-800'
        };
      case 'critical':
        return {
          label: 'Critical',
          variant: 'outline',
          className: 'border-red-500 text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:text-red-400 dark:border-red-800'
        };
      default:
        return {
          label: severity,
          variant: 'outline',
          className: ''
        };
    }
  };

  const config = getSeverityConfig(severity);

  return (
    <Badge 
      variant="outline"
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  );
}