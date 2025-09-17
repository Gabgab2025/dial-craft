import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Shield, Phone, Lock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface LoginFormProps {
  onLogin: (email: string, password: string, role: string) => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast({
        title: "Authentication Required",
        description: "Please enter both email and password.",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)
    
    try {
      // Demo authentication - normally would call API
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Demo role assignment based on email
      let role = "agent"
      if (email.includes("admin")) role = "admin"
      else if (email.includes("manager")) role = "manager"
      
      onLogin(email, password, role)
      
      toast({
        title: "Authentication Successful",
        description: `Welcome back! Logged in as ${role}.`,
      })
      
      navigate("/dashboard")
    } catch (error) {
      toast({
        title: "Authentication Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="glass-card border-glass-border w-full max-w-md animate-fade-in">
      <CardHeader className="space-y-4 text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center shadow-accent">
          <Shield className="w-8 h-8 text-accent-foreground" />
        </div>
        <div>
          <CardTitle className="text-2xl font-poppins font-bold text-foreground">
            SecureCall CRM
          </CardTitle>
          <CardDescription className="text-muted-foreground mt-2">
            Bank Collections Management System
          </CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-foreground">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="agent@bank.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-light border-glass-border focus:ring-accent focus:border-accent"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass-light border-glass-border focus:ring-accent focus:border-accent pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-gradient-primary hover:shadow-accent transition-all duration-300 font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                <span>Authenticating...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Sign In</span>
              </div>
            )}
          </Button>
        </form>
        
        <div className="pt-4 border-t border-glass-border">
          <div className="text-xs text-muted-foreground text-center space-y-1">
            <p className="flex items-center justify-center space-x-1">
              <Phone className="w-3 h-3" />
              <span>3CX Integration Ready</span>
            </p>
            <p>Bank-Grade Security • AES-256 Encryption</p>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground text-center">
          <p className="font-medium">Demo Accounts:</p>
          <p>admin@bank.com • manager@bank.com • agent@bank.com</p>
          <p>Password: demo123</p>
        </div>
      </CardContent>
    </Card>
  )
}