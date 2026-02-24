import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { students, classes } from "@/data/mockData";
import { Check, X, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TeacherAttendancePage() {
    const [selectedClass, setSelectedClass] = useState("10-A");
    const [attendance, setAttendance] = useState<Record<string, "present" | "absent" | "late">>({});
    const { toast } = useToast();

    const classStudents = students.filter(s => s.class === selectedClass);

    const markAttendance = (studentId: string, status: "present" | "absent" | "late") => {
        setAttendance(prev => ({ ...prev, [studentId]: status }));
    };

    const handleSubmit = () => {
        toast({ title: "Success", description: "Attendance submitted successfully" });
    };

    return (
        <DashboardLayout role="teacher" title="Attendance" userName="Mr. Anderson">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Mark Attendance</CardTitle>
                    <div className="flex gap-3">
                        <Select value={selectedClass} onValueChange={setSelectedClass}>
                            <SelectTrigger className="w-48"><SelectValue placeholder="Select Class" /></SelectTrigger>
                            <SelectContent>
                                {classes.map(c => (
                                    <SelectItem key={c.id} value={`${c.grade}-${c.section}`}>{c.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button onClick={handleSubmit} className="btn-gradient">Submit Attendance</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Roll No</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {classStudents.map(student => (
                                <TableRow key={student.id} className="border-b border-gray-200">
                                    <TableCell>{student.rollNo}</TableCell>
                                    <TableCell className="font-medium">{student.name}</TableCell>
                                    <TableCell>
                                        {attendance[student.id] ? (
                                            <Badge variant={attendance[student.id] === "present" ? "default" : attendance[student.id] === "late" ? "secondary" : "destructive"}>
                                                {attendance[student.id]}
                                            </Badge>
                                        ) : (
                                            <span className="text-muted-foreground text-sm italic">Not marked</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button size="sm" variant={attendance[student.id] === "present" ? "default" : "outline"} onClick={() => markAttendance(student.id, "present")}>
                                                <Check className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant={attendance[student.id] === "absent" ? "destructive" : "outline"} onClick={() => markAttendance(student.id, "absent")}>
                                                <X className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant={attendance[student.id] === "late" ? "secondary" : "outline"} onClick={() => markAttendance(student.id, "late")}>
                                                <Clock className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {classStudents.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                        No students found for this class.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}
