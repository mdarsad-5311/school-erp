import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { teachers as initialTeachers } from "@/data/mockData";
import { Plus, Search, Edit, Trash2, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TeachersPage() {
    const [teachers, setTeachers] = useState(initialTeachers);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState<typeof initialTeachers[0] | null>(null);
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        name: "", email: "", subject: "", qualification: "", experience: "", phone: "", salary: ""
    });

    const filteredTeachers = teachers.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAdd = () => {
        const newTeacher = {
            id: `T${String(teachers.length + 1).padStart(3, "0")}`,
            ...formData,
            salary: Number(formData.salary),
            status: "Active" as const,
            joinDate: new Date().toISOString().split("T")[0],
        };
        setTeachers([...teachers, newTeacher]);
        setFormData({ name: "", email: "", subject: "", qualification: "", experience: "", phone: "", salary: "" });
        setIsAddOpen(false);
        toast({ title: "Success", description: "Teacher added successfully" });
    };

    const handleEdit = () => {
        if (!editingTeacher) return;
        setTeachers(teachers.map(t => t.id === editingTeacher.id ? { ...editingTeacher, ...formData, salary: Number(formData.salary) } : t));
        setEditingTeacher(null);
        setFormData({ name: "", email: "", subject: "", qualification: "", experience: "", phone: "", salary: "" });
        toast({ title: "Success", description: "Teacher updated successfully" });
    };

    const handleDelete = (id: string) => {
        setTeachers(teachers.filter(t => t.id !== id));
        toast({ title: "Success", description: "Teacher removed successfully" });
    };

    const openEdit = (teacher: typeof initialTeachers[0]) => {
        setEditingTeacher(teacher);
        setFormData({
            name: teacher.name,
            email: teacher.email,
            subject: teacher.subject,
            qualification: teacher.qualification,
            experience: teacher.experience,
            phone: teacher.phone,
            salary: String(teacher.salary),
        });
    };

    return (
        <DashboardLayout role="admin" title="Teachers" userName="Admin User">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>All Teachers</CardTitle>
                    <div className="flex gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search teachers..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 w-64"
                            />
                        </div>
                        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                            <DialogTrigger asChild>
                                <Button className="btn-gradient"><Plus className="h-4 w-4 mr-2" />Add Teacher</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader><DialogTitle>Add New Teacher</DialogTitle></DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><Label>Name</Label><Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
                                        <div><Label>Email</Label><Input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} /></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><Label>Subject</Label><Input value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} /></div>
                                        <div><Label>Qualification</Label><Input value={formData.qualification} onChange={e => setFormData({ ...formData, qualification: e.target.value })} /></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><Label>Experience</Label><Input value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} /></div>
                                        <div><Label>Phone</Label><Input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} /></div>
                                    </div>
                                    <div><Label>Salary</Label><Input type="number" value={formData.salary} onChange={e => setFormData({ ...formData, salary: e.target.value })} /></div>
                                    <Button onClick={handleAdd} className="btn-gradient">Add Teacher</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>Qualification</TableHead>
                                <TableHead>Experience</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredTeachers.map(teacher => (
                                <TableRow key={teacher.id} className="border-b border-gray-200">
                                    <TableCell className="font-medium">{teacher.id}</TableCell>
                                    <TableCell>{teacher.name}</TableCell>
                                    <TableCell>{teacher.subject}</TableCell>
                                    <TableCell>{teacher.qualification}</TableCell>
                                    <TableCell>{teacher.experience}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                            <Phone className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={teacher.status === "Active" ? "default" : "secondary"}>
                                            {teacher.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Dialog open={editingTeacher?.id === teacher.id} onOpenChange={(open) => !open && setEditingTeacher(null)}>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" onClick={() => openEdit(teacher)}><Edit className="h-4 w-4" /></Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader><DialogTitle>Edit Teacher</DialogTitle></DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div><Label>Name</Label><Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
                                                            <div><Label>Email</Label><Input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} /></div>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div><Label>Subject</Label><Input value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} /></div>
                                                            <div><Label>Qualification</Label><Input value={formData.qualification} onChange={e => setFormData({ ...formData, qualification: e.target.value })} /></div>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div><Label>Experience</Label><Input value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} /></div>
                                                            <div><Label>Phone</Label><Input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} /></div>
                                                        </div>
                                                        <div><Label>Salary</Label><Input type="number" value={formData.salary} onChange={e => setFormData({ ...formData, salary: e.target.value })} /></div>
                                                        <Button onClick={handleEdit} className="btn-gradient">Save Changes</Button>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(teacher.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                        </div>
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
