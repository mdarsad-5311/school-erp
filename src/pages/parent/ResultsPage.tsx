import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { consolidatedResults } from "@/data/mockData";
import { Trophy, TrendingUp } from "lucide-react";

export default function ParentResultsPage() {
    const childResult = consolidatedResults.find(r => r.studentId === "S001");

    return (
        <DashboardLayout role="parent" title="Results" userName="Sarah Smith">
            <h2 className="text-lg font-semibold mb-4">John Smith's Results</h2>
            {childResult && (
                <>
                    <div className="grid gap-6 md:grid-cols-3 mb-6">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-primary/10"><Trophy className="h-6 w-6 text-primary" /></div>
                                    <div><p className="text-sm text-muted-foreground">Class Rank</p><p className="text-2xl font-bold">#{childResult.rank}</p></div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-success/10"><TrendingUp className="h-6 w-6 text-success" /></div>
                                    <div><p className="text-sm text-muted-foreground">Percentage</p><p className="text-2xl font-bold">{childResult.percentage}%</p></div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-info/10"><Trophy className="h-6 w-6 text-info" /></div>
                                    <div><p className="text-sm text-muted-foreground">Total Marks</p><p className="text-2xl font-bold">{childResult.total}/500</p></div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader><CardTitle>{childResult.examName}</CardTitle></CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Subject</TableHead>
                                        <TableHead>Marks</TableHead>
                                        <TableHead>Grade</TableHead>
                                        <TableHead>Progress</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {childResult.subjects.map(subject => (
                                        <TableRow key={subject.subject}>
                                            <TableCell className="font-medium">{subject.subject}</TableCell>
                                            <TableCell>{subject.marks}/{subject.maxMarks}</TableCell>
                                            <TableCell><Badge>{subject.grade}</Badge></TableCell>
                                            <TableCell className="w-32"><Progress value={subject.marks} className="h-2" /></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </>
            )}
        </DashboardLayout>
    );
}
