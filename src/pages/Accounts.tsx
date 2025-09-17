import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Plus, 
  Filter, 
  Download,
  Phone,
  User,
  DollarSign,
  Calendar,
  MoreHorizontal
} from "lucide-react"

interface Account {
  id: string
  name: string
  phone: string
  balance: number
  dueDate: string
  status: "active" | "delinquent" | "paid" | "pending"
  lastContact: string
  assignedTo: string
}

// Mock data - would come from API
const mockAccounts: Account[] = [
  {
    id: "ACC-001",
    name: "John Smith",
    phone: "(555) 123-4567",
    balance: 2500.00,
    dueDate: "2024-01-15",
    status: "delinquent",
    lastContact: "2024-01-10",
    assignedTo: "Agent A"
  },
  {
    id: "ACC-002", 
    name: "Sarah Johnson",
    phone: "(555) 234-5678",
    balance: 1200.00,
    dueDate: "2024-01-20",
    status: "active",
    lastContact: "2024-01-12",
    assignedTo: "Agent B"
  },
  {
    id: "ACC-003",
    name: "Michael Brown",
    phone: "(555) 345-6789", 
    balance: 0.00,
    dueDate: "2024-01-05",
    status: "paid",
    lastContact: "2024-01-08",
    assignedTo: "Agent A"
  },
  {
    id: "ACC-004",
    name: "Emily Davis",
    phone: "(555) 456-7890",
    balance: 3200.00,
    dueDate: "2024-01-25",
    status: "pending",
    lastContact: "Never",
    assignedTo: "Agent C"
  }
]

function getStatusColor(status: Account["status"]) {
  switch (status) {
    case "active": return "bg-accent/10 text-accent border-accent/20"
    case "delinquent": return "bg-destructive/10 text-destructive border-destructive/20"
    case "paid": return "bg-success/10 text-success border-success/20"
    case "pending": return "bg-warning/10 text-warning border-warning/20"
    default: return "bg-muted/10 text-muted-foreground border-muted/20"
  }
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

export default function Accounts() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredAccounts, setFilteredAccounts] = useState(mockAccounts)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (!query.trim()) {
      setFilteredAccounts(mockAccounts)
      return
    }
    
    const filtered = mockAccounts.filter(account =>
      account.name.toLowerCase().includes(query.toLowerCase()) ||
      account.phone.includes(query) ||
      account.id.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredAccounts(filtered)
  }

  return (
    <div className="min-h-screen bg-background p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glass-card p-6 border-glass-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold font-poppins text-foreground">
              Account Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage customer accounts and collection status
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="glass-light border-glass-border">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="bg-gradient-accent hover:shadow-accent">
              <Plus className="w-4 h-4 mr-2" />
              Add Account
            </Button>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search accounts..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="glass-light border-glass-border pl-10 focus:ring-accent focus:border-accent"
            />
          </div>
          <Button variant="outline" className="glass-light border-glass-border">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="glass-card hover:shadow-accent transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Accounts
            </CardTitle>
            <User className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-foreground">
              {mockAccounts.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Active portfolio
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-accent transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Outstanding Balance
            </CardTitle>
            <DollarSign className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-foreground">
              {formatCurrency(mockAccounts.reduce((sum, acc) => sum + acc.balance, 0))}
            </div>
            <p className="text-xs text-muted-foreground">
              Total collectible
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-accent transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Delinquent
            </CardTitle>
            <Calendar className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-destructive">
              {mockAccounts.filter(acc => acc.status === 'delinquent').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Require attention
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-accent transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Success Rate
            </CardTitle>
            <Phone className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-success">
              72%
            </div>
            <p className="text-xs text-muted-foreground">
              Contact success
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Accounts Table */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5 text-accent" />
            <span>Customer Accounts</span>
          </CardTitle>
          <CardDescription>
            {filteredAccounts.length} of {mockAccounts.length} accounts shown
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-glass-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Account</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Contact</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Balance</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Due Date</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Assigned</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((account, index) => (
                  <tr 
                    key={account.id} 
                    className="border-b border-glass-border/50 hover:bg-glass-light/30 transition-colors"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="font-medium text-foreground">{account.name}</div>
                        <div className="text-sm text-muted-foreground font-mono">{account.id}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="font-mono text-sm text-foreground">{account.phone}</div>
                        <div className="text-xs text-muted-foreground">
                          Last: {account.lastContact}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-mono font-bold text-foreground">
                        {formatCurrency(account.balance)}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(account.status)}>
                        {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-mono text-sm text-foreground">{account.dueDate}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-muted-foreground">{account.assignedTo}</div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button 
                          size="sm" 
                          className="bg-gradient-accent hover:shadow-accent"
                        >
                          <Phone className="w-3 h-3 mr-1" />
                          Call
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredAccounts.length === 0 && (
            <div className="text-center py-8">
              <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No accounts found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}