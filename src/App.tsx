import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentsPage from "./pages/admin/StudentsPage";
import TeachersPage from "./pages/admin/TeachersPage";
import ClassesPage from "./pages/admin/ClassesPage";
import TimetablePage from "./pages/admin/TimetablePage";
import AttendancePage from "./pages/admin/AttendancePage";
import ExamsPage from "./pages/admin/ExamsPage";
import FeesPage from "./pages/admin/FeesPage";
import LibraryPage from "./pages/admin/LibraryPage";
import TransportPage from "./pages/admin/TransportPage";
import MessagesPage from "./pages/admin/MessagesPage";
import NoticesPage from "./pages/admin/NoticesPage";
import SettingsPage from "./pages/admin/SettingsPage";

// Teacher Pages
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherStudentsPage from "./pages/teacher/StudentsPage";
import TeacherClassesPage from "./pages/teacher/ClassesPage";
import TeacherAttendancePage from "./pages/teacher/AttendancePage";
import TeacherExamsPage from "./pages/teacher/ExamsPage";
import TeacherTimetablePage from "./pages/teacher/TimetablePage";
import TeacherMessagesPage from "./pages/teacher/MessagesPage";
import TeacherNoticesPage from "./pages/teacher/NoticesPage";


// Student Pages

import StudentDashboard from "./pages/student/StudentDashboard";
import StudentClassesPage from "./pages/student/ClassesPage";
import StudentTimetablePage from "./pages/student/TimetablePage";
import StudentAttendancePage from "./pages/student/AttendancePage";
import StudentResultsPage from "./pages/student/ResultsPage";
import StudentFeesPage from "./pages/student/FeesPage";
import StudentLibraryPage from "./pages/student/LibraryPage";
import StudentNoticesPage from "./pages/student/NoticesPage";

// Parent Pages
import ParentDashboard from "./pages/parent/ParentDashboard";
import ParentChildrenPage from "./pages/parent/ChildrenPage";
import ParentAttendancePage from "./pages/parent/AttendancePage";
import ParentResultsPage from "./pages/parent/ResultsPage";
import ParentFeesPage from "./pages/parent/FeesPage";
import ParentMessagesPage from "./pages/parent/MessagesPage";
import ParentNoticesPage from "./pages/parent/NoticesPage";

// Accountant Pages
import AccountantDashboard from "./pages/accountant/AccountantDashboard";
import AccountantFeesPage from "./pages/accountant/FeesPage";
import AccountantStudentsPage from "./pages/accountant/StudentsPage";
import AccountantReportsPage from "./pages/accountant/ReportsPage";
import AccountantSettingsPage from "./pages/accountant/SettingsPage";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/students" element={<StudentsPage />} />
            <Route path="/admin/teachers" element={<TeachersPage />} />
            <Route path="/admin/classes" element={<ClassesPage />} />
            <Route path="/admin/timetable" element={<TimetablePage />} />
            <Route path="/admin/attendance" element={<AttendancePage />} />
            <Route path="/admin/exams" element={<ExamsPage />} />
            <Route path="/admin/fees" element={<FeesPage />} />
            <Route path="/admin/library" element={<LibraryPage />} />
            <Route path="/admin/transport" element={<TransportPage />} />
            <Route path="/admin/messages" element={<MessagesPage />} />
            <Route path="/admin/notices" element={<NoticesPage />} />
            <Route path="/admin/settings" element={<SettingsPage />} />

            {/* Teacher Routes */}
            <Route path="/teacher" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherDashboard /></ProtectedRoute>} />
            <Route path="/teacher/students" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherStudentsPage /></ProtectedRoute>} />
            <Route path="/teacher/classes" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherClassesPage /></ProtectedRoute>} />
            <Route path="/teacher/attendance" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherAttendancePage /></ProtectedRoute>} />
            <Route path="/teacher/exams" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherExamsPage /></ProtectedRoute>} />
            <Route path="/teacher/timetable" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherTimetablePage /></ProtectedRoute>} />
            <Route path="/teacher/messages" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherMessagesPage /></ProtectedRoute>} />
            <Route path="/teacher/notices" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherNoticesPage /></ProtectedRoute>} />

            {/* Student Routes */}
            <Route path="/student" element={<ProtectedRoute allowedRoles={["student"]}><StudentDashboard /></ProtectedRoute>} />
            <Route path="/student/classes" element={<ProtectedRoute allowedRoles={["student"]}><StudentClassesPage /></ProtectedRoute>} />
            <Route path="/student/timetable" element={<ProtectedRoute allowedRoles={["student"]}><StudentTimetablePage /></ProtectedRoute>} />
            <Route path="/student/attendance" element={<ProtectedRoute allowedRoles={["student"]}><StudentAttendancePage /></ProtectedRoute>} />
            <Route path="/student/results" element={<ProtectedRoute allowedRoles={["student"]}><StudentResultsPage /></ProtectedRoute>} />
            <Route path="/student/fees" element={<ProtectedRoute allowedRoles={["student"]}><StudentFeesPage /></ProtectedRoute>} />
            <Route path="/student/library" element={<ProtectedRoute allowedRoles={["student"]}><StudentLibraryPage /></ProtectedRoute>} />
            <Route path="/student/notices" element={<ProtectedRoute allowedRoles={["student"]}><StudentNoticesPage /></ProtectedRoute>} />


            {/* Parent Routes */}
            <Route path="/parent" element={<ProtectedRoute allowedRoles={["parent"]}><ParentDashboard /></ProtectedRoute>} />
            <Route path="/parent/children" element={<ProtectedRoute allowedRoles={["parent"]}><ParentChildrenPage /></ProtectedRoute>} />
            <Route path="/parent/attendance" element={<ProtectedRoute allowedRoles={["parent"]}><ParentAttendancePage /></ProtectedRoute>} />
            <Route path="/parent/results" element={<ProtectedRoute allowedRoles={["parent"]}><ParentResultsPage /></ProtectedRoute>} />
            <Route path="/parent/fees" element={<ProtectedRoute allowedRoles={["parent"]}><ParentFeesPage /></ProtectedRoute>} />
            <Route path="/parent/messages" element={<ProtectedRoute allowedRoles={["parent"]}><ParentMessagesPage /></ProtectedRoute>} />
            <Route path="/parent/notices" element={<ProtectedRoute allowedRoles={["parent"]}><ParentNoticesPage /></ProtectedRoute>} />

            {/* Accountant Routes */}
            <Route path="/accountant" element={<ProtectedRoute allowedRoles={["accountant"]}><AccountantDashboard /></ProtectedRoute>} />
            <Route path="/accountant/fees" element={<ProtectedRoute allowedRoles={["accountant"]}><AccountantFeesPage /></ProtectedRoute>} />
            <Route path="/accountant/students" element={<ProtectedRoute allowedRoles={["accountant"]}><AccountantStudentsPage /></ProtectedRoute>} />
            <Route path="/accountant/reports" element={<ProtectedRoute allowedRoles={["accountant"]}><AccountantReportsPage /></ProtectedRoute>} />
            <Route path="/accountant/settings" element={<ProtectedRoute allowedRoles={["accountant"]}><AccountantSettingsPage /></ProtectedRoute>} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
