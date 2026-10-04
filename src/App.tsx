import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout, DashboardLayout } from './components/layout/Layouts';
import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/public/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import LearnerHome from './pages/learner/LearnerHome';
import LearnerIdentity from './pages/learner/LearnerIdentity';
import LearnerARVRLabs from './pages/learner/LearnerARVRLabs';
import LearnerPracticalWorkbench from './pages/learner/LearnerPracticalWorkbench';
import LearnerWorkReadiness from './pages/learner/LearnerWorkReadiness';
import LearnerCredentials from './pages/learner/LearnerCredentials';
import LearnerCareerEngine from './pages/learner/LearnerCareerEngine';
import LearnerOfflineCentre from './pages/learner/LearnerOfflineCentre';
import LearnerFollowUp from './pages/learner/LearnerFollowUp';
import EmployerDashboard from './pages/employer/EmployerDashboard';
import EmployerCandidates from './pages/employer/EmployerCandidates';
import TrainerDashboard from './pages/trainer/TrainerDashboard';
import TrainerAssessment from './pages/trainer/TrainerAssessment';
import { AdminProgrammes, AdminParticipants, AdminTimetable, AdminHostel, AdminMess, AdminTransport, AdminAttendance, AdminDevices, AdminCosts, AdminBarriers, AdminAnalytics, AdminAudit, TrainerCohort, TrainerSession, TrainerExams, TrainerContent, LearnerLearning, LearnerGaps, LearnerExams, LearnerChatbot, EmployerPost, EmployerPipeline, EmployerObservation, EmployerTypes, PublicHowItWorks, PublicAI, PublicPrivacy, PublicImpact, PublicFeasibility, PublicResearch, PublicVerify } from './pages/generated/GenericPages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/how-it-works" element={<PublicHowItWorks />} />
          <Route path="/ai" element={<PublicAI />} />
          <Route path="/privacy" element={<PublicPrivacy />} />
          <Route path="/impact" element={<PublicImpact />} />
          <Route path="/feasibility" element={<PublicFeasibility />} />
          <Route path="/research" element={<PublicResearch />} />
          <Route path="/verify/:id" element={<PublicVerify />} />
        </Route>

        {/* Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/programmes" element={<AdminProgrammes />} />
          <Route path="/admin/participants" element={<AdminParticipants />} />
          <Route path="/admin/timetable" element={<AdminTimetable />} />
          <Route path="/admin/hostel" element={<AdminHostel />} />
          <Route path="/admin/mess" element={<AdminMess />} />
          <Route path="/admin/transport" element={<AdminTransport />} />
          <Route path="/admin/attendance" element={<AdminAttendance />} />
          <Route path="/admin/devices" element={<AdminDevices />} />
          <Route path="/admin/costs" element={<AdminCosts />} />
          <Route path="/admin/barriers" element={<AdminBarriers />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/audit" element={<AdminAudit />} />

          {/* Trainer */}
          <Route path="/trainer" element={<TrainerDashboard />} />
          <Route path="/trainer/cohort" element={<TrainerCohort />} />
          <Route path="/trainer/session" element={<TrainerSession />} />
          <Route path="/trainer/assessment" element={<TrainerAssessment />} />
          <Route path="/trainer/exams" element={<TrainerExams />} />
          <Route path="/trainer/content" element={<TrainerContent />} />

          {/* Learner */}
          <Route path="/learner" element={<LearnerHome />} />
          <Route path="/learner/identity" element={<LearnerIdentity />} />
          <Route path="/learner/learning" element={<LearnerLearning />} />
          <Route path="/learner/gaps" element={<LearnerGaps />} />
          <Route path="/learner/labs" element={<LearnerARVRLabs />} />
          <Route path="/learner/workbench" element={<LearnerPracticalWorkbench />} />
          <Route path="/learner/exams" element={<LearnerExams />} />
          <Route path="/learner/readiness" element={<LearnerWorkReadiness />} />
          <Route path="/learner/credentials" element={<LearnerCredentials />} />
          <Route path="/learner/career" element={<LearnerCareerEngine />} />
          <Route path="/learner/chatbot" element={<LearnerChatbot />} />
          <Route path="/learner/followup" element={<LearnerFollowUp />} />
          <Route path="/learner/offline" element={<LearnerOfflineCentre />} />

          {/* Employer */}
          <Route path="/employer" element={<EmployerDashboard />} />
          <Route path="/employer/post" element={<EmployerPost />} />
          <Route path="/employer/candidates" element={<EmployerCandidates />} />
          <Route path="/employer/pipeline" element={<EmployerPipeline />} />
          <Route path="/employer/observation" element={<EmployerObservation />} />
          <Route path="/employer/types" element={<EmployerTypes />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
