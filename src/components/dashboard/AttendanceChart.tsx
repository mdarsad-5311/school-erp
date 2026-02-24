import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { day: "Mon", present: 92, absent: 8 },
    { day: "Tue", present: 88, absent: 12 },
    { day: "Wed", present: 95, absent: 5 },
    { day: "Thu", present: 90, absent: 10 },
    { day: "Fri", present: 87, absent: 13 },
];

export function AttendanceChart() {
    return (
        <div className="rounded-xl stat-card bg-card ml-2 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
                Weekly Attendance Overview
            </h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="presentGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="absentGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis
                            dataKey="day"
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                        />
                        <YAxis
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                            tickFormatter={(value) => `${value}%`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "0.5rem",
                            }}
                            formatter={(value: number | undefined) => [`${value ?? 0}%`, ""]}
                        />
                        <Area
                            type="monotone"
                            dataKey="present"
                            stroke="hsl(var(--success))"
                            fill="url(#presentGradient)"
                            strokeWidth={2}
                            name="Present"
                        />
                        <Area
                            type="monotone"
                            dataKey="absent"
                            stroke="hsl(var(--destructive))"
                            fill="url(#absentGradient)"
                            strokeWidth={2}
                            name="Absent"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-success" />
                    <span className="text-sm text-muted-foreground">Present</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-destructive" />
                    <span className="text-sm text-muted-foreground">Absent</span>
                </div>
            </div>
        </div>
    );
}
