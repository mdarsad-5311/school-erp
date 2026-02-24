import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { feePayments } from "@/data/mockData";
import { CheckCircle, Clock } from "lucide-react";

export default function ParentFeesPage() {
    const childFees = feePayments.filter(p => p.studentId === "S001");
    const totalPaid = childFees.filter(f => f.status === "Paid").reduce((sum, f) => sum + f.amount, 0);

    return (
        <DashboardLayout role="parent" title="Fees" userName="Sarah Smith">
            <h2 className="text-lg font-semibold mb-4">John Smith's Fees</h2>
            <div className="grid gap-6 md:grid-cols-2 mb-6">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-success/10"><CheckCircle className="h-6 w-6 text-success" /></div>
                            <div><p className="text-sm text-muted-foreground">Total Paid</p><p className="text-2xl font-bold">${totalPaid}</p></div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-warning/10"><Clock className="h-6 w-6 text-warning" /></div>
                            <div><p className="text-sm text-muted-foreground">Pending</p><p className="text-2xl font-bold">$0</p></div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader><CardTitle>Payment History</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Receipt No</TableHead>
                                <TableHead>Fee Type</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {childFees.map(fee => (
                                <TableRow key={fee.id} className="border-b border-gray-200">
                                    <TableCell className="font-medium">{fee.receiptNo}</TableCell>
                                    <TableCell>{fee.feeType}</TableCell>
                                    <TableCell>${fee.amount}</TableCell>
                                    <TableCell>{fee.paidDate || fee.dueDate}</TableCell>
                                    <TableCell><Badge variant={fee.status === "Paid" ? "default" : "destructive"}>{fee.status}</Badge></TableCell>
                                    <TableCell>
                                        {fee.status === "Paid" ? (
                                            <Button variant="ghost" size="sm">Download</Button>
                                        ) : (
                                            <Button size="sm" className="btn-gradient">Pay Now</Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}
