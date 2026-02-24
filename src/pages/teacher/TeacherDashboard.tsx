import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { Users, BookOpen, ClipboardCheck, Calendar } from "lucide-react";

export default function TeacherDashboard() {
    return (
        <DashboardLayout role="teacher" title="Dashboard" userName="Mr. Anderson">
            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <StatCard
                    title="My Students"
                    value="128"
                    change="Across 4 classes"
                    changeType="neutral"
                    icon={Users}
                    iconColor="bg-blue-600/10 text-blue-600"
                />
                <StatCard
                    title="Classes Today"
                    value="5"
                    change="2 completed"
                    changeType="neutral"
                    icon={BookOpen}
                    iconColor="bg-green-600/10 text-green-600"
                />
                <StatCard
                    title="Pending Attendance"
                    value="2"
                    change="Mark before 10 AM"
                    changeType="negative"
                    icon={ClipboardCheck}
                    iconColor="bg-yellow-600/10 text-yellow-600"
                />
                <StatCard
                    title="Upcoming Exams"
                    value="3"
                    change="This month"
                    changeType="neutral"
                    icon={Calendar}
                    iconColor="bg-purple-600/10 text-purple-600"
                />
            </div>

            {/* Content Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
                <UpcomingEvents />
                <RecentActivity />
            </div>
        </DashboardLayout>
    );
}
