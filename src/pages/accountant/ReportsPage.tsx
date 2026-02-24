import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { feePayments } from "../../data/mockData";
import { BarChart3, Download, DollarSign, TrendingUp, FileText } from "lucide-react";

export default function AccountantReportsPage() {
    const totalCollected = feePayments.filter(p => p.status === "Paid").reduce((sum, p) => sum + p.amount, 0);
    const totalPending = feePayments.filter(p => p.status !== "Paid").reduce((sum, p) => sum + p.amount, 0);
    const collectionRate = Math.round((totalCollected / (totalCollected + totalPending)) * 100);

    const reports = [
        { name: "Monthly Collection Report", description: "Fee collection summary for current month", icon: DollarSign },
        { name: "Outstanding Dues Report", description: "List of all pending and overdue fees", icon: FileText },
        { name: "Class-wise Collection", description: "Fee collection breakdown by class", icon: BarChart3 },
        { name: "Payment Method Analysis", description: "Analysis of payment methods used", icon: TrendingUp },
    ];

    return (
        <DashboardLayout role="accountant" title="Reports" userName="Jane Doe">
            <div className="grid gap-6 md:grid-cols-3 mb-6">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-success/10"><DollarSign className="h-6 w-6 text-success" /></div>
                            <div><p className="text-sm text-muted-foreground">Total Collected</p><p className="text-2xl font-bold">${totalCollected.toLocaleString()}</p></div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-warning/10"><DollarSign className="h-6 w-6 text-warning" /></div>
                            <div><p className="text-sm text-muted-foreground">Pending Amount</p><p className="text-2xl font-bold">${totalPending.toLocaleString()}</p></div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-primary/10"><TrendingUp className="h-6 w-6 text-primary" /></div>
                            <div><p className="text-sm text-muted-foreground">Collection Rate</p><p className="text-2xl font-bold">{collectionRate}%</p></div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader><CardTitle>Available Reports</CardTitle></CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                        {reports.map((report, idx) => (
                            <div key={idx} className="stat-card bg-card flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-primary/10"><report.icon className="h-5 w-5 text-primary" /></div>
                                    <div>
                                        <h3 className="font-semibold">{report.name}</h3>
                                        <p className="text-sm text-muted-foreground">{report.description}</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />Download</Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}
