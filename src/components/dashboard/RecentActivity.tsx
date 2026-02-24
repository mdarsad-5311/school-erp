import { cn } from "../../lib/utils";

interface Activity {
    id: string;
    title: string;
    description: string;
    time: string;
    type: "enrollment" | "payment" | "attendance" | "exam" | "notice";
}

const activities: Activity[] = [
    {
        id: "1",
        title: "New Student Enrolled",
        description: "Daniyal Shaikh enrolled in Class 10-A",
        time: "2 hours ago",
        type: "enrollment",
    },
    {
        id: "2",
        title: "Fee Payment Received",
        description: "$1,500 received from Sattar Ali",
        time: "4 hours ago",
        type: "payment",
    },
    {
        id: "3",
        title: "Attendance Marked",
        description: "Class 8-B attendance marked by Zahida Shaikh",
        time: "5 hours ago",
        type: "attendance",
    },
    {
        id: "4",
        title: "Exam Results Published",
        description: "Mid-term results published for Grade 9",
        time: "Yesterday",
        type: "exam",
    },
    {
        id: "5",
        title: "Notice Posted",
        description: "Holiday announcement for next week",
        time: "2 days ago",
        type: "notice",
    },
];

const typeColors = {
    enrollment: "bg-success/10 text-success",
    payment: "bg-primary/10 text-primary",
    attendance: "bg-info/10 text-info",
    exam: "bg-warning/10 text-warning",
    notice: "bg-muted text-muted-foreground",
};

export function RecentActivity() {
    return (
        <div className="rounded-xl stat-card bg-card ml-2 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
            <div className="space-y-4">
                {activities.map((activity) => (
                    <div
                        key={activity.id}
                        className="flex items-start gap-4 py-3 border-b border-gray-200 last:border-b-0"
                    >
                        <div
                            className={cn(
                                "h-2 w-2 mt-2 rounded-full flex-shrink-0",
                                typeColors[activity.type]
                            )}
                        />
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground">{activity.title}</p>
                            <p className="text-sm text-muted-foreground truncate">
                                {activity.description}
                            </p>
                        </div>
                        <span className="text-xs text-muted-foreground flex-shrink-0">
                            {activity.time}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
