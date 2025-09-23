import { LoginForm } from "@/components/auth/LoginForm"
import jdgkLogo from "@/assets/jdgk-logo-new.png"

interface LoginPageProps {
  onLogin: (email: string, password: string, role: string) => void
}

export default function Login({ onLogin }: LoginPageProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 dark">
      {/* Split Screen Container */}
      <div className="max-w-6xl w-full bg-card rounded-2xl shadow-2xl overflow-hidden border border-border">
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          
          {/* Left Panel - Business Info */}
          <div className="relative bg-gradient-to-br from-primary/80 via-primary/60 to-accent/60 p-12 flex flex-col justify-center text-center lg:text-left">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary))_0%,transparent_50%)] opacity-40" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent))_0%,transparent_30%)] opacity-60" />
            
            {/* Logo */}
            <div className="relative z-10 mb-8">
              <img 
                src={jdgkLogo} 
                alt="JDGK Business Solutions Inc." 
                className="w-48 h-auto mx-auto lg:mx-0 mb-6"
              />
            </div>
            
            {/* Main Content */}
            <div className="relative z-10 space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                YOUR NEXT
                <br />
                <span className="text-primary">BUSINESS SOLUTION</span>
                <br />
                AWAITS!
              </h1>
              
              <p className="text-muted-foreground text-lg max-w-md mx-auto lg:mx-0">
                Log in to unlock powerful collection management tools, advanced analytics, and streamlined business operations.
              </p>
              
              <p className="text-accent font-medium text-lg">
                Your success starts here.
              </p>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute bottom-8 right-8 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-pulse" />
            <div className="absolute top-8 right-16 w-16 h-16 bg-primary/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: "1s" }} />
          </div>
          
          {/* Right Panel - Login Form */}
          <div className="bg-card p-12 flex flex-col justify-center">
            <div className="max-w-sm mx-auto w-full">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">WELCOME BACK!</h2>
                <p className="text-muted-foreground">Welcome back! Please enter your details.</p>
              </div>
              
              <LoginForm onLogin={onLogin} />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}