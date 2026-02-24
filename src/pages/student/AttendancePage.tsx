import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { studentAttendance, studentStats } from "@/data/mockData";
import { CheckCircle2, XCircle, Clock, Calendar } from "lucide-react";

export default function StudentAttendancePage() {
    const totalDays = studentAttendance.length;
    const presentDays = studentAttendance.filter((a: any) => a.status === "Present").length;
    const absentDays = studentAttendance.filter((a: any) => a.status === "Absent").length;
    const lateDays = studentAttendance.filter((a: any) => a.status === "Late").length;

    return (
        <DashboardLayout role="student" title="Attendance" userName="John Smith">
            <div className="grid gap-6 md:grid-cols-4 mb-6">
                <Card className="stat-card">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-primary/10 text-primary"><Calendar className="h-6 w-6" /></div>
                            <div>
                                <p className="text-sm text-muted-foreground">Overall ({totalDays} days)</p>
                                <p className="text-2xl font-bold">{studentStats.attendance}%</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="stat-card">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-green-500/10 text-green-500"><CheckCircle2 className="h-6 w-6" /></div>
                            <div><p className="text-sm text-muted-foreground">Present</p><p className="text-2xl font-bold">{presentDays}</p></div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="stat-card">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-red-500/10 text-red-500"><XCircle className="h-6 w-6" /></div>
                            <div><p className="text-sm text-muted-foreground">Absent</p><p className="text-2xl font-bold">{absentDays}</p></div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="stat-card">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-500"><Clock className="h-6 w-6" /></div>
                            <div><p className="text-sm text-muted-foreground">Late</p><p className="text-2xl font-bold">{lateDays}</p></div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader><CardTitle>Attendance History</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {studentAttendance.map((record: any, idx: number) => (
                                <TableRow key={idx}>
                                    <TableCell className="font-medium">{record.date}</TableCell>
                                    <TableCell>{record.subject}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            record.status === "Present" ? "default" :
                                                record.status === "Absent" ? "destructive" : "secondary"
                                        }>
                                            {record.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}
