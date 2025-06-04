import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: 'pending' | 'investigating' | 'in_progress' | 'resolved' | 'rejected';
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Pending',
          variant: 'outline',
          className: 'border-amber-500 text-amber-700 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-800'
        };
      case 'investigating':
        return {
          label: 'Investigating',
          variant: 'outline',
          className: 'border-blue-500 text-blue-700 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-800'
        };
      case 'in_progress':
        return {
          label: 'In Progress',
          variant: 'outline',
          className: 'border-purple-500 text-purple-700 bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-800'
        };
      case 'resolved':
        return {
          label: 'Resolved',
          variant: 'outline',
          className: 'border-green-500 text-green-700 bg-green-50 hover:bg-green-100 dark:bg-green-950/20 dark:text-green-400 dark:border-green-800'
        };
      case 'rejected':
        return {
          label: 'Rejected',
          variant: 'outline',
          className: 'border-red-500 text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:text-red-400 dark:border-red-800'
        };
      default:
        return {
          label: status,
          variant: 'outline',
          className: ''
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge 
      variant="outline"
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  );
}