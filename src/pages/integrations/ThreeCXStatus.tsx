import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone, CheckCircle, AlertTriangle, Settings } from "lucide-react"

export default function ThreeCXStatus() {
  return (
    <div className="min-h-screen bg-background p-6 space-y-6 animate-fade-in">
      <div className="glass-card p-6 border-glass-border">
        <h1 className="text-3xl font-bold font-poppins text-foreground mb-2">
          3CX Integration Status
        </h1>
        <p className="text-muted-foreground">Monitor 3CX phone system integration</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-accent" />
              <span>Connection Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Server Connection</span>
              <Badge className="bg-success/10 text-success border-success/20">
                <CheckCircle className="w-3 h-3 mr-1" />
                Connected
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>API Status</span>
              <Badge className="bg-success/10 text-success border-success/20">Active</Badge>
            </div>
            <Button className="w-full bg-gradient-accent hover:shadow-accent">
              <Settings className="w-4 h-4 mr-2" />
              Configure Integration
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Call Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Active Lines</span>
              <span className="font-mono font-bold">12/20</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Queue Length</span>
              <span className="font-mono font-bold">3</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}