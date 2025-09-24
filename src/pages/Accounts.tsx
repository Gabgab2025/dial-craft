import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Upload, 
  Download, 
  Plus, 
  Users, 
  DollarSign, 
  AlertTriangle,
  Phone,
  MoreHorizontal,
  FileText
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Account {
  id: string
  accountId: string
  name: string
  phoneNumbers: string[]
  email?: string
  balance: number
  dueDate: string
  bankPartner: string
  status: "untouched" | "touched" | "ptp" | "collected" | "not_collected"
  agent: string
  lastContact?: string
  remarks?: string
  createdAt: string
  updatedAt: string
}

// PRD-aligned mock data for bank collections
const mockAccounts: Account[] = [
  {
    id: "1",
    accountId: "BNK-2024-001234",
    name: "John Smith",
    phoneNumbers: ["(555) 123-4567", "(555) 123-9999"],
    email: "john.smith@email.com",
    balance: 2450.00,
    dueDate: "2024-01-15",
    bankPartner: "Chase Bank",
    status: "touched",
    agent: "Sarah Johnson",
    lastContact: "2024-01-10",
    remarks: "Customer requested payment plan",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-10"
  },
  {
    id: "2",
    accountId: "BNK-2024-001235", 
    name: "Maria Garcia",
    phoneNumbers: ["(555) 234-5678"],
    email: "maria.garcia@email.com",
    balance: 1200.00,
    dueDate: "2024-01-20",
    bankPartner: "Wells Fargo",
    status: "ptp",
    agent: "Mike Chen",
    lastContact: "2024-01-12",
    remarks: "Promised to pay by Friday",
    createdAt: "2024-01-02",
    updatedAt: "2024-01-12"
  },
  {
    id: "3",
    accountId: "BNK-2024-001236",
    name: "Robert Johnson", 
    phoneNumbers: ["(555) 345-6789", "(555) 345-1111", "(555) 345-2222"],
    balance: 3200.00,
    dueDate: "2024-02-01",
    bankPartner: "Bank of America",
    status: "untouched",
    agent: "Sarah Johnson",
    createdAt: "2024-01-03",
    updatedAt: "2024-01-03"
  },
  {
    id: "4",
    accountId: "BNK-2024-001237",
    name: "Lisa Anderson",
    phoneNumbers: ["(555) 456-7890"], 
    email: "lisa.anderson@email.com",
    balance: 890.50,
    dueDate: "2024-01-05",
    bankPartner: "Citibank",
    status: "collected",
    agent: "Mike Chen",
    lastContact: "2024-01-08",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-08"
  },
  {
    id: "5",
    accountId: "BNK-2024-001238",
    name: "David Wilson",
    phoneNumbers: ["(555) 567-8901", "(555) 567-0000"],
    email: "david.wilson@email.com", 
    balance: 4500.00,
    dueDate: "2024-01-18",
    bankPartner: "Chase Bank",
    status: "not_collected",
    agent: "Sarah Johnson",
    lastContact: "2024-01-11",
    remarks: "Customer disputes amount - legal review needed",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-11"
  },
  {
    id: "6",
    accountId: "BNK-2024-001239",
    name: "Jennifer Lee",
    phoneNumbers: ["(555) 678-9012"],
    balance: 1750.00,
    dueDate: "2024-01-25",
    bankPartner: "Wells Fargo",
    status: "untouched",
    agent: "Mike Chen",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-05"
  }
]

function getStatusColor(status: Account["status"]) {
  switch (status) {
    case "untouched": return "bg-destructive/10 text-destructive border-destructive/20"
    case "touched": return "bg-accent/10 text-accent border-accent/20"
    case "ptp": return "bg-warning/10 text-warning border-warning/20"
    case "collected": return "bg-success/10 text-success border-success/20"
    case "not_collected": return "bg-muted/10 text-muted-foreground border-muted/20"
    default: return "bg-muted/10 text-muted-foreground border-muted/20"
  }
}

function getStatusIcon(status: Account["status"]) {
  switch (status) {
    case "untouched": return "🔴"
    case "touched": return "🟢"
    case "ptp": return "✅"
    case "collected": return "💰"
    case "not_collected": return "❌"
    default: return "❓"
  }
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

export default function Accounts() {
  const [searchParams] = useSearchParams()
  const [accounts, setAccounts] = useState(mockAccounts)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBank, setSelectedBank] = useState("all")
  const [filteredAccounts, setFilteredAccounts] = useState(mockAccounts)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [uploadMode, setUploadMode] = useState<"single" | "bulk">("single")
  const [singleForm, setSingleForm] = useState({
    accountId: "",
    name: "",
    phoneNumbers: [""],
    email: "",
    balance: "",
    dueDate: "",
    bankPartner: "",
    agent: "",
    remarks: ""
  })

  // Bank partners list
  const bankPartners = [
    { value: "all", label: "All Banks" },
    { value: "Chase Bank", label: "Chase Bank" },
    { value: "Wells Fargo", label: "Wells Fargo" },
    { value: "Bank of America", label: "Bank of America" },
    { value: "Citibank", label: "Citibank" }
  ]

  // Initialize bank filter from URL params
  useEffect(() => {
    const bankParam = searchParams.get('bank')
    if (bankParam) {
      const bank = bankPartners.find(b => b.value.toLowerCase() === bankParam.toLowerCase())
      if (bank) {
        setSelectedBank(bank.value)
      }
    }
  }, [searchParams])

  // Filter accounts by search query and selected bank
  useEffect(() => {
    let filtered = accounts

    // Apply bank filter
    if (selectedBank !== "all") {
      filtered = filtered.filter(account => account.bankPartner === selectedBank)
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(account =>
        account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.accountId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.phoneNumbers.some(phone => phone.includes(searchQuery)) ||
        account.bankPartner.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredAccounts(filtered)
  }, [accounts, searchQuery, selectedBank])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
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
          <div className="flex space-x-4">
            <Button variant="outline" className="glass-light border-glass-border">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-accent hover:shadow-accent">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Account
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-dialog border-glass-border max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Account</DialogTitle>
                  <DialogDescription>
                    Add a new customer account to the system
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="accountId">Account ID</Label>
                      <Input
                        id="accountId"
                        placeholder="BNK-2024-XXXXXX"
                        value={singleForm.accountId}
                        onChange={(e) => setSingleForm(prev => ({ ...prev, accountId: e.target.value }))}
                        className="glass-light border-glass-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Customer Name</Label>
                      <Input
                        id="name"
                        placeholder="John Smith"
                        value={singleForm.name}
                        onChange={(e) => setSingleForm(prev => ({ ...prev, name: e.target.value }))}
                        className="glass-light border-glass-border"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Primary Phone</Label>
                      <Input
                        id="phone"
                        placeholder="(555) 123-4567"
                        value={singleForm.phoneNumbers[0]}
                        onChange={(e) => setSingleForm(prev => ({ 
                          ...prev, 
                          phoneNumbers: [e.target.value, ...prev.phoneNumbers.slice(1)]
                        }))}
                        className="glass-light border-glass-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        placeholder="john@email.com"
                        value={singleForm.email}
                        onChange={(e) => setSingleForm(prev => ({ ...prev, email: e.target.value }))}
                        className="glass-light border-glass-border"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="balance">Balance</Label>
                      <Input
                        id="balance"
                        placeholder="1500.00"
                        value={singleForm.balance}
                        onChange={(e) => setSingleForm(prev => ({ ...prev, balance: e.target.value }))}
                        className="glass-light border-glass-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={singleForm.dueDate}
                        onChange={(e) => setSingleForm(prev => ({ ...prev, dueDate: e.target.value }))}
                        className="glass-light border-glass-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bankPartner">Bank Partner</Label>
                      <Select
                        value={singleForm.bankPartner}
                        onValueChange={(value) => setSingleForm(prev => ({ ...prev, bankPartner: value }))}
                      >
                        <SelectTrigger className="glass-light border-glass-border">
                          <SelectValue placeholder="Select bank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="chase">Chase Bank</SelectItem>
                          <SelectItem value="wells">Wells Fargo</SelectItem>
                          <SelectItem value="boa">Bank of America</SelectItem>
                          <SelectItem value="citi">Citibank</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="remarks">Remarks</Label>
                    <Textarea
                      id="remarks"
                      placeholder="Additional notes about the account..."
                      value={singleForm.remarks}
                      onChange={(e) => setSingleForm(prev => ({ ...prev, remarks: e.target.value }))}
                      className="glass-light border-glass-border"
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-gradient-accent hover:shadow-accent">
                    Add Account
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search accounts..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="glass-light border-glass-border focus:ring-accent focus:border-accent max-w-md"
          />
          
          {/* Bank Filter */}
          <Select value={selectedBank} onValueChange={setSelectedBank}>
            <SelectTrigger className="w-full sm:w-48 glass-light border-glass-border">
              <SelectValue placeholder="Filter by Bank" />
            </SelectTrigger>
            <SelectContent className="bg-glass-medium/95 backdrop-blur-md border-glass-border z-50">
              {bankPartners.map((bank) => (
                <SelectItem key={bank.value} value={bank.value} className="hover:bg-glass-light/30 focus:bg-glass-light/30">
                  {bank.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="glass-card hover:shadow-accent transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Accounts
            </CardTitle>
            <Users className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-foreground">
              {filteredAccounts.length}
            </div>
            <p className="text-xs text-muted-foreground">Active accounts</p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-accent transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Touched Accounts
            </CardTitle>
            <Phone className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-success">
              {filteredAccounts.filter(a => ["touched", "ptp", "collected", "not_collected"].includes(a.status)).length}
            </div>
            <p className="text-xs text-muted-foreground">Contacted accounts</p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-accent transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Untouched Accounts
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-destructive">
              {filteredAccounts.filter(a => a.status === "untouched").length}
            </div>
            <p className="text-xs text-muted-foreground">Pending contact</p>
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
              {formatCurrency(filteredAccounts.reduce((sum, account) => sum + account.balance, 0))}
            </div>
            <p className="text-xs text-muted-foreground">Total owed</p>
          </CardContent>
        </Card>
      </div>

      {/* Accounts Table */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Account List</CardTitle>
          <CardDescription>
            Manage customer accounts and track collection status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone Numbers</TableHead>
                <TableHead>Bank Partner</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAccounts.map((account, index) => (
                <TableRow 
                  key={account.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <TableCell>
                    <div className="font-mono text-sm font-bold text-accent">{account.accountId}</div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{account.name}</div>
                      {account.email && <div className="text-xs text-muted-foreground">{account.email}</div>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {account.phoneNumbers.map((phone, idx) => (
                        <div key={idx} className="font-mono text-sm flex items-center">
                          <Phone className="w-3 h-3 mr-1 text-muted-foreground" />
                          {phone}
                          {idx === 0 && account.phoneNumbers.length > 1 && (
                            <Badge variant="outline" className="ml-2 text-xs">Primary</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium">{account.bankPartner}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-mono font-bold text-foreground">
                      {formatCurrency(account.balance)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(account.status)}>
                      <span className="mr-1">{getStatusIcon(account.status)}</span>
                      {account.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-mono text-sm">{account.dueDate}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{account.agent}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="outline" size="sm" className="glass-light">
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="glass-dropdown">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Account</DropdownMenuItem>
                          <DropdownMenuItem>Call History</DropdownMenuItem>
                          <DropdownMenuItem>Update Status</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Remove Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredAccounts.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Accounts Found</h3>
              <p className="text-muted-foreground mb-4">
                No accounts match your search criteria.
              </p>
              <Button className="bg-gradient-accent hover:shadow-accent">
                <Plus className="w-4 h-4 mr-2" />
                Add New Account
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}