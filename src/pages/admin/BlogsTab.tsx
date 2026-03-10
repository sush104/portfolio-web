import { useRef, useState } from "react";
import { Button } from "@/components/primitives/button/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/primitives/card/card";
import { Pencil, Trash2, Plus, Check, Upload, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  type BlogPost,
  API_BASE,
  ADMIN_KEY,
  apiHeaders,
  emptyBlog,
  inputCls,
} from "./types";

type Props = {
  onError: (msg: string) => void;
};

export const BlogsTab = ({ onError }: Props) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [tagsInput, setTagsInput] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  const fetchPosts = async () => {
    if (!API_BASE) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/blogs`);
      const data = await res.json();
      setPosts(data.items || data);
    } catch {
      onError("Failed to load blogs.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch on first render
  useState(() => { fetchPosts(); });

  const save = async () => {
    if (!editing || !API_BASE || !ADMIN_KEY) return;
    if (!editing.id || !editing.title || !editing.type) {
      onError("ID, Title and Type are required.");
      return;
    }
    setSaving(true);
    onError("");
    try {
      const payload = {
        ...editing,
        date: editing.date || new Date().toISOString().split("T")[0],
        tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
      };
      const res = await fetch(`${API_BASE}/blogs`, {
        method: "POST",
        headers: apiHeaders(ADMIN_KEY),
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      await fetchPosts();
      setEditing(null);
      setIsNew(false);
    } catch (e: unknown) {
      onError(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm(`Delete blog "${id}"?`) || !API_BASE || !ADMIN_KEY) return;
    setDeleting(id);
    onError("");
    try {
      const res = await fetch(`${API_BASE}/blogs?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { "x-admin-key": ADMIN_KEY },
      });
      if (!res.ok) throw new Error(await res.text());
      await fetchPosts();
    } catch (e: unknown) {
      onError(e instanceof Error ? e.message : "Delete failed.");
    } finally {
      setDeleting(null);
    }
  };

  const uploadImage = async (file: File) => {
    if (!API_BASE || !ADMIN_KEY) return;
    setUploadingImage(true);
    setUploadError("");
    try {
      const res = await fetch(
        `${API_BASE}/upload-url?filename=${encodeURIComponent(file.name)}&contentType=${encodeURIComponent(file.type)}`,
        { headers: { "x-admin-key": ADMIN_KEY } },
      );
      if (!res.ok) throw new Error(await res.text());
      const { uploadUrl, publicUrl } = await res.json();
      const put = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!put.ok) throw new Error("S3 upload failed");
      setEditing((prev) => prev ? { ...prev, coverImage: publicUrl } : prev);
    } catch (e: unknown) {
      setUploadError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setUploadingImage(false);
    }
  };

  const openEdit = (post: BlogPost) => {
    setEditing({ ...post, tags: post.tags || [] });
    setTagsInput((post.tags || []).join(", "));
    setIsNew(false);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const openNew = () => {
    setEditing(emptyBlog());
    setTagsInput("");
    setIsNew(true);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Blog Posts ({posts.length})</h2>
        <Button size="sm" onClick={openNew}>
          <Plus className="w-4 h-4 mr-1" /> Add Post
        </Button>
      </div>

      {/* List */}
      {loading ? (
        <p className="text-muted-foreground animate-pulse">Loading…</p>
      ) : (
        posts.map((post) => (
          <Card key={post.id} hover={false}>
            <CardContent className="py-3 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground capitalize">
                    {post.type === "travel" ? "✈️ Travel" : "💻 Tech"}
                  </span>
                  <div className="font-medium truncate">{post.title}</div>
                </div>
                <div className="text-sm text-muted-foreground mt-0.5">
                  {post.date && <span>{post.date}</span>}
                  {post.tags?.length ? <span> · {post.tags.join(", ")}</span> : null}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button variant="outline" size="sm" onClick={() => openEdit(post)}>
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => remove(post.id)} disabled={deleting === post.id}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}

      {/* Edit / New Form */}
      {editing && (
        <div ref={formRef}>
          <Card>
            <CardHeader>
              <CardTitle>{isNew ? "New Blog Post" : `Editing: ${editing.id}`}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* ID */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">ID *</label>
                  <input
                    value={editing.id}
                    onChange={(e) => setEditing({ ...editing, id: e.target.value })}
                    disabled={!isNew}
                    placeholder="unique-post-id"
                    className={`${inputCls} disabled:opacity-50`}
                  />
                </div>

                {/* Type */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">Type *</label>
                  <select
                    value={editing.type}
                    onChange={(e) => setEditing({ ...editing, type: e.target.value as "travel" | "tech" })}
                    className={inputCls}
                  >
                    <option value="tech">💻 Tech</option>
                    <option value="travel">✈️ Travel</option>
                  </select>
                </div>

                {/* Title */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-sm font-medium">Title *</label>
                  <input
                    value={editing.title}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                    placeholder="Blog post title"
                    className={inputCls}
                  />
                </div>

                {/* Date */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">Date</label>
                  <input
                    type="date"
                    value={editing.date || ""}
                    onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                    className={inputCls}
                  />
                </div>

                {/* Tags */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">Tags (comma separated)</label>
                  <input
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="react, aws, travel"
                    className={inputCls}
                  />
                </div>

                {/* Cover Image */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-sm font-medium">Cover Image</label>
                  <div className="flex gap-2 items-start">
                    <input
                      value={editing.coverImage || ""}
                      onChange={(e) => setEditing({ ...editing, coverImage: e.target.value })}
                      placeholder="https://... or upload →"
                      className={`flex-1 ${inputCls}`}
                    />
                    <label className={cn(
                      "inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border text-sm cursor-pointer transition-colors whitespace-nowrap",
                      uploadingImage ? "opacity-50 pointer-events-none" : "hover:bg-accent",
                    )}>
                      {uploadingImage
                        ? <span className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full" />
                        : <Upload className="w-4 h-4" />}
                      {uploadingImage ? "Uploading…" : "Upload"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(f); e.target.value = ""; }}
                      />
                    </label>
                  </div>
                  {uploadError && <p className="text-destructive text-xs mt-1">{uploadError}</p>}
                  {editing.coverImage ? (
                    <img src={editing.coverImage} alt="Preview" className="mt-2 h-32 w-full object-cover rounded-md border border-border" />
                  ) : (
                    <div className="mt-2 h-32 w-full rounded-md border border-dashed border-border flex items-center justify-center text-muted-foreground">
                      <ImageIcon className="w-6 h-6 mr-2" /> No image selected
                    </div>
                  )}
                </div>

                {/* Summary */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-sm font-medium">Summary</label>
                  <textarea
                    value={editing.summary || ""}
                    onChange={(e) => setEditing({ ...editing, summary: e.target.value })}
                    rows={2}
                    placeholder="Short description shown on the card…"
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {/* Content */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-sm font-medium">Content (full post)</label>
                  <textarea
                    value={editing.content || ""}
                    onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                    rows={10}
                    placeholder="Write your full blog post here…"
                    className={`${inputCls} resize-y`}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button onClick={save} disabled={saving}>
                  <Check className="w-4 h-4 mr-1" />
                  {saving ? "Saving…" : "Save"}
                </Button>
                <Button variant="outline" onClick={() => { setEditing(null); setIsNew(false); }}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
