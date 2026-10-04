import { useTranslation } from 'react-i18next';
import { PageHeader, KPICard, AnimatedCounter } from '@/components/ui/SharedComponents';
import { Users, BookOpen, Fingerprint, Building, UtensilsCrossed, Bus, Wrench, Cpu, ClipboardCheck, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { institutions } from '@/data/institutions';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet default icon issue in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const attendanceTrend = [
  { day: 'Mon', rate: 92 }, { day: 'Tue', rate: 95 }, { day: 'Wed', rate: 88 },
  { day: 'Thu', rate: 91 }, { day: 'Fri', rate: 94 }, { day: 'Sat', rate: 78 },
];

const completionData = [
  { name: 'PACS ERP', completed: 85, enrolled: 38 },
  { name: 'Dairy Mgmt', completed: 72, enrolled: 28 },
  { name: 'MCC Ops', completed: 60, enrolled: 24 },
  { name: 'SHG Skills', completed: 90, enrolled: 32 },
  { name: 'Warehouse', completed: 55, enrolled: 27 },
  { name: 'Accounting', completed: 68, enrolled: 43 },
];

const funnelData = [
  { name: 'Enrolled', value: 2553, fill: '#0B1F4B' },
  { name: 'Completed', value: 1847, fill: '#1a3a7a' },
  { name: 'Certified', value: 1623, fill: '#3b82f6' },
  { name: 'Matched', value: 1205, fill: '#F28C28' },
  { name: 'Placed', value: 923, fill: '#1E8E5A' },
  { name: 'Retained (30d)', value: 756, fill: '#28b572' },
];

export default function AdminDashboard() {
  const { t } = useTranslation();
  const [selectedInstitution, setSelectedInstitution] = useState<string | null>(null);

  const selectedInst = institutions.find(i => i.id === selectedInstitution);

  return (
    <div>
      <PageHeader
        title={t('dashboard')}
        subtitle="National overview of cooperative training operations"
        actions={
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--muted-foreground)]">Last updated: 5 min ago</span>
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
        <KPICard title="Active Programmes" value={18} icon={<BookOpen className="w-5 h-5" />} color="primary" trend={{ value: 12, positive: true }} />
        <KPICard title="Enrolled Learners" value={2553} icon={<Users className="w-5 h-5" />} color="saffron" trend={{ value: 8, positive: true }} />
        <KPICard title="Today's Attendance" value="92%" icon={<Fingerprint className="w-5 h-5" />} color="success" />
        <KPICard title="Hostel Occupancy" value="84%" icon={<Building className="w-5 h-5" />} color="primary" />
        <KPICard title="Meals Served" value={412} subtitle="vs 450 planned" icon={<UtensilsCrossed className="w-5 h-5" />} color="warning" />
        <KPICard title="Bus On-Time" value="88%" icon={<Bus className="w-5 h-5" />} color="success" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <KPICard title="Kit Utilisation" value="76%" icon={<Wrench className="w-5 h-5" />} color="saffron" />
        <KPICard title="Device Health" value="91%" icon={<Cpu className="w-5 h-5" />} color="success" />
        <KPICard title="Pending Approvals" value={14} icon={<ClipboardCheck className="w-5 h-5" />} color="warning" />
        <KPICard title="Proxy Alerts Today" value={3} icon={<AlertTriangle className="w-5 h-5" />} color="error" />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Attendance Trend */}
        <div className="card-elevated p-5">
          <h3 className="font-semibold font-heading mb-4">Attendance Trend (This Week)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={attendanceTrend}>
              <defs>
                <linearGradient id="attendanceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0B1F4B" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0B1F4B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis domain={[70, 100]} tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--border)', background: 'var(--card)' }} />
              <Area type="monotone" dataKey="rate" stroke="#0B1F4B" fill="url(#attendanceGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Completion by Programme */}
        <div className="card-elevated p-5">
          <h3 className="font-semibold font-heading mb-4">Completion by Programme (%)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={completionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--border)', background: 'var(--card)' }} />
              <Bar dataKey="completed" fill="#0B1F4B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Placement Funnel and Map */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Placement Funnel */}
        <div className="card-elevated p-5">
          <h3 className="font-semibold font-heading mb-4">Placement Funnel</h3>
          <div className="space-y-2">
            {funnelData.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <span className="text-xs w-24 text-right font-medium">{item.name}</span>
                <div className="flex-1 bg-[var(--muted)] rounded-full h-7 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.value / 2553) * 100}%` }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full flex items-center justify-end px-2"
                    style={{ backgroundColor: item.fill }}
                  >
                    <span className="text-white text-[10px] font-bold">{item.value.toLocaleString()}</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-[var(--muted-foreground)] mt-3">Response coverage: 89%. Unknown counts: 287.</p>
        </div>

        {/* Institution Map with Leaflet */}
        <div className="card-elevated p-5 flex flex-col">
          <h3 className="font-semibold font-heading mb-4">National Institution Network</h3>
          <div className="flex-1 min-h-[300px] rounded-xl overflow-hidden border border-[var(--border)] relative z-0">
             <MapContainer center={[22.5937, 78.9629]} zoom={4} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                   url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                {institutions.map(inst => (
                   <Marker 
                      key={inst.id} 
                      position={[inst.lat, inst.lng]}
                      eventHandlers={{
                         click: () => setSelectedInstitution(inst.id),
                      }}
                   >
                      <Popup>
                         <div className="text-sm">
                            <strong className="block text-primary">{inst.name}</strong>
                            <span className="text-[var(--muted-foreground)]">{inst.location}</span>
                            <div className="mt-1 pt-1 border-t border-[var(--border)]">
                               Enrolled: {inst.currentEnrollment} / {inst.capacity}
                            </div>
                         </div>
                      </Popup>
                   </Marker>
                ))}
             </MapContainer>
          </div>
          
          {/* Selected Institution Details */}
          {selectedInst && (
             <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20"
             >
               <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-sm">{selectedInst.name}</h4>
                  <span className={cn(
                     'px-1.5 py-0.5 rounded text-[10px] font-bold text-white',
                     selectedInst.type === 'VAMNICOM' ? 'bg-primary' : selectedInst.type === 'RICM' ? 'bg-saffron' : 'bg-success'
                  )}>
                     {selectedInst.type}
                  </span>
               </div>
               <div className="grid grid-cols-3 gap-3 mt-3 text-xs">
                 <div>
                   <p className="text-[var(--muted-foreground)]">Faculty</p>
                   <p className="font-bold text-lg">{selectedInst.faculty}</p>
                 </div>
                 <div>
                   <p className="text-[var(--muted-foreground)]">Programmes</p>
                   <p className="font-bold text-lg">{selectedInst.programmes}</p>
                 </div>
                 <div>
                   <p className="text-[var(--muted-foreground)]">Utilisation</p>
                   <p className="font-bold text-lg">{Math.round((selectedInst.currentEnrollment / selectedInst.capacity) * 100)}%</p>
                 </div>
               </div>
             </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
