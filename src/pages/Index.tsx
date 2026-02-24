import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "../components/ui/button"
import {
    School,
    Users,
    GraduationCap,
    BookOpen,
    Calendar,
    DollarSign,
    Shield,
    Smartphone,
    ChevronRight,
    Check,
} from "lucide-react";

const features = [
    {
        icon: Users,
        title: "Student Management",
        description: "Complete student lifecycle management from admission to graduation.",
    },
    {
        icon: GraduationCap,
        title: "Staff Management",
        description: "Manage teachers, staff profiles, attendance, and payroll efficiently.",
    },
    {
        icon: BookOpen,
        title: "Academic Management",
        description: "Classes, subjects, timetables, and curriculum planning in one place.",
    },
    {
        icon: Calendar,
        title: "Attendance Tracking",
        description: "Real-time attendance tracking with automated notifications.",
    },
    {
        icon: DollarSign,
        title: "Fee Management",
        description: "Streamlined fee collection, invoicing, and payment tracking.",
    },
    {
        icon: Shield,
        title: "Secure & Reliable",
        description: "Enterprise-grade security with role-based access control.",
    },
];

const roles = [
    { name: "Admin", path: "/admin", color: "from-blue-500 to-indigo-600" },
    { name: "Teacher", path: "/teacher", color: "from-emerald-500 to-teal-600" },
    { name: "Student", path: "/student", color: "from-amber-500 to-orange-600" },
    { name: "Parent", path: "/parent", color: "from-pink-500 to-rose-600" },
    { name: "Accountant", path: "/accountant", color: "from-violet-500 to-purple-600" },
];

export default function Index() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleRoleClick = async (role: string, path: string) => {
        try {
            await login({ role: role.toLowerCase() });
            navigate(path);
        } catch (error) {
            console.error("Failed to perform demo login", error);
        }
    };
    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-gray-200">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                            <School className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-black">AL-Umaima</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-muted-foreground hover:text-blue-600 transition-colors">
                            Features
                        </a>
                        <a href="#demo" className="text-muted-foreground hover:text-blue-600 transition-colors">
                            Demo
                        </a>
                        <Link to="/login">
                            <Button variant="outline" size="sm" className="bg-gray-100 hover:text-blue-600 border-0">
                                Sign In
                            </Button>
                        </Link>
                        <Button size="sm" className="btn-gradient-to-r from-blue-500 to-purple-700 hover:text-white">
                            Get Started
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-200 text-blue-600 text-sm font-medium mb-6 animate-fade-in">
                        <Smartphone className="h-4 w-4" />
                        <span>Works on all devices</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-slide-up">
                        Modern School
                        <br />
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Management System</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up">
                        Streamline your school operations with our comprehensive ERP solution.
                        Manage students, staff, academics, and finances all in one place.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
                        <Button size="lg" className="btn-gradient text-lg px-8">
                            Start Free Trial
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8 border-0 bg-gray-100 hover:bg-gradient-to-r from-blue-600 to-purple-700 hover:text-white">
                            Watch Demo
                        </Button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: "500+", label: "Schools" },
                            { value: "50K+", label: "Students" },
                            { value: "5K+", label: "Teachers" },
                            { value: "99.9%", label: "Uptime" },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{stat.value}</p>
                                <p className="text-muted-foreground mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-6">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Everything you need to manage your school
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            A complete suite of tools designed specifically for educational institutions.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="group p-6 rounded-2xl bg-gray-100 bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <feature.icon className="h-6 w-6 text-blue-600 group-hover:text-primary-foreground" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Demo Access Section */}
            <section id="demo" className="py-20 px-6 bg-muted/30">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Explore Role-Based Dashboards
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Experience the system from different perspectives. Click on any role to explore its dashboard.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
                        {roles.map((role) => (
                            <div
                                key={role.name}
                                onClick={() => handleRoleClick(role.name, role.path)}
                                className="group relative overflow-hidden rounded-2xl p-6 bg-card bg-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                            >
                                <div
                                    className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br ${role.color}`}
                                />
                                <div
                                    className={`h-12 w-12 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center mx-auto mb-4`}
                                >
                                    <Users className="h-6 w-6 text-white" />
                                </div>
                                <p className="text-center font-semibold text-foreground">{role.name}</p>
                                <p className="text-center text-sm text-muted-foreground mt-1">Dashboard</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="container mx-auto">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-500 to-purple-700 hover:text-white p-12 text-center">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-20" />
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative">
                            Ready to transform your school?
                        </h2>
                        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8 relative">
                            Join thousands of schools already using AL-Umaima to streamline their operations.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
                            <Button size="lg" variant="secondary" className="text-lg px-8">
                                Start Free Trial
                                <ChevronRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button size="lg" variant="outline" className="text-lg px-8 border-white/30 text-white hover:bg-white/40">
                                Contact Sales
                            </Button>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 relative">
                            {["No credit card required", "14-day free trial", "Cancel anytime"].map((item) => (
                                <div key={item} className="flex items-center gap-2 text-white/80">
                                    <Check className="h-4 w-4" />
                                    <span className="text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-gray-200 bg-muted/30">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                                <School className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-semibold text-foreground">AL-Umaima</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            © 2026 AL-Umaima. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
