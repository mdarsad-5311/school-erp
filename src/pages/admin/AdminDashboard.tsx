import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { AttendanceChart } from "@/components/dashboard/AttendanceChart";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { Users, GraduationCap, DollarSign, BookOpen } from "lucide-react";

export default function AdminDashboard() {
    return (
        <DashboardLayout role="admin" title="Dashboard" userName="Admin User">
            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <StatCard
                    title="Total Students"
                    value="1,248"
                    change="+12% from last month"
                    changeType="positive"
                    icon={Users}
                    iconColor="bg-blue-600/10 text-blue-600"
                />
                <StatCard
                    title="Total Teachers"
                    value="64"
                    change="+2 new this month"
                    changeType="positive"
                    icon={GraduationCap}
                    iconColor="bg-green-600/10 text-green-600"
                />
                <StatCard
                    title="Fee Collection"
                    value="$124,500"
                    change="85% collected"
                    changeType="neutral"
                    icon={DollarSign}
                    iconColor="bg-yellow-600/10 text-yellow-600"
                />
                <StatCard
                    title="Active Classes"
                    value="42"
                    change="All sections active"
                    changeType="neutral"
                    icon={BookOpen}
                    iconColor="bg-blue-600/10 text-blue-600"
                />
            </div>

            {/* Charts and Activity */}
            <div className="grid gap-6 lg:grid-cols-2 mb-6">
                <AttendanceChart />
                <UpcomingEvents />
            </div>

            {/* Recent Activity */}
            <RecentActivity />
        </DashboardLayout>
    );
}
