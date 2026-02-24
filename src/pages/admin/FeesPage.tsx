import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { feeStructure, feePayments as initialPayments } from "@/data/mockData";
import { Plus, Search, DollarSign, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function FeesPage() {
    const [payments, setPayments] = useState(initialPayments);
    const [searchTerm, setSearchTerm] = useState("");
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const { toast } = useToast();

    const [paymentForm, setPaymentForm] = useState({
        studentId: "", studentName: "", class: "", feeType: "", amount: ""
    });

    const filteredPayments = payments.filter(p =>
        p.studentName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRecordPayment = () => {
        const newPayment = {
            id: `P${String(payments.length + 1).padStart(3, "0")}`,
            ...paymentForm,
            amount: Number(paymentForm.amount),
            paidDate: new Date().toISOString().split("T")[0],
            status: "Paid" as const,
            paymentMethod: "Cash",
            receiptNo: `REC${String(payments.length + 1).padStart(3, "0")}`,
        };
        setPayments([...payments, newPayment]);
        setPaymentForm({ studentId: "", studentName: "", class: "", feeType: "", amount: "" });
        setIsPaymentOpen(false);
        toast({ title: "Success", description: "Payment recorded successfully" });
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Paid": return <CheckCircle className="h-4 w-4 text-green-500" />;
            case "Pending": return <Clock className="h-4 w-4 text-yellow-500" />;
            case "Overdue": return <AlertCircle className="h-4 w-4 text-red-500" />;
            default: return null;
        }
    };

    const totalCollected = payments.filter(p => p.status === "Paid").reduce((sum, p) => sum + p.amount, 0);
    const totalPending = payments.filter(p => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0);
    const totalOverdue = payments.filter(p => p.status === "Overdue").reduce((sum, p) => sum + p.amount, 0);

    return (
        <DashboardLayout role="admin" title="Fee Management" userName="Admin User">
            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3 mb-6">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-green-500/10">
                                <DollarSign className="h-6 w-6 text-green-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Collected</p>
                                <p className="text-2xl font-bold">${totalCollected.toLocaleString()}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-yellow-500/10">
                                <Clock className="h-6 w-6 text-yellow-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Pending</p>
                                <p className="text-2xl font-bold">${totalPending.toLocaleString()}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-red-500/10">
                                <AlertCircle className="h-6 w-6 text-red-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Overdue</p>
                                <p className="text-2xl font-bold">${totalOverdue.toLocaleString()}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="payments">
                <TabsList className="mb-4">
                    <TabsTrigger value="payments">Payments</TabsTrigger>
                    <TabsTrigger value="structure">Fee Structure</TabsTrigger>
                </TabsList>

                <TabsContent value="payments">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Fee Payments</CardTitle>
                            <div className="flex gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 w-64" />
                                </div>
                                <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="btn-gradient"><Plus className="h-4 w-4 mr-2" />Record Payment</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader><DialogTitle>Record Fee Payment</DialogTitle></DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div><Label>Student ID</Label><Input value={paymentForm.studentId} onChange={e => setPaymentForm({ ...paymentForm, studentId: e.target.value })} /></div>
                                                <div><Label>Student Name</Label><Input value={paymentForm.studentName} onChange={e => setPaymentForm({ ...paymentForm, studentName: e.target.value })} /></div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div><Label>Class</Label><Input value={paymentForm.class} onChange={e => setPaymentForm({ ...paymentForm, class: e.target.value })} /></div>
                                                <div><Label>Fee Type</Label><Input value={paymentForm.feeType} onChange={e => setPaymentForm({ ...paymentForm, feeType: e.target.value })} /></div>
                                            </div>
                                            <div><Label>Amount</Label><Input type="number" value={paymentForm.amount} onChange={e => setPaymentForm({ ...paymentForm, amount: e.target.value })} /></div>
                                            <Button onClick={handleRecordPayment} className="btn-gradient">Record Payment</Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Receipt</TableHead>
                                        <TableHead>Student</TableHead>
                                        <TableHead>Class</TableHead>
                                        <TableHead>Fee Type</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredPayments.map(payment => (
                                        <TableRow key={payment.id} className="border-b border-gray-200">
                                            <TableCell className="font-medium">{payment.receiptNo}</TableCell>
                                            <TableCell>{payment.studentName}</TableCell>
                                            <TableCell>{payment.class}</TableCell>
                                            <TableCell>{payment.feeType}</TableCell>
                                            <TableCell>${payment.amount}</TableCell>
                                            <TableCell>{payment.paidDate || payment.dueDate}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    {getStatusIcon(payment.status)}
                                                    <Badge variant={payment.status === "Paid" ? "default" : payment.status === "Pending" ? "secondary" : "destructive"}>
                                                        {payment.status}
                                                    </Badge>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="structure">
                    <Card>
                        <CardHeader><CardTitle>Fee Structure</CardTitle></CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Fee Type</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Frequency</TableHead>
                                        <TableHead>Applicable Classes</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {feeStructure.map(fee => (
                                        <TableRow key={fee.id} className="border-b border-gray-200">
                                            <TableCell className="font-medium">{fee.type}</TableCell>
                                            <TableCell>${fee.amount}</TableCell>
                                            <TableCell><Badge variant="outline">{fee.frequency}</Badge></TableCell>
                                            <TableCell>{fee.class}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </DashboardLayout>
    );
}
