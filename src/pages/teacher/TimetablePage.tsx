import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { timetable } from "@/data/mockData";
import { Calendar, Clock, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const teacherName = "Sarah Williams"; // Updated to match mockData.ts

export default function TeacherTimetablePage() {
    const mySchedule = days.map((day: string) => {
        const classData = timetable["10-A"] || [];
        const dayData = (classData as any[]).find((d: any) => d.day === day);
        const periods = dayData?.periods?.filter((p: any) => p.teacher === teacherName) || [];
        return { day, periods };
    });

    const totalPeriods = mySchedule.reduce((sum: number, d: any) => sum + (d.periods?.length || 0), 0);

    return (
        <DashboardLayout role="teacher" title="My Timetable" userName="Sarah Williams">
            <div className="grid gap-4 md:grid-cols-3 mb-6">
                {[
                    { label: "Weekly Periods", value: totalPeriods, icon: Clock, color: "bg-primary/10 text-primary" },
                    { label: "Teaching Days", value: mySchedule.filter(d => (d.periods?.length || 0) > 0).length, icon: Calendar, color: "bg-success/10 text-success" },
                    { label: "Subject", value: "Mathematics", icon: BookOpen, color: "bg-info/10 text-info" },
                ].map((stat: any, i: number) => (
                    <Card key={i} className="border-border/50">
                        <CardContent className="flex items-center gap-4 p-5">
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

            <div className="space-y-4">
                {mySchedule.map(({ day, periods }: any) => (
                    <Card key={day} className="border-border/50">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-primary" />
                                    {day}
                                </CardTitle>
                                <Badge variant="outline" className="text-xs">{periods.length} period{periods.length !== 1 ? "s" : ""}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {periods.length > 0 ? (
                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                    {periods.map((period: any, i: number) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/30 hover:border-primary/30 transition-colors"
                                        >
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                                <Clock className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-foreground text-sm">{period.subject}</p>
                                                <p className="text-xs text-muted-foreground">{period.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground italic">No classes scheduled</p>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </DashboardLayout>
    );
}
