import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Settings, Bell, Lock, Palette, Globe } from "lucide-react";

export default function SettingsPage() {
    const { toast } = useToast();
    const [schoolInfo, setSchoolInfo] = useState({
        name: "EduPro School",
        email: "info@edupro.com",
        phone: "555-0100",
        address: "123 Education Lane, Learning City, 12345",
    });

    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        smsNotifications: false,
        attendanceAlerts: true,
        feeReminders: true,
        examNotifications: true,
    });

    const handleSaveSchool = () => {
        toast({ title: "Success", description: "School information updated" });
    };

    const handleSaveNotifications = () => {
        toast({ title: "Success", description: "Notification settings saved" });
    };

    return (
        <DashboardLayout role="admin" title="Settings" userName="Admin User">
            <Tabs defaultValue="general" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="general"><Settings className="h-4 w-4 mr-2" />General</TabsTrigger>
                    <TabsTrigger value="notifications"><Bell className="h-4 w-4 mr-2" />Notifications</TabsTrigger>
                    <TabsTrigger value="security"><Lock className="h-4 w-4 mr-2" />Security</TabsTrigger>
                    <TabsTrigger value="appearance"><Palette className="h-4 w-4 mr-2" />Appearance</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>School Information</CardTitle>
                            <CardDescription>Update your school's basic information</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>School Name</Label>
                                    <Input value={schoolInfo.name} onChange={e => setSchoolInfo({ ...schoolInfo, name: e.target.value })} />
                                </div>
                                <div>
                                    <Label>Email</Label>
                                    <Input value={schoolInfo.email} onChange={e => setSchoolInfo({ ...schoolInfo, email: e.target.value })} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>Phone</Label>
                                    <Input value={schoolInfo.phone} onChange={e => setSchoolInfo({ ...schoolInfo, phone: e.target.value })} />
                                </div>
                                <div>
                                    <Label>Address</Label>
                                    <Input value={schoolInfo.address} onChange={e => setSchoolInfo({ ...schoolInfo, address: e.target.value })} />
                                </div>
                            </div>
                            <Button onClick={handleSaveSchool} className="btn-gradient">Save Changes</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>Configure how you want to receive notifications</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Email Notifications</p>
                                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                                </div>
                                <Switch checked={notifications.emailNotifications} onCheckedChange={v => setNotifications({ ...notifications, emailNotifications: v })} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">SMS Notifications</p>
                                    <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                                </div>
                                <Switch checked={notifications.smsNotifications} onCheckedChange={v => setNotifications({ ...notifications, smsNotifications: v })} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Attendance Alerts</p>
                                    <p className="text-sm text-muted-foreground">Get notified about attendance issues</p>
                                </div>
                                <Switch checked={notifications.attendanceAlerts} onCheckedChange={v => setNotifications({ ...notifications, attendanceAlerts: v })} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Fee Reminders</p>
                                    <p className="text-sm text-muted-foreground">Get reminders for pending fees</p>
                                </div>
                                <Switch checked={notifications.feeReminders} onCheckedChange={v => setNotifications({ ...notifications, feeReminders: v })} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Exam Notifications</p>
                                    <p className="text-sm text-muted-foreground">Get updates about exams and results</p>
                                </div>
                                <Switch checked={notifications.examNotifications} onCheckedChange={v => setNotifications({ ...notifications, examNotifications: v })} />
                            </div>
                            <Button onClick={handleSaveNotifications} className="btn-gradient">Save Preferences</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                    <Card>
                        <CardHeader>
                            <CardTitle>Security Settings</CardTitle>
                            <CardDescription>Manage your account security</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label>Current Password</Label>
                                <Input type="password" />
                            </div>
                            <div>
                                <Label>New Password</Label>
                                <Input type="password" />
                            </div>
                            <div>
                                <Label>Confirm New Password</Label>
                                <Input type="password" />
                            </div>
                            <Button className="btn-gradient">Update Password</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="appearance">
                    <Card>
                        <CardHeader>
                            <CardTitle>Appearance Settings</CardTitle>
                            <CardDescription>Customize the look of your dashboard</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Dark Mode</p>
                                    <p className="text-sm text-muted-foreground">Use dark theme</p>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Compact Sidebar</p>
                                    <p className="text-sm text-muted-foreground">Use compact sidebar by default</p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </DashboardLayout>
    );
}
