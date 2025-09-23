import { LoginForm } from "@/components/auth/LoginForm"

interface LoginPageProps {
  onLogin: (email: string, password: string, role: string) => void
}

export default function Login({ onLogin }: LoginPageProps) {
  return (
    <div className="min-h-screen bg-gradient-glass flex items-center justify-center p-4 dark">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--accent))_0%,transparent_50%)] opacity-10" />
      {/* Business Info */}
      <div className="absolute bottom-8 left-8 text-white/80 space-y-2 max-w-sm">
        <h3 className="text-lg font-semibold text-white">JDGK Business Solutions</h3>
        <p className="text-sm">Enterprise Collection Management System</p>
        <div className="space-y-1 text-xs">
          <p>📞 3CX Integration Ready</p>
          <p>🔒 Bank-Grade Security</p>
          <p>📊 Advanced Analytics & Reporting</p>
          <p>👥 Multi-User Role Management</p>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-glass-float" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-glass-float" style={{ animationDelay: "1s" }} />
      
      {/* Login Form */}
      <div className="relative z-10">
        <LoginForm onLogin={onLogin} />
      </div>
    </div>
  )
}