import type { Employer, Opening, BusRoute, HostelRoom, Device, AttendanceRecord, BarrierCase, Notification } from '@/types';

export const employers: Employer[] = [
  { id: 'emp-1', name: 'Maharashtra State Dairy Union', nameHi: 'महाराष्ट्र राज्य डेयरी संघ', type: 'dairy_union', location: 'Pune, Maharashtra', openRoles: 8, hiredCount: 45 },
  { id: 'emp-2', name: 'Sahyadri PACS Federation', nameHi: 'सह्याद्री PACS संघ', type: 'federation', location: 'Nashik, Maharashtra', openRoles: 12, hiredCount: 38 },
  { id: 'emp-3', name: 'Pune District Cooperative Bank', nameHi: 'पुणे जिला सहकारी बैंक', type: 'bank', location: 'Pune, Maharashtra', openRoles: 6, hiredCount: 28 },
  { id: 'emp-4', name: 'Vidarbha Farmer Producer Organisation', nameHi: 'विदर्भ किसान उत्पादक संगठन', type: 'fpo', location: 'Nagpur, Maharashtra', openRoles: 10, hiredCount: 22 },
  { id: 'emp-5', name: 'Konkan Agri Processing Unit', nameHi: 'कोंकण कृषि प्रसंस्करण इकाई', type: 'processing_unit', location: 'Ratnagiri, Maharashtra', openRoles: 5, hiredCount: 15 },
  { id: 'emp-6', name: 'AgroTech Solutions Pvt Ltd', nameHi: 'एग्रोटेक सॉल्यूशंस प्रा. लि.', type: 'private', location: 'Mumbai, Maharashtra', openRoles: 15, hiredCount: 52 },
];

export const openings: Opening[] = [
  {
    id: 'open-1', employerId: 'emp-1', title: 'Milk Collection Centre Operator', titleHi: 'दूध संग्रहण केंद्र ऑपरेटर',
    requiredTasks: ['Fat and SNF testing', 'Digital payment processing', 'Equipment cleaning', 'Record keeping'],
    location: 'Pune District', slots: 5, status: 'active', terms: 'Full-time, 6-month probation',
    expiryDate: '2026-12-31', applicants: 23,
  },
  {
    id: 'open-2', employerId: 'emp-2', title: 'PACS ERP Data Entry Operator', titleHi: 'PACS ERP डेटा एंट्री ऑपरेटर',
    requiredTasks: ['ERP data entry', 'Report generation', 'Member account management', 'Billing'],
    location: 'Nashik District', slots: 8, status: 'active', terms: 'Full-time, contractual',
    expiryDate: '2026-11-30', applicants: 45,
  },
  {
    id: 'open-3', employerId: 'emp-3', title: 'Junior Banking Assistant', titleHi: 'कनिष्ठ बैंकिंग सहायक',
    requiredTasks: ['CBS operations', 'KYC verification', 'Loan documentation', 'Cash handling'],
    location: 'Pune', slots: 3, status: 'pending_verification', terms: 'Full-time, permanent after 1 year',
    expiryDate: '2026-12-15', applicants: 67,
  },
  {
    id: 'open-4', employerId: 'emp-4', title: 'Warehouse Supervisor', titleHi: 'गोदाम पर्यवेक्षक',
    requiredTasks: ['Inventory management', 'Quality checking', 'Dispatch planning', 'Safety compliance'],
    location: 'Nagpur', slots: 2, status: 'active', terms: 'Full-time, seasonal bonus',
    expiryDate: '2026-11-30', applicants: 18,
  },
  {
    id: 'open-5', employerId: 'emp-5', title: 'Food Processing Technician', titleHi: 'खाद्य प्रसंस्करण तकनीशियन',
    requiredTasks: ['Processing operations', 'FSSAI compliance', 'Quality testing', 'Packaging'],
    location: 'Ratnagiri', slots: 4, status: 'active', terms: 'Full-time, housing provided',
    expiryDate: '2026-12-31', applicants: 12,
  },
  {
    id: 'open-6', employerId: 'emp-6', title: 'Digital Solutions Consultant', titleHi: 'डिजिटल सॉल्यूशंस सलाहकार',
    requiredTasks: ['Client training', 'System setup', 'Technical support', 'Documentation'],
    location: 'Mumbai (travel required)', slots: 6, status: 'active', terms: 'Full-time, travel allowance',
    expiryDate: '2026-12-31', applicants: 34,
  },
];

export const busRoutes: BusRoute[] = [
  {
    id: 'route-1', name: 'Kothrud - VAMNICOM Express', busNumber: 'MH-12-AB-1234', driver: 'Ramesh Jadhav',
    capacity: 42, currentPassengers: 38, status: 'on_route', eta: '08:15 AM',
    currentLat: 18.5074, currentLng: 73.8077,
    stops: [
      { name: 'Kothrud Bus Stand', lat: 18.5074, lng: 73.8077, time: '07:30' },
      { name: 'Karve Nagar', lat: 18.4960, lng: 73.8150, time: '07:40' },
      { name: 'Warje', lat: 18.4850, lng: 73.8040, time: '07:50' },
      { name: 'Katraj', lat: 18.4576, lng: 73.8645, time: '08:00' },
      { name: 'VAMNICOM Gate', lat: 18.5204, lng: 73.8567, time: '08:15' },
    ],
  },
  {
    id: 'route-2', name: 'Hadapsar - VAMNICOM Local', busNumber: 'MH-12-CD-5678', driver: 'Sunil Pawar',
    capacity: 35, currentPassengers: 30, status: 'on_route', eta: '08:25 AM',
    currentLat: 18.5050, currentLng: 73.9300,
    stops: [
      { name: 'Hadapsar Station', lat: 18.5050, lng: 73.9300, time: '07:20' },
      { name: 'Magarpatta', lat: 18.5150, lng: 73.9250, time: '07:30' },
      { name: 'Wanowrie', lat: 18.4930, lng: 73.8900, time: '07:45' },
      { name: 'Swargate', lat: 18.5018, lng: 73.8636, time: '08:00' },
      { name: 'Shivajinagar', lat: 18.5308, lng: 73.8475, time: '08:15' },
      { name: 'VAMNICOM Gate', lat: 18.5204, lng: 73.8567, time: '08:25' },
    ],
  },
  {
    id: 'route-3', name: 'Pimpri-Chinchwad Shuttle', busNumber: 'MH-12-EF-9012', driver: 'Anil Shinde',
    capacity: 40, currentPassengers: 35, status: 'at_stop', eta: '08:30 AM',
    currentLat: 18.6298, currentLng: 73.7997,
    stops: [
      { name: 'Pimpri Station', lat: 18.6298, lng: 73.7997, time: '07:15' },
      { name: 'Chinchwad', lat: 18.6186, lng: 73.8037, time: '07:25' },
      { name: 'Wakad', lat: 18.5990, lng: 73.7609, time: '07:40' },
      { name: 'Aundh', lat: 18.5580, lng: 73.8077, time: '07:55' },
      { name: 'University Circle', lat: 18.5530, lng: 73.8270, time: '08:15' },
      { name: 'VAMNICOM Gate', lat: 18.5204, lng: 73.8567, time: '08:30' },
    ],
  },
  {
    id: 'route-4', name: 'Hinjewadi Tech Park Route', busNumber: 'MH-12-GH-3456', driver: 'Vijay Mane',
    capacity: 45, currentPassengers: 28, status: 'delayed', eta: '08:45 AM',
    currentLat: 18.5912, currentLng: 73.7390,
    stops: [
      { name: 'Hinjewadi Phase 3', lat: 18.5912, lng: 73.7390, time: '07:10' },
      { name: 'Hinjewadi Phase 1', lat: 18.5873, lng: 73.7350, time: '07:20' },
      { name: 'Wakad Bridge', lat: 18.5940, lng: 73.7560, time: '07:35' },
      { name: 'Baner', lat: 18.5590, lng: 73.7868, time: '07:50' },
      { name: 'Deccan', lat: 18.5195, lng: 73.8408, time: '08:20' },
      { name: 'VAMNICOM Gate', lat: 18.5204, lng: 73.8567, time: '08:45' },
    ],
  },
  {
    id: 'route-5', name: 'Camp - Koregaon Park Loop', busNumber: 'MH-12-IJ-7890', driver: 'Dinesh Kamble',
    capacity: 30, currentPassengers: 24, status: 'returned', eta: 'Arrived',
    currentLat: 18.5204, currentLng: 73.8567,
    stops: [
      { name: 'Pune Camp', lat: 18.5139, lng: 73.8783, time: '07:30' },
      { name: 'Koregaon Park', lat: 18.5362, lng: 73.8935, time: '07:40' },
      { name: 'Yerwada', lat: 18.5520, lng: 73.8814, time: '07:50' },
      { name: 'Kharadi', lat: 18.5520, lng: 73.9350, time: '08:00' },
      { name: 'VAMNICOM Gate', lat: 18.5204, lng: 73.8567, time: '08:10' },
    ],
  },
];

export const hostelRooms: HostelRoom[] = (() => {
  const rooms: HostelRoom[] = [];
  for (let floor = 1; floor <= 4; floor++) {
    for (let room = 1; room <= 30; room++) {
      const gender = floor <= 2 ? 'male' as const : 'female' as const;
      const occupied = Math.floor(Math.random() * 5);
      rooms.push({
        id: `room-${floor}${String(room).padStart(2, '0')}`,
        floor,
        roomNumber: `${floor}${String(room).padStart(2, '0')}`,
        capacity: 4,
        occupied: Math.min(occupied, 4),
        gender,
        accessible: room <= 2,
        occupants: Array.from({ length: Math.min(occupied, 4) }, (_, i) => `learner-${(floor - 1) * 30 + room + i}`),
        status: occupied >= 4 ? 'full' : room === 15 && floor === 2 ? 'maintenance' : 'available',
      });
    }
  }
  return rooms;
})();

export const devices: Device[] = [
  { id: 'dev-1', type: 'attendance_terminal', name: 'Main Gate Terminal A', location: 'Main Entrance', status: 'healthy', lastSync: '2026-10-04T08:00:00', firmware: 'v3.2.1', calibrationDue: '2026-12-01', health: 98 },
  { id: 'dev-2', type: 'attendance_terminal', name: 'Main Gate Terminal B', location: 'Main Entrance', status: 'healthy', lastSync: '2026-10-04T08:00:00', firmware: 'v3.2.1', calibrationDue: '2026-12-01', health: 95 },
  { id: 'dev-3', type: 'attendance_terminal', name: 'Hostel Entry Terminal', location: 'Hostel Block A', status: 'warning', lastSync: '2026-10-04T06:30:00', firmware: 'v3.2.0', calibrationDue: '2026-10-15', health: 72 },
  { id: 'dev-4', type: 'workbench', name: 'Dairy Lab Workbench 1', location: 'Lab Block, Room 101', status: 'healthy', lastSync: '2026-10-04T07:45:00', firmware: 'v2.1.0', calibrationDue: '2026-11-15', health: 96 },
  { id: 'dev-5', type: 'workbench', name: 'Dairy Lab Workbench 2', location: 'Lab Block, Room 101', status: 'healthy', lastSync: '2026-10-04T07:45:00', firmware: 'v2.1.0', calibrationDue: '2026-11-15', health: 94 },
  { id: 'dev-6', type: 'workbench', name: 'Warehouse Lab Workbench', location: 'Lab Block, Room 102', status: 'error', lastSync: '2026-10-03T16:00:00', firmware: 'v2.0.9', calibrationDue: '2026-10-10', health: 35 },
  { id: 'dev-7', type: 'bus_tracker', name: 'Bus Tracker Route 1', location: 'Bus MH-12-AB-1234', status: 'healthy', lastSync: '2026-10-04T08:10:00', firmware: 'v1.5.2', calibrationDue: '2027-01-01', health: 99 },
  { id: 'dev-8', type: 'bus_tracker', name: 'Bus Tracker Route 2', location: 'Bus MH-12-CD-5678', status: 'healthy', lastSync: '2026-10-04T08:10:00', firmware: 'v1.5.2', calibrationDue: '2027-01-01', health: 97 },
  { id: 'dev-9', type: 'bus_tracker', name: 'Bus Tracker Route 4', location: 'Bus MH-12-GH-3456', status: 'offline', lastSync: '2026-10-04T07:20:00', firmware: 'v1.5.1', calibrationDue: '2026-11-01', health: 0 },
  { id: 'dev-10', type: 'edge_server', name: 'Edge Server Alpha', location: 'Server Room', status: 'healthy', lastSync: '2026-10-04T08:12:00', firmware: 'v4.0.3', calibrationDue: '2027-03-01', health: 100 },
  { id: 'dev-11', type: 'edge_server', name: 'Edge Server Beta', location: 'Lab Block', status: 'healthy', lastSync: '2026-10-04T08:11:00', firmware: 'v4.0.3', calibrationDue: '2027-03-01', health: 99 },
  { id: 'dev-12', type: 'edge_server', name: 'Edge Server Gamma (Remote)', location: 'ICM Jaipur', status: 'warning', lastSync: '2026-10-04T07:00:00', firmware: 'v4.0.2', calibrationDue: '2026-11-15', health: 68 },
];

const methods: ('face' | 'fingerprint' | 'qr' | 'assisted')[] = ['face', 'fingerprint', 'qr', 'assisted'];
const statuses: ('verified' | 'proxy_alert' | 'failed')[] = ['verified', 'verified', 'verified', 'verified', 'proxy_alert', 'failed'];

export const attendanceRecords: AttendanceRecord[] = Array.from({ length: 50 }, (_, i) => ({
  id: `att-${i + 1}`,
  learnerId: `learner-${(i % 40) + 1}`,
  learnerName: ['Aarav Sharma', 'Priya Patil', 'Rohan Deshmukh', 'Sneha Kulkarni', 'Vikram Singh', 'Anita Kaur', 'Rajesh Kumar', 'Meena Devi'][i % 8],
  sessionId: `session-${Math.floor(i / 10) + 1}`,
  timestamp: `2026-10-04T${String(7 + Math.floor(i / 10)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:00`,
  method: methods[Math.floor(Math.random() * methods.length)],
  status: statuses[Math.floor(Math.random() * statuses.length)],
}));

export const barrierCases: BarrierCase[] = [
  { id: 'bc-1', learnerId: 'learner-12', learnerName: 'Kavitha Rao', category: 'skill_gap', description: 'Struggling with ERP report generation module. Needs additional practice sessions.', status: 'in_progress', owner: 'Trainer Sharma', dueDate: '2026-10-15' },
  { id: 'bc-2', learnerId: 'learner-5', learnerName: 'Vikram Singh', category: 'equipment', description: 'Workbench load cell showing drift. Practical assessment scores may be affected.', status: 'assigned', owner: 'IT Team', dueDate: '2026-10-10' },
  { id: 'bc-3', learnerId: 'learner-8', learnerName: 'Meena Devi', category: 'no_opportunity', description: 'Completed programme with good scores but no cooperative openings in home district.', status: 'new', owner: 'Unassigned', dueDate: '2026-10-20' },
  { id: 'bc-4', learnerId: 'learner-15', learnerName: 'Deepak Tiwari', category: 'system_access', description: 'DigiLocker account creation failed due to Aadhaar mismatch. Credential push pending.', status: 'assigned', owner: 'Admin Office', dueDate: '2026-10-08' },
  { id: 'bc-5', learnerId: 'learner-20', learnerName: 'Mahesh Gowda', category: 'skill_gap', description: 'Failed net weight calculation in independent mode twice. Assigned remedial lesson.', status: 'in_progress', owner: 'Trainer Patil', dueDate: '2026-10-12' },
  { id: 'bc-6', learnerId: 'learner-3', learnerName: 'Rohan Deshmukh', category: 'equipment', description: 'Bus tracker offline for Route 4. Cannot verify boarding. Manual verification in place.', status: 'resolved', owner: 'IT Team', dueDate: '2026-10-05', evidence: 'Tracker replaced. Route 4 now online.' },
  { id: 'bc-7', learnerId: 'learner-25', learnerName: 'Anjali Thakur', category: 'no_opportunity', description: 'Excellent performer but prefers remote/home district placement. Limited remote openings.', status: 'new', owner: 'Unassigned', dueDate: '2026-10-25' },
  { id: 'bc-8', learnerId: 'learner-30', learnerName: 'Mohan Naik', category: 'system_access', description: 'Frequent power cuts at home. Unable to complete online assessment modules.', status: 'in_progress', owner: 'Programme Coordinator', dueDate: '2026-10-18' },
];

export const notifications: Notification[] = [
  { id: 'notif-1', title: 'Attendance Alert', message: 'Proxy attempt detected for Learner ID L-042 at Main Gate Terminal A.', type: 'error', timestamp: '2026-10-04T08:05:00', read: false },
  { id: 'notif-2', title: 'Device Warning', message: 'Workbench 3 load cell calibration due in 6 days.', type: 'warning', timestamp: '2026-10-04T07:30:00', read: false },
  { id: 'notif-3', title: 'Programme Update', message: 'PACS ERP Operations batch has reached 95% enrolment.', type: 'info', timestamp: '2026-10-04T07:00:00', read: false },
  { id: 'notif-4', title: 'Credential Issued', message: '12 new certificates ready for DigiLocker push.', type: 'success', timestamp: '2026-10-03T16:00:00', read: true },
  { id: 'notif-5', title: 'Bus Delay', message: 'Hinjewadi route running 15 minutes behind schedule.', type: 'warning', timestamp: '2026-10-04T07:50:00', read: false },
];
