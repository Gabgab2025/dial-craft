import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import AgentDashboard from "./AgentDashboard"
import ManagerDashboard from "./ManagerDashboard"
import { 
  Users, 
  Phone, 
  DollarSign, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  PhoneCall
} from "lucide-react"

interface KPICardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: React.ReactNode
  description?: string
}

function KPICard({ title, value, change, changeType, icon, description }: KPICardProps) {
  const [displayValue, setDisplayValue] = useState("0")
  
  useEffect(() => {
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''))
    if (isNaN(numericValue)) {
      setDisplayValue(value)
      return
    }
    
    let current = 0
    const increment = numericValue / 30
    const timer = setInterval(() => {
      current += increment
      if (current >= numericValue) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current).toString())
      }
    }, 50)
    
    return () => clearInterval(timer)
  }, [value])
  
  const changeColor = changeType === "positive" ? "text-success" : 
                     changeType === "negative" ? "text-destructive" : "text-muted-foreground"
  
  return (
    <Card className="glass-card hover:shadow-accent transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="p-2 bg-accent/10 rounded-lg">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-mono text-foreground mb-1">
          {displayValue}
        </div>
        <div className="flex items-center space-x-2">
          <p className={`text-xs font-medium ${changeColor}`}>
            {change}
          </p>
          {description && (
            <p className="text-xs text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface DashboardProps {
  userRole?: string
}

export default function Dashboard({ userRole = "agent" }: DashboardProps) {
  // Route to appropriate dashboard based on user role
  if (userRole === "agent") {
    return <AgentDashboard />
  } else if (userRole === "manager" || userRole === "admin") {
    return <ManagerDashboard />
  }
  const [currentTime, setCurrentTime] = useState(new Date())
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])
  
  // Mock data - would come from API
  const kpiData = [
    {
      title: "Total Accounts",
      value: "2,847",
      change: "+12% from last month",
      changeType: "positive" as const,
      icon: <Users className="h-4 w-4 text-accent" />,
      description: "Active cases"
    },
    {
      title: "Calls Today",
      value: "156",
      change: "+8% from yesterday",
      changeType: "positive" as const,
      icon: <Phone className="h-4 w-4 text-accent" />,
      description: "Outbound attempts"
    },
    {
      title: "Collections",
      value: "$47,832",
      change: "+15% this week",
      changeType: "positive" as const,
      icon: <DollarSign className="h-4 w-4 text-accent" />,
      description: "Weekly total"
    },
    {
      title: "Success Rate",
      value: "68%",
      change: "+3% improvement",
      changeType: "positive" as const,
      icon: <TrendingUp className="h-4 w-4 text-accent" />,
      description: "Contact rate"
    }
  ]
  
  return (
    <div className="min-h-screen bg-background p-6 space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="glass-card p-6 border-glass-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-poppins text-foreground mb-2">
              Welcome to SecureCall CRM
            </h1>
            <p className="text-muted-foreground">
              {currentTime.toLocaleString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="border-accent text-accent">
              <CheckCircle className="w-3 h-3 mr-1" />
              3CX Connected
            </Badge>
            <Badge variant="secondary">
              Role: {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </Badge>
          </div>
        </div>
      </div>
      
      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <div key={kpi.title} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <KPICard {...kpi} />
          </div>
        ))}
      </div>
      
      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PhoneCall className="w-5 h-5 text-accent" />
              <span>Quick Dial</span>
            </CardTitle>
            <CardDescription>
              Start calling from your assigned account list
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-gradient-accent hover:shadow-accent">
              Start Dialing Session
            </Button>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-accent" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>
              Your latest call outcomes and notes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Call completed</span>
                <span className="text-success">Payment arranged</span>
              </div>
              <div className="flex justify-between">
                <span>Left voicemail</span>
                <span className="text-warning">Follow-up needed</span>
              </div>
              <div className="flex justify-between">
                <span>No answer</span>
                <span className="text-muted-foreground">Try again later</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-accent" />
              <span>System Status</span>
            </CardTitle>
            <CardDescription>
              Current system health and integrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">3CX Integration</span>
                <Badge variant="default" className="bg-success text-white">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <Badge variant="default" className="bg-success text-white">Healthy</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Call Recording</span>
                <Badge variant="default" className="bg-success text-white">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}