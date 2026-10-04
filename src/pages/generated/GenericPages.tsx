import { DataTableTemplate, ChatbotTemplate, FormTemplate, KanbanTemplate, ArticleTemplate } from '@/components/ui/Templates';

// --- ADMIN PAGES ---
export const AdminProgrammes = () => <DataTableTemplate 
  title="Programme Registration" subtitle="Manage all active courses and their configurations."
  columns={['Programme ID', 'Title', 'Mode', 'Seats', 'Status']}
  data={[['PRG-001', 'PACS ERP Operations', 'Hybrid', '40', 'Active'], ['PRG-002', 'Dairy Mgmt', 'Offline', '25', 'Active'], ['PRG-003', 'FPO Accounts', 'Online', '100', 'Pending']]} 
/>;

export const AdminParticipants = () => <DataTableTemplate 
  title="Participants Directory" subtitle="National registry of all enrolled cooperative learners."
  columns={['Learner Name', 'District', 'Programme', 'Progress', 'Verification']}
  data={[['Ravi Kumar', 'Pune', 'PACS ERP', '85%', 'Verified'], ['Sunita Sharma', 'Nashik', 'Dairy Mgmt', '40%', 'Verified'], ['Amit Singh', 'Nagpur', 'FPO Accounts', '10%', 'Pending']]} 
/>;

export const AdminTimetable = () => <DataTableTemplate 
  title="Auto Timetable" subtitle="AI-generated conflict-free schedules across all institutions."
  columns={['Date', 'Time', 'Session', 'Instructor', 'Location', 'Status']}
  data={[['Oct 5', '10:00 AM', 'Inventory Setup', 'Mrs. Patil', 'Lab 3', 'Scheduled'], ['Oct 5', '02:00 PM', 'Milking Tech', 'Mr. Deshmukh', 'RICM Pune', 'Scheduled']]} 
/>;

export const AdminHostel = () => <DataTableTemplate 
  title="Hostel Management" subtitle="Room allocations and maintenance status."
  columns={['Room', 'Block', 'Capacity', 'Occupancy', 'Status']}
  data={[['101', 'Block A', '4', '4', 'Active'], ['102', 'Block A', '4', '3', 'Active'], ['205', 'Block B', '4', '0', 'Maintenance']]} 
/>;

export const AdminMess = () => <DataTableTemplate 
  title="Mess & Dietary Management" subtitle="Daily meal planning and biometric tap-ins."
  columns={['Date', 'Meal', 'Planned Covers', 'Actual Taps', 'Menu Status']}
  data={[['Oct 4', 'Breakfast', '450', '412', 'Completed'], ['Oct 4', 'Lunch', '450', '200', 'Active']]} 
/>;

export const AdminTransport = () => <DataTableTemplate 
  title="Bus & Transport Tracking" subtitle="Real-time GPS status of institutional buses."
  columns={['Route', 'Vehicle', 'Driver', 'Capacity', 'Status']}
  data={[['Kothrud Exp', 'MH-12-AB', 'Ramesh', '42/45', 'Active'], ['Hinjewadi', 'MH-12-CD', 'Sunil', '20/45', 'Pending']]} 
/>;

export const AdminAttendance = () => <DataTableTemplate 
  title="Attendance Centre" subtitle="Aggregated biometric and QR tap-ins."
  columns={['Learner', 'Method', 'Timestamp', 'Location', 'Status']}
  data={[['Aarav', 'Face ID', '08:15 AM', 'Main Gate', 'Verified'], ['Priya', 'Fingerprint', '08:20 AM', 'Block B', 'Verified'], ['Proxy Alert', 'Face ID', '08:25 AM', 'Main Gate', 'Error']]} 
/>;

export const AdminDevices = () => <DataTableTemplate 
  title="Edge Devices & Servers" subtitle="Hardware health and offline-sync statuses."
  columns={['Device Name', 'Type', 'Location', 'Last Sync', 'Health']}
  data={[['Terminal A', 'Biometric', 'Gate 1', '2 mins ago', 'Active'], ['Server Alpha', 'Edge Node', 'Server Room', '1 min ago', 'Active'], ['Lab Scale B', 'IoT Sensor', 'Lab 2', '2 days ago', 'Error']]} 
/>;

export const AdminCosts = () => <DataTableTemplate 
  title="Costs & Utilisation" subtitle="Budget tracking per programme and institution."
  columns={['Institution', 'Category', 'Allocated', 'Spent', 'Status']}
  data={[['VAMNICOM', 'Infrastructure', '₹50L', '₹42L', 'Active'], ['RICM Pune', 'Catering', '₹10L', '₹8.5L', 'Active']]} 
/>;

export const AdminBarriers = () => <KanbanTemplate 
  title="Barrier Cases" subtitle="Escalated issues preventing learner success."
  columns={[
    { name: 'New Reports', color: 'bg-error', cards: ['No cooperative openings in home district', 'Hardware fault on Lab Scale 2'] },
    { name: 'Investigating', color: 'bg-warning', cards: ['Aadhaar demographic mismatch', 'Low attendance in Batch 4'] },
    { name: 'Resolved', color: 'bg-success', cards: ['Transport delay route 3 fixed', 'Hostel maintenance completed'] }
  ]}
/>;

export const AdminAnalytics = () => <ArticleTemplate 
  title="NCCT Analytics (Detailed)" subtitle="Deep dive reports into scheme performance."
  paragraphs={[
    "This module provides extensive BI (Business Intelligence) dashboards for NCCT officials.",
    "It correlates placement rates with specific trainer cohorts, edge server uptime, and demographic data.",
    "Data is exported seamlessly to the Ministry of Cooperation's central nodal dashboard via secure APIs."
  ]}
/>;

export const AdminAudit = () => <DataTableTemplate 
  title="Audit Log" subtitle="Immutable ledger of critical system changes."
  columns={['Timestamp', 'Actor', 'Action', 'Resource', 'IP Address']}
  data={[['10:05', 'Admin (A. Kumar)', 'Modified Programme', 'PRG-002', '192.168.1.5'], ['09:12', 'System', 'Auto-Sync Data', 'Edge-Node-2', '10.0.0.1']]} 
/>;

// --- TRAINER PAGES ---
export const TrainerCohort = () => <DataTableTemplate 
  title="Cohort View" subtitle="Manage your currently assigned batches."
  columns={['Learner Name', 'Attendance', 'Theory Score', 'Practical Cleared', 'Status']}
  data={[['Ravi Kumar', '95%', '88/100', 'Yes', 'Active'], ['Sunita Sharma', '92%', '75/100', 'No', 'Pending']]} 
/>;

export const TrainerSession = () => <ArticleTemplate 
  title="Live Session Manager" subtitle="Broadcast AR/VR simulations and track engagement."
  paragraphs={[
    "During a live session, the trainer can push AR models directly to learner tablets.",
    "The system tracks eye-gaze (if enabled) and interaction time to measure engagement.",
    "Live quizzes can be deployed instantly, with real-time analytics appearing on the trainer's dashboard."
  ]}
/>;

export const TrainerExams = () => <FormTemplate 
  title="Exam Builder" subtitle="Create localized theory and practical assessments."
  fields={[
    { label: 'Exam Title', type: 'text', placeholder: 'e.g., Mid-term Inventory Check' },
    { label: 'Target Module', type: 'select' },
    { label: 'Question Bank Selection', type: 'select' },
    { label: 'Passing Criteria (%)', type: 'number', placeholder: '70' }
  ]}
/>;

export const TrainerContent = () => <DataTableTemplate 
  title="Content Manager" subtitle="Upload and manage SCORM packages and PDF resources."
  columns={['Material Title', 'Type', 'Size', 'Offline Sync', 'Status']}
  data={[['ERP Basics Manual', 'PDF', '2MB', 'Mandatory', 'Active'], ['Milking SOP Video', 'MP4', '150MB', 'Optional', 'Active']]} 
/>;

// --- LEARNER PAGES ---
export const LearnerLearning = () => <DataTableTemplate 
  title="My Learning Content" subtitle="Access course materials and recorded sessions."
  columns={['Module Name', 'Type', 'Duration', 'Progress', 'Status']}
  data={[['Module 1: Intro', 'Video', '45 mins', '100%', 'Completed'], ['Module 2: ERP', 'Interactive', '2 hours', '45%', 'Active'], ['Module 3: Advanced', 'PDF', '-', '0%', 'Pending']]} 
/>;

export const LearnerGaps = () => <ArticleTemplate 
  title="Gap Analysis" subtitle="AI-driven insights into your weak areas."
  paragraphs={[
    "Based on your recent practical assessments, the AI has identified a 15% deviation in your Net Weight calculation speed.",
    "We recommend re-taking the 'Goods Receiving' AR simulation in independent mode.",
    "Your theory concepts are strong (top 10% of cohort). Focus purely on hands-on repetition."
  ]}
/>;

export const LearnerExams = () => <DataTableTemplate 
  title="My Exams" subtitle="Upcoming and past assessments."
  columns={['Exam Name', 'Date', 'Type', 'Score', 'Status']}
  data={[['Mid-term Theory', 'Oct 1', 'Online', '88/100', 'Completed'], ['Practical Review', 'Oct 10', 'In-Person', '-', 'Pending']]} 
/>;

export const LearnerChatbot = () => <ChatbotTemplate 
  title="Career Chatbot (Kaushalya Mitra)" subtitle="24/7 AI assistance for doubts and job prep."
  welcomeMsg="Namaste! I am your AI assistant. You can ask me about ERP concepts, scheme benefits, or how to prepare for your upcoming warehouse interview."
/>;

// --- EMPLOYER PAGES ---
export const EmployerPost = () => <FormTemplate 
  title="Post an Opening" subtitle="Define exact task requirements to find verified candidates."
  fields={[
    { label: 'Job Title', type: 'text', placeholder: 'e.g., Warehouse Manager' },
    { label: 'Required Competencies (Comma separated)', type: 'textarea', placeholder: 'Inventory counting, ERP Entry, Quality Check...' },
    { label: 'Location', type: 'text', placeholder: 'Pune District' },
    { label: 'Number of Vacancies', type: 'number', placeholder: '5' }
  ]}
/>;

export const EmployerPipeline = () => <KanbanTemplate 
  title="Candidate Pipeline" subtitle="Track applicants through your hiring stages."
  columns={[
    { name: 'Sourced (Matches)', color: 'bg-blue-500', cards: ['Ravi Kumar (92% Match)', 'Sunita Sharma (88% Match)', 'Amit Patel (85% Match)'] },
    { name: 'Interviewing', color: 'bg-warning', cards: ['Kavitha Rao'] },
    { name: 'Offered / Hired', color: 'bg-success', cards: ['Deepak Tiwari'] }
  ]}
/>;

export const EmployerObservation = () => <ArticleTemplate 
  title="Workplace Observation" subtitle="Post-hire feedback loop."
  paragraphs={[
    "Once a candidate is hired, employers use this module to provide feedback on their actual workplace performance.",
    "This data feeds back into the KaushalyaConnect AI to improve future curriculum and matching algorithms.",
    "It ensures the training remains strictly aligned with industry realities."
  ]}
/>;

export const EmployerTypes = () => <DataTableTemplate 
  title="Employer Types & Benefits" subtitle="Learn about different cooperative structures."
  columns={['Entity Type', 'Tax Benefits', 'Compliance Level', 'Typical Roles', 'Status']}
  data={[['PACS', 'High', 'Medium', 'ERP Operator', 'Active'], ['Dairy Union', 'Medium', 'High', 'Lab Tech', 'Active'], ['FPO', 'High', 'Low', 'Sales Exec', 'Active']]} 
/>;

// --- PUBLIC PAGES ---
export const PublicHowItWorks = () => <ArticleTemplate 
  title="How It Works" subtitle="The operational flow of KaushalyaConnect"
  paragraphs={["KaushalyaConnect is an end-to-end ERP for cooperative capacity building.", "It handles mobilisation, biometric attendance, learning management (LMS), AI-proctored exams, and final job placements.", "Everything is connected via a centralized state logic mimicking national deployment."]} 
/>;

export const PublicAI = () => <ArticleTemplate 
  title="AI in the Platform" subtitle="Beyond basic chatbots."
  paragraphs={["AI isn't just a chatbot here. It drives the Career Match Engine, predicting job fit based on multi-dimensional skill arrays rather than flat scores.", "AI also powers the Auto-Timetable generator, preventing room clashes across national institutions."]} 
/>;

export const PublicPrivacy = () => <ArticleTemplate 
  title="Privacy and Trust" subtitle="Data sovereignty and consent."
  paragraphs={["We implement granular consent management. Learners decide exactly who sees their Aadhaar tokens, biometric status, and contact info.", "Employers only see masked profiles until a candidate explicitly accepts an interview request."]} 
/>;

export const PublicImpact = () => <ArticleTemplate 
  title="Impact and Benefits" subtitle="Scaling cooperative success."
  paragraphs={["By verifying skills objectively via IoT workbenches, we eliminate resume fraud.", "Cooperatives reduce their hiring costs and training time by 40%, directly boosting rural economic output."]} 
/>;

export const PublicFeasibility = () => <ArticleTemplate 
  title="Feasibility and Risks" subtitle="Deployment strategies."
  paragraphs={["The system uses an Edge-Sync architecture. Local servers at training centers run autonomously during internet outages and sync back when connectivity returns.", "This ensures zero downtime in remote rural areas."]} 
/>;

export const PublicResearch = () => <ArticleTemplate 
  title="Research and References" subtitle="Data-backed design."
  paragraphs={["Our architecture is inspired by established digital public goods like DigiLocker and ONDC.", "The UI/UX follows modern accessible design guidelines, ensuring usability across varied digital literacy levels."] } 
/>;

export const PublicVerify = () => <FormTemplate 
  title="Verify Credential" subtitle="Check the authenticity of a KaushalyaConnect certificate."
  fields={[
    { label: 'Certificate ID / Hash', type: 'text', placeholder: 'Enter 16-digit hash' },
    { label: 'Candidate Name (Optional)', type: 'text' }
  ]}
/>;
