import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
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
  ChevronDown,
  Eye,
  ArrowUp,
  ArrowDown,
  User
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
    <div className="min-h-screen bg-gray-50 p-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          {currentTime.toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long", 
            day: "numeric"
          })}
        </p>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue Card */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Revenue</CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-600 text-xs">
                <Eye className="h-3 w-3 mr-1" />
                View Report
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-2xl font-bold text-gray-900">$287,450</div>
              <div className="flex items-center text-sm">
                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">2.1%</span>
                <span className="text-gray-500 ml-1">vs last week</span>
              </div>
              <div className="text-xs text-gray-500 mb-3">Sales from 1-6 Dec, 2020</div>
              {/* Simple bar chart representation */}
              <div className="flex items-end space-x-1 h-16">
                {[40, 65, 45, 70, 85, 50, 75, 60, 80, 90, 70, 85].map((height, i) => (
                  <div 
                    key={i} 
                    className="bg-blue-500 rounded-sm flex-1" 
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>• Last 6 days</span>
                <span>• Last Week</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call Time Distribution */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Call Time</CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-600 text-xs">
                <Eye className="h-3 w-3 mr-1" />
                View Report
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-xs text-gray-500">From 1-6 Dec, 2020</div>
              {/* Donut chart representation */}
              <div className="flex items-center justify-center relative">
                <div className="w-32 h-32 rounded-full border-8 border-blue-200 relative">
                  <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-blue-600 transform rotate-45"></div>
                  <div className="absolute inset-2 rounded-full bg-gray-800 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-white text-xs font-medium">Afternoon</div>
                      <div className="text-white text-lg font-bold">1,890</div>
                      <div className="text-white text-xs">calls</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <div className="w-2 h-2 bg-gray-800 rounded-full mr-1"></div>
                    <span className="text-gray-600">Afternoon</span>
                  </div>
                  <div className="text-gray-900 font-medium">40%</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-1"></div>
                    <span className="text-gray-600">Evening</span>
                  </div>
                  <div className="text-gray-900 font-medium">32%</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <div className="w-2 h-2 bg-blue-200 rounded-full mr-1"></div>
                    <span className="text-gray-600">Morning</span>
                  </div>
                  <div className="text-gray-900 font-medium">28%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Collections */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Collections</CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-600 text-xs">
                <Eye className="h-3 w-3 mr-1" />
                View Report
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-2xl font-bold text-gray-900">2,568</div>
              <div className="flex items-center text-sm">
                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">2.1%</span>
                <span className="text-gray-500 ml-1">vs last week</span>
              </div>
              <div className="text-xs text-gray-500 mb-3">Results from 1-6 Dec, 2020</div>
              {/* Line chart representation */}
              <div className="h-16 flex items-end">
                <svg className="w-full h-full" viewBox="0 0 200 60">
                  <polyline
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    points="10,50 30,40 50,45 70,30 90,25 110,35 130,20 150,15 170,10 190,5"
                  />
                </svg>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>• Last 6 days</span>
                <span>• Last Week</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agent Performance */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Agent Performance</CardTitle>
            <CardDescription className="text-xs text-gray-500">
              Lorem ipsum dolor sit amet, consectetur
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Donut charts for ratings */}
              <div className="flex items-center justify-center space-x-6">
                <div className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-2">
                    <div className="w-full h-full rounded-full border-4 border-gray-200">
                      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-r-purple-500 border-b-purple-500 transform rotate-12"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-purple-600 text-lg font-bold">85%</div>
                        <div className="text-xs text-gray-500">Hygiene</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-2">
                    <div className="w-full h-full rounded-full border-4 border-gray-200">
                      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 border-r-orange-500 border-b-orange-500 border-l-orange-500 transform -rotate-12"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-orange-500 text-lg font-bold">85%</div>
                        <div className="text-xs text-gray-500">Food taste</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-2">
                    <div className="w-full h-full rounded-full border-4 border-gray-200">
                      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-500 border-r-cyan-500 border-b-cyan-500 border-l-cyan-500 transform rotate-90"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-cyan-500 text-lg font-bold">92%</div>
                        <div className="text-xs text-gray-500">On-time</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Top Performers</CardTitle>
            <CardDescription className="text-xs text-gray-500">
              Adipiscing elit, sed do eiusmod tempor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Sarah Johnson", amount: "IDR 48,000", avatar: "SJ" },
                { name: "Mike Rodriguez", amount: "IDR 78,000", avatar: "MR" },
                { name: "Emma Davis", amount: "IDR 48,000", avatar: "ED" },
                { name: "John Smith", amount: "IDR 45,000", avatar: "JS" }
              ].map((agent, index) => (
                <div key={agent.name} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">{agent.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                  </div>
                  <div className="text-sm font-medium text-gray-900">{agent.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Placeholder Card */}
        <Card className="bg-white shadow-sm border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Team Status</CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-600 text-xs">
                <Eye className="h-3 w-3 mr-1" />
                View Report
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-2xl font-bold text-gray-900">24</div>
              <div className="flex items-center text-sm">
                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">8.2%</span>
                <span className="text-gray-500 ml-1">vs last week</span>
              </div>
              <div className="text-xs text-gray-500 mb-3">Active agents online</div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Online</span>
                  <span className="text-gray-900 font-medium">18 agents</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">On Break</span>
                  <span className="text-gray-900 font-medium">4 agents</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Offline</span>
                  <span className="text-gray-900 font-medium">2 agents</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}