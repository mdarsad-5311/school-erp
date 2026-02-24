import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { timetable, classes } from "@/data/mockData";

export default function TimetablePage() {
    const [selectedClass, setSelectedClass] = useState("10-A");
    const schedule = timetable[selectedClass] || [];

    return (
        <DashboardLayout role="admin" title="Timetable" userName="Admin User">
            <Card>
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <CardTitle>Class Timetable</CardTitle>
                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                            {classes.map(cls => (
                                <SelectItem key={cls.id} value={`${cls.grade}-${cls.section}`}>
                                    {cls.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardHeader>
                <CardContent>
                    {schedule.length > 0 ? (
                        <div className="space-y-6">
                            {schedule.map((day) => (
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
                                                        ) : (
                                                            period.subject
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="text-muted-foreground">{period.teacher}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center text-muted-foreground">
                            No timetable defined for this class yet.
                        </div>
                    )}
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}
