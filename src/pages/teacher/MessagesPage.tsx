import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { messages as initialMessages } from "@/data/mockData";
import { Plus, Search, Mail, MailOpen, Send, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
    id: string;
    from: string;
    to: string;
    subject: string;
    content: string;
    date: string;
    read: boolean;
}

export default function TeacherMessagesPage() {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [searchTerm, setSearchTerm] = useState("");
    const [isComposeOpen, setIsComposeOpen] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState<typeof initialMessages[0] | null>(null);
    const { toast } = useToast();

    const [composeForm, setComposeForm] = useState({
        to: "", subject: "", content: ""
    });

    const filteredMessages = messages.filter(m =>
        m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.from.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSend = () => {
        const newMessage = {
            id: `M${String(messages.length + 1).padStart(3, "0")}`,
            from: "Teacher",
            ...composeForm,
            date: new Date().toISOString().split("T")[0],
            read: true,
        };
        setMessages([newMessage, ...messages]);
        setComposeForm({ to: "", subject: "", content: "" });
        setIsComposeOpen(false);
        toast({ title: "Success", description: "Message sent successfully" });
    };

    const markAsRead = (id: string) => {
        setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
    };

    return (
        <DashboardLayout role="teacher" title="Messages" userName="Mr. Anderson">
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Message List */}
                <Card className="lg:col-span-1">
                    <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <CardTitle>Inbox</CardTitle>
                        <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
                            <DialogTrigger asChild>
                                <Button size="sm" className="btn-gradient"><Plus className="h-4 w-4 mr-1" />Compose</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                    <DialogTitle>New Message</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="to">To</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="to"
                                                placeholder="Recipient"
                                                className="pl-9"
                                                value={composeForm.to}
                                                onChange={(e) => setComposeForm({ ...composeForm, to: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input
                                            id="subject"
                                            placeholder="Subject"
                                            value={composeForm.subject}
                                            onChange={(e) => setComposeForm({ ...composeForm, subject: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Type your message here..."
                                            className="min-h-[150px]"
                                            value={composeForm.content}
                                            onChange={(e) => setComposeForm({ ...composeForm, content: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <Button onClick={handleSend} className="btn-gradient">
                                            <Send className="mr-2 h-4 w-4" />
                                            Send Message
                                        </Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="px-4 pb-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search messages..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
                            </div>
                        </div>
                        <div className="max-h-[500px] overflow-y-auto">
                            {filteredMessages.map(message => (
                                <div
                                    key={message.id}
                                    onClick={() => { setSelectedMessage(message); markAsRead(message.id); }}
                                    className={`p-4 stat-card bg-card mb-2 cursor-pointer hover:bg-muted/50 transition-colors ${!message.read ? "bg-primary/5" : ""} ${selectedMessage?.id === message.id ? "bg-muted" : ""}`}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        {message.read ? <MailOpen className="h-4 w-4 text-muted-foreground" /> : <Mail className="h-4 w-4 text-primary" />}
                                        <span className={`text-sm ${!message.read ? "font-semibold" : ""}`}>{message.from}</span>
                                        {!message.read && <Badge variant="secondary" className="text-xs">New</Badge>}
                                    </div>
                                    <p className={`text-sm truncate ${!message.read ? "font-medium" : "text-muted-foreground"}`}>{message.subject}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{message.date}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Message Detail */}
                <Card className="lg:col-span-2">
                    <CardContent className="pt-6">
                        {selectedMessage ? (
                            <div>
                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold mb-2">{selectedMessage.subject}</h2>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span>From: <strong className="text-foreground">{selectedMessage.from}</strong></span>
                                        <span>To: <strong className="text-foreground">{selectedMessage.to}</strong></span>
                                        <span>{selectedMessage.date}</span>
                                    </div>
                                </div>
                                <div className="p-4 rounded-lg bg-muted/50">
                                    <p className="whitespace-pre-wrap">{selectedMessage.content}</p>
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <Button variant="outline">Reply</Button>
                                    <Button variant="outline">Forward</Button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>Select a message to read</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
