import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3, 
  TrendingUp,
  Download,
  Calendar,
  Users,
  Phone,
  DollarSign,
  Target,
  Filter,
  Printer
} from "lucide-react"

interface ReportCard {
  id: string
  title: string
  description: string
  type: "performance" | "financial" | "operational"
  lastGenerated: string
  frequency: "daily" | "weekly" | "monthly"
  format: "pdf" | "excel" | "csv"
}

// Mock data
const availableReports: ReportCard[] = [
  {
    id: "RPT-001",
    title: "Agent Performance Report",
    description: "Individual agent metrics, call volumes, and success rates",
    type: "performance",
    lastGenerated: "2024-01-15 09:00",
    frequency: "daily",
    format: "pdf"
  },
  {
    id: "RPT-002",
    title: "Collections Summary",
    description: "Daily collections totals and payment arrangements",
    type: "financial", 
    lastGenerated: "2024-01-15 08:30",
    frequency: "daily",
    format: "excel"
  },
  {
    id: "RPT-003",
    title: "Call Volume Analysis",
    description: "Hourly call patterns and queue performance",
    type: "operational",
    lastGenerated: "2024-01-14 23:59",
    frequency: "daily",
    format: "pdf"
  },
  {
    id: "RPT-004",
    title: "Weekly KPI Dashboard",
    description: "Comprehensive performance metrics and trends",
    type: "performance",
    lastGenerated: "2024-01-14 18:00",
    frequency: "weekly",
    format: "pdf"
  },
  {
    id: "RPT-005",
    title: "Account Status Report",
    description: "Portfolio overview with aging and disposition analysis",
    type: "financial",
    lastGenerated: "2024-01-15 07:00",
    frequency: "daily",
    format: "excel"
  },
  {
    id: "RPT-006",
    title: "3CX Integration Log",
    description: "System integration status and call routing metrics",
    type: "operational",
    lastGenerated: "2024-01-15 08:00",
    frequency: "daily",
    format: "csv"
  }
]

const performanceMetrics = [
  { label: "Total Collections", value: "$47,832", change: "+15%", positive: true },
  { label: "Calls Completed", value: "1,247", change: "+8%", positive: true },
  { label: "Contact Rate", value: "68%", change: "+3%", positive: true },
  { label: "Average Talk Time", value: "4:32", change: "-5%", positive: true },
]

function getTypeColor(type: ReportCard["type"]) {
  switch (type) {
    case "performance": return "bg-accent/10 text-accent border-accent/20"
    case "financial": return "bg-success/10 text-success border-success/20"
    case "operational": return "bg-warning/10 text-warning border-warning/20"
    default: return "bg-muted/10 text-muted-foreground border-muted/20"
  }
}

function getTypeIcon(type: ReportCard["type"]) {
  switch (type) {
    case "performance": return <TrendingUp className="w-4 h-4" />
    case "financial": return <DollarSign className="w-4 h-4" />
    case "operational": return <BarChart3 className="w-4 h-4" />
    default: return <BarChart3 className="w-4 h-4" />
  }
}

function getFormatIcon(format: ReportCard["format"]) {
  switch (format) {
    case "pdf": return "📄"
    case "excel": return "📊"
    case "csv": return "📋"
    default: return "📄"
  }
}

export default function Reports() {
  const [selectedType, setSelectedType] = useState<string>("all")
  const [reports, setReports] = useState(availableReports)

  const filteredReports = reports.filter(report => 
    selectedType === "all" || report.type === selectedType
  )

  const generateReport = (reportId: string) => {
    // Simulate report generation
    setReports(prev => prev.map(report => 
      report.id === reportId 
        ? { ...report, lastGenerated: new Date().toLocaleString() }
        : report
    ))
  }

  return (
    <div className="min-h-screen bg-background p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glass-card p-6 border-glass-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold font-poppins text-foreground">
              Reports & Analytics
            </h1>
            <p className="text-muted-foreground mt-1">
              Generate performance reports and business intelligence
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="glass-light border-glass-border">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </Button>
            <Button className="bg-gradient-accent hover:shadow-accent">
              <Printer className="w-4 h-4 mr-2" />
              Quick Report
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <select 
            className="glass-light border-glass-border rounded-lg px-3 py-2 text-sm focus:ring-accent focus:border-accent"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All Report Types</option>
            <option value="performance">Performance</option>
            <option value="financial">Financial</option>
            <option value="operational">Operational</option>
          </select>
          <Button variant="outline" className="glass-light border-glass-border">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        {performanceMetrics.map((metric, index) => (
          <Card key={metric.label} className="glass-card hover:shadow-accent transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.label}
              </CardTitle>
              <Target className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-mono text-foreground mb-1">
                {metric.value}
              </div>
              <p className={`text-xs font-medium ${metric.positive ? 'text-success' : 'text-destructive'}`}>
                {metric.change} from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Available Reports */}
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {filteredReports.map((report, index) => (
          <Card 
            key={report.id} 
            className="glass-card hover:shadow-accent transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(report.type)}
                  <Badge className={getTypeColor(report.type)}>
                    {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                  </Badge>
                </div>
                <div className="text-xl">{getFormatIcon(report.format)}</div>
              </div>
              
              <CardTitle className="text-lg font-semibold text-foreground">
                {report.title}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {report.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Frequency:</span>
                  <div className="font-medium capitalize">{report.frequency}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Format:</span>
                  <div className="font-medium uppercase">{report.format}</div>
                </div>
              </div>
              
              <div className="text-sm">
                <span className="text-muted-foreground">Last Generated:</span>
                <div className="font-mono text-xs mt-1">{report.lastGenerated}</div>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Button 
                  className="flex-1 bg-gradient-accent hover:shadow-accent"
                  onClick={() => generateReport(report.id)}
                >
                  <BarChart3 className="w-3 h-3 mr-1" />
                  Generate
                </Button>
                <Button variant="outline" className="glass-light border-glass-border">
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Analytics */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-accent" />
              <span>Call Analytics - Last 7 Days</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Calls</span>
                <span className="font-mono font-bold text-foreground">8,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Connected Calls</span>
                <span className="font-mono font-bold text-success">5,608</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Average Duration</span>
                <span className="font-mono font-bold text-foreground">4:32</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Success Rate</span>
                <span className="font-mono font-bold text-success">68%</span>
              </div>
            </div>
            
            <Button className="w-full mt-4 bg-gradient-accent hover:shadow-accent">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Detailed Analytics
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-accent" />
              <span>Agent Performance - Today</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {["Agent A", "Agent B", "Agent C"].map((agent, index) => (
                <div key={agent} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">
                      {agent.slice(-1)}
                    </div>
                    <span className="text-sm font-medium text-foreground">{agent}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm font-bold text-foreground">
                      {Math.floor(Math.random() * 50) + 20} calls
                    </div>
                    <div className="text-xs text-success">
                      ${(Math.random() * 5000 + 1000).toFixed(0)} collected
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button className="w-full mt-4 bg-gradient-accent hover:shadow-accent">
              <TrendingUp className="w-4 h-4 mr-2" />
              Full Performance Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {filteredReports.length === 0 && (
        <Card className="glass-card">
          <CardContent className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Reports Found</h3>
            <p className="text-muted-foreground mb-4">
              No reports match your current filter criteria.
            </p>
            <Button className="bg-gradient-accent hover:shadow-accent">
              <Printer className="w-4 h-4 mr-2" />
              Create Custom Report
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}