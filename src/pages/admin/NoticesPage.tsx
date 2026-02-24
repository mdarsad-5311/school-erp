import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { notices as initialNotices } from "@/data/mockData";
import { Plus, Search, Bell, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Notice {
    id: string;
    title: string;
    content: string;
    priority: string;
    audience: string;
    date: string;
}

export default function NoticesPage() {
    const [notices, setNotices] = useState<Notice[]>(initialNotices);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddOpen, setIsAddOpen] = useState(false);
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        title: "", content: "", priority: "Medium", audience: "All"
    });

    const filteredNotices = notices.filter(n =>
        n.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAdd = () => {
        const newNotice = {
            id: `N${String(notices.length + 1).padStart(3, "0")}`,
            ...formData,
            date: new Date().toISOString().split("T")[0],
        };
        setNotices([newNotice, ...notices]);
        setFormData({ title: "", content: "", priority: "Medium", audience: "All" });
        setIsAddOpen(false);
        toast({ title: "Success", description: "Notice published successfully" });
    };

    const handleDelete = (id: string) => {
        setNotices(notices.filter(n => n.id !== id));
        toast({ title: "Success", description: "Notice removed" });
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "High": return "destructive";
            case "Medium": return "default";
            case "Low": return "secondary";
            default: return "secondary";
        }
    };

    return (
        <DashboardLayout role="admin" title="Notices" userName="Admin User">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>All Notices</CardTitle>
                    <div className="flex gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search notices..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 w-64" />
                        </div>
                        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                            <DialogTrigger asChild>
                                <Button className="btn-gradient"><Plus className="h-4 w-4 mr-2" />New Notice</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader><DialogTitle>Create Notice</DialogTitle></DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div><Label>Title</Label><Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} /></div>
                                    <div><Label>Content</Label><Textarea value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} rows={4} /></div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>Priority</Label>
                                            <Select value={formData.priority} onValueChange={v => setFormData({ ...formData, priority: v })}>
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="High">High</SelectItem>
                                                    <SelectItem value="Medium">Medium</SelectItem>
                                                    <SelectItem value="Low">Low</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label>Audience</Label>
                                            <Select value={formData.audience} onValueChange={v => setFormData({ ...formData, audience: v })}>
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="All">All</SelectItem>
                                                    <SelectItem value="Students">Students</SelectItem>
                                                    <SelectItem value="Teachers">Teachers</SelectItem>
                                                    <SelectItem value="Parents">Parents</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <Button onClick={handleAdd} className="btn-gradient">Publish Notice</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {filteredNotices.map(notice => (
                            <div key={notice.id} className="p-4 rounded-lg stat-card bg-card hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 rounded-lg bg-primary/10">
                                            <Bell className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold">{notice.title}</h3>
                                                <Badge variant={getPriorityColor(notice.priority)}>{notice.priority}</Badge>
                                                <Badge variant="outline">{notice.audience}</Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-2">{notice.content}</p>
                                            <p className="text-xs text-muted-foreground">{notice.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(notice.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}
