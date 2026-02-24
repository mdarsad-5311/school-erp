import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { libraryBooks } from "@/data/mockData";
import { Search, Book } from "lucide-react";

export default function StudentLibraryPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const filtered = libraryBooks.filter((b: any) =>
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout role="student" title="Library" userName="John Smith">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Library Catalog</CardTitle>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search books..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-9 w-64" />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Available</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.map((book: any) => (
                                <TableRow key={book.id} className="border-b border-b-gray-200">
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <Book className="h-4 w-4 text-muted-foreground" />
                                            {book.title}
                                        </div>
                                    </TableCell>
                                    <TableCell>{book.author}</TableCell>
                                    <TableCell><Badge variant="outline">{book.category}</Badge></TableCell>
                                    <TableCell>
                                        <Badge variant={book.available > 0 ? "default" : "destructive"}>
                                            {book.available}/{book.copies}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{book.location}</TableCell>
                                    <TableCell>
                                        <Button size="sm" variant="outline" disabled={book.available === 0}>
                                            {book.available > 0 ? "Request" : "Unavailable"}
                                        </Button>
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
