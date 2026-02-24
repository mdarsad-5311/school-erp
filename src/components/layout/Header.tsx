import { Bell, Search, User, Menu } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import { Sidebar } from "./Sidebar";

interface HeaderProps {
    title: string;
    userName?: string;
    userRole?: string;
    role: "admin" | "teacher" | "student" | "parent" | "accountant";
}

export function Header({ title, userName = "John Doe", userRole = "Admin", role }: HeaderProps) {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-b-gray-200 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-6">
            <div className="flex items-center gap-4">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="lg:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64">
                        <Sidebar role={role} showToggle={false} className="w-full h-full" />
                    </SheetContent>
                </Sheet>
                <h1 className="text-xl font-semibold text-foreground">{title}</h1>
            </div>

            <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-64 pl-9 input-focus"
                    />
                </div>

                {/* Notifications */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs text-blue-600">
                                3
                            </Badge>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                            <span className="font-medium">New Student Enrollment</span>
                            <span className="text-sm text-muted-foreground">
                                Daniyal has been enrolled in Class 10-A
                            </span>
                            <span className="text-xs text-muted-foreground">2 hours ago</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                            <span className="font-medium">Fee Payment Received</span>
                            <span className="text-sm text-muted-foreground">
                                Payment of $500 received from Sattar Ali
                            </span>
                            <span className="text-xs text-muted-foreground">5 hours ago</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                            <span className="font-medium">Exam Schedule Updated</span>
                            <span className="text-sm text-muted-foreground">
                                Mid-term exams rescheduled to next week
                            </span>
                            <span className="text-xs text-muted-foreground">1 day ago</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* User Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-2 px-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="" />
                                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                                    {userName.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                            </Avatar>
                            <div className="hidden md:block text-left">
                                <p className="text-sm font-medium">{userName}</p>
                                <p className="text-xs text-muted-foreground">{userRole}</p>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
