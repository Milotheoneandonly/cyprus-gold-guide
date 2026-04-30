import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import GoldButton from "@/components/GoldButton";
import { toast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin", { replace: true });
    });
  }, [navigate]);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/admin", { replace: true });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast({ title: "Account created", description: "You can now sign in." });
        setMode("signin");
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message ?? String(err), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md rounded-lg border border-border/60 bg-card p-8 shadow-xl">
        <h1 className="font-serif text-3xl text-center mb-2">
          <span className="text-gradient-gold italic">Admin</span>
        </h1>
        <p className="text-center text-sm text-muted-foreground mb-8">
          {mode === "signin" ? "Sign in to manage hotels" : "Create admin account"}
        </p>
        <form onSubmit={handle} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground"
            />
          </div>
          <GoldButton type="submit" disabled={loading} className="w-full">
            {loading ? "..." : mode === "signin" ? "Sign in" : "Create account"}
          </GoldButton>
        </form>
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-6 w-full text-sm text-muted-foreground hover:text-gold transition"
        >
          {mode === "signin" ? "Need to create the first admin account?" : "Back to sign in"}
        </button>
        <Link to="/" className="block mt-4 text-center text-xs text-muted-foreground hover:text-gold">
          ← Back to site
        </Link>
      </div>
    </main>
  );
};

export default AdminLogin;
