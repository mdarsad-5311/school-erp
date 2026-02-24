import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { timetable } from "@/data/mockData";

export default function StudentTimetablePage() {
    const schedule = timetable["10-A"];

    return (
        <DashboardLayout role="student" title="Timetable" userName="John Smith">
            <Card>
                <CardHeader><CardTitle>My Weekly Schedule</CardTitle></CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {schedule.map((day: any) => (
                            <div key={day.day}>
                                <h3 className="text-lg font-semibold mb-3">{day.day}</h3>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-32">Time</TableHead>
                                            <TableHead>Subject</TableHead>
                                            <TableHead>Teacher</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {day.periods.map((period: any, idx: number) => (
                                            <TableRow key={idx} className="border-b border-gray-200">
                                                <TableCell className="font-medium">{period.time}</TableCell>
                                                <TableCell>
                                                    {period.subject === "Break" || period.subject === "Lunch" ? (
                                                        <Badge variant="secondary">{period.subject}</Badge>
                                                    ) : period.subject}
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">{period.teacher}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}
