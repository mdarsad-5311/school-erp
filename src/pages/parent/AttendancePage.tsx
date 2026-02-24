import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { attendanceData } from "@/data/mockData";
import { CheckCircle, XCircle, Clock } from "lucide-react";

export default function ParentAttendancePage() {
    const childAttendance = attendanceData["S001"];

    return (
        <DashboardLayout role="parent" title="Attendance" userName="Sarah Smith">
            <h2 className="text-lg font-semibold mb-4">John Smith's Attendance</h2>
            <div className="grid gap-6 md:grid-cols-3 mb-6">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-success/10"><CheckCircle className="h-6 w-6 text-success" /></div>
                            <div><p className="text-sm text-muted-foreground">Present</p><p className="text-2xl font-bold">{childAttendance.present}</p></div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-destructive/10"><XCircle className="h-6 w-6 text-destructive" /></div>
                            <div><p className="text-sm text-muted-foreground">Absent</p><p className="text-2xl font-bold">{childAttendance.absent}</p></div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-warning/10"><Clock className="h-6 w-6 text-warning" /></div>
                            <div><p className="text-sm text-muted-foreground">Late</p><p className="text-2xl font-bold">{childAttendance.late}</p></div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader><CardTitle>Overall Attendance</CardTitle></CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="font-medium">Attendance Rate</span>
                            <span className="text-2xl font-bold">{childAttendance.percentage}%</span>
                        </div>
                        <Progress value={childAttendance.percentage} className="h-4" />
                    </div>
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}
