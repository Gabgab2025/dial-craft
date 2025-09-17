import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Phone, 
  PhoneCall,
  PhoneOff,
  Pause,
  Play,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Clock,
  User,
  MessageSquare,
  FileText,
  Save,
  SkipForward
} from "lucide-react"

interface CallSession {
  id: string
  accountId: string
  customerName: string
  phoneNumber: string
  balance: number
  lastContact: string
  attempts: number
  priority: "high" | "medium" | "low"
}

interface ActiveCall {
  duration: number
  status: "dialing" | "connected" | "on_hold" | "ended"
  startTime: Date
}

// Mock data
const mockCallQueue: CallSession[] = [
  {
    id: "CALL-001",
    accountId: "ACC-001", 
    customerName: "John Smith",
    phoneNumber: "(555) 123-4567",
    balance: 2500.00,
    lastContact: "2024-01-10",
    attempts: 2,
    priority: "high"
  },
  {
    id: "CALL-002",
    accountId: "ACC-002",
    customerName: "Sarah Johnson", 
    phoneNumber: "(555) 234-5678",
    balance: 1200.00,
    lastContact: "2024-01-12",
    attempts: 1,
    priority: "medium"
  },
  {
    id: "CALL-003",
    accountId: "ACC-004",
    customerName: "Emily Davis",
    phoneNumber: "(555) 456-7890", 
    balance: 3200.00,
    lastContact: "Never",
    attempts: 0,
    priority: "high"
  }
]

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

function getPriorityColor(priority: CallSession["priority"]) {
  switch (priority) {
    case "high": return "bg-destructive/10 text-destructive border-destructive/20"
    case "medium": return "bg-warning/10 text-warning border-warning/20"
    case "low": return "bg-success/10 text-success border-success/20"
    default: return "bg-muted/10 text-muted-foreground border-muted/20"
  }
}

export default function CallCenter() {
  const [callQueue, setCallQueue] = useState(mockCallQueue)
  const [activeCall, setActiveCall] = useState<ActiveCall | null>(null)
  const [currentCustomer, setCurrentCustomer] = useState<CallSession | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [notes, setNotes] = useState("")
  const [selectedDisposition, setSelectedDisposition] = useState("")

  // Timer effect for active call
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (activeCall && activeCall.status === "connected") {
      interval = setInterval(() => {
        setActiveCall(prev => prev ? {
          ...prev,
          duration: prev.duration + 1
        } : null)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [activeCall])

  const startCall = (customer: CallSession) => {
    setCurrentCustomer(customer)
    setActiveCall({
      duration: 0,
      status: "dialing",
      startTime: new Date()
    })
    
    // Simulate connection after 3 seconds
    setTimeout(() => {
      setActiveCall(prev => prev ? { ...prev, status: "connected" } : null)
    }, 3000)
  }

  const endCall = () => {
    setActiveCall(prev => prev ? { ...prev, status: "ended" } : null)
    // Clear after showing ended status briefly
    setTimeout(() => {
      setActiveCall(null)
      setCurrentCustomer(null)
      setNotes("")
      setSelectedDisposition("")
    }, 2000)
  }

  const skipCall = () => {
    if (currentCustomer) {
      // Move current customer to end of queue
      setCallQueue(prev => [
        ...prev.filter(c => c.id !== currentCustomer.id),
        { ...currentCustomer, attempts: currentCustomer.attempts + 1 }
      ])
    }
    setActiveCall(null)
    setCurrentCustomer(null)
    setNotes("")
    setSelectedDisposition("")
  }

  const dispositions = [
    "PAYMENT_ARRANGED",
    "PAYMENT_FULL", 
    "REFUSED_PAYMENT",
    "NO_ANSWER",
    "VOICEMAIL_LEFT",
    "CALLBACK_REQUESTED",
    "DISCONNECTED",
    "DISPUTE_CLAIM"
  ]

  return (
    <div className="min-h-screen bg-background p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glass-card p-6 border-glass-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-poppins text-foreground">
              Call Center
            </h1>
            <p className="text-muted-foreground mt-1">
              3CX Integration • Outbound Dialing System
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="border-success text-success">
              <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
              3CX Connected
            </Badge>
            <Badge variant="secondary" className="font-mono">
              Queue: {callQueue.length}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Active Call Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Call Control */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-accent" />
                <span>Call Control</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!activeCall ? (
                <div className="text-center py-12">
                  <PhoneCall className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Dial</h3>
                  <p className="text-muted-foreground mb-6">
                    Select a customer from the queue to start calling
                  </p>
                  <Button 
                    className="bg-gradient-accent hover:shadow-accent"
                    onClick={() => callQueue.length > 0 && startCall(callQueue[0])}
                    disabled={callQueue.length === 0}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Auto Dialing
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Customer Info */}
                  {currentCustomer && (
                    <div className="glass-light p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground">
                            {currentCustomer.customerName}
                          </h3>
                          <p className="text-muted-foreground font-mono">
                            {currentCustomer.phoneNumber}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold font-mono text-foreground">
                            {formatCurrency(currentCustomer.balance)}
                          </div>
                          <Badge className={getPriorityColor(currentCustomer.priority)}>
                            {currentCustomer.priority.toUpperCase()} Priority
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Account:</span>
                          <div className="font-mono font-medium">{currentCustomer.accountId}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Last Contact:</span>
                          <div className="font-medium">{currentCustomer.lastContact}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Attempts:</span>
                          <div className="font-medium">{currentCustomer.attempts}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Call Status */}
                  <div className="text-center">
                    <div className="text-4xl font-mono font-bold text-foreground mb-2">
                      {formatDuration(activeCall.duration)}
                    </div>
                    <Badge 
                      variant="outline" 
                      className={
                        activeCall.status === "connected" ? "border-success text-success" :
                        activeCall.status === "dialing" ? "border-warning text-warning" :
                        activeCall.status === "on_hold" ? "border-accent text-accent" :
                        "border-muted text-muted-foreground"
                      }
                    >
                      {activeCall.status === "dialing" && "Dialing..."}
                      {activeCall.status === "connected" && "Connected"}
                      {activeCall.status === "on_hold" && "On Hold"}
                      {activeCall.status === "ended" && "Call Ended"}
                    </Badge>
                  </div>

                  {/* Call Controls */}
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setIsMuted(!isMuted)}
                      className="glass-light border-glass-border"
                    >
                      {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="lg" 
                      onClick={() => setActiveCall(prev => prev ? {
                        ...prev,
                        status: prev.status === "on_hold" ? "connected" : "on_hold"
                      } : null)}
                      className="glass-light border-glass-border"
                      disabled={activeCall.status !== "connected" && activeCall.status !== "on_hold"}
                    >
                      {activeCall.status === "on_hold" ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                    </Button>

                    <Button
                      size="lg"
                      onClick={endCall}
                      className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                    >
                      <PhoneOff className="w-5 h-5" />
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      onClick={skipCall}
                      className="glass-light border-glass-border"
                    >
                      <SkipForward className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Call Notes & Disposition */}
          {activeCall && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-accent" />
                  <span>Call Notes & Disposition</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Call Notes
                  </label>
                  <Textarea
                    placeholder="Enter call notes, customer responses, payment arrangements..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="glass-light border-glass-border focus:ring-accent focus:border-accent"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Disposition Code
                  </label>
                  <select
                    value={selectedDisposition}
                    onChange={(e) => setSelectedDisposition(e.target.value)}
                    className="w-full glass-light border-glass-border rounded-lg px-3 py-2 focus:ring-accent focus:border-accent"
                  >
                    <option value="">Select disposition...</option>
                    {dispositions.map(disp => (
                      <option key={disp} value={disp}>
                        {disp.replace(/_/g, ' ')}
                      </option>
                    ))}
                  </select>
                </div>

                <Button 
                  className="w-full bg-gradient-accent hover:shadow-accent"
                  disabled={!notes.trim() || !selectedDisposition}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Call Log
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Call Queue */}
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-accent" />
                <span>Call Queue</span>
              </CardTitle>
              <CardDescription>
                {callQueue.length} customers waiting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {callQueue.slice(0, 5).map((customer, index) => (
                  <div 
                    key={customer.id}
                    className="glass-light p-3 rounded-lg hover:bg-glass-medium/50 transition-colors cursor-pointer"
                    onClick={() => !activeCall && startCall(customer)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-foreground">
                        {customer.customerName}
                      </div>
                      <Badge className={getPriorityColor(customer.priority)}>
                        {customer.priority.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div className="font-mono">{customer.phoneNumber}</div>
                      <div className="flex justify-between">
                        <span>{formatCurrency(customer.balance)}</span>
                        <span>Attempts: {customer.attempts}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {callQueue.length === 0 && (
                  <div className="text-center py-8">
                    <Phone className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No customers in queue</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base">Today's Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Calls Made</span>
                <span className="font-mono font-bold">47</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Talk Time</span>
                <span className="font-mono font-bold">3h 42m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Contact Rate</span>
                <span className="font-mono font-bold text-success">68%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Payments</span>
                <span className="font-mono font-bold text-success">$8,450</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}