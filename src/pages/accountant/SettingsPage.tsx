import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Settings, Bell, Lock, User, Loader2 } from "lucide-react";

export default function AccountantSettingsPage() {
    const { toast } = useToast();
    const { user } = useAuth();
    const [isSaving, setIsSaving] = useState(false);

    const [notifications, setNotifications] = useState({
        paymentAlerts: true,
        overdueReminders: true,
        dailySummary: false,
    });

    const [profile, setProfile] = useState({
        name: user?.name || "Jane Doe",
        email: user?.email || "jane@example.com",
        phone: "+1 (555) 000-0000",
    });

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            toast({ title: "Success", description: "Settings saved successfully" });
        }, 1000);
    };

    return (
        <DashboardLayout role="accountant" title="Settings" userName={user?.name || "Jane Doe"}>
            <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
                    <TabsTrigger value="general"><Settings className="h-4 w-4 mr-2" />General</TabsTrigger>
                    <TabsTrigger value="profile"><User className="h-4 w-4 mr-2" />Profile</TabsTrigger>
                    <TabsTrigger value="notifications"><Bell className="h-4 w-4 mr-2" />Notifications</TabsTrigger>
                    <TabsTrigger value="security"><Lock className="h-4 w-4 mr-2" />Security</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>General Settings</CardTitle>
                            <CardDescription>Manage your basic account preferences and localization</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="language">Language</Label>
                                    <Select defaultValue="en">
                                        <SelectTrigger id="language">
                                            <SelectValue placeholder="Select Language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="en">English (US)</SelectItem>
                                            <SelectItem value="uk">English (UK)</SelectItem>
                                            <SelectItem value="fr">French</SelectItem>
                                            <SelectItem value="es">Spanish</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="timezone">Timezone</Label>
                                    <Select defaultValue="utc">
                                        <SelectTrigger id="timezone">
                                            <SelectValue placeholder="Select Timezone" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                                            <SelectItem value="est">EST (GMT-5)</SelectItem>
                                            <SelectItem value="ist">IST (GMT+5:30)</SelectItem>
                                            <SelectItem value="pst">PST (GMT-8)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <Button onClick={handleSave} className="btn-gradient" disabled={isSaving}>
                                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Save General Settings
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your personal details and contact information</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        value={profile.name}
                                        onChange={e => setProfile({ ...profile, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={profile.email}
                                        onChange={e => setProfile({ ...profile, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        value={profile.phone}
                                        onChange={e => setProfile({ ...profile, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                            <Button onClick={handleSave} className="btn-gradient" disabled={isSaving}>
                                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Save Profile
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>Configure how you want to receive alerts</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-foreground">Payment Alerts</p>
                                    <p className="text-sm text-muted-foreground">Get notified for new payments</p>
                                </div>
                                <Switch checked={notifications.paymentAlerts} onCheckedChange={v => setNotifications({ ...notifications, paymentAlerts: v })} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-foreground">Overdue Reminders</p>
                                    <p className="text-sm text-muted-foreground">Receive alerts for overdue fees</p>
                                </div>
                                <Switch checked={notifications.overdueReminders} onCheckedChange={v => setNotifications({ ...notifications, overdueReminders: v })} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-foreground">Daily Summary</p>
                                    <p className="text-sm text-muted-foreground">Receive daily collection summary</p>
                                </div>
                                <Switch checked={notifications.dailySummary} onCheckedChange={v => setNotifications({ ...notifications, dailySummary: v })} />
                            </div>
                            <Button onClick={handleSave} className="btn-gradient" disabled={isSaving}>
                                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Save Preferences
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                    <Card>
                        <CardHeader>
                            <CardTitle>Security Settings</CardTitle>
                            <CardDescription>Update your password and secure your account</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-password">Current Password</Label>
                                <Input id="current-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input id="new-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirm New Password</Label>
                                <Input id="confirm-password" type="password" />
                            </div>
                            <Button className="btn-gradient" onClick={handleSave} disabled={isSaving}>
                                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Update Password
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </DashboardLayout>
    );
}
