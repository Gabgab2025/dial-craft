import { ReactNode } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { TopNav } from "./TopNav"

interface AppLayoutProps {
  children: ReactNode
  userEmail?: string
  userRole?: string
  onLogout: () => void
}

export function AppLayout({ children, userEmail, userRole, onLogout }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar userRole={userRole} userEmail={userEmail} onLogout={onLogout} />
        
        <div className="flex-1 flex flex-col">
          <TopNav 
            userEmail={userEmail} 
            userRole={userRole} 
            onLogout={onLogout} 
          />
          
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}