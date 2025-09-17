import { LoginForm } from "@/components/auth/LoginForm"

interface LoginPageProps {
  onLogin: (email: string, password: string, role: string) => void
}

export default function Login({ onLogin }: LoginPageProps) {
  return (
    <div className="min-h-screen bg-gradient-glass flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--accent))_0%,transparent_50%)] opacity-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,hsl(var(--primary))_0%,transparent_50%)] opacity-5" />
      
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