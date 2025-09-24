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

// PRD-aligned mock data for bank collections - Philippine banks
const mockAccounts: Account[] = [
  {
    id: "1",
    accountId: "RCBC-2024-001234",
    name: "Juan Carlos Santos",
    phoneNumbers: ["+63 917 123 4567", "+63 998 765 4321"],
    email: "juan.santos@gmail.com",
    balance: 125000.00,
    dueDate: "2024-01-15",
    bankPartner: "Rcbc",
    status: "touched",
    agent: "Maria Fernandez",
    lastContact: "2024-01-10",
    remarks: "Customer requested payment plan",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-10"
  },
  {
    id: "2",
    accountId: "FDL-2024-001235", 
    name: "Maria Elena Cruz",
    phoneNumbers: ["+63 929 234 5678"],
    email: "maria.cruz@yahoo.com",
    balance: 65000.00,
    dueDate: "2024-01-20",
    bankPartner: "Fundline",
    status: "ptp",
    agent: "Roberto Villanueva",
    lastContact: "2024-01-12",
    remarks: "Promised to pay by Friday",
    createdAt: "2024-01-02",
    updatedAt: "2024-01-12"
  },
  {
    id: "3",
    accountId: "AMG-2024-001236",
    name: "Jose Rizal Mercado", 
    phoneNumbers: ["+63 945 345 6789", "+63 917 345 1111", "+63 998 345 2222"],
    balance: 185000.00,
    dueDate: "2024-02-01",
    bankPartner: "Amg",
    status: "untouched",
    agent: "Ana Reyes",
    createdAt: "2024-01-03",
    updatedAt: "2024-01-03"
  },
  {
    id: "4",
    accountId: "SMB-2024-001237",
    name: "Isabella Gonzales",
    phoneNumbers: ["+63 956 456 7890"], 
    email: "isabella.gonzales@hotmail.com",
    balance: 45000.50,
    dueDate: "2024-01-05",
    bankPartner: "Simbayanan",
    status: "collected",
    agent: "Miguel Torres",
    lastContact: "2024-01-08",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-08"
  },
  {
    id: "5",
    accountId: "FLX-2024-001238",
    name: "Antonio Luna Del Pilar",
    phoneNumbers: ["+63 967 567 8901", "+63 929 567 0000"],
    email: "antonio.luna@gmail.com", 
    balance: 275000.00,
    dueDate: "2024-01-18",
    bankPartner: "Flexi",
    status: "not_collected",
    agent: "Carmen Aquino",
    lastContact: "2024-01-11",
    remarks: "Customer disputes amount - legal review needed",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-11"
  },
  {
    id: "6",
    accountId: "TFS-2024-001239",
    name: "Esperanza Bonifacio",
    phoneNumbers: ["+63 978 678 9012"],
    balance: 95000.00,
    dueDate: "2024-01-25",
    bankPartner: "Tfs",
    status: "untouched",
    agent: "Luis Morales",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-05"
  },
  {
    id: "7",
    accountId: "JAC-2024-001240",
    name: "Fernando Poe Santos",
    phoneNumbers: ["+63 989 789 0123", "+63 917 789 4567"],
    email: "fernando.poe@gmail.com",
    balance: 150000.00,
    dueDate: "2024-01-30",
    bankPartner: "JACCS",
    status: "touched",
    agent: "Sofia Mendoza",
    lastContact: "2024-01-13",
    remarks: "Partial payment received",
    createdAt: "2024-01-06",
    updatedAt: "2024-01-13"
  },
  {
    id: "8",
    accountId: "RDW-2024-001241",
    name: "Gabriela Silang Lopez",
    phoneNumbers: ["+63 990 890 1234"],
    email: "gabriela.silang@outlook.com",
    balance: 80000.75,
    dueDate: "2024-02-05",
    bankPartner: "Radiowealth",
    status: "ptp",
    agent: "Diego Ramos",
    lastContact: "2024-01-14",
    remarks: "Will pay next Monday",
    createdAt: "2024-01-07",
    updatedAt: "2024-01-14"
  },
  {
    id: "9",
    accountId: "CTC-2024-001242",
    name: "Andres Bonifacio Cruz",
    phoneNumbers: ["+63 917 901 2345", "+63 998 901 5678"],
    balance: 220000.00,
    dueDate: "2024-02-10",
    bankPartner: "Ctbc",
    status: "untouched",
    agent: "Luz Rodriguez",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-08"
  },
  {
    id: "10",
    accountId: "EWB-2024-001243",
    name: "Corazon Angeles Reyes",
    phoneNumbers: ["+63 929 012 3456"],
    email: "corazon.reyes@gmail.com",
    balance: 110000.25,
    dueDate: "2024-02-15",
    bankPartner: "Ewb",
    status: "collected",
    agent: "Pablo Martinez",
    lastContact: "2024-01-15",
    createdAt: "2024-01-09",
    updatedAt: "2024-01-15"
  },
  {
    id: "11",
    accountId: "BDO-2024-001244",
    name: "Emilio Aguinaldo Hernandez",
    phoneNumbers: ["+63 945 123 4567", "+63 956 123 7890"],
    email: "emilio.aguinaldo@yahoo.com",
    balance: 195000.50,
    dueDate: "2024-02-20",
    bankPartner: "Bdo",
    status: "touched",
    agent: "Teresa Villanueva",
    lastContact: "2024-01-16",
    remarks: "Customer relocated - new address needed",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-16"
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
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
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
    { value: "Rcbc", label: "RCBC" },
    { value: "Fundline", label: "Fundline" },
    { value: "Amg", label: "AMG" },
    { value: "Simbayanan", label: "Simbayanan" },
    { value: "Flexi", label: "Flexi" },
    { value: "Tfs", label: "TFS" },
    { value: "JACCS", label: "JACCS" },
    { value: "Radiowealth", label: "Radiowealth" },
    { value: "Ctbc", label: "CTBC" },
    { value: "Ewb", label: "EWB" },
    { value: "Bdo", label: "BDO" }
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