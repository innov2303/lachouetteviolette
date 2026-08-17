import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import AdminLogin from "@/pages/admin-login";
import Admin from "@/pages/admin";

function PageTracker() {
  const [location] = useLocation();
  useEffect(() => {
    if (location.startsWith("/admin")) return;
    // Ne pas tracker les visites en environnement local/dev
    const host = window.location.hostname;
    const isLocal =
      host === "localhost" ||
      host === "127.0.0.1" ||
      host.endsWith(".replit.dev") ||
      host.endsWith(".janeway.replit.dev") ||
      host.endsWith(".repl.co");
    if (isLocal) return;
    const source = document.referrer || "direct";
    fetch("/api/analytics/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: location, source, isAdmin: false }),
    }).catch(() => {});
  }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <PageTracker />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
