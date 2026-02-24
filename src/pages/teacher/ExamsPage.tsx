import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { exams } from "@/data/mockData";
import { Plus, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TeacherExamsPage() {
    const [isAddMarksOpen, setIsAddMarksOpen] = useState(false);
    const { toast } = useToast();

    const handleAddMarks = () => {
        setIsAddMarksOpen(false);
        toast({ title: "Success", description: "Marks entered successfully" });
    };

    return (
        <DashboardLayout role="teacher" title="Examinations" userName="Mr. Anderson">
            <div className="space-y-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Upcoming Exams</CardTitle>
                        <Dialog open={isAddMarksOpen} onOpenChange={setIsAddMarksOpen}>
                            <DialogTrigger asChild>
                                <Button className="btn-gradient"><Plus className="h-4 w-4 mr-2" />Enter Marks</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader><DialogTitle>Enter Student Marks</DialogTitle></DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div><Label>Select Exam</Label>
                                        <Select><SelectTrigger><SelectValue placeholder="Choose exam" /></SelectTrigger>
                                            <SelectContent>{exams.map(e => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}</SelectContent>
                                        </Select>
                                    </div>
                                    <div><Label>Select Class</Label>
                                        <Select><SelectTrigger><SelectValue placeholder="Choose class" /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="10-A">Class 10-A</SelectItem>
                                                <SelectItem value="10-B">Class 10-B</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div><Label>Subject</Label><Input placeholder="Mathematics" /></div>
                                    <Button onClick={handleAddMarks} className="btn-gradient">Proceed to Enter Marks</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Exam</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Start Date</TableHead>
                                    <TableHead>End Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {exams.map(exam => (
                                    <TableRow key={exam.id} className="border-b border-gray-200">
                                        <TableCell className="font-medium">{exam.name}</TableCell>
                                        <TableCell>{exam.type}</TableCell>
                                        <TableCell>{exam.startDate}</TableCell>
                                        <TableCell>{exam.endDate}</TableCell>
                                        <TableCell><Badge variant={exam.status === "Completed" ? "default" : "secondary"}>{exam.status}</Badge></TableCell>
                                        <TableCell><Button variant="ghost" size="sm"><FileText className="h-4 w-4 mr-1" />View</Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
