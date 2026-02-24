import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { transportRoutes as initialRoutes } from "@/data/mockData";
import { Plus, Search, Bus, Edit, Trash2, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TransportPage() {
    const [routes, setRoutes] = useState(initialRoutes);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddOpen, setIsAddOpen] = useState(false);
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        name: "", driver: "", vehicle: "", capacity: "", stops: ""
    });

    const filteredRoutes = routes.filter(r =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.driver.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAdd = () => {
        const newRoute = {
            id: `R${String(routes.length + 1).padStart(3, "0")}`,
            name: formData.name,
            driver: formData.driver,
            vehicle: formData.vehicle,
            capacity: Number(formData.capacity),
            students: 0,
            stops: formData.stops.split(",").map(s => s.trim()),
        };
        setRoutes([...routes, newRoute]);
        setFormData({ name: "", driver: "", vehicle: "", capacity: "", stops: "" });
        setIsAddOpen(false);
        toast({ title: "Success", description: "Route added successfully" });
    };

    const handleDelete = (id: string) => {
        setRoutes(routes.filter(r => r.id !== id));
        toast({ title: "Success", description: "Route removed successfully" });
    };

    const totalStudents = routes.reduce((sum, r) => sum + r.students, 0);
    const totalCapacity = routes.reduce((sum, r) => sum + r.capacity, 0);

    return (
        <DashboardLayout role="admin" title="Transport" userName="Admin User">
            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3 mb-6">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-primary/10">
                                <Bus className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Routes</p>
                                <p className="text-2xl font-bold">{routes.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-green-500/10">
                                <Bus className="h-6 w-6 text-green-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Students Using Transport</p>
                                <p className="text-2xl font-bold">{totalStudents}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-orange-500/10">
                                <Bus className="h-6 w-6 text-orange-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Capacity</p>
                                <p className="text-2xl font-bold">{totalCapacity}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Transport Routes</CardTitle>
                    <div className="flex gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search routes..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 w-64" />
                        </div>
                        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                            <DialogTrigger asChild>
                                <Button className="btn-gradient"><Plus className="h-4 w-4 mr-2" />Add Route</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader><DialogTitle>Add New Route</DialogTitle></DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div><Label>Route Name</Label><Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><Label>Driver Name</Label><Input value={formData.driver} onChange={e => setFormData({ ...formData, driver: e.target.value })} /></div>
                                        <div><Label>Vehicle</Label><Input value={formData.vehicle} onChange={e => setFormData({ ...formData, vehicle: e.target.value })} placeholder="Bus 01" /></div>
                                    </div>
                                    <div><Label>Capacity</Label><Input type="number" value={formData.capacity} onChange={e => setFormData({ ...formData, capacity: e.target.value })} /></div>
                                    <div><Label>Stops (comma separated)</Label><Input value={formData.stops} onChange={e => setFormData({ ...formData, stops: e.target.value })} placeholder="Stop A, Stop B, School" /></div>
                                    <Button onClick={handleAdd} className="btn-gradient">Add Route</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Route Name</TableHead>
                                <TableHead>Driver</TableHead>
                                <TableHead>Vehicle</TableHead>
                                <TableHead>Students</TableHead>
                                <TableHead>Capacity</TableHead>
                                <TableHead>Stops</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredRoutes.map(route => (
                                <TableRow key={route.id} className="border-b border-b-gray-200">
                                    <TableCell className="font-medium">{route.id}</TableCell>
                                    <TableCell>{route.name}</TableCell>
                                    <TableCell>{route.driver}</TableCell>
                                    <TableCell><Badge variant="outline">{route.vehicle}</Badge></TableCell>
                                    <TableCell>{route.students}</TableCell>
                                    <TableCell>{route.capacity}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">{route.stops.length} stops</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(route.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                        </div>
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
