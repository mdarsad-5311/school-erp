
export const feeStructure = [
    { id: 1, type: "Monthly Tuition", amount: 500, frequency: "Monthly", class: "10-A" },
    { id: 2, type: "Monthly Tuition", amount: 450, frequency: "Monthly", class: "9-B" },
    { id: 3, type: "Monthly Tuition", amount: 400, frequency: "Monthly", class: "8-C" },
    { id: 4, type: "Annual Development", amount: 6000, frequency: "Yearly", class: "10-A" },
    { id: 5, type: "Library Fee", amount: 200, frequency: "Yearly", class: "All" },
];

export const feePayments = [
    {
        id: "P001",
        receiptNo: "REC001",
        studentId: "S001",
        studentName: "Daniyal Shaikh",
        class: "10-A",
        feeType: "Monthly Tuition",
        amount: 500,
        paidDate: "2024-03-10",
        status: "Paid",
        paymentMethod: "Bank Transfer",
    },
    {
        id: "P002",
        receiptNo: "REC002",
        studentId: "S002",
        studentName: "Aiman Shaikh",
        class: "9-B",
        feeType: "Monthly Tuition",
        amount: 450,
        paidDate: "2024-03-12",
        status: "Paid",
        paymentMethod: "Cash",
    },
    {
        id: "P003",
        receiptNo: "REC003",
        studentId: "S003",
        studentName: "Shadman Khan",
        class: "8-C",
        feeType: "Monthly Tuition",
        amount: 400,
        dueDate: "2024-03-15",
        status: "Pending",
    },
    {
        id: "P004",
        receiptNo: "REC004",
        studentId: "S004",
        studentName: "Areeba Shaikh",
        class: "10-B",
        feeType: "Library Fee",
        amount: 50,
        dueDate: "2024-02-28",
        status: "Overdue",
    },
    {
        id: "P005",
        receiptNo: "REC005",
        studentId: "S005",
        studentName: "Sadiya Khan",
        class: "9-A",
        feeType: "Sports Fee",
        amount: 100,
        paidDate: "2024-03-01",
        status: "Paid",
        paymentMethod: "Online",
    },
];

export const libraryBooks = [
    {
        id: "B001",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        isbn: "978-0446310789",
        category: "Fiction",
        copies: 5,
        available: 3,
        location: "A-12",
    },
    {
        id: "B002",
        title: "1984",
        author: "George Orwell",
        isbn: "978-0451524935",
        category: "Science Fiction",
        copies: 3,
        available: 1,
        location: "B-05",
    },
    {
        id: "B003",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        isbn: "978-0743273565",
        category: "Classic",
        copies: 4,
        available: 4,
        location: "A-08",
    },
    {
        id: "B004",
        title: "Brief Answers to the Big Questions",
        author: "Stephen Hawking",
        isbn: "978-0553394953",
        category: "Science",
        copies: 2,
        available: 0,
        location: "C-15",
    },
];

export const messages = [
    {
        id: "M001",
        from: "Principal Office",
        to: "Admin",
        subject: "Staff Meeting Schedule",
        content: "The monthly staff meeting is scheduled for next Friday at 2 PM in the conference room. Please ensure all department heads are notified.",
        date: "2024-03-15",
        read: false,
    },
    {
        id: "M002",
        from: "Sattar Ali (Parent)",
        to: "Admin",
        subject: "Leave Application for Daniyal",
        content: "Dear Admin, I would like to request leave for my son Daniyal Shaikh (Class 10-A) for two days due to family function.",
        date: "2024-03-14",
        read: true,
    },
    {
        id: "M003",
        from: "IT Support",
        to: "Admin",
        subject: "System Maintenance",
        content: "The server will be undergoing scheduled maintenance this weekend. System access might be intermittent.",
        date: "2024-03-12",
        read: true,
    },
];

export const notices = [
    {
        id: "N001",
        title: "Upcoming Sports Day",
        content: "The Annual Sports Day will be held on 25th March. All students are requested to register for events by Friday.",
        date: "2024-03-10",
        priority: "High",
        audience: "All",
    },
    {
        id: "N002",
        title: "Parent-Teacher Meeting",
        content: "PTM for Class 10 will be conducted on Saturday, 16th March from 9 AM to 12 PM.",
        date: "2024-03-08",
        priority: "Medium",
        audience: "Parents",
    },
    {
        id: "N003",
        title: "Exam Schedule Released",
        content: "The final examination schedule for classes 5-9 has been released. Please check the notice board.",
        date: "2024-03-05",
        priority: "High",
        audience: "Students",
    },
    {
        id: "N004",
        title: "Holiday Announcement",
        content: "School will remain closed on Monday on account of Holi.",
        date: "2024-03-20",
        priority: "Medium",
        audience: "All",
    },
];

export const teachers = [
    {
        id: "T001",
        name: "Zahida Shaikh",
        email: "zahida.s@school.com",
        subject: "Mathematics",
        qualification: "M.Sc Mathematics",
        experience: "8 Years",
        phone: "+92 300-1234567",
        salary: 4500,
        status: "Active",
        joinDate: "2020-08-15"
    },
    {
        id: "T002",
        name: "Ahmed Hassan",
        email: "ahmed.h@school.com",
        subject: "Physics",
        qualification: "Ph.D Physics",
        experience: "12 Years",
        phone: "+92 300-2345678",
        salary: 5500,
        status: "Active",
        joinDate: "2018-03-10"
    },
    {
        id: "T003",
        name: "Bilal Khan",
        email: "bilal.k@school.com",
        subject: "English",
        qualification: "M.A English",
        experience: "5 Years",
        phone: "+92 300-3456789",
        salary: 3800,
        status: "Active",
        joinDate: "2022-01-20"
    },
    {
        id: "T004",
        name: "Fatima Noor",
        email: "fatima.n@school.com",
        subject: "Chemistry",
        qualification: "M.Sc Chemistry",
        experience: "10 Years",
        phone: "+92 300-4567890",
        salary: 4800,
        status: "Active",
        joinDate: "2019-09-05"
    }
];

export const subjects = [
    { id: "1", name: "Mathematics", code: "MATH101", teacher: "Zahida Shaikh" },
    { id: "2", name: "Physics", code: "PHYS101", teacher: "Ahmed Hassan" },
    { id: "3", name: "Chemistry", code: "CHEM101", teacher: "Fatima Noor" },
    { id: "4", name: "English", code: "ENG101", teacher: "Bilal Khan" },
    { id: "5", name: "History", code: "HIST101", teacher: "Imran Ali" },
];

export const classes = [
    { id: "1", name: "Class 10-A", grade: "10", section: "A", teacher: "Mr. Kamran", students: 32, subjects: 8, room: "101" },
    { id: "2", name: "Class 10-B", grade: "10", section: "B", teacher: "Mrs. Ayesha", students: 30, subjects: 8, room: "102" },
    { id: "3", name: "Class 9-A", grade: "9", section: "A", teacher: "Mr. Farhan", students: 35, subjects: 8, room: "201" },
    { id: "4", name: "Class 9-B", grade: "9", section: "B", teacher: "Mrs. Zainab", students: 33, subjects: 8, room: "202" },
];

export const timetable: Record<string, any[]> = {
    "10-A": [
        {
            day: "Monday",
            periods: [
                { time: "09:00 - 09:45", subject: "Mathematics", teacher: "Zahida Shaikh" },
                { time: "09:45 - 10:30", subject: "Physics", teacher: "Ahmed Hassan" },
                { time: "10:30 - 11:00", subject: "Break", teacher: "-" },
                { time: "11:00 - 11:45", subject: "English", teacher: "Bilal Khan" },
            ]
        },
        {
            day: "Tuesday",
            periods: [
                { time: "09:00 - 09:45", subject: "Chemistry", teacher: "Fatima Noor" },
                { time: "09:45 - 10:30", subject: "Mathematics", teacher: "Zahida Shaikh" },
                { time: "10:30 - 11:00", subject: "Break", teacher: "-" },
                { time: "11:00 - 11:45", subject: "History", teacher: "Imran Ali" },
            ]
        }
    ],
    "10-B": [
        {
            day: "Monday",
            periods: [
                { time: "09:00 - 09:45", subject: "Physics", teacher: "Ahmed Hassan" },
                { time: "09:45 - 10:30", subject: "Mathematics", teacher: "Zahida Shaikh" },
                { time: "10:30 - 11:00", subject: "Break", teacher: "-" },
                { time: "11:00 - 11:45", subject: "Chemistry", teacher: "Fatima Noor" },
            ]
        }
    ]
};

export const transportRoutes = [
    {
        id: "R001",
        name: "North Route",
        driver: "Rashid Ahmed",
        vehicle: "Bus 01",
        capacity: 50,
        students: 42,
        stops: ["Downtown", "Central Park", "North Square", "School"]
    },
    {
        id: "R002",
        name: "South Route",
        driver: "Khalid Mahmood",
        vehicle: "Bus 02",
        capacity: 40,
        students: 35,
        stops: ["Station", "Bridge Road", "South Park", "School"]
    },
    {
        id: "R003",
        name: "East Route",
        driver: "Tariq Hussain",
        vehicle: "Van 03",
        capacity: 15,
        students: 12,
        stops: ["East Mall", "Green Avenue", "Highlands", "School"]
    },
    {
        id: "R004",
        name: "West Route",
        driver: "Usman Farooq",
        vehicle: "Bus 04",
        capacity: 50,
        students: 48,
        stops: ["West Side", "Sunset Boulevard", "River View", "School"]
    }
];

export const students = [
    {
        id: "S001",
        name: "Daniyal Shaikh",
        rollNo: "101",
        class: "10-A",
        section: "A",
        gender: "Male",
        dob: "2008-05-15",
        email: "daniyal.shaikh@example.com",
        parentName: "Sattar Ali",
        phone: "+92 300-1111111",
        address: "123 Main St",
        status: "Active",
        feeStatus: "Paid",
        admissionDate: "2023-08-15"
    },
    {
        id: "S002",
        name: "Aiman Shaikh",
        rollNo: "102",
        class: "10-A",
        section: "A",
        gender: "Female",
        dob: "2008-08-20",
        email: "aiman.shaikh@example.com",
        parentName: "Sattar Ali",
        phone: "+92 300-2222222",
        address: "456 Oak Ave",
        status: "Active",
        feeStatus: "Paid",
        admissionDate: "2023-08-15"
    },
    {
        id: "S003",
        name: "Shadman Khan",
        rollNo: "103",
        class: "10-A",
        section: "A",
        gender: "Male",
        dob: "2008-03-10",
        email: "shadman.khan@example.com",
        parentName: "Rizwan Hasan",
        phone: "+92 300-3333333",
        address: "789 Pine Rd",
        status: "Active",
        feeStatus: "Pending",
        admissionDate: "2023-08-15"
    },
    {
        id: "S004",
        name: "Areeba Shaikh",
        rollNo: "104",
        class: "10-B",
        section: "B",
        gender: "Female",
        dob: "2008-11-25",
        email: "areeba.shaikh@example.com",
        parentName: "Asjad Shaikh",
        phone: "+92 300-4444444",
        address: "321 Elm St",
        status: "Active",
        feeStatus: "Paid",
        admissionDate: "2023-08-15"
    },
    {
        id: "S005",
        name: "Sadiya Khan",
        rollNo: "105",
        class: "9-A",
        section: "A",
        gender: "Female",
        dob: "2009-01-15",
        email: "sadiya.khan@example.com",
        parentName: "Abu Alam",
        phone: "+92 300-5555555",
        address: "654 Maple Dr",
        status: "Active",
        feeStatus: "Paid",
        admissionDate: "2024-01-10"
    },
];

export const exams = [
    { id: "E001", name: "Mid-Term Examination", type: "Main", startDate: "2024-04-15", endDate: "2024-04-25", status: "Upcoming" },
    { id: "E002", name: "Weekly Test - Mathematics", type: "Class Test", startDate: "2024-03-20", endDate: "2024-03-20", status: "Completed" },
    { id: "E003", name: "Final Examination", type: "Main", startDate: "2024-06-10", endDate: "2024-06-25", status: "Upcoming" }
];

export const results = [
    { studentId: "S001", examId: "E002", subject: "Mathematics", marks: 85, totalMarks: 100, grade: "A" },
    { studentId: "S002", examId: "E002", subject: "Mathematics", marks: 92, totalMarks: 100, grade: "A+" },
    { studentId: "S003", examId: "E002", subject: "Mathematics", marks: 78, totalMarks: 100, grade: "B+" }
];

export const consolidatedResults = [
    {
        studentId: "S001",
        examName: "Mid-Term Examination",
        rank: 5,
        percentage: 88.4,
        total: 442,
        subjects: [
            { subject: "Mathematics", marks: 85, maxMarks: 100, grade: "A" },
            { subject: "Physics", marks: 88, maxMarks: 100, grade: "A" },
            { subject: "Chemistry", marks: 92, maxMarks: 100, grade: "A+" },
            { subject: "English", marks: 82, maxMarks: 100, grade: "A-" },
            { subject: "History", marks: 95, maxMarks: 100, grade: "A+" },
        ]
    }
];

export const studentAttendance = [
    { date: "2024-03-01", status: "Present", subject: "Mathematics" },
    { date: "2024-03-01", status: "Present", subject: "Physics" },
    { date: "2024-03-01", status: "Present", subject: "English" },
    { date: "2024-03-02", status: "Present", subject: "Chemistry" },
    { date: "2024-03-02", status: "Absent", subject: "Mathematics" },
    { date: "2024-03-02", status: "Present", subject: "History" },
    { date: "2024-03-03", status: "Present", subject: "Physics" },
    { date: "2024-03-03", status: "Present", subject: "Chemistry" },
    { date: "2024-03-03", status: "Late", subject: "English" },
];

export const studentStats = {
    attendance: 94.5,
    avgScore: 88,
    pendingFees: 150,
    totalSubjects: 8
};

export const attendanceData = {
    "S001": {
        present: 165,
        absent: 12,
        late: 5,
        percentage: 92
    },
    "S002": {
        present: 170,
        absent: 8,
        late: 4,
        percentage: 95
    },
    "S003": {
        present: 150,
        absent: 25,
        late: 7,
        percentage: 84
    }
};
