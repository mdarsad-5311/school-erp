import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { notices } from "@/data/mockData";
import { Bell } from "lucide-react";

export default function StudentNoticesPage() {
    const studentNotices = notices.filter((n: any) => n.audience === "All" || n.audience === "Students");

    return (
        <DashboardLayout role="student" title="Notices" userName="John Smith">
            <Card>
                <CardHeader><CardTitle>Announcements</CardTitle></CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {studentNotices.map((notice: any) => (
                            <div key={notice.id} className="p-4 rounded-lg stat-card bg-card hover:shadow-md transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-primary/10"><Bell className="h-5 w-5 text-primary" /></div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold">{notice.title}</h3>
                                            <Badge variant={notice.priority === "High" ? "destructive" : "secondary"}>{notice.priority}</Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-2">{notice.content}</p>
                                        <p className="text-xs text-muted-foreground">{notice.date}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}
