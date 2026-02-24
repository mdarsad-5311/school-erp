import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { notices } from "@/data/mockData";
import { Bell } from "lucide-react";

export default function ParentNoticesPage() {
    const parentNotices = notices.filter(n => n.audience === "All" || n.audience === "Parents");

    return (
        <DashboardLayout role="parent" title="Notices" userName="Sarah Smith">
            <Card>
                <CardHeader><CardTitle>School Announcements</CardTitle></CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {parentNotices.map(notice => (
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
