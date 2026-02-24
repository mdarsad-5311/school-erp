import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
// import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
  role: "admin" | "teacher" | "student" | "parent" | "accountant";
  title: string;
  userName?: string;
}

export function DashboardLayout({ children, role, title, userName }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar role={role} />
      <div className="pl-20 lg:pl-64 transition-all duration-300">
        <Header title={title} userName={userName} userRole={role.charAt(0).toUpperCase() + role.slice(1)} />
        <main className="p-6 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
