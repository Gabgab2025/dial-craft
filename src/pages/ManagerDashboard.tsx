import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Users, 
  Phone, 
  DollarSign, 
  TrendingUp,
  Upload,
  Target,
  CheckCircle,
  Award,
  BarChart3,
  Clock,
  ChevronDown
} from "lucide-react"

interface ManagerKPICardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: React.ReactNode
  description?: string
}

function ManagerKPICard({ title, value, change, changeType, icon, description }: ManagerKPICardProps) {
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

export default function ManagerDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedMetric, setSelectedMetric] = useState<string>("batch")
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])
  
  // Mock data - Manager specific KPIs per PRD
  const batchMetrics = [
    {
      title: "Accounts Uploaded",
      value: "2,847",
      change: "+245 this week",
      changeType: "positive" as const,
      icon: <Upload className="h-4 w-4 text-accent" />,
      description: "Total active"
    },
    {
      title: "Accounts Touched",
      value: "1,923",
      change: "67.5% touch rate",
      changeType: "positive" as const,
      icon: <CheckCircle className="h-4 w-4 text-accent" />,
      description: "This month"
    },
    {
      title: "Untouched Accounts",
      value: "924",
      change: "32.5% remaining",
      changeType: "neutral" as const,
      icon: <Users className="h-4 w-4 text-warning" />,
      description: "Need attention"
    }
  ]
  
  const callMetrics = [
    {
      title: "Total Calls",
      value: "8,456",
      change: "+15% from last month",
      changeType: "positive" as const,
      icon: <Phone className="h-4 w-4 text-accent" />,
      description: "This month"
    },
    {
      title: "Connected Calls",
      value: "5,234",
      change: "61.9% connect rate",
      changeType: "positive" as const,
      icon: <CheckCircle className="h-4 w-4 text-success" />,
      description: "Successful contacts"
    },
    {
      title: "PTPs Generated",
      value: "1,287",
      change: "+8% vs last month",
      changeType: "positive" as const,
      icon: <Target className="h-4 w-4 text-warning" />,
      description: "Payment promises"
    }
  ]
  
  const financialMetrics = [
    {
      title: "Total Collections",
      value: "$287,450",
      change: "+22% from last month",
      changeType: "positive" as const,
      icon: <DollarSign className="h-4 w-4 text-success" />,
      description: "This month"
    },
    {
      title: "Quota Progress",
      value: "78%",
      change: "On track for target",
      changeType: "positive" as const,
      icon: <TrendingUp className="h-4 w-4 text-accent" />,
      description: "Monthly goal"
    },
    {
      title: "Collection Rate",
      value: "24.6%",
      change: "+3.2% improvement",
      changeType: "positive" as const,
      icon: <BarChart3 className="h-4 w-4 text-accent" />,
      description: "Success ratio"
    }
  ]
  
  // Metric categories
  const metricCategories = {
    batch: { title: "Batch Metrics", data: batchMetrics },
    calls: { title: "Call Metrics", data: callMetrics },
    financial: { title: "Financial Metrics", data: financialMetrics }
  }

  // Agent Leaderboard
  const agentLeaderboard = [
    { name: "Sarah Johnson", collections: "$45,230", ptps: 156, rate: "82%" },
    { name: "Mike Rodriguez", collections: "$42,890", ptps: 143, rate: "79%" },
    { name: "Emma Davis", collections: "$38,760", ptps: 134, rate: "76%" },
    { name: "John Smith", collections: "$35,420", ptps: 128, rate: "73%" },
    { name: "Lisa Chen", collections: "$33,180", ptps: 119, rate: "71%" }
  ]
  
  return (
    <div className="min-h-screen bg-background p-6 space-y-6 animate-fade-in">
      {/* Manager Welcome Header */}
      <div className="glass-card p-6 border-glass-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-poppins text-foreground mb-2">
              Manager Dashboard
            </h1>
            <p className="text-muted-foreground">
              {currentTime.toLocaleString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })} • Team performance and batch metrics
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="border-success text-success">
              <CheckCircle className="w-3 h-3 mr-1" />
              All Systems Online
            </Badge>
            <Button className="bg-gradient-accent hover:shadow-accent">
              <Upload className="w-4 h-4 mr-2" />
              Upload Batch
            </Button>
          </div>
        </div>
      </div>
      
      {/* Metrics Selector */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">Performance Metrics</CardTitle>
              <CardDescription>Select metrics category to view detailed performance data</CardDescription>
            </div>
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger className="w-48 bg-background/80 backdrop-blur-sm border-glass-border z-50">
                <SelectValue placeholder="Select metrics" />
                <ChevronDown className="h-4 w-4 opacity-50" />
              </SelectTrigger>
              <SelectContent className="bg-background/95 backdrop-blur-sm border-glass-border z-50">
                <SelectItem value="batch" className="hover:bg-glass-light/20">
                  <div className="flex items-center space-x-2">
                    <Upload className="h-4 w-4 text-accent" />
                    <span>Batch Metrics</span>
                  </div>
                </SelectItem>
                <SelectItem value="calls" className="hover:bg-glass-light/20">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-accent" />
                    <span>Call Metrics</span>
                  </div>
                </SelectItem>
                <SelectItem value="financial" className="hover:bg-glass-light/20">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-success" />
                    <span>Financial Metrics</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {metricCategories[selectedMetric as keyof typeof metricCategories].data.map((metric, index) => (
              <div key={metric.title} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <ManagerKPICard {...metric} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Agent Leaderboard & Daily Trends */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Agent Leaderboard */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-accent" />
              <span>Agent Leaderboard</span>
            </CardTitle>
            <CardDescription>
              Top performers this month by collections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agentLeaderboard.map((agent, index) => (
                <div 
                  key={agent.name}
                  className="flex items-center justify-between p-3 bg-glass-light/20 rounded-lg hover:bg-glass-light/30 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-full">
                      <span className="font-bold text-accent">#{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{agent.name}</div>
                      <div className="text-sm text-muted-foreground">{agent.ptps} PTPs</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-success">{agent.collections}</div>
                    <div className="text-sm text-muted-foreground">{agent.rate} success</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Daily Trend Reports */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              <span>Daily Trends</span>
            </CardTitle>
            <CardDescription>
              Collection trends over the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { day: "Monday", amount: "$42,350", change: "+12%" },
                { day: "Tuesday", amount: "$38,920", change: "-8%" },
                { day: "Wednesday", amount: "$45,680", change: "+17%" },
                { day: "Thursday", amount: "$41,230", change: "-10%" },
                { day: "Friday", amount: "$48,900", change: "+19%" },
                { day: "Saturday", amount: "$22,450", change: "-54%" },
                { day: "Sunday", amount: "$15,680", change: "-30%" }
              ].map((day, index) => (
                <div 
                  key={day.day}
                  className="flex items-center justify-between p-2 rounded hover:bg-glass-light/20 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{day.day}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-success">{day.amount}</span>
                    <span className={`text-xs ${day.change.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                      {day.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}