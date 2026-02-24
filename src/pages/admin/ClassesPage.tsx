import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Users, BookOpen, Clock } from "lucide-react";


import { classes } from "@/data/mockData";

export default function ClassesPage() {
    return (
        <DashboardLayout role="admin" title="Classes" userName="Admin User">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search classes..." className="pl-9 input-focus" />
                </div>
                <Button className="btn-gradient">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Class
                </Button>
            </div>

            {/* Classes Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {classes.map((cls) => (
                    <div
                        key={cls.id}
                        className="group rounded-xl border border-gray-100 bg-card p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-foreground">
                                    {cls.name}
                                </h3>
                                <Badge variant="outline" className="mt-1">
                                    Section {cls.section}
                                </Badge>
                            </div>
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <BookOpen className="h-5 w-5 text-primary" />
                            </div>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Class Teacher</span>
                                <span className="font-medium">{cls.teacher}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground flex items-center gap-1">
                                    <Users className="h-3.5 w-3.5" />
                                    Students
                                </span>
                                <span className="font-medium">{cls.students}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground flex items-center gap-1">
                                    <BookOpen className="h-3.5 w-3.5" />
                                    Subjects
                                </span>
                                <span className="font-medium">{cls.subjects}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground flex items-center gap-1">
                                    <Clock className="h-3.5 w-3.5" />
                                    Room
                                </span>
                                <span className="font-medium">{cls.room}</span>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                                View
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                                Edit
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardLayout>
    );
}
