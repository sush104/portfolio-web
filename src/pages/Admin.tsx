import { useState } from "react";
import { Button } from "@/components/primitives/button/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/primitives/card/card";
import { LogOut, Briefcase, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { ExperienceTab } from "./admin/ExperienceTab";
import { BlogsTab } from "./admin/BlogsTab";
import { type AdminTab, ADMIN_PASSWORD } from "./admin/types";

const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("experience");
  const [apiError, setApiError] = useState("");

  const handleLogin = () => {
    if (pwInput === ADMIN_PASSWORD) { setAuthed(true); setPwError(false); }
    else setPwError(true);
  };

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

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Page header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <Button variant="ghost" size="sm" onClick={() => setAuthed(false)}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>

        {/* Tab switcher */}
        <div className="inline-flex rounded-lg border border-border p-1 gap-1">
          {(["experience", "blogs"] as AdminTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setApiError(""); }}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize",
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent",
              )}
            >
              {tab === "experience" ? <Briefcase className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
              {tab}
            </button>
          ))}
        </div>

        {/* Global API error */}
        {apiError && (
          <div className="bg-destructive/10 text-destructive border border-destructive/30 rounded-md px-4 py-3 text-sm">
            {apiError}
          </div>
        )}

        {/* Tab content */}
        {activeTab === "experience" && <ExperienceTab onError={setApiError} />}
        {activeTab === "blogs"      && <BlogsTab      onError={setApiError} />}

      </div>
    </div>
  );
};

export default Admin;
