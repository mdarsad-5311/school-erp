import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { students } from "@/data/mockData";
import { Search, Users, Eye, Mail, Phone, GraduationCap, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const myClasses = ["10-A", "10-B", "9-A", "9-C"];

export default function TeacherStudentsPage() {
    const [search, setSearch] = useState("");
    const [selectedClass, setSelectedClass] = useState<string>("all");
    const [selectedStudent, setSelectedStudent] = useState<typeof students[0] | null>(null);

    const myStudents = students.filter(s => myClasses.includes(s.class));
    const filtered = myStudents.filter(s => {
        const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());
        const matchClass = selectedClass === "all" || s.class === selectedClass;
        return matchSearch && matchClass;
    });

    return (
        <DashboardLayout role="teacher" title="My Students" userName="Mr. Anderson">
            {/* Stats Row */}
            <div className="grid gap-4 md:grid-cols-4 mb-6">
                {[
                    { label: "Total Students", value: myStudents.length, icon: Users, color: "bg-primary/10 text-primary" },
                    { label: "Active", value: myStudents.filter(s => s.status === "Active").length, icon: GraduationCap, color: "bg-success/10 text-success" },
                    { label: "Fee Pending", value: myStudents.filter(s => s.feeStatus === "Pending").length, icon: Filter, color: "bg-warning/10 text-warning" },
                    { label: "Classes", value: myClasses.length, icon: GraduationCap, color: "bg-info/10 text-info" },
                ].map((stat, i) => (
                    <Card key={i} className="border-border/50">
                        <CardContent className="flex items-center gap-4 p-4">
                            <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", stat.color)}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Filters */}
            <Card className="mb-6 border-border/50">
                <CardContent className="flex flex-col sm:flex-row items-center gap-4 p-4">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search by name or ID..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
                    </div>
                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                        <SelectTrigger className="w-full sm:w-48">
                            <SelectValue placeholder="Filter by class" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Classes</SelectItem>
                            {myClasses.map(c => <SelectItem key={c} value={c}>Class {c}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

            {/* Student Cards Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map(student => (
                    <Card key={student.id} className="border-border/50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group">
                        <CardContent className="p-5">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">
                                        {student.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{student.name}</h3>
                                        <p className="text-sm text-muted-foreground">{student.id} • Roll #{student.rollNo}</p>
                                    </div>
                                </div>
                                <Badge variant={student.status === "Active" ? "default" : "secondary"} className="text-xs">
                                    {student.status}
                                </Badge>
                            </div>

                            <div className="space-y-2 text-sm text-muted-foreground mb-4">
                                <div className="flex items-center gap-2">
                                    <GraduationCap className="h-3.5 w-3.5" />
                                    <span>Class {student.class} • Section {student.section}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="h-3.5 w-3.5" />
                                    <span>{student.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-3.5 w-3.5" />
                                    <span>{student.phone} ({student.parentName})</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <Badge variant={student.feeStatus === "Paid" ? "default" : student.feeStatus === "Overdue" ? "destructive" : "secondary"} className="text-xs">
                                    Fee: {student.feeStatus}
                                </Badge>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" size="sm" className="text-primary" onClick={() => setSelectedStudent(student)}>
                                            <Eye className="h-4 w-4 mr-1" /> View
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader><DialogTitle>Student Profile</DialogTitle></DialogHeader>
                                        {selectedStudent && (
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-2xl">
                                                        {selectedStudent.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold text-foreground">{selectedStudent.name}</h3>
                                                        <p className="text-muted-foreground">{selectedStudent.id} • Class {selectedStudent.class}</p>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    {[
                                                        { label: "Roll No", value: `#${selectedStudent.rollNo}` },
                                                        { label: "Section", value: selectedStudent.section },
                                                        { label: "Email", value: selectedStudent.email },
                                                        { label: "Phone", value: selectedStudent.phone },
                                                        { label: "Parent", value: selectedStudent.parentName },
                                                        { label: "Fee Status", value: selectedStudent.feeStatus },
                                                        { label: "Admission", value: selectedStudent.admissionDate },
                                                        { label: "Status", value: selectedStudent.status },
                                                    ].map((item, i) => (
                                                        <div key={i}>
                                                            <p className="text-muted-foreground">{item.label}</p>
                                                            <p className="font-medium text-foreground">{item.value}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>No students found matching your criteria.</p>
                </div>
            )}
        </DashboardLayout>
    );
}
