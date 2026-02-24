import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { StatCard } from "../../components/dashboard/StatCard";
import { UpcomingEvents } from "../../components/dashboard/UpcomingEvents";
import { Users, ClipboardCheck, BarChart3, DollarSign } from "lucide-react";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";

const children = [
    {
        id: "1",
        name: "John Smith",
        class: "10-A",
        attendance: 92,
        avgScore: 85,
        pendingFees: 250,
    },
    {
        id: "2",
        name: "Emma Smith",
        class: "8-B",
        attendance: 95,
        avgScore: 88,
        pendingFees: 0,
    },
];

export default function ParentDashboard() {
    return (
        <DashboardLayout role="parent" title="Dashboard" userName="Robert Smith">
            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <StatCard
                    title="Children"
                    value="2"
                    change="Enrolled"
                    changeType="neutral"
                    icon={Users}
                    iconColor="bg-primary/10 text-primary"
                />
                <StatCard
                    title="Avg. Attendance"
                    value="93.5%"
                    change="Excellent!"
                    changeType="positive"
                    icon={ClipboardCheck}
                    iconColor="bg-success/10 text-success"
                />
                <StatCard
                    title="Avg. Score"
                    value="86.5%"
                    change="Above average"
                    changeType="positive"
                    icon={BarChart3}
                    iconColor="bg-warning/10 text-warning"
                />
                <StatCard
                    title="Pending Fees"
                    value="$250"
                    change="Due: Feb 15"
                    changeType="negative"
                    icon={DollarSign}
                    iconColor="bg-destructive/10 text-destructive"
                />
            </div>

            {/* Children Cards */}
            <div className="grid gap-6 lg:grid-cols-2 mb-6">
                {children.map((child) => (
                    <div key={child.id} className="rounded-xl border bg-card p-6">
                        <div className="flex items-start gap-4 mb-4">
                            <Avatar className="h-14 w-14">
                                <AvatarFallback className="bg-primary/10 text-primary text-lg">
                                    {child.name.split(" ").map((n) => n[0]).join("")}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-lg font-semibold">{child.name}</h3>
                                <Badge variant="outline">Class {child.class}</Badge>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center p-3 rounded-lg bg-muted/50">
                                <p className="text-2xl font-bold text-success">{child.attendance}%</p>
                                <p className="text-xs text-muted-foreground">Attendance</p>
                            </div>
                            <div className="text-center p-3 rounded-lg bg-muted/50">
                                <p className="text-2xl font-bold text-primary">{child.avgScore}%</p>
                                <p className="text-xs text-muted-foreground">Avg. Score</p>
                            </div>
                            <div className="text-center p-3 rounded-lg bg-muted/50">
                                <p className="text-2xl font-bold text-foreground">
                                    ${child.pendingFees}
                                </p>
                                <p className="text-xs text-muted-foreground">Pending</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <UpcomingEvents />
        </DashboardLayout>
    );
}
