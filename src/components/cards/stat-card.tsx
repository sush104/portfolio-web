import { Card, CardContent } from "@/components/primitives/card/card";

interface StatCardProps {
  value: string;
  label: string;
}

const StatCard = ({ value, label }: StatCardProps) => {
  return (
    <Card className="text-center p-4">
      <CardContent className="p-0 space-y-2">
        <div className="text-3xl font-bold text-primary">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
