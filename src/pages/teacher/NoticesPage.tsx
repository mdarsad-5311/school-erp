import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { notices } from "@/data/mockData";
import { Bell, Search, Calendar, Users, Plus, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function TeacherNoticesPage() {
    const [search, setSearch] = useState("");
    const [postOpen, setPostOpen] = useState(false);
    const { toast } = useToast();

    const filtered = notices.filter(n =>
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.content.toLowerCase().includes(search.toLowerCase())
    );

    const priorityColor = (p: string) =>
        p === "High" ? "destructive" as const : p === "Medium" ? "secondary" as const : "outline" as const;

    return (
        <DashboardLayout role="teacher" title="Notices" userName="Mr. Anderson">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <Megaphone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-foreground">Notice Board</h2>
                        <p className="text-sm text-muted-foreground">{notices.length} notices</p>
                    </div>
                </div>
                <Dialog open={postOpen} onOpenChange={setPostOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-1.5"><Plus className="h-4 w-4" /> Post Notice</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader><DialogTitle>Post New Notice</DialogTitle></DialogHeader>
                        <div className="space-y-4">
                            <Input placeholder="Notice Title" />
                            <Textarea placeholder="Notice content..." rows={4} />
                            <Select>
                                <SelectTrigger><SelectValue placeholder="Priority" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="low">Low</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger><SelectValue placeholder="Audience" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="students">Students</SelectItem>
                                    <SelectItem value="parents">Parents</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button className="w-full" onClick={() => { setPostOpen(false); toast({ title: "Notice posted!" }); }}>
                                Publish Notice
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search notices..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
            </div>

            {/* Notices */}
            <div className="space-y-4">
                {filtered.map(notice => (
                    <Card key={notice.id} className="stat-card bg-card hover:shadow-md transition-all duration-300">
                        <CardContent className="p-5">
                            <div className="flex items-start gap-4">
                                <div className={cn(
                                    "flex h-11 w-11 items-center justify-center rounded-xl shrink-0",
                                    notice.priority === "High" ? "bg-destructive/10" : "bg-primary/10"
                                )}>
                                    <Bell className={cn("h-5 w-5", notice.priority === "High" ? "text-destructive" : "text-primary")} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <h3 className="font-semibold text-foreground">{notice.title}</h3>
                                        <Badge variant={priorityColor(notice.priority)} className="text-xs">{notice.priority}</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-3">{notice.content}</p>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{notice.date}</span>
                                        <span className="flex items-center gap-1"><Users className="h-3 w-3" />{notice.audience}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </DashboardLayout>
    );
}
