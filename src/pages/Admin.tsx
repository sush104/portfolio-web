import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/primitives/button/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/primitives/card/card";
import { Pencil, Trash2, Plus, LogOut, X, Check } from "lucide-react";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined;
const API_BASE = (import.meta.env.VITE_API_BASE as string | undefined)?.replace(/\/$/, "");
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY as string | undefined;

type ExperienceItem = {
  id: string;
  title: string;
  company?: string;
  start: string;
  end?: string;
  location?: string;
  description?: string[];
};

const emptyForm = (): ExperienceItem => ({
  id: "",
  title: "",
  company: "",
  start: "",
  end: "",
  location: "",
  description: [""],
});

// ── Admin page ────────────────────────────────────────────────────────────────
const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);

  const [items, setItems] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const [editing, setEditing] = useState<ExperienceItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const formRef = useRef<HTMLDivElement>(null);

  // Authentication
  const handleLogin = () => {
    if (pwInput === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

  // Fetch items from API
  const fetchItems = async () => {
    if (!API_BASE) { setApiError("VITE_API_BASE not set."); return; }
    setLoading(true);
    setApiError("");
    try {
      const res = await fetch(`${API_BASE}/experience`);
      const data = await res.json();
      setItems((data.items || data).sort((a: ExperienceItem, b: ExperienceItem) => Number(a.id) - Number(b.id)));
    } catch {
      setApiError("Failed to load items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (authed) fetchItems(); }, [authed]);

  // Save (create or update)
  const handleSave = async () => {
    if (!editing) return;
    if (!editing.id || !editing.title || !editing.start) {
      setApiError("ID, Title and Start date are required.");
      return;
    }
    if (!API_BASE || !ADMIN_KEY) { setApiError("API config missing."); return; }
    setSaving(true);
    setApiError("");
    try {
      const payload: ExperienceItem = {
        ...editing,
        description: editing.description?.filter(Boolean),
      };
      const res = await fetch(`${API_BASE}/experience`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-key": ADMIN_KEY },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      await fetchItems();
      setEditing(null);
      setIsNew(false);
    } catch (e: unknown) {
      setApiError(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  // Delete item
  const handleDelete = async (id: string) => {
    if (!confirm(`Delete item "${id}"?`)) return;
    if (!API_BASE || !ADMIN_KEY) { setApiError("API config missing."); return; }
    setDeleting(id);
    setApiError("");
    try {
      const res = await fetch(`${API_BASE}/experience?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { "x-admin-key": ADMIN_KEY },
      });
      if (!res.ok) throw new Error(await res.text());
      await fetchItems();
    } catch (e: unknown) {
      setApiError(e instanceof Error ? e.message : "Delete failed.");
    } finally {
      setDeleting(null);
    }
  };

  const openEdit = (item: ExperienceItem) => {
    setEditing({ ...item, description: item.description?.length ? item.description : [""] });
    setIsNew(false);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const openNew = () => {
    setEditing(emptyForm());
    setIsNew(true);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const updateDesc = (i: number, val: string) => {
    if (!editing) return;
    const d = [...(editing.description || [])];
    d[i] = val;
    setEditing({ ...editing, description: d });
  };

  const addDescLine = () => {
    if (!editing) return;
    setEditing({ ...editing, description: [...(editing.description || []), ""] });
  };

  const removeDescLine = (i: number) => {
    if (!editing) return;
    const d = [...(editing.description || [])];
    d.splice(i, 1);
    setEditing({ ...editing, description: d.length ? d : [""] });
  };

  // Login form
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
            <p className="text-sm text-muted-foreground text-center">This page is private.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="password"
              value={pwInput}
              onChange={(e) => setPwInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Password"
              className="w-full border border-border rounded-md px-3 py-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {pwError && <p className="text-destructive text-sm text-center">Incorrect password.</p>}
            <Button className="w-full" onClick={handleLogin}>Login</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin panel
  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Experience Admin</h1>
          <Button variant="ghost" size="sm" onClick={() => setAuthed(false)}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>

        {apiError && (
          <div className="bg-destructive/10 text-destructive border border-destructive/30 rounded-md px-4 py-3 text-sm">
            {apiError}
          </div>
        )}

        {/* Item list */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Entries ({items.length})</h2>
            <Button size="sm" onClick={openNew}>
              <Plus className="w-4 h-4 mr-1" /> Add New
            </Button>
          </div>

          {loading ? (
            <p className="text-muted-foreground animate-pulse">Loading…</p>
          ) : items.length === 0 ? (
            <p className="text-muted-foreground">No entries yet.</p>
          ) : (
            items.map((item) => (
              <Card key={item.id} hover={false}>
                <CardContent className="py-3 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{item.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.company && <span>{item.company} · </span>}
                      {item.start} – {item.end || "Present"}
                      {item.location && <span> · {item.location}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button variant="outline" size="sm" onClick={() => openEdit(item)}>
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      disabled={deleting === item.id}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Edit / Create form */}
        {editing && (
          <div ref={formRef}>
          <Card>
            <CardHeader>
              <CardTitle>{isNew ? "New Entry" : `Editing: ${editing.id}`}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "ID *", field: "id", placeholder: "1", disabled: !isNew },
                { label: "Title *", field: "title", placeholder: "Software Engineer" },
                { label: "Company", field: "company", placeholder: "Acme Ltd" },
                { label: "Start *", field: "start", placeholder: "Jan 2023" },
                { label: "End", field: "end", placeholder: "Present (leave blank)" },
                { label: "Location", field: "location", placeholder: "Glasgow, UK" },
              ].map(({ label, field, placeholder, disabled }) => (
                <div key={field} className="space-y-1">
                  <label className="text-sm font-medium">{label}</label>
                  <input
                    value={(editing as unknown as Record<string, string>)[field] ?? ""}
                    onChange={(e) => setEditing({ ...editing, [field]: e.target.value })}
                    disabled={disabled}
                    placeholder={placeholder}
                    className="w-full border border-border rounded-md px-3 py-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                  />
                </div>
              ))}
            </div>

            {/* Description bullet points */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Description (bullet points)</label>
              {(editing.description || [""]).map((line, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <textarea
                    value={line}
                    onChange={(e) => updateDesc(i, e.target.value)}
                    rows={2}
                    placeholder={`Bullet ${i + 1}`}
                    className="flex-1 border border-border rounded-md px-3 py-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                  <Button variant="ghost" size="icon" onClick={() => removeDescLine(i)} className="mt-1 flex-shrink-0">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addDescLine}>
                <Plus className="w-3.5 h-3.5 mr-1" /> Add bullet
              </Button>
            </div>

            <div className="flex gap-3 pt-2">
              <Button onClick={handleSave} disabled={saving}>
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
    </div>
  );
};

export default Admin;
