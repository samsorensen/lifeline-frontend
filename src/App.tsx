import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import CourseList from './pages/CourseList';
import CourseBreakdown from './pages/CourseBreakdown';
import Study from './pages/Study';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/course/:courseId" element={<CourseBreakdown />} />
        <Route path="/study/:taskId" element={<Study />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
