import { Calendar, Clock } from "lucide-react";
import { Badge } from "../ui/badge";

interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    type: "exam" | "meeting" | "holiday" | "event";
}

const events: Event[] = [
    {
        id: "1",
        title: "Mid-term Examinations",
        date: "Feb 10, 2026",
        time: "9:00 AM",
        type: "exam",
    },
    {
        id: "2",
        title: "Parent-Teacher Meeting",
        date: "Feb 15, 2026",
        time: "2:00 PM",
        type: "meeting",
    },
    {
        id: "3",
        title: "Cultural Fest",
        date: "Feb 20, 2026",
        time: "All Day",
        type: "event",
    },
    {
        id: "4",
        title: "Annual Sports Day",
        date: "Feb 28, 2026",
        time: "8:00 AM",
        type: "event",
    },
];

const typeVariants = {
    exam: "destructive",
    meeting: "default",
    holiday: "secondary",
    event: "outline",
} as const;

export function UpcomingEvents() {
    return (
        <div className="rounded-xl stat-card bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
                Upcoming Events
            </h3>
            <div className="space-y-4">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/50 transition-colors"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                            <Calendar className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <p className="font-medium text-foreground">{event.title}</p>
                                <Badge variant={typeVariants[event.type]} className="text-xs capitalize">
                                    {event.type}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <Calendar className="h-3.5 w-3.5" />
                                    {event.date}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="h-3.5 w-3.5" />
                                    {event.time}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
