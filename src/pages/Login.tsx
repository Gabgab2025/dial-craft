import { LoginForm } from "@/components/auth/LoginForm"
import jdgkBrochure from "@/assets/jdgk-brochure.png"

interface LoginPageProps {
  onLogin: (email: string, password: string, role: string) => void
}

export default function Login({ onLogin }: LoginPageProps) {
  return (
    <div className="min-h-screen bg-gradient-glass flex items-center justify-center p-4 dark">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--accent))_0%,transparent_50%)] opacity-10" />
      {/* Business Info */}
      <div className="absolute bottom-8 left-8 max-w-sm">
        <img 
          src={jdgkBrochure} 
          alt="JDGK Business Solutions Inc. - Results Driven, Client Focused" 
          className="w-64 h-auto rounded-lg shadow-2xl"
        />
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