import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { ProjectPlannerModal } from '../components/ProjectPlannerModal';
import { CustomCursor } from '../components/CustomCursor';
import { Footer } from '../components/Footer';
import { getTeam, addTeamMember, deleteTeamMember } from '../utils/db';
import { TeamCard3D } from '../components/TeamCard3D';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  photo_url: string;
}

// ── Admin Upload Panel ──────────────────────────────────────────────────────
const AdminPanel = ({ onAdded }: { onAdded: () => void }) => {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) return;

    setUploading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      try {
        const base64 = reader.result as string;
        addTeamMember("", "", "", "", base64);
        setPreview(null);
        if (fileRef.current) fileRef.current.value = '';
        setOpen(false);
        onAdded();
      } catch (err) {
        console.error(err);
        alert('Failed to add member.');
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {/* Floating add button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:scale-110 active:scale-95 transition-all cursor-none hover-target"
        title="Add team member"
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl">
            <div className="absolute inset-0" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="glass-card relative rounded-3xl border border-white/10 w-full max-w-lg p-8 shadow-[0_0_80px_rgba(59,130,246,0.15)]"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors cursor-none p-1"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h3 className="text-xl font-bold font-heading text-white mb-6">Add Team Member</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Photo upload */}
                <div
                  onClick={() => fileRef.current?.click()}
                  className="w-full h-48 rounded-2xl border-2 border-dashed border-white/15 hover:border-blue-500/50 transition-colors cursor-none flex items-center justify-center overflow-hidden relative"
                >
                  {preview ? (
                    <img src={preview} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <svg className="w-8 h-8 text-gray-600 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-500 text-sm">Click to upload portrait photo</p>
                      <p className="text-gray-700 text-xs mt-1">JPG, PNG, or WebP</p>
                    </div>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleFile}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none cursor-none mt-2"
                >
                  {uploading ? 'Uploading...' : 'Add to Team'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

// ── Empty State ─────────────────────────────────────────────────────────────
const EmptyState = () => (
  <div className="col-span-full flex flex-col items-center justify-center py-28 text-center">
    <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/[0.02] flex items-center justify-center mb-5">
      <svg className="w-7 h-7 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </div>
    <h3 className="text-white font-semibold text-lg mb-2">No team members yet</h3>
    <p className="text-gray-500 text-sm max-w-xs">
      Click the <span className="text-blue-400">+</span> button in the bottom-right to add your first team member.
    </p>
  </div>
);

// ── Main Page ───────────────────────────────────────────────────────────────
export const TeamPage = () => {
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const DESIRED_ORDER = ['aswin', 'rashin', 'sreerag', 'ashin'];

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const data = getTeam();
      const sorted = [...(data || [])].sort((a, b) => {
        const indexA = DESIRED_ORDER.indexOf(a.id.toLowerCase());
        const indexB = DESIRED_ORDER.indexOf(b.id.toLowerCase());
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return 0;
      });
      setMembers(sorted);
    } catch {
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'pf_team') {
        fetchTeam();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleDelete = (id: string) => {
    deleteTeamMember(id);
    setMembers(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#070512] text-white">
      <CustomCursor />
      <ProjectPlannerModal isOpen={plannerOpen} onClose={() => setPlannerOpen(false)} />
      <Navbar onOpenPlanner={() => setPlannerOpen(true)} />

      {/* Admin panel — floating + button */}
      <AdminPanel onAdded={fetchTeam} />

      {/* Page Hero — no stats */}
      <section className="relative pt-24 pb-2 px-6 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[400px] rounded-full blur-[180px] pointer-events-none" style={{ background: 'rgba(99,102,241,0.12)' }} />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[350px] rounded-full blur-[160px] pointer-events-none" style={{ background: 'rgba(139,92,246,0.10)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-indigo-200 font-mono shadow-xs mb-4">
              Our Team
            </span>
            <h1 className="text-4xl md:text-6xl font-black font-heading leading-[1.0] tracking-tight mb-3 text-white">
              The People Behind <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A5A2FF] via-[#C4B5FD] to-[#F472B6]">
                LUMIORA
              </span>
            </h1>
            <p className="text-xl max-w-2xl leading-relaxed text-slate-300">
              A tight-knit crew of designers, engineers, and strategists united by one belief —
              great digital products change everything.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-2 px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" style={{ perspective: 1500 }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-3xl border border-indigo-100 animate-pulse" style={{ aspectRatio: '3/4', background: 'rgba(255,255,255,0.5)' }} />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {members.length === 0 ? (
                <EmptyState />
              ) : (
                members.map((m, i) => (
                  <TeamCard3D key={m.id} member={m} index={i} onDelete={handleDelete} showAdminActions={true} />
                ))
              )}
            </div>
          )}
        </div>
      </section>

      {/* Hiring CTA */}
      <section className="py-24 px-6 border-t border-indigo-100">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-indigo-500 font-semibold mb-6 px-4 py-1.5 rounded-full border border-indigo-300/40 bg-indigo-50">
            We're Hiring
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-5" style={{ color: '#1E1B4B' }}>
            Want to Join the{' '}
            <span className="text-gradient">Team?</span>
          </h2>
          <p className="text-lg mb-10 leading-relaxed" style={{ color: '#6366A8' }}>
            We're always looking for exceptional designers, engineers, and strategists who want to do the best work of their lives.
          </p>
          <button
            onClick={() => setPlannerOpen(true)}
            className="group relative px-8 py-4 text-white font-semibold rounded-full overflow-hidden hover-target transition-all hover:scale-105 cursor-none"
            style={{ background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)', boxShadow: '0 8px 30px rgba(99,102,241,0.30)' }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Get In Touch
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
};
