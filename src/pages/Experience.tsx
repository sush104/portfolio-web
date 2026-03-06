import { useEffect, useState } from "react";
import Timeline from "@/components/primitives/timeline/timeline";

type ExperienceItem = {
  id: string | number;
  title: string;
  company?: string;
  start: string;
  end?: string;
  location?: string;
  description?: string[];
};

const toTimelineItems = (items: ExperienceItem[]) =>
  [...items]
    .sort((a, b) => Number(a.id) - Number(b.id))
    .map((item) => ({
      ...item,
      description: Array.isArray(item.description) ? (
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
          {item.description.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      ) : undefined,
    }));

const Experience = () => {
  const [items, setItems] = useState<ReturnType<typeof toTimelineItems>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const apiBase = (import.meta.env.VITE_API_BASE as string | undefined)?.replace(/\/$/, "");
    if (!apiBase) {
      setLoading(false);
      setError(true);
      return;
    }

    let mounted = true;

    fetch(`${apiBase}/experience`, { headers: { "Content-Type": "application/json" } })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        const remote: ExperienceItem[] = data.items || data;
        if (mounted) setItems(toTimelineItems(remote));
      })
      .catch(() => {
        if (mounted) setError(true);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="min-h-screen px-6 py-20 pt-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Experience
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          A timeline of my professional roles and responsibilities.
        </p>

        <div className="max-w-3xl mx-auto">
          {loading ? (
            <p className="text-center text-muted-foreground animate-pulse">Loading…</p>
          ) : error ? (
            <p className="text-center text-muted-foreground">Could not load experience data.</p>
          ) : (
            <Timeline items={items} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
