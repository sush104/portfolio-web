import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/primitives/card/card";

interface SkillProgressProps {
  name: string;
  level: number;
  color?: string; // tailwind color class for the fill, e.g. "from-pink-500 to-indigo-500"
  icon?: React.ReactNode;
  className?: string;
}

const SkillProgress = ({
  name,
  level,
  color = "from-primary to-purple-500",
  icon,
  className = "",
}: SkillProgressProps) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const content = (
    <div ref={ref} className={cn("w-full", className)}>
      <div className="flex items-center gap-3 mb-2">
        {icon && (
          <div className="flex-none w-8 h-8 flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-baseline gap-3">
            <span className="font-medium flex-1 truncate">{name}</span>
            <span className="text-sm text-muted-foreground ml-2">{level}%</span>
          </div>
          <div className="w-full bg-muted/20 rounded-full h-2 mt-2 overflow-hidden">
            <div
              className={cn(
                "h-2 rounded-full transition-all duration-1000",
                `bg-gradient-to-r ${color}`,
              )}
              style={{ width: visible ? `${level}%` : `0%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="w-full">
      <CardContent className="p-4">{content}</CardContent>
    </Card>
  );
};

export default SkillProgress;
