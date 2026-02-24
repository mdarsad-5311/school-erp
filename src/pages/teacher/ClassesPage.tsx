import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { classes } from "@/data/mockData";
import { Users, BookOpen } from "lucide-react";

export default function TeacherClassesPage() {
    // Filtering classes where the teacher is Mr. Anderson or Jennifer
    const myClasses = classes.filter(c => c.teacher.includes("Anderson") || c.teacher.includes("Jennifer"));

    return (
        <DashboardLayout role="teacher" title="My Classes" userName="Mr. Anderson">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {myClasses.map(cls => (
                    <Card key={cls.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-primary" />
                                {cls.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Room</span>
                                    <Badge variant="outline">{cls.room}</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Students</span>
                                    <div className="flex items-center gap-1">
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                        <span>{cls.students}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Class Teacher</span>
                                    <span className="text-sm font-medium">{cls.teacher}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {myClasses.length === 0 && (
                    <div className="col-span-full py-12 text-center text-muted-foreground">
                        No classes assigned to you were found.
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
