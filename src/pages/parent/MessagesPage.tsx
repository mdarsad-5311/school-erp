import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { messages as initialMessages } from "@/data/mockData";
import { Plus, Mail, MailOpen, Send, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ParentMessagesPage() {
    const [messages] = useState(initialMessages);
    const [selectedMessage, setSelectedMessage] = useState<typeof initialMessages[0] | null>(null);
    const [isComposeOpen, setIsComposeOpen] = useState(false);
    const { toast } = useToast();

    const handleSend = () => {
        setIsComposeOpen(false);
        toast({ title: "Success", description: "Message sent successfully" });
    };

    return (
        <DashboardLayout role="parent" title="Messages" userName="Sarah Smith">
            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Inbox</CardTitle>
                        <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
                            <DialogTrigger asChild><Button size="sm" className="btn-gradient"><Plus className="h-4 w-4" /></Button></DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                    <DialogTitle>New Message</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="to">To</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input id="to" placeholder="Teacher name" className="pl-9" />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input id="subject" placeholder="Subject" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea id="message" placeholder="Type your message here..." className="min-h-[150px]" />
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
                    <CardContent className="p-0 max-h-[500px] overflow-y-auto">
                        {messages.map(message => (
                            <div key={message.id} onClick={() => setSelectedMessage(message)}
                                className={`p-4 stat-card bg-card mb-2 cursor-pointer hover:bg-muted/50 ${selectedMessage?.id === message.id ? "bg-muted" : ""}`}>
                                <div className="flex items-center gap-2 mb-1">
                                    {message.read ? <MailOpen className="h-4 w-4 text-muted-foreground" /> : <Mail className="h-4 w-4 text-primary" />}
                                    <span className="text-sm font-medium">{message.from}</span>
                                </div>
                                <p className="text-sm truncate text-muted-foreground">{message.subject}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2">
                    <CardContent className="pt-6">
                        {selectedMessage ? (
                            <div>
                                <h2 className="text-xl font-semibold mb-2">{selectedMessage.subject}</h2>
                                <p className="text-sm text-muted-foreground mb-4">From: {selectedMessage.from} • {selectedMessage.date}</p>
                                <div className="p-4 rounded-lg bg-muted/50"><p>{selectedMessage.content}</p></div>
                                <div className="mt-4"><Button variant="outline">Reply</Button></div>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground"><Mail className="h-12 w-12 mx-auto mb-4 opacity-50" /><p>Select a message</p></div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
