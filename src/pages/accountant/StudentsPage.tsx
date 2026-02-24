import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { students, feePayments } from "@/data/mockData";
import { Search } from "lucide-react";

export default function AccountantStudentsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const studentsWithFees = students.map(student => {
        const studentPayments = feePayments.filter(p => p.studentId === student.id);
        const totalPaid = studentPayments.filter(p => p.status === "Paid").reduce((sum, p) => sum + p.amount, 0);
        const totalPending = studentPayments.filter(p => p.status !== "Paid").reduce((sum, p) => sum + p.amount, 0);
        return { ...student, totalPaid, totalPending };
    });

    const filtered = studentsWithFees.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout role="accountant" title="Students" userName="Jane Doe">
            <Card>
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <CardTitle>Student Fee Status</CardTitle>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search students..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-9 w-64" />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Class</TableHead>
                                <TableHead>Parent</TableHead>
                                <TableHead>Total Paid</TableHead>
                                <TableHead>Pending</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.map(student => (
                                <TableRow key={student.id}>
                                    <TableCell className="font-medium">{student.id}</TableCell>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.class}</TableCell>
                                    <TableCell>{student.parentName}</TableCell>
                                    <TableCell>${student.totalPaid}</TableCell>
                                    <TableCell>${student.totalPending}</TableCell>
                                    <TableCell>
                                        <Badge variant={student.feeStatus === "Paid" ? "default" : student.feeStatus === "Pending" ? "secondary" : "destructive"}>
                                            {student.feeStatus}
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
