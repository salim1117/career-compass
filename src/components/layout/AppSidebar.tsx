import { LayoutDashboard, Code, ClipboardCheck, BookOpen, User, History, FileText, CheckSquare, Rocket } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Analyze JD", url: "/analyze", icon: FileText },
  { title: "History", url: "/history", icon: History },
  { title: "Practice", url: "/practice", icon: Code },
  { title: "Assessments", url: "/assessments", icon: ClipboardCheck },
  { title: "Resources", url: "/resources", icon: BookOpen },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Test Checklist", url: "/test-checklist", icon: CheckSquare },
  { title: "Ship & Submit", url: "/proof", icon: Rocket },
];

export function AppSidebar() {
  return (
    <Sidebar className="w-56 border-r border-border" collapsible="icon">
      <SidebarTrigger className="m-3 self-end" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-serif text-xs uppercase tracking-wider text-muted-foreground">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className="flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors duration-150 hover:bg-accent"
                      activeClassName="bg-accent text-primary font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
