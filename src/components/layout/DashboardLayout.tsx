import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { TopBar } from "./TopBar";

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-full">
        <TopBar status="In Progress" />
        <div className="flex flex-1 w-full">
          <AppSidebar />
          <main className="flex-1 p-6 lg:p-10 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
