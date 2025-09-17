import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { 
  Plus, 
  Edit,
  Trash2,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  MessageSquare
} from "lucide-react"

interface Disposition {
  id: string
  key: string
  label: string
  description: string
  color: string
  category: "contact" | "no_contact" | "outcome"
  isDefault: boolean
  isActive: boolean
  usageCount: number
}

// Mock data - would come from API
const mockDispositions: Disposition[] = [
  {
    id: "1",
    key: "PAYMENT_ARRANGED",
    label: "Payment Arranged",
    description: "Customer agreed to payment plan",
    color: "success",
    category: "outcome",
    isDefault: true,
    isActive: true,
    usageCount: 245
  },
  {
    id: "2", 
    key: "PAYMENT_FULL",
    label: "Payment in Full",
    description: "Customer paid entire balance",
    color: "success",
    category: "outcome", 
    isDefault: true,
    isActive: true,
    usageCount: 189
  },
  {
    id: "3",
    key: "REFUSED_PAYMENT",
    label: "Refused to Pay",
    description: "Customer declined payment arrangement",
    color: "destructive",
    category: "contact",
    isDefault: true,
    isActive: true,
    usageCount: 156
  },
  {
    id: "4",
    key: "NO_ANSWER",
    label: "No Answer",
    description: "Phone rang but no one answered",
    color: "warning",
    category: "no_contact",
    isDefault: true,
    isActive: true,
    usageCount: 423
  },
  {
    id: "5",
    key: "VOICEMAIL_LEFT",
    label: "Voicemail Left", 
    description: "Left detailed voicemail message",
    color: "accent",
    category: "no_contact",
    isDefault: true,
    isActive: true,
    usageCount: 312
  },
  {
    id: "6",
    key: "DISCONNECTED",
    label: "Phone Disconnected",
    description: "Number is no longer in service",
    color: "destructive",
    category: "no_contact",
    isDefault: false,
    isActive: true,
    usageCount: 89
  },
  {
    id: "7",
    key: "CALLBACK_REQUESTED",
    label: "Callback Requested",
    description: "Customer requested specific callback time",
    color: "accent",
    category: "contact",
    isDefault: false,
    isActive: true,
    usageCount: 134
  },
  {
    id: "8",
    key: "DISPUTE_CLAIM",
    label: "Dispute Claim",
    description: "Customer disputes the debt amount",
    color: "warning",
    category: "contact", 
    isDefault: false,
    isActive: true,
    usageCount: 67
  }
]

function getColorClass(color: string, type: "bg" | "text" | "border" = "bg") {
  const colorMap = {
    success: `${type}-success`,
    destructive: `${type}-destructive`, 
    warning: `${type}-warning`,
    accent: `${type}-accent`,
    muted: `${type}-muted-foreground`
  }
  return colorMap[color as keyof typeof colorMap] || `${type}-muted-foreground`
}

function getCategoryIcon(category: Disposition["category"]) {
  switch (category) {
    case "contact": return <Phone className="w-4 h-4" />
    case "no_contact": return <XCircle className="w-4 h-4" />
    case "outcome": return <CheckCircle className="w-4 h-4" />
    default: return <FileText className="w-4 h-4" />
  }
}

function getCategoryLabel(category: Disposition["category"]) {
  switch (category) {
    case "contact": return "Contact Made"
    case "no_contact": return "No Contact"
    case "outcome": return "Positive Outcome"
    default: return "Other"
  }
}

export default function Dispositions() {
  const [dispositions, setDispositions] = useState(mockDispositions)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredDispositions = dispositions.filter(disp => {
    const matchesSearch = disp.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         disp.key.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || disp.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categoryStats = {
    contact: dispositions.filter(d => d.category === "contact").length,
    no_contact: dispositions.filter(d => d.category === "no_contact").length,
    outcome: dispositions.filter(d => d.category === "outcome").length,
    total: dispositions.length
  }

  const toggleActive = (id: string) => {
    setDispositions(prev => 
      prev.map(disp => 
        disp.id === id ? { ...disp, isActive: !disp.isActive } : disp
      )
    )
  }

  return (
    <div className="min-h-screen bg-background p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glass-card p-6 border-glass-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold font-poppins text-foreground">
              Call Dispositions
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage call outcome codes and agent disposition options
            </p>
          </div>
          <Button className="bg-gradient-accent hover:shadow-accent">
            <Plus className="w-4 h-4 mr-2" />
            New Disposition
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Input
              placeholder="Search dispositions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-light border-glass-border focus:ring-accent focus:border-accent"
            />
          </div>
          <select 
            className="glass-light border-glass-border rounded-lg px-3 py-2 text-sm focus:ring-accent focus:border-accent"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="contact">Contact Made</option>
            <option value="no_contact">No Contact</option>
            <option value="outcome">Positive Outcome</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="glass-card hover:shadow-accent transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Dispositions
            </CardTitle>
            <FileText className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-foreground">
              {categoryStats.total}
            </div>
            <p className="text-xs text-muted-foreground">Active codes</p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-accent transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Contact Made
            </CardTitle>
            <Phone className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-success">
              {categoryStats.contact}
            </div>
            <p className="text-xs text-muted-foreground">Direct contact codes</p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-accent transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              No Contact
            </CardTitle>
            <XCircle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-warning">
              {categoryStats.no_contact}
            </div>
            <p className="text-xs text-muted-foreground">No contact codes</p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-accent transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Positive Outcomes
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-success">
              {categoryStats.outcome}
            </div>
            <p className="text-xs text-muted-foreground">Success codes</p>
          </CardContent>
        </Card>
      </div>

      {/* Dispositions Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDispositions.map((disposition, index) => (
          <Card 
            key={disposition.id} 
            className="glass-card hover:shadow-accent transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getCategoryIcon(disposition.category)}
                  <div>
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {disposition.label}
                    </CardTitle>
                    <CardDescription className="text-xs font-mono text-muted-foreground">
                      {disposition.key}
                    </CardDescription>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {disposition.isDefault && (
                    <Badge variant="outline" className="text-xs border-accent text-accent">
                      Default
                    </Badge>
                  )}
                  <Switch
                    checked={disposition.isActive}
                    onCheckedChange={() => toggleActive(disposition.id)}
                    className="data-[state=checked]:bg-accent"
                  />
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {disposition.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge className={`${getColorClass(disposition.color, "bg")}/10 ${getColorClass(disposition.color, "text")} border-${disposition.color}/20`}>
                    {getCategoryLabel(disposition.category)}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono font-bold text-foreground">
                    {disposition.usageCount}
                  </div>
                  <div className="text-xs text-muted-foreground">uses</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 glass-light border-glass-border">
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="glass-light border-glass-border text-destructive hover:bg-destructive/10"
                  disabled={disposition.isDefault}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDispositions.length === 0 && (
        <Card className="glass-card">
          <CardContent className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Dispositions Found</h3>
            <p className="text-muted-foreground mb-4">
              No dispositions match your current search and filter criteria.
            </p>
            <Button className="bg-gradient-accent hover:shadow-accent">
              <Plus className="w-4 h-4 mr-2" />
              Create New Disposition
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}