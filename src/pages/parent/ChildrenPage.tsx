import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { students } from "@/data/mockData";
import { User } from "lucide-react";

export default function ParentChildrenPage() {
    const myChildren = students.filter(s => s.parentName === "Sarah Smith");

    return (
        <DashboardLayout role="parent" title="My Children" userName="Sarah Smith">
            <div className="grid gap-6 md:grid-cols-2">
                {myChildren.map(child => (
                    <Card key={child.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5 text-primary" />
                                {child.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Class</span>
                                    <Badge>{child.class}</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Roll No</span>
                                    <span>{child.rollNo}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Status</span>
                                    <Badge variant={child.status === "Active" ? "default" : "secondary"}>{child.status}</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Fee Status</span>
                                    <Badge variant={child.feeStatus === "Paid" ? "default" : "destructive"}>{child.feeStatus}</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </DashboardLayout>
    );
}
