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
import { Separator } from "@/components/ui/separator";

const mainNav = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, color: "text-primary" },
  { title: "Analyze JD", url: "/analyze", icon: FileText, color: "text-info" },
  { title: "History", url: "/history", icon: History, color: "text-highlight" },
  { title: "Practice", url: "/practice", icon: Code, color: "text-success" },
  { title: "Assessments", url: "/assessments", icon: ClipboardCheck, color: "text-warning" },
  { title: "Resources", url: "/resources", icon: BookOpen, color: "text-info" },
  { title: "Profile", url: "/profile", icon: User, color: "text-highlight" },
];

const utilityNav = [
  { title: "Test Checklist", url: "/test-checklist", icon: CheckSquare, color: "text-warning" },
  { title: "Ship & Submit", url: "/proof", icon: Rocket, color: "text-primary" },
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
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className="flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors duration-150 hover:bg-accent"
                      activeClassName="bg-accent border-l-2 border-primary text-primary font-medium"
                    >
                      <item.icon className={`h-4 w-4 ${item.color}`} />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="mx-3 my-2" />

        <SidebarGroup>
          <SidebarGroupLabel className="font-serif text-xs uppercase tracking-wider text-muted-foreground">
            Quality
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {utilityNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors duration-150 hover:bg-accent"
                      activeClassName="bg-accent border-l-2 border-primary text-primary font-medium"
                    >
                      <item.icon className={`h-4 w-4 ${item.color}`} />
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
