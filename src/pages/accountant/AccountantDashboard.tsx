import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { StatCard } from "../../components/dashboard/StatCard";
import { DollarSign, TrendingUp, TrendingDown, Users } from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const monthlyData = [
    { month: "Sep", collected: 45000, pending: 8000 },
    { month: "Oct", collected: 52000, pending: 6000 },
    { month: "Nov", collected: 48000, pending: 9000 },
    { month: "Dec", collected: 35000, pending: 15000 },
    { month: "Jan", collected: 62000, pending: 5000 },
];

const recentPayments = [
    { id: "1", student: "Daniyal shaikh", class: "10-A", amount: 500, date: "Today" },
    { id: "2", student: "Aiman shaikh", class: "9-B", amount: 450, date: "Today" },
    { id: "3", student: "Omama shaikh", class: "8-C", amount: 500, date: "Yesterday" },
    { id: "4", student: "Adeeba shaikh", class: "10-B", amount: 475, date: "Yesterday" },
    { id: "5", student: "Areeba shaikh", class: "9-A", amount: 500, date: "2 days ago" },
];

export default function AccountantDashboard() {
    return (
        <DashboardLayout role="accountant" title="Dashboard" userName="Jane Doe">
            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6 ml-2">
                <StatCard
                    title="Total Collected"
                    value="$124,500"
                    change="+18% from last month"
                    changeType="positive"
                    icon={DollarSign}
                    iconColor="bg-success/10 text-success"
                />
                <StatCard
                    title="Pending Amount"
                    value="$23,800"
                    change="15% of total"
                    changeType="negative"
                    icon={TrendingDown}
                    iconColor="bg-warning/10 text-warning"
                />
                <StatCard
                    title="This Month"
                    value="$62,000"
                    change="Excellent collection!"
                    changeType="positive"
                    icon={TrendingUp}
                    iconColor="bg-primary/10 text-primary"
                />
                <StatCard
                    title="Defaulters"
                    value="32"
                    change="Requires follow-up"
                    changeType="negative"
                    icon={Users}
                    iconColor="bg-destructive/10 text-destructive"
                />
            </div>

            {/* Charts and Recent Payments */}
            <div className="grid gap-6 lg:grid-cols-2 mb-6 ml-2">
                {/* Fee Collection Chart */}
                <div className="rounded-xl stat-card bg-card p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                        Fee Collection Overview
                    </h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                <XAxis
                                    dataKey="month"
                                    stroke="hsl(var(--muted-foreground))"
                                    fontSize={12}
                                />
                                <YAxis
                                    stroke="hsl(var(--muted-foreground))"
                                    fontSize={12}
                                    tickFormatter={(value) => `$${value / 1000}k`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "hsl(var(--card))",
                                        border: "1px solid hsl(var(--border))",
                                        borderRadius: "0.5rem",
                                    }}
                                    formatter={(value: any) => [`$${value.toLocaleString()}`]}
                                />
                                <Bar
                                    dataKey="collected"
                                    fill="hsl(var(--success))"
                                    radius={[4, 4, 0, 0]}
                                    name="Collected"
                                />
                                <Bar
                                    dataKey="pending"
                                    fill="hsl(var(--warning))"
                                    radius={[4, 4, 0, 0]}
                                    name="Pending"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-6 mt-4">
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-success" />
                            <span className="text-sm text-muted-foreground">Collected</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-warning" />
                            <span className="text-sm text-muted-foreground">Pending</span>
                        </div>
                    </div>
                </div>

                {/* Recent Payments */}
                <div className="rounded-xl stat-card bg-card p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                        Recent Payments
                    </h3>
                    <div className="space-y-4">
                        {recentPayments.map((payment) => (
                            <div
                                key={payment.id}
                                className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0"
                            >
                                <div>
                                    <p className="font-medium text-foreground">{payment.student}</p>
                                    <p className="text-sm text-muted-foreground">
                                        Class {payment.class}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-success">${payment.amount}</p>
                                    <p className="text-xs text-muted-foreground">{payment.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
