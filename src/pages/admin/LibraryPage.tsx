import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { libraryBooks as initialBooks } from "@/data/mockData";
import { Plus, Search, Book, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Book {
    id: string;
    title: string;
    author: string;
    isbn: string;
    category: string;
    copies: number;
    available: number;
    location: string;
}

export default function LibraryPage() {
    const [books, setBooks] = useState<Book[]>(initialBooks);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddOpen, setIsAddOpen] = useState(false);
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        title: "", author: "", isbn: "", category: "", copies: "", location: ""
    });

    const filteredBooks = books.filter(b =>
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAdd = () => {
        const copies = Number(formData.copies);
        const newBook = {
            id: `B${String(books.length + 1).padStart(3, "0")}`,
            ...formData,
            copies,
            available: copies,
        };
        setBooks([...books, newBook]);
        setFormData({ title: "", author: "", isbn: "", category: "", copies: "", location: "" });
        setIsAddOpen(false);
        toast({ title: "Success", description: "Book added to library" });
    };

    const handleDelete = (id: string) => {
        setBooks(books.filter(b => b.id !== id));
        toast({ title: "Success", description: "Book removed from library" });
    };

    const totalBooks = books.reduce((sum, b) => sum + b.copies, 0);
    const totalAvailable = books.reduce((sum, b) => sum + b.available, 0);

    return (
        <DashboardLayout role="admin" title="Library" userName="Admin User">
            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3 mb-6">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-primary/10">
                                <Book className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Books</p>
                                <p className="text-2xl font-bold">{totalBooks}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-green-500/10">
                                <Book className="h-6 w-6 text-green-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Available</p>
                                <p className="text-2xl font-bold">{totalAvailable}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-orange-500/10">
                                <Book className="h-6 w-6 text-orange-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Issued</p>
                                <p className="text-2xl font-bold">{totalBooks - totalAvailable}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <CardTitle>Library Books</CardTitle>
                    <div className="flex gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search books..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 w-64" />
                        </div>
                        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                            <DialogTrigger asChild>
                                <Button className="btn-gradient"><Plus className="h-4 w-4 mr-2" />Add Book</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader><DialogTitle>Add New Book</DialogTitle></DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div><Label>Title</Label><Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} /></div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><Label>Author</Label><Input value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} /></div>
                                        <div><Label>ISBN</Label><Input value={formData.isbn} onChange={e => setFormData({ ...formData, isbn: e.target.value })} /></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><Label>Category</Label><Input value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} /></div>
                                        <div><Label>Copies</Label><Input type="number" value={formData.copies} onChange={e => setFormData({ ...formData, copies: e.target.value })} /></div>
                                    </div>
                                    <div><Label>Location</Label><Input value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} placeholder="Shelf A1" /></div>
                                    <Button onClick={handleAdd} className="btn-gradient">Add Book</Button>
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
                                <TableHead>Title</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Copies</TableHead>
                                <TableHead>Available</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredBooks.map(book => (
                                <TableRow key={book.id} className="border-b border-b-gray-200">
                                    <TableCell className="font-medium">{book.id}</TableCell>
                                    <TableCell>{book.title}</TableCell>
                                    <TableCell>{book.author}</TableCell>
                                    <TableCell><Badge variant="outline">{book.category}</Badge></TableCell>
                                    <TableCell>{book.copies}</TableCell>
                                    <TableCell>
                                        <Badge variant={book.available > 0 ? "default" : "destructive"}>
                                            {book.available}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{book.location}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(book.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
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
