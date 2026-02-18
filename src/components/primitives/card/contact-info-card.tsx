import { ReactNode } from "react";

interface ContactInfoCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  className?: string;
}

const ContactInfoCard = ({
  icon,
  title,
  value,
  className,
}: ContactInfoCardProps) => {
  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-muted-foreground">{value}</div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoCard;
