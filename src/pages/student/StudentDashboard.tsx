import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { BookOpen, ClipboardCheck, BarChart3, DollarSign } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { studentStats, consolidatedResults } from "@/data/mockData";

export default function StudentDashboard() {
    const myResults = consolidatedResults.find((r: any) => r.studentId === "S001");

    return (
        <DashboardLayout role="student" title="Dashboard" userName="John Smith">
            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <StatCard
                    title="Total Subjects"
                    value={studentStats.totalSubjects.toString()}
                    change="All active"
                    changeType="neutral"
                    icon={BookOpen}
                    iconColor="#3b82f6"
                />
                <StatCard
                    title="Attendance"
                    value={`${studentStats.attendance}%`}
                    change="+2% from last month"
                    changeType="positive"
                    icon={ClipboardCheck}
                    iconColor="#10b981"
                />
                <StatCard
                    title="Avg. Score"
                    value={`${studentStats.avgScore}%`}
                    change="Keep it up!"
                    changeType="positive"
                    icon={BarChart3}
                    iconColor="#f59e0b"
                />
                <StatCard
                    title="Pending Fees"
                    value={`$${studentStats.pendingFees}`}
                    change="Due: Feb 15"
                    changeType="negative"
                    icon={DollarSign}
                    iconColor="#ef4444"
                />
            </div>

            {/* Content Grid */}
            <div className="grid gap-6 lg:grid-cols-2 mb-6">
                <div className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Subject Performance</h3>
                    <div className="space-y-4">
                        {myResults?.subjects.map((item: any) => (
                            <div key={item.subject} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium">{item.subject}</span>
                                    <span className="text-muted-foreground">{item.marks}%</span>
                                </div>
                                <Progress value={item.marks} className="h-2" />
                            </div>
                        ))}
                    </div>
                </div>
                <UpcomingEvents />
            </div>
        </DashboardLayout>
    );
}
