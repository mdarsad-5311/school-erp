import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
    Plus,
    Search,
    Filter,
    Download,
    MoreHorizontal,
    Eye,
    Pencil,
    Trash2,
    Calendar,
    Clock,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Exam {
    id: string;
    name: string;
    class: string;
    subject: string;
    date: string;
    time: string;
    status: "Scheduled" | "Completed" | "Cancelled";
    totalMarks: number;
}

const exams: Exam[] = [
    {
        id: "1",
        name: "Mid-Term Mathematics",
        class: "10-A",
        subject: "Mathematics",
        date: "2024-03-15",
        time: "09:00 AM - 12:00 PM",
        status: "Scheduled",
        totalMarks: 100,
    },
    {
        id: "2",
        name: "Mid-Term Physics",
        class: "10-A",
        subject: "Physics",
        date: "2024-03-17",
        time: "09:00 AM - 12:00 PM",
        status: "Scheduled",
        totalMarks: 100,
    },
    {
        id: "3",
        name: "Quarterly English",
        class: "9-B",
        subject: "English",
        date: "2024-03-10",
        time: "10:00 AM - 01:00 PM",
        status: "Completed",
        totalMarks: 80,
    },
    {
        id: "4",
        name: "Unit Test - History",
        class: "8-C",
        subject: "History",
        date: "2024-03-20",
        time: "02:00 PM - 03:30 PM",
        status: "Scheduled",
        totalMarks: 50,
    },
    {
        id: "5",
        name: "Science Practical",
        class: "10-A",
        subject: "Science",
        date: "2024-03-01",
        time: "09:00 AM - 11:00 AM",
        status: "Completed",
        totalMarks: 30,
    },
];

export default function ExamsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredExams = exams.filter((exam) => {
        const matchesSearch =
            exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exam.subject.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || exam.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <DashboardLayout role="admin" title="Examinations" userName="Admin User">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search exams by name or subject..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 input-focus"
                    />
                </div>
                <div className="flex gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-40">
                            <Filter className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="Scheduled">Scheduled</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                    <Button className="btn-gradient">
                        <Plus className="h-4 w-4 mr-2" />
                        Schedule Exam
                    </Button>
                </div>
            </div>

            {/* Exams Table */}
            <div className="rounded-xl stat-card bg-card overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead>Exam Name</TableHead>
                            <TableHead>Class</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Marks</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredExams.map((exam) => (
                            <TableRow key={exam.id} className="table-row-hover border-b border-gray-200">
                                <TableCell className="font-medium">{exam.name}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="font-mono">
                                        {exam.class}
                                    </Badge>
                                </TableCell>
                                <TableCell>{exam.subject}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Calendar className="h-3 w-3" />
                                            <span>{exam.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                            <Clock className="h-3 w-3" />
                                            <span>{exam.time}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{exam.totalMarks}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            exam.status === "Scheduled"
                                                ? "default"
                                                : exam.status === "Completed"
                                                    ? "secondary"
                                                    : "destructive"
                                        }
                                        className={
                                            exam.status === "Scheduled"
                                                ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                                : exam.status === "Completed"
                                                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                    : "bg-red-100 text-red-700 hover:bg-red-200"
                                        }
                                    >
                                        {exam.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                <Eye className="h-4 w-4 mr-2" />
                                                View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Pencil className="h-4 w-4 mr-2" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination info */}
            <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                <span>
                    Showing {filteredExams.length} of {exams.length} exams
                </span>
            </div>
        </DashboardLayout>
    );
}
