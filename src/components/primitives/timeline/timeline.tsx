import * as React from "react";

interface TimelineItem {
  id?: string | number;
  title: string;
  company?: string;
  start: string;
  end?: string;
  location?: string;
  description?: React.ReactNode;
  link?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

const Timeline = ({ items, className }: TimelineProps) => {
  return (
    <div className={className}>
      <ol className="relative border-l border-muted pl-6">
        {items.map((item, idx) => (
          <li key={item.id ?? idx} className="mb-8 ml-4">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-background ring-8 ring-card">
              <span className="h-2 w-2 rounded-full bg-primary block" />
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <div className="text-sm text-muted-foreground">
                  {item.company && <span className="mr-2">{item.company}</span>}
                  <span className="italic">
                    {item.start} - {item.end ?? "Present"}
                  </span>
                  {item.location && (
                    <span className="ml-2">• {item.location}</span>
                  )}
                </div>
              </div>
              {item.link && (
                <div>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary underline"
                  >
                    View
                  </a>
                </div>
              )}
            </div>
            {item.description && (
              <div className="mt-2 text-sm text-muted-foreground">
                {item.description}
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Timeline;
