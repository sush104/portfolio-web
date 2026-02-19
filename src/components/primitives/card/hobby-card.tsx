import * as React from "react";

interface HobbyCardProps {
  icon: React.ReactNode;
  title: string;
  description: string | React.ReactNode;
  className?: string;
}

const HobbyCard = ({
  icon,
  title,
  description,
  className = "",
}: HobbyCardProps) => {
  return (
    <div
      className={`w-full flex items-center gap-3 p-4 rounded-lg ${className}`}
    >
      <div className="flex-none w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1">
        <div className="font-medium">{title}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
    </div>
  );
};

export default HobbyCard;
