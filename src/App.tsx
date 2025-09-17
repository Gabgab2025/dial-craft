import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

interface User {
  email: string;
  role: string;
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  
  const handleLogin = (email: string, password: string, role: string) => {
    setUser({ email, role });
  };
  
  const handleLogout = () => {
    setUser(null);
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="securecall-crm-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {!user ? (
              <Routes>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            ) : (
              <AppLayout 
                userEmail={user.email} 
                userRole={user.role} 
                onLogout={handleLogout}
              >
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard userRole={user.role} />} />
                  <Route path="/accounts" element={<Accounts />} />
                  <Route path="/calls" element={<div className="p-6">Call Center page coming soon...</div>} />
                  <Route path="/dispositions" element={<div className="p-6">Dispositions page coming soon...</div>} />
                  <Route path="/upload" element={<div className="p-6">Upload Data page coming soon...</div>} />
                  <Route path="/reports" element={<div className="p-6">Reports page coming soon...</div>} />
                  <Route path="/users" element={<div className="p-6">User Management page coming soon...</div>} />
                  <Route path="/settings" element={<div className="p-6">Settings page coming soon...</div>} />
                  <Route path="/integrations/3cx" element={<div className="p-6">3CX Integration page coming soon...</div>} />
                  <Route path="/integrations/database" element={<div className="p-6">Database Integration page coming soon...</div>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AppLayout>
            )}
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
