import { useState } from "react";
import { useLogin, useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Lock } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = useLogin();
  const auth = useAuth();
  const [, setLocation] = useLocation();

  if (auth.data) {
    setLocation("/admin");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    login.mutate(
      { username, password },
      {
        onSuccess: () => setLocation("/admin"),
        onError: (err) => setError(err.message || "Identifiants invalides"),
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#c9a0dc]/20 flex items-center justify-center">
            <Lock className="w-7 h-7 text-[#c9a0dc]" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground" data-testid="text-admin-title">
            Administration
          </h1>
          <p className="text-sm text-muted-foreground mt-1">La chouette violette</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md" data-testid="text-login-error">
              {error}
            </div>
          )}
          <div>
            <Input
              data-testid="input-username"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-md"
            />
          </div>
          <div>
            <Input
              data-testid="input-password"
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md"
            />
          </div>
          <Button
            type="submit"
            data-testid="button-login"
            disabled={login.isPending}
            className="w-full rounded-md bg-[#c9a0dc] hover:bg-[#b88fd0] text-white"
          >
            {login.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Se connecter
          </Button>
        </form>

        <div className="text-center mt-6">
          <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-back-site">
            Retour au site
          </a>
        </div>
      </div>
    </div>
  );
}
