export type Role = 'admin' | 'trainer' | 'learner' | 'employer';

export type Theme = 'light' | 'dark';

export type Language = 'en' | 'hi';

export type FontSize = 'sm' | 'md' | 'lg';

export type ConnectivityStatus = 'online' | 'offline' | 'syncing';

export interface User {
  id: string;
  name: string;
  nameHi?: string;
  role: Role;
  avatar?: string;
  institution?: string;
  email?: string;
  phone?: string;
}

export interface Institution {
  id: string;
  name: string;
  nameHi: string;
  type: 'VAMNICOM' | 'RICM' | 'ICM';
  location: string;
  state: string;
  lat: number;
  lng: number;
  capacity: number;
  currentEnrollment: number;
  faculty: number;
  programmes: number;
}

export interface Programme {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  institutionId: string;
  mode: 'online' | 'offline' | 'hybrid';
  language: string[];
  seats: number;
  enrolled: number;
  duration: string;
  status: 'draft' | 'active' | 'completed' | 'archived';
  startDate: string;
  endDate: string;
  eligibility: string[];
  outcomes: string[];
}

export interface Learner {
  id: string;
  name: string;
  nameHi: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  state: string;
  district: string;
  phone: string;
  enrolmentStatus: {
    face: boolean;
    fingerprint: boolean;
    qr: boolean;
  };
  consentStatus: {
    biometrics: boolean;
    aadhaarToken: boolean;
    employerVisibility: boolean;
    followUpContact: boolean;
  };
  programmeId: string;
  institutionId: string;
  progress: number;
  competencies: Record<string, number>;
  hostelRoom?: string;
  busRoute?: string;
  credentials: Credential[];
  workReadiness: WorkReadinessItem[];
}

export interface Credential {
  id: string;
  title: string;
  titleHi: string;
  issuedDate: string;
  issuer: string;
  type: 'certificate' | 'badge' | 'credit';
  status: 'active' | 'revoked';
  credits?: number;
  digilockerPushed: boolean;
  qrData: string;
}

export interface WorkReadinessItem {
  id: string;
  task: string;
  examMode: 'guided' | 'independent';
  helpNeeded: boolean;
  assessorApproval: boolean;
  status: 'knowledge' | 'task_training' | 'task_work' | 'opportunity_confirmed' | 'blocked' | 'awaiting_verification';
}

export interface Employer {
  id: string;
  name: string;
  nameHi: string;
  type: 'cooperative' | 'dairy_union' | 'pacs' | 'federation' | 'bank' | 'fpo' | 'processing_unit' | 'private';
  location: string;
  openRoles: number;
  hiredCount: number;
}

export interface Opening {
  id: string;
  employerId: string;
  title: string;
  titleHi: string;
  requiredTasks: string[];
  location: string;
  slots: number;
  status: 'active' | 'pending_verification' | 'expired' | 'filled';
  terms: string;
  expiryDate: string;
  applicants: number;
  matchedCandidates?: number;
}

export interface BusRoute {
  id: string;
  name: string;
  stops: { name: string; lat: number; lng: number; time: string }[];
  busNumber: string;
  driver: string;
  capacity: number;
  currentPassengers: number;
  status: 'on_route' | 'at_stop' | 'returned' | 'delayed';
  currentLat: number;
  currentLng: number;
  eta: string;
}

export interface HostelRoom {
  id: string;
  floor: number;
  roomNumber: string;
  capacity: number;
  occupied: number;
  gender: 'male' | 'female';
  accessible: boolean;
  occupants: string[];
  status: 'available' | 'full' | 'maintenance';
}

export interface AttendanceRecord {
  id: string;
  learnerId: string;
  learnerName: string;
  sessionId: string;
  timestamp: string;
  method: 'face' | 'fingerprint' | 'qr' | 'assisted';
  status: 'verified' | 'proxy_alert' | 'failed';
}

export interface Device {
  id: string;
  type: 'attendance_terminal' | 'workbench' | 'bus_tracker' | 'edge_server';
  name: string;
  location: string;
  status: 'healthy' | 'warning' | 'error' | 'offline';
  lastSync: string;
  firmware: string;
  calibrationDue: string;
  health: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

export interface BarrierCase {
  id: string;
  learnerId: string;
  learnerName: string;
  category: 'skill_gap' | 'equipment' | 'system_access' | 'no_opportunity';
  description: string;
  status: 'new' | 'assigned' | 'in_progress' | 'resolved';
  owner: string;
  dueDate: string;
  evidence?: string;
}
