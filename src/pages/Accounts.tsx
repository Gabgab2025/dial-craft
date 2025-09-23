import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { 
  Search, 
  Plus, 
  Filter, 
  Download,
  Phone,
  User,
  DollarSign,
  Calendar,
  MoreHorizontal,
  FileText
} from "lucide-react"

interface Account {
  id: string
  name: string
  phoneNumbers: string[]
  balance: number
  dueDate: string
  status: "untouched" | "touched" | "ptp" | "collected" | "not_collected"
  lastContact: string
  assignedTo: string
  bankPartner: string
  remarks: string
}

// Mock data - would come from API
const mockAccounts: Account[] = [
  {
    id: "ACC-001",
    name: "John Smith",
    phoneNumbers: ["(555) 123-4567", "(555) 123-4568"],
    balance: 2500.00,
    dueDate: "2024-01-15",
    status: "touched",
    lastContact: "2024-01-10",
    assignedTo: "Agent A",
    bankPartner: "First National Bank",
    remarks: "Customer requested payment plan"
  },
  {
    id: "ACC-002", 
    name: "Sarah Johnson",
    phoneNumbers: ["(555) 234-5678"],
    balance: 1200.00,
    dueDate: "2024-01-20",
    status: "ptp",
    lastContact: "2024-01-12",
    assignedTo: "Agent B",
    bankPartner: "Community Credit Union",
    remarks: "PTP set for next Friday"
  },
  {
    id: "ACC-003",
    name: "Michael Brown",
    phoneNumbers: ["(555) 345-6789", "(555) 345-6790"], 
    balance: 0.00,
    dueDate: "2024-01-05",
    status: "collected",
    lastContact: "2024-01-08",
    assignedTo: "Agent A",
    bankPartner: "Metro Bank",
    remarks: "Full payment received"
  },
  {
    id: "ACC-004",
    name: "Emily Davis",
    phoneNumbers: ["(555) 456-7890"],
    balance: 3200.00,
    dueDate: "2024-01-25",
    status: "untouched",
    lastContact: "Never",
    assignedTo: "Agent C",
    bankPartner: "First National Bank",
    remarks: "New account - first contact attempt needed"
  },
  {
    id: "ACC-005",
    name: "Robert Wilson",
    phoneNumbers: ["(555) 567-8901", "(555) 567-8902", "(555) 567-8903"],
    balance: 1850.00,
    dueDate: "2024-01-18",
    status: "not_collected",
    lastContact: "2024-01-13",
    assignedTo: "Agent B",
    bankPartner: "Regional Bank",
    remarks: "Refused payment, disputes amount"
  }
]

function getStatusColor(status: Account["status"]) {
  switch (status) {
    case "untouched": return "bg-muted/10 text-muted-foreground border-muted/20"
    case "touched": return "bg-accent/10 text-accent border-accent/20"
    case "ptp": return "bg-warning/10 text-warning border-warning/20"
    case "collected": return "bg-success/10 text-success border-success/20"
    case "not_collected": return "bg-destructive/10 text-destructive border-destructive/20"
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
    default: return "⚫"
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
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [uploadMode, setUploadMode] = useState<"single" | "bulk">("single")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [bulkAssignment, setBulkAssignment] = useState({
    assignedTo: "none",
    department: "none",
    manager: "none",
    status: "untouched" as Account["status"]
  })
  const [newAccount, setNewAccount] = useState({
    name: "",
    phoneNumbers: [""],
    balance: "",
    dueDate: "",
    status: "untouched" as Account["status"],
    assignedTo: "",
    bankPartner: "",
    remarks: ""
  })

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (!query.trim()) {
      setFilteredAccounts(mockAccounts)
      return
    }
    
    const filtered = mockAccounts.filter(account =>
      account.name.toLowerCase().includes(query.toLowerCase()) ||
      account.phoneNumbers.some(phone => phone.includes(query)) ||
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
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-accent hover:shadow-accent">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Account
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-dialog border-glass-border max-w-4xl">
                <DialogHeader>
                  <DialogTitle className="text-foreground">
                    {uploadMode === "single" ? "Add New Account" : "Bulk Upload Accounts"}
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    {uploadMode === "single" 
                      ? "Create a new customer account for collection management."
                      : "Upload multiple accounts from CSV/Excel file and assign them to agents, departments, or managers."
                    }
                  </DialogDescription>
                </DialogHeader>
                
                {/* Mode Toggle */}
                <div className="flex items-center space-x-4 py-4 border-b border-glass-border">
                  <Button
                    variant={uploadMode === "single" ? "default" : "outline"}
                    onClick={() => setUploadMode("single")}
                    className={uploadMode === "single" ? "bg-gradient-accent hover:shadow-accent" : "glass-light border-glass-border"}
                  >
                    Single Account
                  </Button>
                  <Button
                    variant={uploadMode === "bulk" ? "default" : "outline"}
                    onClick={() => setUploadMode("bulk")}
                    className={uploadMode === "bulk" ? "bg-gradient-accent hover:shadow-accent" : "glass-light border-glass-border"}
                  >
                    Bulk Upload
                  </Button>
                </div>

                {uploadMode === "single" ? (
                  /* Single Account Form */
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Customer Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter customer name"
                          value={newAccount.name}
                          onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
                          className="glass-light border-glass-border focus:ring-accent focus:border-accent"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="(555) 123-4567"
                          value={newAccount.phoneNumbers[0]}
                          onChange={(e) => setNewAccount({...newAccount, phoneNumbers: [e.target.value]})}
                          className="glass-light border-glass-border focus:ring-accent focus:border-accent"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="balance">Outstanding Balance</Label>
                        <Input
                          id="balance"
                          type="number"
                          placeholder="0.00"
                          value={newAccount.balance}
                          onChange={(e) => setNewAccount({...newAccount, balance: e.target.value})}
                          className="glass-light border-glass-border focus:ring-accent focus:border-accent"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Input
                          id="dueDate"
                          type="date"
                          value={newAccount.dueDate}
                          onChange={(e) => setNewAccount({...newAccount, dueDate: e.target.value})}
                          className="glass-light border-glass-border focus:ring-accent focus:border-accent"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select value={newAccount.status} onValueChange={(value: Account["status"]) => setNewAccount({...newAccount, status: value})}>
                          <SelectTrigger className="glass-light border-glass-border">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="untouched">Untouched</SelectItem>
                            <SelectItem value="touched">Touched</SelectItem>
                            <SelectItem value="ptp">PTP</SelectItem>
                            <SelectItem value="collected">Collected</SelectItem>
                            <SelectItem value="not_collected">Not Collected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="assignedTo">Assigned To</Label>
                        <Select value={newAccount.assignedTo} onValueChange={(value) => setNewAccount({...newAccount, assignedTo: value})}>
                          <SelectTrigger className="glass-light border-glass-border">
                            <SelectValue placeholder="Select agent" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Agent A">Agent A</SelectItem>
                            <SelectItem value="Agent B">Agent B</SelectItem>
                            <SelectItem value="Agent C">Agent C</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bankPartner">Bank Partner</Label>
                      <Input
                        id="bankPartner"
                        placeholder="Enter bank partner name"
                        value={newAccount.bankPartner}
                        onChange={(e) => setNewAccount({...newAccount, bankPartner: e.target.value})}
                        className="glass-light border-glass-border focus:ring-accent focus:border-accent"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="remarks">Remarks</Label>
                      <Textarea
                        id="remarks"
                        placeholder="Add any relevant notes or remarks..."
                        value={newAccount.remarks}
                        onChange={(e) => setNewAccount({...newAccount, remarks: e.target.value})}
                        className="glass-light border-glass-border focus:ring-accent focus:border-accent"
                        rows={3}
                      />
                    </div>
                  </div>
                ) : (
                  /* Bulk Upload Form */
                  <div className="space-y-6 py-4">
                    {/* File Upload Section */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Upload File</Label>
                        <div className="border-2 border-dashed border-glass-border rounded-lg p-6 glass-light">
                          <div className="text-center">
                            <Input
                              type="file"
                              accept=".csv,.xlsx,.xls"
                              onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                              className="mb-4"
                            />
                            <p className="text-sm text-muted-foreground">
                              Supported formats: CSV, Excel (.xlsx, .xls)
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              Required columns: Name, Phone, Balance, Due Date, Bank Partner
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {uploadedFile && (
                        <div className="glass-light p-4 rounded-lg border border-success/20">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                                <FileText className="w-4 h-4 text-success" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground">{uploadedFile.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setUploadedFile(null)}
                              className="text-destructive hover:bg-destructive/10"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bulk Assignment Options */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-foreground">Bulk Assignment Settings</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Default Status</Label>
                          <Select 
                            value={bulkAssignment.status} 
                            onValueChange={(value: Account["status"]) => setBulkAssignment({...bulkAssignment, status: value})}
                          >
                            <SelectTrigger className="glass-light border-glass-border">
                              <SelectValue placeholder="Select default status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="untouched">Untouched</SelectItem>
                              <SelectItem value="touched">Touched</SelectItem>
                              <SelectItem value="ptp">PTP</SelectItem>
                              <SelectItem value="collected">Collected</SelectItem>
                              <SelectItem value="not_collected">Not Collected</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Assign to Agent</Label>
                          <Select 
                            value={bulkAssignment.assignedTo} 
                            onValueChange={(value) => setBulkAssignment({...bulkAssignment, assignedTo: value})}
                          >
                            <SelectTrigger className="glass-light border-glass-border">
                              <SelectValue placeholder="Select agent (optional)" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="Agent A">Agent A</SelectItem>
                              <SelectItem value="Agent B">Agent B</SelectItem>
                              <SelectItem value="Agent C">Agent C</SelectItem>
                              <SelectItem value="Agent D">Agent D</SelectItem>
                              <SelectItem value="Agent E">Agent E</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Department</Label>
                          <Select 
                            value={bulkAssignment.department} 
                            onValueChange={(value) => setBulkAssignment({...bulkAssignment, department: value})}
                          >
                            <SelectTrigger className="glass-light border-glass-border">
                              <SelectValue placeholder="Select department (optional)" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="Collections">Collections</SelectItem>
                              <SelectItem value="Customer Service">Customer Service</SelectItem>
                              <SelectItem value="Recovery">Recovery</SelectItem>
                              <SelectItem value="Legal">Legal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Manager</Label>
                          <Select 
                            value={bulkAssignment.manager} 
                            onValueChange={(value) => setBulkAssignment({...bulkAssignment, manager: value})}
                          >
                            <SelectTrigger className="glass-light border-glass-border">
                              <SelectValue placeholder="Select manager (optional)" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="Manager A">Manager A</SelectItem>
                              <SelectItem value="Manager B">Manager B</SelectItem>
                              <SelectItem value="Manager C">Manager C</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Preview Section */}
                    {uploadedFile && (
                      <div className="space-y-2">
                        <Label>Preview & Validation</Label>
                        <div className="glass-light p-4 rounded-lg border border-glass-border">
                          <div className="text-center text-sm text-muted-foreground">
                            <FileText className="w-8 h-8 mx-auto mb-2 text-accent" />
                            <p>File validation will be performed after upload</p>
                            <p className="text-xs">We'll check for required columns and data format</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex justify-end gap-3 pt-4 border-t border-glass-border">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsAddDialogOpen(false)
                      setUploadMode("single")
                      setUploadedFile(null)
                    }}
                    className="glass-light border-glass-border"
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="bg-gradient-accent hover:shadow-accent"
                    disabled={uploadMode === "bulk" && !uploadedFile}
                    onClick={() => {
                      if (uploadMode === "single") {
                        // Handle single account creation
                        console.log("New account:", newAccount)
                        // Reset single account form
                        setNewAccount({
                          name: "",
                          phoneNumbers: [""],
                          balance: "",
                          dueDate: "",
                          status: "untouched",
                          assignedTo: "",
                          bankPartner: "",
                          remarks: ""
                        })
                      } else {
                        // Handle bulk upload
                        console.log("Bulk upload:", { file: uploadedFile, assignment: bulkAssignment })
                        // Reset bulk form
                        setUploadedFile(null)
                        setBulkAssignment({
                          assignedTo: "none",
                          department: "none",
                          manager: "none",
                          status: "untouched"
                        })
                      }
                      setIsAddDialogOpen(false)
                      setUploadMode("single")
                    }}
                  >
                    {uploadMode === "single" ? "Create Account" : "Upload Accounts"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
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
              {mockAccounts.filter(acc => acc.status === 'untouched').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Untouched accounts
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
                        <div className="font-mono text-sm text-foreground">
                          {account.phoneNumbers[0]}
                          {account.phoneNumbers.length > 1 && (
                            <Badge variant="secondary" className="ml-2 text-xs">
                              +{account.phoneNumbers.length - 1}
                            </Badge>
                          )}
                        </div>
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
                        <span className="mr-1">{getStatusIcon(account.status)}</span>
                        {account.status.replace('_', ' ').charAt(0).toUpperCase() + account.status.replace('_', ' ').slice(1)}
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