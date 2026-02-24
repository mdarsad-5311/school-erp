import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
    LayoutDashboard,
    Users,
    GraduationCap,
    BookOpen,
    Calendar,
    ClipboardCheck,
    DollarSign,
    MessageSquare,
    Bell,
    Library,
    Bus,
    BarChart3,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
    School,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
    role: "admin" | "teacher" | "student" | "parent" | "accountant";
    className?: string;
    showToggle?: boolean;
}

const menuItems = {
    admin: [
        { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
        { icon: Users, label: "Students", path: "/admin/students" },
        { icon: GraduationCap, label: "Teachers", path: "/admin/teachers" },
        { icon: BookOpen, label: "Classes", path: "/admin/classes" },
        { icon: Calendar, label: "Timetable", path: "/admin/timetable" },
        { icon: ClipboardCheck, label: "Attendance", path: "/admin/attendance" },
        { icon: BarChart3, label: "Examinations", path: "/admin/exams" },
        { icon: DollarSign, label: "Fees", path: "/admin/fees" },
        { icon: MessageSquare, label: "Messages", path: "/admin/messages" },
        { icon: Bell, label: "Notices", path: "/admin/notices" },
        { icon: Library, label: "Library", path: "/admin/library" },
        { icon: Bus, label: "Transport", path: "/admin/transport" },
        { icon: Settings, label: "Settings", path: "/admin/settings" },
    ],
    teacher: [
        { icon: LayoutDashboard, label: "Dashboard", path: "/teacher" },
        { icon: Users, label: "My Students", path: "/teacher/students" },
        { icon: BookOpen, label: "My Classes", path: "/teacher/classes" },
        { icon: ClipboardCheck, label: "Attendance", path: "/teacher/attendance" },
        { icon: BarChart3, label: "Examinations", path: "/teacher/exams" },
        { icon: Calendar, label: "Timetable", path: "/teacher/timetable" },
        { icon: MessageSquare, label: "Messages", path: "/teacher/messages" },
        { icon: Bell, label: "Notices", path: "/teacher/notices" },
    ],
    student: [
        { icon: LayoutDashboard, label: "Dashboard", path: "/student" },
        { icon: BookOpen, label: "My Classes", path: "/student/classes" },
        { icon: Calendar, label: "Timetable", path: "/student/timetable" },
        { icon: ClipboardCheck, label: "Attendance", path: "/student/attendance" },
        { icon: BarChart3, label: "Results", path: "/student/results" },
        { icon: DollarSign, label: "Fees", path: "/student/fees" },
        { icon: Library, label: "Library", path: "/student/library" },
        { icon: Bell, label: "Notices", path: "/student/notices" },
    ],
    parent: [
        { icon: LayoutDashboard, label: "Dashboard", path: "/parent" },
        { icon: Users, label: "My Children", path: "/parent/children" },
        { icon: ClipboardCheck, label: "Attendance", path: "/parent/attendance" },
        { icon: BarChart3, label: "Results", path: "/parent/results" },
        { icon: DollarSign, label: "Fees", path: "/parent/fees" },
        { icon: MessageSquare, label: "Messages", path: "/parent/messages" },
        { icon: Bell, label: "Notices", path: "/parent/notices" },
    ],
    accountant: [
        { icon: LayoutDashboard, label: "Dashboard", path: "/accountant" },
        { icon: DollarSign, label: "Fee Collection", path: "/accountant/fees" },
        { icon: Users, label: "Students", path: "/accountant/students" },
        { icon: BarChart3, label: "Reports", path: "/accountant/reports" },
        { icon: Settings, label: "Settings", path: "/accountant/settings" },
    ],
};

export function Sidebar({ role, className, showToggle = true }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const items = menuItems[role];

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <aside
            className={cn(
                "h-screen bg-gradient-to-r from-blue-500 to-purple-700 text-gray-100 flex flex-col z-50 transition-all duration-300",
                collapsed ? "w-20" : "w-64",
                className
            )}
        >
            {/* Logo */}
            <div className="flex items-center gap-3 px-4 py-6 border-b border-gray-50 border-sidebar-border">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                    <School className="h-5 w-5 text-white" />
                </div>
                {!collapsed && (
                    <div className="animate-fade-in">
                        <h1 className="text-lg font-bold text-black">AL-Umaima</h1>
                        <p className="text-xs text-black capitalize">{role} Portal</p>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-3 py-4">
                <ul className="space-y-1">
                    {items.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-black font-semibold hover:bg-white/10",
                                        isActive && "bg-white/20"
                                    )}
                                    title={collapsed ? item.label : undefined}
                                >
                                    <item.icon className="h-5 w-5 flex-shrink-0 text-black font-semibold" />
                                    {!collapsed && (
                                        <span className="animate-fade-in">{item.label}</span>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="border-t border-gray-50 border-sidebar-border p-3">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-black font-semibold hover:text-red-500 hover:bg-white/10"
                    title={collapsed ? "Logout" : undefined}
                >
                    <LogOut className="h-5 w-5 flex-shrink-0" />
                    {!collapsed && <span>Logout</span>}
                </button>
            </div>

            {/* Toggle Button */}
            {showToggle && (
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute -right-3 top-20 hidden lg:flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-shadow"
                >
                    {collapsed ? (
                        <ChevronRight className="h-4 w-4" />
                    ) : (
                        <ChevronLeft className="h-4 w-4" />
                    )}
                </button>
            )}
        </aside>
    );
}
