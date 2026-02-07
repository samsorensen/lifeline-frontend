import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Onboarding from './pages/Onboarding';
import CourseList from './pages/CourseList';
import CourseBreakdown from './pages/CourseBreakdown';
import Study from './pages/Study';
import TaskDetail from './pages/TaskDetail';
import StudyGuide from './pages/StudyGuide';
import Quiz from './pages/Quiz';
import LearningGame from './pages/LearningGame';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/course/:courseId" element={<CourseBreakdown />} />
        <Route path="/study/:taskId" element={<Study />} />
        <Route path="/task/:taskId" element={<TaskDetail />} />
        <Route path="/study-guide/:taskId" element={<StudyGuide />} />
        <Route path="/quiz/:taskId" element={<Quiz />} />
        <Route path="/learning-game/:taskId" element={<LearningGame />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
