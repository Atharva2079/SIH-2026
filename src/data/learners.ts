import type { Learner } from '@/types';

const indianNames = [
  { name: 'Aarav Sharma', nameHi: 'आरव शर्मा', gender: 'male' as const, state: 'Maharashtra', district: 'Pune' },
  { name: 'Priya Patil', nameHi: 'प्रिया पाटिल', gender: 'female' as const, state: 'Maharashtra', district: 'Nashik' },
  { name: 'Rohan Deshmukh', nameHi: 'रोहन देशमुख', gender: 'male' as const, state: 'Maharashtra', district: 'Kolhapur' },
  { name: 'Sneha Kulkarni', nameHi: 'स्नेहा कुलकर्णी', gender: 'female' as const, state: 'Maharashtra', district: 'Satara' },
  { name: 'Vikram Singh', nameHi: 'विक्रम सिंह', gender: 'male' as const, state: 'Punjab', district: 'Ludhiana' },
  { name: 'Anita Kaur', nameHi: 'अनिता कौर', gender: 'female' as const, state: 'Punjab', district: 'Amritsar' },
  { name: 'Rajesh Kumar', nameHi: 'राजेश कुमार', gender: 'male' as const, state: 'Uttar Pradesh', district: 'Lucknow' },
  { name: 'Meena Devi', nameHi: 'मीना देवी', gender: 'female' as const, state: 'Bihar', district: 'Patna' },
  { name: 'Suresh Yadav', nameHi: 'सुरेश यादव', gender: 'male' as const, state: 'Rajasthan', district: 'Jaipur' },
  { name: 'Lakshmi Nair', nameHi: 'लक्ष्मी नायर', gender: 'female' as const, state: 'Kerala', district: 'Thrissur' },
  { name: 'Arjun Reddy', nameHi: 'अर्जुन रेड्डी', gender: 'male' as const, state: 'Telangana', district: 'Hyderabad' },
  { name: 'Kavitha Rao', nameHi: 'कविता राव', gender: 'female' as const, state: 'Karnataka', district: 'Bengaluru' },
  { name: 'Amit Patel', nameHi: 'अमित पटेल', gender: 'male' as const, state: 'Gujarat', district: 'Ahmedabad' },
  { name: 'Sunita Joshi', nameHi: 'सुनिता जोशी', gender: 'female' as const, state: 'Maharashtra', district: 'Pune' },
  { name: 'Deepak Tiwari', nameHi: 'दीपक तिवारी', gender: 'male' as const, state: 'Madhya Pradesh', district: 'Bhopal' },
  { name: 'Pooja Verma', nameHi: 'पूजा वर्मा', gender: 'female' as const, state: 'Uttar Pradesh', district: 'Varanasi' },
  { name: 'Kiran Das', nameHi: 'किरण दास', gender: 'female' as const, state: 'West Bengal', district: 'Kolkata' },
  { name: 'Ravi Mohan', nameHi: 'रवि मोहन', gender: 'male' as const, state: 'Tamil Nadu', district: 'Chennai' },
  { name: 'Geeta Kumari', nameHi: 'गीता कुमारी', gender: 'female' as const, state: 'Jharkhand', district: 'Ranchi' },
  { name: 'Mahesh Gowda', nameHi: 'महेश गौड़ा', gender: 'male' as const, state: 'Karnataka', district: 'Mysore' },
  { name: 'Shalini Mishra', nameHi: 'शालिनी मिश्रा', gender: 'female' as const, state: 'Odisha', district: 'Bhubaneswar' },
  { name: 'Prakash Bhat', nameHi: 'प्रकाश भट्ट', gender: 'male' as const, state: 'Karnataka', district: 'Mangalore' },
  { name: 'Rekha Iyer', nameHi: 'रेखा अय्यर', gender: 'female' as const, state: 'Tamil Nadu', district: 'Coimbatore' },
  { name: 'Naveen Gupta', nameHi: 'नवीन गुप्ता', gender: 'male' as const, state: 'Delhi', district: 'New Delhi' },
  { name: 'Anjali Thakur', nameHi: 'अंजली ठाकुर', gender: 'female' as const, state: 'Himachal Pradesh', district: 'Shimla' },
  { name: 'Sanjay More', nameHi: 'संजय मोरे', gender: 'male' as const, state: 'Maharashtra', district: 'Solapur' },
  { name: 'Padma Hegde', nameHi: 'पद्मा हेगड़े', gender: 'female' as const, state: 'Karnataka', district: 'Hubli' },
  { name: 'Ganesh Pillai', nameHi: 'गणेश पिल्लई', gender: 'male' as const, state: 'Kerala', district: 'Kochi' },
  { name: 'Radha Mehta', nameHi: 'राधा मेहता', gender: 'female' as const, state: 'Gujarat', district: 'Surat' },
  { name: 'Mohan Naik', nameHi: 'मोहन नाइक', gender: 'male' as const, state: 'Goa', district: 'Panaji' },
];

const competencyKeys = [
  'ERP Operations', 'Data Entry', 'Report Generation', 'Inventory',
  'Quality Testing', 'Financial Records', 'Digital Payments', 'Communication',
  'Safety Protocols', 'Cooperative Governance', 'Customer Service', 'Documentation'
];

function generateLearners(): Learner[] {
  const learners: Learner[] = [];
  const programmeIds = Array.from({ length: 20 }, (_, i) => `prog-${i + 1}`);
  const institutionIds = Array.from({ length: 12 }, (_, i) => `inst-${i + 1}`);

  for (let i = 0; i < 300; i++) {
    const base = indianNames[i % indianNames.length];
    const suffix = i >= indianNames.length ? ` ${Math.floor(i / indianNames.length) + 1}` : '';
    const progIdx = i % programmeIds.length;
    const instIdx = i % institutionIds.length;
    const progress = Math.floor(Math.random() * 100);

    const competencies: Record<string, number> = {};
    const numComp = 4 + Math.floor(Math.random() * 5);
    for (let c = 0; c < numComp; c++) {
      competencies[competencyKeys[c % competencyKeys.length]] = Math.floor(Math.random() * 100);
    }

    learners.push({
      id: `learner-${i + 1}`,
      name: `${base.name}${suffix}`,
      nameHi: `${base.nameHi}${suffix ? ` ${suffix.trim()}` : ''}`,
      age: 18 + Math.floor(Math.random() * 40),
      gender: base.gender,
      state: base.state,
      district: base.district,
      phone: `+91 ${9000000000 + Math.floor(Math.random() * 999999999)}`,
      enrolmentStatus: {
        face: Math.random() > 0.1,
        fingerprint: Math.random() > 0.15,
        qr: true,
      },
      consentStatus: {
        biometrics: Math.random() > 0.05,
        aadhaarToken: Math.random() > 0.1,
        employerVisibility: Math.random() > 0.2,
        followUpContact: Math.random() > 0.15,
      },
      programmeId: programmeIds[progIdx],
      institutionId: institutionIds[instIdx],
      progress,
      competencies,
      hostelRoom: Math.random() > 0.3 ? `${Math.floor(Math.random() * 4) + 1}${String(Math.floor(Math.random() * 30) + 1).padStart(2, '0')}` : undefined,
      busRoute: Math.random() > 0.4 ? `route-${Math.floor(Math.random() * 5) + 1}` : undefined,
      credentials: progress > 80 ? [
        {
          id: `cred-${i + 1}`,
          title: 'Programme Completion Certificate',
          titleHi: 'कार्यक्रम पूर्णता प्रमाणपत्र',
          issuedDate: '2026-09-30',
          issuer: 'NCCT',
          type: 'certificate',
          status: 'active',
          credits: 4,
          digilockerPushed: Math.random() > 0.5,
          qrData: `KC-CRED-${i + 1}-2026`,
        }
      ] : [],
      workReadiness: [
        {
          id: `wr-${i}-1`,
          task: 'Data entry in ERP system',
          examMode: Math.random() > 0.5 ? 'independent' : 'guided',
          helpNeeded: Math.random() > 0.7,
          assessorApproval: progress > 60,
          status: progress > 80 ? 'task_work' : progress > 50 ? 'task_training' : 'knowledge',
        },
        {
          id: `wr-${i}-2`,
          task: 'Generate monthly reports',
          examMode: Math.random() > 0.5 ? 'independent' : 'guided',
          helpNeeded: Math.random() > 0.6,
          assessorApproval: progress > 70,
          status: progress > 90 ? 'opportunity_confirmed' : progress > 60 ? 'task_training' : 'knowledge',
        },
      ],
    });
  }

  return learners;
}

export const learners = generateLearners();
