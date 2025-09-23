import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  BarChart3, 
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  Users,
  Phone,
  DollarSign,
  Target,
  Filter,
  Printer,
  MoreHorizontal,
  User
} from "lucide-react"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts'

// Mock data for charts
const performanceData = [
  { name: '3', leadGen: 45, salesConv: 38, engagement: 52 },
  { name: '6', leadGen: 52, salesConv: 42, engagement: 48 },
  { name: '9', leadGen: 48, salesConv: 45, engagement: 55 },
  { name: '12', leadGen: 61, salesConv: 52, engagement: 58 },
  { name: '15', leadGen: 55, salesConv: 48, engagement: 62 },
  { name: '18', leadGen: 67, salesConv: 55, engagement: 65 },
  { name: '21', leadGen: 63, salesConv: 58, engagement: 68 },
  { name: '24', leadGen: 71, salesConv: 62, engagement: 72 },
  { name: '27', leadGen: 68, salesConv: 59, engagement: 75 },
  { name: '30', leadGen: 74, salesConv: 65, engagement: 78 }
]

const audienceData = [
  { name: 'Existing Customers', value: 45, color: 'hsl(var(--primary))' },
  { name: 'New Prospects', value: 35, color: 'hsl(var(--accent))' },
  { name: 'Referrals', value: 20, color: 'hsl(var(--primary-glow))' }
]

const sparklineData = {
  leadGen: [42, 45, 48, 52, 49, 55, 58, 61, 59, 63, 67, 71, 68, 74],
  salesConv: [38, 42, 39, 45, 48, 44, 52, 49, 55, 58, 62, 59, 65],
  engagement: [52, 48, 55, 58, 62, 59, 65, 68, 72, 69, 75, 78]
}

const recentReports = [
  {
    id: "RPT-001",
    title: "Q4 Performance Review",
    description: "Comprehensive quarterly performance analysis",
    audienceReached: "125,000",
    roi: "3.2x",
    ctr: "2.5%",
    cpl: "$2.80",
    budget: "$100/day",
    manager: "Louis Jensen",
    avatar: "LJ",
    status: "completed"
  },
  {
    id: "RPT-002", 
    title: "Lead Generation Campaign",
    description: "Monthly lead generation metrics and trends",
    audienceReached: "89,000",
    roi: "2.1x",
    ctr: "3.8%",
    cpl: "$1.90",
    budget: "$80/day",
    manager: "Sarah Chen",
    avatar: "SC",
    status: "active"
  },
  {
    id: "RPT-003",
    title: "Customer Retention Analysis", 
    description: "Analysis of customer lifecycle and retention",
    audienceReached: "95,000",
    roi: "2.8x",
    ctr: "2.2%",
    cpl: "$3.10",
    budget: "$90/day",
    manager: "Mike Torres",
    avatar: "MT",
    status: "completed"
  }
]

// Sparkline component
const Sparkline = ({ data, color = "hsl(var(--primary))" }: { data: number[], color?: string }) => (
  <ResponsiveContainer width={60} height={20}>
    <LineChart data={data.map((value, index) => ({ value, index }))}>
      <Line 
        type="monotone" 
        dataKey="value" 
        stroke={color} 
        strokeWidth={1.5}
        dot={false}
        activeDot={false}
      />
    </LineChart>
  </ResponsiveContainer>
)

const performanceMetrics = [
  { 
    label: "Lead generation", 
    value: "2,245", 
    change: "+28%", 
    positive: true,
    subtitle: "from last 30 days",
    sparkline: sparklineData.leadGen,
    color: "hsl(var(--success))"
  },
  { 
    label: "Sales Conversion", 
    value: "393", 
    change: "-12%", 
    positive: false,
    subtitle: "from last 30 days",
    sparkline: sparklineData.salesConv,
    color: "hsl(var(--destructive))"
  },
  { 
    label: "Engagement", 
    value: "9,026", 
    change: "+67%", 
    positive: true,
    subtitle: "from last 30 days",
    sparkline: sparklineData.engagement,
    color: "hsl(var(--success))"
  }
]

export default function Reports() {
  const [selectedChannel, setSelectedChannel] = useState<string>("all")
  const [selectedGoals, setSelectedGoals] = useState<string>("all")
  const [dateRange, setDateRange] = useState<string>("last-30-days")

  return (
    <div className="min-h-screen bg-background p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glass-card p-6 border-glass-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold font-poppins text-foreground">
              Reports & Analytics
            </h1>
            <p className="text-muted-foreground mt-1">
              Create, manage, and track performance metrics for your campaigns all in one place.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="glass-light border-glass-border">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-gradient-accent hover:shadow-accent">
              + Create campaign
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-6 mb-6">
          <button className="text-foreground font-medium border-b-2 border-accent pb-2">
            Overview
          </button>
          <button className="text-muted-foreground hover:text-foreground pb-2">
            Posts
          </button>
          <button className="text-muted-foreground hover:text-foreground pb-2">
            Performance
          </button>
          <button className="text-muted-foreground hover:text-foreground pb-2">
            Settings
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <Select value={selectedChannel} onValueChange={setSelectedChannel}>
            <SelectTrigger className="w-48 glass-light border-glass-border">
              <SelectValue placeholder="Channel: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Channels</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="phone">Phone</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedGoals} onValueChange={setSelectedGoals}>
            <SelectTrigger className="w-48 glass-light border-glass-border">
              <SelectValue placeholder="Goals: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Goals</SelectItem>
              <SelectItem value="conversion">Conversion</SelectItem>
              <SelectItem value="engagement">Engagement</SelectItem>
              <SelectItem value="retention">Retention</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-48 glass-light border-glass-border">
              <SelectValue placeholder="Last 30 days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 days</SelectItem>
              <SelectItem value="last-30-days">Last 30 days</SelectItem>
              <SelectItem value="last-90-days">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-6 md:grid-cols-3">
        {performanceMetrics.map((metric, index) => (
          <Card key={metric.label} className="glass-card hover:shadow-accent transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-2xl font-bold text-foreground">{metric.value}</span>
                    <div className={`flex items-center text-sm font-medium ${
                      metric.positive ? 'text-success' : 'text-destructive'
                    }`}>
                      {metric.positive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                      {metric.change}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
                </div>
                <div className="ml-4">
                  <Sparkline data={metric.sparkline} color={metric.color} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Audience Breakdown */}
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">Audience</CardTitle>
              <Select defaultValue="gender">
                <SelectTrigger className="w-32 h-8 text-xs glass-light border-glass-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gender">Gender</SelectItem>
                  <SelectItem value="age">Age</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-4">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie
                    data={audienceData}
                    cx={100}
                    cy={100}
                    innerRadius={60}
                    outerRadius={90}
                    dataKey="value"
                  >
                    {audienceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {audienceData.map((item, index) => (
                <div key={item.name} className="flex flex-col items-center">
                  <div className="flex items-center space-x-1 mb-1">
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs text-muted-foreground capitalize">{item.name.split(' ')[0]}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Chart */}
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground">Performance</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 text-xs">
                Compare
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-muted-foreground">Lead generation</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-destructive" />
                  <span className="text-muted-foreground">Sales Conversion</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-muted-foreground">Engagement</span>
                </div>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="leadGen" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="salesConv" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="engagement" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports Table */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">Recent reports</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                View key metrics for all active campaigns.
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-accent">
              View reports
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-medium text-muted-foreground">Report</TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">Audience reached</TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">ROI</TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">CTR</TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">CPL</TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">Budget</TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">Manager</TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-accent-foreground" />
                      </div>
                      <div>
                        <div className="font-medium text-sm text-foreground">{report.title}</div>
                        <div className="text-xs text-muted-foreground">{report.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{report.audienceReached}</TableCell>
                  <TableCell className="font-mono text-sm">{report.roi}</TableCell>
                  <TableCell className="font-mono text-sm">{report.ctr}</TableCell>
                  <TableCell className="font-mono text-sm">{report.cpl}</TableCell>
                  <TableCell className="font-mono text-sm">{report.budget}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">
                        {report.avatar}
                      </div>
                      <span className="text-sm text-foreground">{report.manager}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}