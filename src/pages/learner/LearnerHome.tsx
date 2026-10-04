import { useTranslation } from 'react-i18next';
import { PageHeader, ProgressRing, StatusBadge } from '@/components/ui/SharedComponents';
import { learners } from '@/data/learners';
import { programmes } from '@/data/programmes';
import { hostelRooms } from '@/data/mockData';
import { busRoutes } from '@/data/mockData';
import { BookOpen, Calendar, Clock, MapPin, Bus, UtensilsCrossed, Building, DownloadCloud, PlayCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LearnerHome() {
  const { t } = useTranslation();
  // Mock current learner (normally from auth)
  const learner = learners[0];
  const programme = programmes.find(p => p.id === learner.programmeId);
  const hostel = hostelRooms.find(h => h.id === learner.hostelRoom);
  const bus = busRoutes.find(b => b.id === learner.busRoute);

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title={`Welcome back, ${learner.name.split(' ')[0]}!`}
        subtitle="Here's what's happening today in your training journey."
      />

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Progress Card */}
        <div className="card-elevated p-6 flex flex-col items-center text-center justify-center">
          <ProgressRing progress={learner.progress} size={120} strokeWidth={10} color="var(--color-success)" />
          <h3 className="font-semibold mt-4">Programme Progress</h3>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">{programme?.title}</p>
        </div>

        {/* Next Session */}
        <div className="md:col-span-2 card-elevated p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold font-heading flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Up Next
            </h3>
            <StatusBadge status="active" label="In 30 mins" />
          </div>
          
          <div className="bg-primary/5 rounded-xl p-4 border border-primary/10 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <h4 className="font-semibold text-lg">Inventory Management Module</h4>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-[var(--muted-foreground)]">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 10:00 AM - 11:30 AM</span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Lab 3, Block B</span>
                <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> Mrs. Sharma</span>
              </div>
            </div>
            <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light transition-colors whitespace-nowrap flex items-center gap-2">
              <PlayCircle className="w-4 h-4" /> Join Remote
            </button>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {/* Daily Facilities */}
        <motion.div whileHover={{ y: -4 }} className="card-elevated p-5 border-l-4 border-l-saffron">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-saffron/10 text-saffron">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <h3 className="font-semibold">Today's Meals</h3>
          </div>
          <p className="text-sm">Lunch scheduled at 1:00 PM in Main Canteen. Menu: Roti, Dal, Sabzi.</p>
          <div className="mt-3 text-xs font-medium text-success flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Breakfast tapped in
          </div>
        </motion.div>

        {bus && (
          <motion.div whileHover={{ y: -4 }} className="card-elevated p-5 border-l-4 border-l-blue-500">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                <Bus className="w-5 h-5" />
              </div>
              <h3 className="font-semibold">Bus Tracking</h3>
            </div>
            <p className="text-sm">Route: {bus.name}</p>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">Expected at stop: {bus.eta}</p>
            <StatusBadge status={bus.status} size="sm" className="mt-2" />
          </motion.div>
        )}

        {hostel && (
          <motion.div whileHover={{ y: -4 }} className="card-elevated p-5 border-l-4 border-l-purple-500">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="font-semibold">Hostel Room</h3>
            </div>
            <p className="text-sm">Room {hostel.roomNumber}, Floor {hostel.floor}</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">Occupancy: {hostel.occupied}/{hostel.capacity}</p>
          </motion.div>
        )}
      </div>

      {/* Offline Downloads */}
      <div className="card-elevated p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold font-heading flex items-center gap-2">
            <DownloadCloud className="w-5 h-5 text-primary" />
            Offline Study Materials
          </h3>
          <button className="text-sm font-medium text-primary hover:underline">Manage space</button>
        </div>
        <div className="space-y-3">
          {[
            { title: 'ERP Basics (Module 1)', size: '24 MB', downloaded: true },
            { title: 'Inventory Workflows', size: '45 MB', downloaded: false },
            { title: 'AR Lab: Dairy Setup', size: '120 MB', downloaded: false },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--muted)]/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--muted)] flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-[var(--muted-foreground)]" />
                </div>
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{item.size}</p>
                </div>
              </div>
              {item.downloaded ? (
                <span className="text-xs font-medium text-success flex items-center gap-1 bg-success/10 px-2 py-1 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> Available Offline
                </span>
              ) : (
                <button className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors" aria-label="Download">
                  <DownloadCloud className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
