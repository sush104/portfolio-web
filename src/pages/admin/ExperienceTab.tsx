import { useRef, useState } from "react";
import { Button } from "@/components/primitives/button/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/primitives/card/card";
import { Pencil, Trash2, Plus, X, Check } from "lucide-react";
import {
  type ExperienceItem,
  API_BASE,
  ADMIN_KEY,
  apiHeaders,
  emptyExperience,
  inputCls,
} from "./types";

type Props = {
  onError: (msg: string) => void;
};

export const ExperienceTab = ({ onError }: Props) => {
  const [items, setItems] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<ExperienceItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const fetchItems = async () => {
    if (!API_BASE) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/experience`);
      const data = await res.json();
      setItems((data.items || data).sort((a: ExperienceItem, b: ExperienceItem) => Number(a.id) - Number(b.id)));
    } catch {
      onError("Failed to load experience.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch on first render
  useState(() => { fetchItems(); });

  const save = async () => {
    if (!editing || !API_BASE || !ADMIN_KEY) return;
    if (!editing.id || !editing.title || !editing.start) {
      onError("ID, Title and Start are required.");
      return;
    }
    setSaving(true);
    onError("");
    try {
      const res = await fetch(`${API_BASE}/experience`, {
        method: "POST",
        headers: apiHeaders(ADMIN_KEY),
        body: JSON.stringify({ ...editing, description: editing.description?.filter(Boolean) }),
      });
      if (!res.ok) throw new Error(await res.text());
      await fetchItems();
      setEditing(null);
      setIsNew(false);
    } catch (e: unknown) {
      onError(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm(`Delete experience "${id}"?`) || !API_BASE || !ADMIN_KEY) return;
    setDeleting(id);
    onError("");
    try {
      const res = await fetch(`${API_BASE}/experience?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { "x-admin-key": ADMIN_KEY },
      });
      if (!res.ok) throw new Error(await res.text());
      await fetchItems();
    } catch (e: unknown) {
      onError(e instanceof Error ? e.message : "Delete failed.");
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
    setEditing(emptyExperience());
    setIsNew(true);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const fields: { label: string; field: keyof ExperienceItem; placeholder: string; disabled?: boolean }[] = [
    { label: "ID *",       field: "id",       placeholder: "1",                       disabled: !isNew },
    { label: "Title *",    field: "title",    placeholder: "Software Engineer" },
    { label: "Company",    field: "company",  placeholder: "Acme Ltd" },
    { label: "Start *",    field: "start",    placeholder: "Jan 2023" },
    { label: "End",        field: "end",      placeholder: "leave blank for Present" },
    { label: "Location",   field: "location", placeholder: "Glasgow, UK" },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Experience ({items.length})</h2>
        <Button size="sm" onClick={openNew}>
          <Plus className="w-4 h-4 mr-1" /> Add New
        </Button>
      </div>

      {/* List */}
      {loading ? (
        <p className="text-muted-foreground animate-pulse">Loading…</p>
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
                <Button variant="destructive" size="sm" onClick={() => remove(item.id)} disabled={deleting === item.id}>
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
              <CardTitle>{isNew ? "New Experience" : `Editing: ${editing.id}`}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Fields grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fields.map(({ label, field, placeholder, disabled }) => (
                  <div key={String(field)} className="space-y-1">
                    <label className="text-sm font-medium">{label}</label>
                    <input
                      value={(editing[field] as string) ?? ""}
                      onChange={(e) => setEditing({ ...editing, [field]: e.target.value })}
                      disabled={disabled}
                      placeholder={placeholder}
                      className={`${inputCls} disabled:opacity-50`}
                    />
                  </div>
                ))}
              </div>

              {/* Description bullets */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Description (bullet points)</label>
                {(editing.description || [""]).map((line, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <textarea
                      value={line}
                      rows={2}
                      placeholder={`Bullet ${i + 1}`}
                      className={`flex-1 ${inputCls} resize-none`}
                      onChange={(e) => {
                        const d = [...(editing.description || [])];
                        d[i] = e.target.value;
                        setEditing({ ...editing, description: d });
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mt-1"
                      onClick={() => {
                        const d = [...(editing.description || [])];
                        d.splice(i, 1);
                        setEditing({ ...editing, description: d.length ? d : [""] });
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditing({ ...editing, description: [...(editing.description || []), ""] })}
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add bullet
                </Button>
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
