import { useEffect, useState } from "react";
import BlogCard, { type BlogPost } from "@/components/primitives/card/blog-card";
import Modal from "@/components/primitives/modal/modal";
import { Plane, Monitor, X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

const API_BASE = (import.meta.env.VITE_API_BASE as string | undefined)?.replace(/\/$/, "");

type Tab = "all" | "travel" | "tech";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "All Posts", icon: null },
  { id: "travel", label: "Travel Blogs", icon: <Plane className="w-4 h-4" /> },
  { id: "tech", label: "Tech Blogs", icon: <Monitor className="w-4 h-4" /> },
];

const Blogs = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [selected, setSelected] = useState<BlogPost | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!API_BASE) { setLoading(false); setError(true); return; }
    fetch(`${API_BASE}/blogs`)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data) => setPosts(data.items || data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeTab === "all" ? posts : posts.filter((p) => p.type === activeTab);

  return (
    <section className="min-h-screen px-6 py-20 pt-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Blogs</h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          Thoughts on travel adventures and tech discoveries.
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-lg border border-border p-1 gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent",
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <p className="text-center text-muted-foreground animate-pulse">Loading…</p>
        ) : error ? (
          <p className="text-center text-muted-foreground">Could not load blog posts.</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted-foreground">No posts yet. Check back soon!</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <BlogCard key={post.id} post={post} onRead={setSelected} />
            ))}
          </div>
        )}
      </div>

      {/* Blog detail modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title}>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            onClick={() => setLightboxSrc(null)}
            aria-label="Close image"
          >
            <X className="w-7 h-7" />
          </button>
          <img
            src={lightboxSrc}
            alt="Full size"
            className="max-w-[95vw] max-h-[95vh] object-contain rounded-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
        {selected && (
          <div className="space-y-4">
            {selected.coverImage && (
              <div
                className="relative group cursor-zoom-in"
                onClick={() => setLightboxSrc(selected.coverImage!)}
              >
                <img
                  src={selected.coverImage}
                  alt={selected.title}
                  className="w-full h-56 object-cover rounded-md"
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/0 group-hover:bg-black/30 transition-colors">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                </div>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {selected.date && <span>📅 {selected.date}</span>}
              <span className="capitalize">• {selected.type === "travel" ? "✈️ Travel" : "💻 Tech"}</span>
            </div>
            {selected.summary && (
              <p className="text-muted-foreground italic border-l-2 border-primary pl-3">
                {selected.summary}
              </p>
            )}
            {selected.content && (
              <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap text-sm leading-relaxed">
                {selected.content}
              </div>
            )}
            {selected.tags && selected.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                {selected.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Blogs;
