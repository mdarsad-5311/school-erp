import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { subjects } from "@/data/mockData";
import { BookOpen, User } from "lucide-react";

export default function StudentClassesPage() {
    return (
        <DashboardLayout role="student" title="My Classes" userName="John Smith">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {subjects.map((subject: any) => (
                    <Card key={subject.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-primary" />
                                {subject.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Code</span>
                                    <Badge variant="outline">{subject.code}</Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{subject.teacher}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </DashboardLayout>
    );
}
