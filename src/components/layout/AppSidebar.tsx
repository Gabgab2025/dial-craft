import { useState } from "react"
import { 
  Home, 
  Users, 
  Phone, 
  FileText, 
  BarChart3, 
  Settings, 
  Shield,
  Headphones,
  Database,
  Upload
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

interface MenuItem {
  title: string
  url: string
  icon: typeof Home
  roles: string[]
}

const menuItems: MenuItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: Home, roles: ["admin", "manager", "agent"] },
  { title: "Accounts", url: "/accounts", icon: Users, roles: ["admin", "manager", "agent"] },
  { title: "Call Center", url: "/calls", icon: Phone, roles: ["admin", "manager", "agent"] },
  { title: "Dispositions", url: "/dispositions", icon: FileText, roles: ["admin", "manager"] },
  { title: "Upload Data", url: "/upload", icon: Upload, roles: ["admin", "manager"] },
  { title: "Reports", url: "/reports", icon: BarChart3, roles: ["admin", "manager"] },
  { title: "User Management", url: "/users", icon: Shield, roles: ["admin"] },
  { title: "System Settings", url: "/settings", icon: Settings, roles: ["admin"] },
]

const integrationItems: MenuItem[] = [
  { title: "3CX Status", url: "/integrations/3cx", icon: Headphones, roles: ["admin", "manager"] },
  { title: "Database", url: "/integrations/database", icon: Database, roles: ["admin"] },
]

interface AppSidebarProps {
  userRole?: string
}

export function AppSidebar({ userRole = "agent" }: AppSidebarProps) {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-sidebar-accent/50 text-sidebar-foreground font-medium border-l-2 border-sidebar-primary" 
      : "text-sidebar-foreground/80 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground"

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole))
  const filteredIntegrationItems = integrationItems.filter(item => item.roles.includes(userRole))
  const collapsed = state === "collapsed"

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} glass border-r border-sidebar-border transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className="bg-transparent">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 font-poppins font-semibold px-4 mb-2">
            {!collapsed && "Main Menu"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {filteredMenuItems.map((item) => {
                const isItemActive = isActive(item.url)
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={`${getNavCls({ isActive: isItemActive })} transition-all duration-200`}
                    >
                      <NavLink to={item.url} end className="flex items-center space-x-3 px-4 py-2.5 rounded-lg">
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {!collapsed && (
                          <span className="font-medium text-sm">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Integration Section */}
        {filteredIntegrationItems.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground/60 font-poppins font-semibold px-4 mb-2 mt-6">
              {!collapsed && "Integrations"}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {filteredIntegrationItems.map((item) => {
                  const isItemActive = isActive(item.url)
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`${getNavCls({ isActive: isItemActive })} transition-all duration-200`}
                      >
                        <NavLink to={item.url} end className="flex items-center space-x-3 px-4 py-2.5 rounded-lg">
                          <item.icon className="w-5 h-5 flex-shrink-0" />
                          {!collapsed && (
                            <span className="font-medium text-sm">{item.title}</span>
                          )}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  )
}