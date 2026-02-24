import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Check, X, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface AttendanceRecord {
    id: string;
    name: string;
    rollNo: string;
    status: "present" | "absent" | "late";
}

const attendanceData: AttendanceRecord[] = [
    { id: "1", name: "Daniyal Shaikh", rollNo: "2024001", status: "present" },
    { id: "2", name: "Aiman Shaikh", rollNo: "2024002", status: "present" },
    { id: "3", name: "Shadman Khan", rollNo: "2024003", status: "absent" },
    { id: "4", name: "Shakira Shaikh", rollNo: "2024004", status: "present" },
    { id: "5", name: "Sadiya Khan", rollNo: "2024005", status: "late" },
    { id: "6", name: "Areeba Shaikh", rollNo: "2024006", status: "present" },
    { id: "7", name: "Hamza Ali", rollNo: "2024007", status: "present" },
    { id: "8", name: "Zainab Ahmed", rollNo: "2024008", status: "absent" },
];

const statusConfig = {
    present: { icon: Check, label: "Present", color: "bg-success/10 text-success" },
    absent: { icon: X, label: "Absent", color: "bg-destructive/10 text-destructive" },
    late: { icon: Clock, label: "Late", color: "bg-warning/10 text-warning" },
};

export default function AttendancePage() {
    const [selectedClass, setSelectedClass] = useState("10-A");
    const [selectedDate, setSelectedDate] = useState("2026-01-14");
    const [attendance, setAttendance] = useState<Record<string, "present" | "absent" | "late">>(() =>
        Object.fromEntries(attendanceData.map((s) => [s.id, s.status]))
    );



    const presentCount = Object.values(attendance).filter((s) => s === "present").length;
    const absentCount = Object.values(attendance).filter((s) => s === "absent").length;
    const lateCount = Object.values(attendance).filter((s) => s === "late").length;

    return (
        <DashboardLayout role="admin" title="Attendance" userName="Admin User">
            {/* Filters */}
            <div className="rounded-xl bg-card p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Select Class" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10-A">Class 10-A</SelectItem>
                            <SelectItem value="10-B">Class 10-B</SelectItem>
                            <SelectItem value="9-A">Class 9-A</SelectItem>
                            <SelectItem value="9-B">Class 9-B</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="relative bg-gray-200 rounded-md">
                        <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="h-10 pl-9 pr-4 rounded-md bg-background text-sm input-focus "
                        />
                    </div>
                    <div className="flex-1" />
                    <Button className="btn-gradient">Save Attendance</Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="rounded-xl bg-card stat-card p-4 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
                        <Check className="h-6 w-6 text-success" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-foreground">{presentCount}</p>
                        <p className="text-sm text-muted-foreground">Present</p>
                    </div>
                </div>
                <div className="rounded-xl bg-card stat-card p-4 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                        <X className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-foreground">{absentCount}</p>
                        <p className="text-sm text-muted-foreground">Absent</p>
                    </div>
                </div>
                <div className="rounded-xl bg-card stat-card p-4 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center">
                        <Clock className="h-6 w-6 text-warning" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-foreground">{lateCount}</p>
                        <p className="text-sm text-muted-foreground">Late</p>
                    </div>
                </div>
            </div>

            {/* Attendance Table */}
            <div className="rounded-xl stat-card bg-card overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead>Student</TableHead>
                            <TableHead>Roll No</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {attendanceData.map((student) => {
                            const status = attendance[student.id];
                            const config = statusConfig[status];
                            const StatusIcon = config.icon;
                            return (
                                <TableRow key={student.id} className="table-row-hover border-b border-gray-200">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9">
                                                <AvatarFallback className="bg-primary/10 text-primary text-sm">
                                                    {student.name.split(" ").map((n) => n[0]).join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{student.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-mono text-sm">{student.rollNo}</TableCell>
                                    <TableCell>
                                        <Badge className={cn("gap-1", config.color)}>
                                            <StatusIcon className="h-3 w-3" />
                                            {config.label}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-1">
                                            {(["present", "absent", "late"] as const).map((s) => {
                                                const cfg = statusConfig[s];
                                                const Icon = cfg.icon;
                                                return (
                                                    <Button
                                                        key={s}
                                                        variant={status === s ? "default" : "outline"}
                                                        size="icon"
                                                        className={cn(
                                                            "h-8 w-8",
                                                            status === s && cfg.color.replace("/10", "").replace("text-", "bg-")
                                                        )}
                                                        onClick={() =>
                                                            setAttendance((prev) => ({ ...prev, [student.id]: s }))
                                                        }
                                                    >
                                                        <Icon className="h-4 w-4" />
                                                    </Button>
                                                );
                                            })}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </DashboardLayout>
    );
}
