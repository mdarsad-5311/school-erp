import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { consolidatedResults } from "@/data/mockData";
import { Trophy, TrendingUp } from "lucide-react";

export default function StudentResultsPage() {
    const myResult = consolidatedResults.find((r: any) => r.studentId === "S001");

    return (
        <DashboardLayout role="student" title="Results" userName="John Smith">
            {myResult && (
                <>
                    <div className="grid gap-6 md:grid-cols-3 mb-6">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-primary/10"><Trophy className="h-6 w-6 text-primary" /></div>
                                    <div><p className="text-sm text-muted-foreground">Class Rank</p><p className="text-2xl font-bold">#{myResult.rank}</p></div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-green-500/10"><TrendingUp className="h-6 w-6 text-green-500" /></div>
                                    <div><p className="text-sm text-muted-foreground">Percentage</p><p className="text-2xl font-bold">{myResult.percentage}%</p></div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-blue-500/10"><Trophy className="h-6 w-6 text-blue-500" /></div>
                                    <div><p className="text-sm text-muted-foreground">Total Marks</p><p className="text-2xl font-bold">{myResult.total}/500</p></div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader><CardTitle>{myResult.examName} - Results</CardTitle></CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Subject</TableHead>
                                        <TableHead>Marks</TableHead>
                                        <TableHead>Max Marks</TableHead>
                                        <TableHead>Grade</TableHead>
                                        <TableHead>Progress</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {myResult.subjects.map((subject: any) => (
                                        <TableRow key={subject.subject}>
                                            <TableCell className="font-medium">{subject.subject}</TableCell>
                                            <TableCell>{subject.marks}</TableCell>
                                            <TableCell>{subject.maxMarks}</TableCell>
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
