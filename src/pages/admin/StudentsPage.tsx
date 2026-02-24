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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Plus,
    Search,
    Filter,
    Download,
    MoreHorizontal,
    Eye,
    Pencil,
    Trash2,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Student {
    id: string;
    name: string;
    rollNo: string;
    class: string;
    section: string;
    gender: "Male" | "Female";
    parentName: string;
    phone: string;
    status: "Active" | "Inactive";
}

const students: Student[] = [
    {
        id: "1",
        name: "Daniyal shaikh",
        rollNo: "2024001",
        class: "10",
        section: "A",
        gender: "Male",
        parentName: "Sattar Ali",
        phone: "+1 234-567-8901",
        status: "Active",
    },
    {
        id: "2",
        name: "Aiman shaikh",
        rollNo: "2024002",
        class: "10",
        section: "A",
        gender: "Female",
        parentName: "Sattar Ali",
        phone: "+1 234-567-8902",
        status: "Active",
    },
    {
        id: "3",
        name: "Shadman Khan",
        rollNo: "2024003",
        class: "9",
        section: "B",
        gender: "Male",
        parentName: "Rizwan Hasan",
        phone: "+1 234-567-8903",
        status: "Active",
    },
    {
        id: "4",
        name: "Shakira Shaikh",
        rollNo: "2024004",
        class: "9",
        section: "A",
        gender: "Female",
        parentName: "Rizwan Hasan",
        phone: "+1 234-567-8904",
        status: "Inactive",
    },
    {
        id: "5",
        name: "Sadiya Khan",
        rollNo: "2024005",
        class: "8",
        section: "C",
        gender: "Female",
        parentName: "Abu Alam",
        phone: "+1 234-567-8905",
        status: "Active",
    },
    {
        id: "6",
        name: "Areeba Shaikh",
        rollNo: "2024006",
        class: "8",
        section: "B",
        gender: "Female",
        parentName: "Asjad Shaikh",
        phone: "+1 234-567-8906",
        status: "Active",
    },
];

export default function StudentsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [classFilter, setClassFilter] = useState("all");

    const filteredStudents = students.filter((student) => {
        const matchesSearch =
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.rollNo.includes(searchTerm);
        const matchesClass = classFilter === "all" || student.class === classFilter;
        return matchesSearch && matchesClass;
    });

    return (
        <DashboardLayout role="admin" title="Students" userName="Admin User">
            {/* Header Actions */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search students by name or roll no..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 input-focus"
                    />
                </div>
                <div className="flex gap-2">
                    <Select value={classFilter} onValueChange={setClassFilter}>
                        <SelectTrigger className="w-32">
                            <Filter className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="Class" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Classes</SelectItem>
                            <SelectItem value="8">Class 8</SelectItem>
                            <SelectItem value="9">Class 9</SelectItem>
                            <SelectItem value="10">Class 10</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                    <Button className="btn-gradient">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Student
                    </Button>
                </div>
            </div>

            {/* Students Table */}
            <div className="rounded-xl stat-card bg-card overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b-gray-100">
                            <TableHead>Student</TableHead>
                            <TableHead>Roll No</TableHead>
                            <TableHead>Class</TableHead>
                            <TableHead>Gender</TableHead>
                            <TableHead>Parent Name</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredStudents.map((student) => (
                            <TableRow key={student.id} className="table-row-hover border-b-gray-200">
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
                                    {student.class}-{student.section}
                                </TableCell>
                                <TableCell>{student.gender}</TableCell>
                                <TableCell>{student.parentName}</TableCell>
                                <TableCell>{student.phone}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={student.status === "Active" ? "default" : "secondary"}
                                        className={student.status === "Active" ? "bg-success/10 text-success hover:bg-success/20" : ""}
                                    >
                                        {student.status}
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
                <span>Showing {filteredStudents.length} of {students.length} students</span>
            </div>
        </DashboardLayout>
    );
}
