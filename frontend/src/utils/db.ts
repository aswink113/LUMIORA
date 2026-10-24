// Native crypto.randomUUID used for id generation

// Pure client-side static storage (backed by localStorage)
export const saveLocalStorageToServer = async () => { };
export const syncLocalStorageWithServer = async () => { };

export interface AdminUser {
  username: string;
  token: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  photo_url: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  gradient: string;
  photo_url?: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  gradient?: string;
  year: string;
  photo_url?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  category: string;
  tag: string;
  readTime: string;
  date: string;
  title: string;
  excerpt: string;
  gradient?: string;
  featured: boolean;
  photo_url?: string;
}

export interface Consultation {
  id: string;
  category: string;
  budget: string;
  timeline: string;
  description: string;
  name: string;
  email: string;
  whatsapp: string;
  company?: string;
  created_at: string;
}

export interface AgencyStat {
  id: string;
  label: string;
  value: string;
  suffix: string;
  order_index: number;
}

// ─── Default Seed Data ────────────────────────────────────────────────────────

const DEFAULT_TEAM: TeamMember[] = [
  {
    id: "aswin",
    name: "Aswin K",
    role: "Full-Stack Developer, AI & Data Science Expert",
    bio: "Specializing in end-to-end full-stack systems, machine learning models, data science pipelines, and intelligent AI architectures.",
    skills: ["Full Stack", "Data Science", "Machine Learning", "AI Engineering", "Python", "React", "TypeScript"],
    photo_url: "/employee/aswin.png"
  },
  {
    id: "rashin",
    name: "Rashin K",
    role: "Digital Marketer",
    bio: "Driving data-backed digital campaigns, performance marketing, search visibility, and organic brand traction.",
    skills: ["SEO", "Performance Marketing", "Meta Ads", "Google Ads", "Growth"],
    photo_url: "/employee/rashin.png"
  },
  {
    id: "sreerag",
    name: "Sreerag P",
    role: "Full-Stack Developer",
    bio: "Engineering scalable web applications, fluid user interfaces, and modular full-stack solutions.",
    skills: ["React", "TypeScript", "Tailwind CSS", "REST APIs", "Modern Web"],
    photo_url: "/employee/sreerag.png"
  },
  {
    id: "ashin",
    name: "Ashin P",
    role: "On-Site Marketing",
    bio: "Leading direct on-ground marketing initiatives, B2B business outreach, client engagements, and brand activations.",
    skills: ["On-Site Marketing", "B2B Outreach", "Event Marketing", "Client Relations"],
    photo_url: "/employee/ashin.png"
  }
];

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    quote: "Lumiora didn't just build our platform — they redefined how we think about our product. The strategic depth they brought was unlike any agency we'd worked with before.",
    author: "Sarah Chen",
    role: "CEO, Luminary Ventures",
    avatar: "SC",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: "t-2",
    quote: "The team's ability to translate complex business logic into an elegant, performant application was exceptional. Delivered ahead of schedule, on budget, and the UX is outstanding.",
    author: "James O'Brien",
    role: "CTO, Nexaflow Inc.",
    avatar: "JO",
    gradient: "from-purple-500 to-violet-500"
  },
  {
    id: "t-3",
    quote: "Working with Lumiora felt like having a world-class product team embedded within our company. They cared about our outcomes as much as we did.",
    author: "Priya Nair",
    role: "Head of Product, Astra Labs",
    avatar: "PN",
    gradient: "from-emerald-500 to-teal-500"
  }
];

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "p-1",
    title: "Synthetix AI Core Integration",
    client: "Synthetix Corp",
    category: "AI & Machine Learning",
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
    year: "2026"
  },
  {
    id: "p-2",
    title: "Aura Luxury E-Commerce Engine",
    client: "Aura International",
    category: "Web Development",
    gradient: "from-purple-600 via-pink-600 to-red-500",
    year: "2025"
  },
  {
    id: "p-3",
    title: "Nova Fintech Wallet Experience",
    client: "Nova Labs Inc",
    category: "Mobile Apps",
    gradient: "from-emerald-500 via-teal-600 to-blue-600",
    year: "2025"
  }
];

const DEFAULT_BLOGS: BlogPost[] = [
  {
    id: "b-1",
    slug: "building-ai-products-2026",
    category: "AI",
    tag: "AI",
    readTime: "7 min read",
    date: "Jul 18, 2026",
    title: "Building AI-First Products in 2026: A Strategic Framework",
    excerpt: "The AI landscape has shifted dramatically. We break down how leading product teams are embedding intelligence from day one — not bolting it on as an afterthought.",
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
    featured: true
  },
  {
    id: "b-2",
    slug: "design-systems-scale",
    category: "Design",
    tag: "Design",
    readTime: "5 min read",
    date: "Jul 10, 2026",
    title: "Why Your Design System Is Your Most Valuable Asset",
    excerpt: "A well-maintained design system is the difference between a team that ships in days and one that takes weeks. Here's how we build them.",
    gradient: "from-purple-600 via-pink-600 to-rose-500",
    featured: false
  },
  {
    id: "b-3",
    slug: "react-performance-2026",
    category: "Development",
    tag: "Development",
    readTime: "9 min read",
    date: "Jun 28, 2026",
    title: "React Performance Patterns That Actually Move the Needle",
    excerpt: "We benchmarked 12 optimisation techniques across real client apps. Only 4 consistently delivered meaningful improvements. Here's what worked.",
    gradient: "from-emerald-500 via-teal-600 to-blue-600",
    featured: false
  },
  {
    id: "b-4",
    slug: "ux-audit-process",
    category: "Design",
    tag: "Design",
    readTime: "6 min read",
    date: "Jun 15, 2026",
    title: "Our 3-Hour UX Audit Process That Reveals Hidden Revenue",
    excerpt: "Most UX problems are invisible until you know where to look. Our structured audit framework has uncovered an average of 8 high-impact issues per engagement.",
    gradient: "from-amber-500 via-orange-500 to-red-500",
    featured: false
  },
  {
    id: "b-5",
    slug: "startup-mvp-mistakes",
    category: "Business",
    tag: "Business",
    readTime: "4 min read",
    date: "Jun 5, 2026",
    title: "5 MVP Mistakes That Kill Startups Before They Launch",
    excerpt: "After working with 30+ early-stage startups, we've seen the same fatal mistakes repeat. Here's how to avoid them and ship something people actually want.",
    gradient: "from-cyan-500 via-sky-500 to-blue-500",
    featured: false
  },
  {
    id: "b-6",
    slug: "case-study-synthetix",
    category: "Case Study",
    tag: "Case Study",
    readTime: "10 min read",
    date: "May 22, 2026",
    title: "Case Study: How We Built Synthetix AI's Core Platform in 12 Weeks",
    excerpt: "From blank Figma canvas to production-ready AI platform in 12 weeks. A detailed walkthrough of our architecture decisions, design process, and lessons learned.",
    gradient: "from-violet-600 via-purple-600 to-indigo-600",
    featured: false
  }
];

const DEFAULT_STATS: AgencyStat[] = [
  { id: "stat-1", label: "Projects Delivered", value: "20+", suffix: "", order_index: 0 },
  { id: "stat-2", label: "Client Satisfaction", value: "98", suffix: "%", order_index: 1 },
  { id: "stat-3", label: "Years of Excellence", value: "2", suffix: "+", order_index: 2 },
  { id: "stat-4", label: "Expert Creatives", value: "6", suffix: "+", order_index: 3 }
];

// Helper to initialize localStorage
const initDB = () => {
  const savedTeam = localStorage.getItem('pf_team');
  if (!savedTeam || savedTeam.includes('arjun-mehta') || savedTeam.includes('Founder & Lead Architect')) {
    localStorage.setItem('pf_team', JSON.stringify(DEFAULT_TEAM));
  }
  if (!localStorage.getItem('pf_testimonials')) {
    localStorage.setItem('pf_testimonials', JSON.stringify(DEFAULT_TESTIMONIALS));
  }
  if (!localStorage.getItem('pf_projects')) {
    localStorage.setItem('pf_projects', JSON.stringify(DEFAULT_PROJECTS));
  }
  if (!localStorage.getItem('pf_blogs')) {
    localStorage.setItem('pf_blogs', JSON.stringify(DEFAULT_BLOGS));
  }
  const savedStats = localStorage.getItem('pf_stats');
  if (!savedStats || savedStats.includes('150+') || savedStats.includes('"value":"7"') || savedStats.includes('"value":"40"') || savedStats.includes('"value":"6+"')) {
    localStorage.setItem('pf_stats', JSON.stringify(DEFAULT_STATS));
  }
  if (!localStorage.getItem('pf_leads')) {
    localStorage.setItem('pf_leads', JSON.stringify([]));
  }
};

initDB();

// ─── DB Methods ──────────────────────────────────────────────────────────────

export const getStats = (): AgencyStat[] => {
  initDB();
  let data: AgencyStat[] = [];
  try {
    data = JSON.parse(localStorage.getItem('pf_stats') || '[]');
  } catch {
    data = DEFAULT_STATS;
  }
  if (!data.length || data.some(s => s.value === '150+' || s.value === '7' || s.value === '40')) {
    localStorage.setItem('pf_stats', JSON.stringify(DEFAULT_STATS));
    data = DEFAULT_STATS;
  }
  return data.sort((a: AgencyStat, b: AgencyStat) => a.order_index - b.order_index);
};

export const updateStat = (id: string, label: string, value: string, suffix: string): AgencyStat => {
  const stats = getStats();
  const index = stats.findIndex(s => s.id === id);
  if (index !== -1) {
    stats[index] = { ...stats[index], label, value, suffix };
    localStorage.setItem('pf_stats', JSON.stringify(stats));
    return stats[index];
  }
  throw new Error('Stat not found');
};

export const getTestimonials = (): Testimonial[] => {
  initDB();
  return JSON.parse(localStorage.getItem('pf_testimonials') || '[]');
};

export const addTestimonial = (quote: string, author: string, role: string, photo_url: string): Testimonial => {
  const testimonials = getTestimonials();
  const newT: Testimonial = {
    id: crypto.randomUUID(),
    quote,
    author,
    role,
    avatar: author.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
    gradient: "from-blue-500 to-purple-500",
    photo_url
  };
  testimonials.push(newT);
  localStorage.setItem('pf_testimonials', JSON.stringify(testimonials));
  return newT;
};

export const deleteTestimonial = (id: string): void => {
  const testimonials = getTestimonials();
  const filtered = testimonials.filter(t => t.id !== id);
  localStorage.setItem('pf_testimonials', JSON.stringify(filtered));
};

export const getPortfolio = (): Project[] => {
  initDB();
  return JSON.parse(localStorage.getItem('pf_projects') || '[]');
};

export const addProject = (title: string, client: string, category: string, year: string, photo_url: string): Project => {
  const projects = getPortfolio();
  const newP: Project = {
    id: crypto.randomUUID(),
    title,
    client,
    category,
    year,
    photo_url
  };
  projects.push(newP);
  localStorage.setItem('pf_projects', JSON.stringify(projects));
  return newP;
};

export const deleteProject = (id: string): void => {
  const projects = getPortfolio();
  const filtered = projects.filter(p => p.id !== id);
  localStorage.setItem('pf_projects', JSON.stringify(filtered));
};

export const getBlogs = (): BlogPost[] => {
  initDB();
  return JSON.parse(localStorage.getItem('pf_blogs') || '[]');
};

export const addBlog = (title: string, category: string, readTime: string, excerpt: string, featured: boolean, photo_url: string): BlogPost => {
  const blogs = getBlogs();

  // Generate slug
  let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  if (blogs.some(b => b.slug === slug)) {
    slug = `${slug}-${crypto.randomUUID().slice(0, 4)}`;
  }

  // Handle single featured post
  if (featured) {
    blogs.forEach(b => { b.featured = false; });
  }

  const newB: BlogPost = {
    id: crypto.randomUUID(),
    slug,
    category,
    tag: category,
    readTime,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    title,
    excerpt,
    featured,
    photo_url
  };
  blogs.push(newB);
  localStorage.setItem('pf_blogs', JSON.stringify(blogs));
  return newB;
};

export const deleteBlog = (id: string): void => {
  const blogs = getBlogs();
  const filtered = blogs.filter(b => b.id !== id);
  localStorage.setItem('pf_blogs', JSON.stringify(filtered));
};

export const getTeam = (): TeamMember[] => {
  initDB();
  const raw = localStorage.getItem('pf_team');
  let data: TeamMember[] = raw ? JSON.parse(raw) : [];

  let migrated = false;
  data = data.map(m => {
    const id = m.id.toLowerCase();
    if (id === 'aswin' && (!m.role.includes('Data Science') || !m.role.includes('AI'))) {
      migrated = true;
      return {
        ...m,
        role: 'Full-Stack Developer, AI & Data Science Expert',
        bio: 'Specializing in end-to-end full-stack systems, machine learning models, data science pipelines, and intelligent AI architectures.',
        skills: ['Full Stack', 'Data Science', 'Machine Learning', 'AI Engineering', 'Python', 'React', 'TypeScript']
      };
    }
    if (id === 'rashin' && m.role !== 'Digital Marketer') {
      migrated = true;
      return { ...m, role: 'Digital Marketer', skills: ['SEO', 'Performance Marketing', 'Meta Ads', 'Google Ads', 'Growth'] };
    }
    if (id === 'sreerag' && m.role !== 'Full-Stack Developer') {
      migrated = true;
      return { ...m, role: 'Full-Stack Developer', skills: ['React', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Modern Web'] };
    }
    if (id === 'ashin' && m.role !== 'On-Site Marketing') {
      migrated = true;
      return { ...m, role: 'On-Site Marketing', skills: ['On-Site Marketing', 'B2B Outreach', 'Event Marketing', 'Client Relations'] };
    }
    return m;
  });

  if (migrated) {
    localStorage.setItem('pf_team', JSON.stringify(data));
  }

  return data;
};

export const addTeamMember = (name: string, role: string, bio: string, skillsStr: string, photo_url: string): TeamMember => {
  const team = getTeam();
  const skills = skillsStr.split(',').map(s => s.trim()).filter(s => s.length > 0);
  const newM: TeamMember = {
    id: crypto.randomUUID(),
    name,
    role,
    bio,
    skills,
    photo_url
  };
  team.push(newM);
  localStorage.setItem('pf_team', JSON.stringify(team));
  return newM;
};

export const deleteTeamMember = (id: string): void => {
  const team = getTeam();
  const filtered = team.filter(m => m.id !== id);
  localStorage.setItem('pf_team', JSON.stringify(filtered));
};

export const getLeads = (): Consultation[] => {
  initDB();
  return JSON.parse(localStorage.getItem('pf_leads') || '[]');
};

export const addLead = (leadData: Omit<Consultation, 'id' | 'created_at'>): Consultation => {
  const leads = getLeads();
  const newLead: Consultation = {
    ...leadData,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString()
  };
  leads.push(newLead);
  localStorage.setItem('pf_leads', JSON.stringify(leads));
  return newLead;
};

export const deleteLead = (id: string): void => {
  const leads = getLeads();
  const filtered = leads.filter(l => l.id !== id);
  localStorage.setItem('pf_leads', JSON.stringify(filtered));
};

// ─── Auth Mocking ────────────────────────────────────────────────────────────

export const loginAdmin = (usernameInput: string, passwordInput: string): string => {
  const adminUsername = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin';
  if (usernameInput === adminUsername && passwordInput === adminPassword) {
    const mockToken = `mock-token-${crypto.randomUUID()}`;
    localStorage.setItem('admin_token', mockToken);
    return mockToken;
  }
  throw new Error('Incorrect username or password');
};

export const checkAdminToken = (token: string | null): boolean => {
  if (!token) return false;
  return token === localStorage.getItem('admin_token');
};

// ─── Orbit Icons & Expertise Cards Dynamic DB Methods ─────────────────────────

export interface OrbitIcon {
  id: string;
  emoji: string;
  label: string;
  color: string;
  iconUrl?: string; // base64 data URL for uploaded icon image
}

export interface ExpertiseCard {
  id: string;
  text: string;
}

const DEFAULT_ORBIT_ICONS: OrbitIcon[] = [
  { id: "orbit-1", emoji: '🤖', label: 'AI', color: '#5E5BFF' },
  { id: "orbit-2", emoji: '🌐', label: 'Web', color: '#7B68FF' },
  { id: "orbit-3", emoji: '📱', label: 'Mobile', color: '#A855F7' },
  { id: "orbit-4", emoji: '☁', label: 'Cloud', color: '#5E5BFF' },
  { id: "orbit-5", emoji: '⚡', label: 'Automation', color: '#8A6DFF' },
  { id: "orbit-6", emoji: '🎨', label: 'Design', color: '#A855F7' }
];

const DEFAULT_EXPERTISE_CARDS: ExpertiseCard[] = [
  { id: "exp-1", text: '🤖 AI Automation' },
  { id: "exp-2", text: '⚡ FastAPI + React' },
  { id: "exp-3", text: '📱 Mobile Apps' },
  { id: "exp-4", text: '☁ Cloud Solutions' },
  { id: "exp-5", text: '🎨 Brand Identity' },
  { id: "exp-6", text: '✨ UI/UX Design' }
];

const initDynamicHeroDB = () => {
  if (!localStorage.getItem('pf_orbit_icons')) {
    localStorage.setItem('pf_orbit_icons', JSON.stringify(DEFAULT_ORBIT_ICONS));
  }
  if (!localStorage.getItem('pf_expertise_cards')) {
    localStorage.setItem('pf_expertise_cards', JSON.stringify(DEFAULT_EXPERTISE_CARDS));
  }
};

initDynamicHeroDB();

export const getOrbitIcons = (): OrbitIcon[] => {
  initDynamicHeroDB();
  return JSON.parse(localStorage.getItem('pf_orbit_icons') || '[]');
};

export const updateOrbitIcon = (id: string, emoji: string, label: string, color: string, iconUrl?: string): OrbitIcon => {
  const icons = getOrbitIcons();
  const index = icons.findIndex(i => i.id === id);
  if (index !== -1) {
    icons[index] = { id, emoji, label, color, iconUrl };
    localStorage.setItem('pf_orbit_icons', JSON.stringify(icons));
    return icons[index];
  }
  throw new Error('Orbit icon not found');
};

export const addOrbitIcon = (emoji: string, label: string, color: string, iconUrl?: string): OrbitIcon => {
  const icons = getOrbitIcons();
  const newIcon: OrbitIcon = {
    id: crypto.randomUUID(),
    emoji,
    label,
    color,
    iconUrl
  };
  icons.push(newIcon);
  localStorage.setItem('pf_orbit_icons', JSON.stringify(icons));
  return newIcon;
};

export const deleteOrbitIcon = (id: string): void => {
  const icons = getOrbitIcons();
  const filtered = icons.filter(i => i.id !== id);
  localStorage.setItem('pf_orbit_icons', JSON.stringify(filtered));
};

export const getExpertiseCards = (): ExpertiseCard[] => {
  initDynamicHeroDB();
  return JSON.parse(localStorage.getItem('pf_expertise_cards') || '[]');
};

export const updateExpertiseCard = (id: string, text: string): ExpertiseCard => {
  const cards = getExpertiseCards();
  const index = cards.findIndex(c => c.id === id);
  if (index !== -1) {
    cards[index] = { id, text };
    localStorage.setItem('pf_expertise_cards', JSON.stringify(cards));
    return cards[index];
  }
  throw new Error('Expertise card not found');
};

export const addExpertiseCard = (text: string): ExpertiseCard => {
  const cards = getExpertiseCards();
  const newCard: ExpertiseCard = {
    id: crypto.randomUUID(),
    text
  };
  cards.push(newCard);
  localStorage.setItem('pf_expertise_cards', JSON.stringify(cards));
  return newCard;
};

export const deleteExpertiseCard = (id: string): void => {
  const cards = getExpertiseCards();
  const filtered = cards.filter(c => c.id !== id);
  localStorage.setItem('pf_expertise_cards', JSON.stringify(filtered));
};

// ==================== CLIENT LOGOS ====================
export interface ClientLogo {
  id: string;
  name: string;
  logoUrl: string; // base64 data URL
}

const DEFAULT_CLIENT_LOGOS: ClientLogo[] = [];

const initClientLogoDB = () => {
  const existing = localStorage.getItem('pf_client_logos');
  if (existing === null) {
    localStorage.setItem('pf_client_logos', JSON.stringify(DEFAULT_CLIENT_LOGOS));
  } else {
    try {
      const parsed = JSON.parse(existing) as ClientLogo[];
      // Filter out any default placeholder logo IDs
      const cleaned = parsed.filter(l => !['logo-1', 'logo-2', 'logo-3', 'logo-4', 'logo-5'].includes(l.id));
      if (cleaned.length !== parsed.length) {
        localStorage.setItem('pf_client_logos', JSON.stringify(cleaned));
      }
    } catch (e) {
      console.error(e);
    }
  }
};

initClientLogoDB();

export const getClientLogos = (): ClientLogo[] => {
  initClientLogoDB();
  return JSON.parse(localStorage.getItem('pf_client_logos') || '[]');
};

export const addClientLogo = (name: string, logoUrl: string): ClientLogo => {
  const logos = getClientLogos();
  const newLogo: ClientLogo = {
    id: crypto.randomUUID(),
    name,
    logoUrl
  };
  logos.push(newLogo);
  localStorage.setItem('pf_client_logos', JSON.stringify(logos));
  return newLogo;
};

export const updateClientLogo = (id: string, name: string, logoUrl: string): ClientLogo => {
  const logos = getClientLogos();
  const index = logos.findIndex(l => l.id === id);
  if (index !== -1) {
    logos[index] = { id, name, logoUrl };
    localStorage.setItem('pf_client_logos', JSON.stringify(logos));
    return logos[index];
  }
  throw new Error('Client logo not found');
};

export const deleteClientLogo = (id: string): void => {
  const logos = getClientLogos();
  const filtered = logos.filter(l => l.id !== id);
  localStorage.setItem('pf_client_logos', JSON.stringify(filtered));
};
