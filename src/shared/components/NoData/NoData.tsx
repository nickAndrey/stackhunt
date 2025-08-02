import { Card, CardContent } from '@/design-system/components/ui/card';
import { Ghost } from 'lucide-react';

type NoDataProps = {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
};

export function NoData({
  title = 'No data found',
  message = 'There is currently nothing to display.',
  icon = <Ghost strokeWidth={1} className="w-10 h-10 text-muted-foreground" />,
}: NoDataProps) {
  return (
    <Card className="flex items-center justify-center text-center py-4 bg-muted/40 shadow-none border-dashed">
      <CardContent className="flex flex-col items-center gap-1.5">
        {icon}
        <h4 className="text-sm font-semibold text-muted-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );
}
