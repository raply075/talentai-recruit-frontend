import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  FileText,
  Mail,
  MessagesSquare,
  ShieldCheck,
  UploadCloud,
  BrainCircuit,
  Compass,
  Check,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Star,
  TrendingUp,
  Zap,
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Footer from '../components/layout/Footer';
import { cn } from '../utils/helpers';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
];

const STATS = [
  { label: 'Resumes analyzed', value: '120K+' },
  { label: 'Avg. ATS score lift', value: '+38%' },
  { label: 'Job seekers', value: '24K+' },
];

const FEATURES = [
  {
    icon: FileText,
    title: 'Resume Analysis',
    description: 'Get an instant ATS score and see exactly how your resume reads to hiring software.',
  },
  {
    icon: Mail,
    title: 'AI Cover Letter',
    description: 'Generate a tailored, professional cover letter for any role in seconds.',
  },
  {
    icon: MessagesSquare,
    title: 'AI Interview',
    description: 'Practice with realistic interview questions generated from your own resume.',
  },
  {
    icon: ShieldCheck,
    title: 'Fast & Secure',
    description: 'Your data stays private. Built for speed, from upload to insight.',
  },
];

const WORKFLOW = [
  { icon: UploadCloud, title: 'Upload Resume', description: 'Drop in your PDF resume — it takes seconds.' },
  { icon: BrainCircuit, title: 'AI Analysis', description: 'Our AI reads, scores, and structures your resume.' },
  { icon: Compass, title: 'Get Career Insights', description: 'Receive your ATS score, skills, and next steps.' },
];

const BENEFITS = [
  'ATS Score for every resume you upload',
  'AI-generated, role-specific cover letters',
  'Realistic AI interview simulation',
  'Personalized career recommendations',
];

const TESTIMONIALS = [
  {
    quote:
      'CareerAI pointed out exactly what my resume was missing for ATS systems. I fixed it in an afternoon.',
    name: 'Amara Chen',
    role: 'Product Designer',
  },
  {
    quote: 'The AI interview practice felt shockingly close to my real interviews. Genuinely useful prep.',
    name: 'Diego Ramirez',
    role: 'Software Engineer',
  },
  {
    quote: 'Generated a cover letter tailored to the role in under a minute — saved me hours per application.',
    name: 'Priya Nair',
    role: 'Marketing Manager',
  },
];

const FAQS = [
  {
    question: 'How does the ATS score work?',
    answer:
      'CareerAI analyzes your resume the way applicant tracking systems do, then scores it and highlights the skills and improvements that matter most.',
  },
  {
    question: 'Is my resume data private?',
    answer: 'Yes. Your resumes and generated content are only accessible from your account.',
  },
  {
    question: 'What file formats can I upload?',
    answer: 'PDF, DOC, and DOCX files are supported, up to 10MB.',
  },
  {
    question: 'Do I need a credit card to get started?',
    answer: 'No. Create a free account and start analyzing your resume right away.',
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[var(--color-base)] text-[var(--color-ink)]">
      {/* Ambient background: gradient mesh, orbs, grid, noise */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(55vw 55vh at 10% -8%, rgba(124,92,252,0.18), transparent 60%), radial-gradient(45vw 45vh at 100% 0%, rgba(34,211,238,0.12), transparent 60%), radial-gradient(40vw 40vh at 50% 100%, rgba(124,92,252,0.08), transparent 60%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(80% 60% at 50% 0%, black, transparent)',
          }}
        />
        <motion.div
          className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-[var(--color-violet)]/20 blur-[100px]"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-24 top-64 h-96 w-96 rounded-full bg-[var(--color-cyan)]/15 blur-[110px]"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      {/* Marketing navbar: transparent at top, glass + glow once scrolled */}
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={cn(
          'sticky top-0 z-40 border-b transition-all duration-300',
          isScrolled
            ? 'border-white/[0.08] bg-[var(--color-base)]/70 shadow-[0_1px_0_0_rgba(255,255,255,0.04),0_12px_32px_-16px_rgba(124,92,252,0.25)] backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="group flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 8, scale: 1.06 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-cyan)] shadow-[0_0_20px_-4px_rgba(124,92,252,0.7)]"
            >
              <Sparkles className="h-4 w-4 text-white" />
            </motion.div>
            <span className="font-[var(--font-display)] text-lg font-semibold tracking-tight">CareerAI</span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative rounded-lg px-3.5 py-2 text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
              >
                {link.label}
                <span className="absolute inset-x-3 bottom-1 h-px scale-x-0 bg-gradient-to-r from-[var(--color-violet)] to-[var(--color-cyan)] transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 sm:flex">
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button
              size="sm"
              icon={<ArrowRight className="h-3.5 w-3.5" />}
              className="shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_0_24px_-6px_rgba(124,92,252,0.8)]"
              onClick={() => navigate('/register')}
            >
              Get Started
            </Button>
          </div>

          <button
            type="button"
            aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileNavOpen((v) => !v)}
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-xl text-[var(--color-muted)] hover:bg-white/5 hover:text-[var(--color-ink)] sm:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileNavOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden border-t border-white/[0.06] bg-[var(--color-base)]/95 backdrop-blur-xl sm:hidden"
            >
              <div className="flex flex-col gap-1 px-5 py-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileNavOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--color-muted)] hover:bg-white/5 hover:text-[var(--color-ink)]"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="mt-2 flex items-center gap-2 border-t border-white/[0.06] pt-4">
                  <Button variant="secondary" size="sm" fullWidth onClick={() => navigate('/login')}>
                    Login
                  </Button>
                  <Button size="sm" fullWidth onClick={() => navigate('/register')}>
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero */}
      <section id="top" className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-[var(--color-muted)]">
            <Sparkles className="h-3.5 w-3.5 text-[var(--color-cyan)]" /> AI-powered career toolkit
          </span>
          <h1 className="font-[var(--font-display)] text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-gradient">CareerAI</span>
            <br />
            AI Resume Analyzer &amp; Career Assistant
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
            Analyze your resume, generate ATS reports, create AI-powered cover letters, and practice
            interview questions with AI.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" icon={<ArrowRight className="h-4 w-4" />} onClick={() => navigate('/register')}>
              Get Started
            </Button>
            <Button size="lg" variant="secondary" onClick={() => navigate('/login')}>
              Login
            </Button>
          </div>

          {/* Trust badges / stats */}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/[0.06] pt-6">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-ink)] sm:text-2xl">
                  {stat.value}
                </p>
                <p className="text-xs text-[var(--color-faint)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="relative mx-auto w-full max-w-md"
        >
          <FloatingDashboard />
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4 }}
          className="mb-10 text-center"
        >
          <h2 className="font-[var(--font-display)] text-2xl font-semibold sm:text-3xl">
            Everything you need to land the job
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Card
                className="group h-full transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-violet)]/40 hover:shadow-[0_16px_40px_-16px_rgba(124,92,252,0.35)]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-violet)]/20 to-[var(--color-cyan)]/10 text-[var(--color-cyan)] transition-transform duration-300 group-hover:scale-110">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1.5 font-[var(--font-display)] text-base font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-muted)]">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section id="how-it-works" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4 }}
          className="mb-10 text-center"
        >
          <h2 className="font-[var(--font-display)] text-2xl font-semibold sm:text-3xl">How it works</h2>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {WORKFLOW.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative flex flex-col items-center gap-3 text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-cyan)]">
                <step.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-[var(--font-display)] text-base font-semibold">{step.title}</h3>
              <p className="max-w-xs text-sm text-[var(--color-muted)]">{step.description}</p>
              {i < WORKFLOW.length - 1 && (
                <ArrowRight
                  aria-hidden="true"
                  className="absolute -right-3 top-6 hidden h-5 w-5 text-[var(--color-faint)] sm:block"
                />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="font-[var(--font-display)] text-2xl font-semibold sm:text-3xl">
              Built for every stage of your job search
            </h2>
            <p className="mt-3 max-w-md text-[var(--color-muted)]">
              From your first upload to your next offer, CareerAI keeps every tool in one place.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {BENEFITS.map((benefit, i) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="flex items-start gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
              >
                <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-success)]" />
                <p className="text-sm text-[var(--color-ink)]">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4 }}
          className="mb-10 text-center"
        >
          <h2 className="font-[var(--font-display)] text-2xl font-semibold sm:text-3xl">Loved by job seekers</h2>
        </motion.div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-violet)]/30 hover:shadow-[0_16px_40px_-16px_rgba(124,92,252,0.3)]">
                <div className="mb-3 flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-[var(--color-warning)] text-[var(--color-warning)]" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-[var(--color-muted)]">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-cyan)] text-xs font-semibold text-white">
                    {t.name
                      .split(' ')
                      .map((p) => p[0])
                      .join('')}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate text-sm font-medium">{t.name}</p>
                      <ShieldCheck aria-label="Verified" className="h-3.5 w-3.5 shrink-0 text-[var(--color-cyan)]" />
                    </div>
                    <p className="text-xs text-[var(--color-faint)]">{t.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4 }}
          className="mb-10 text-center"
        >
          <h2 className="font-[var(--font-display)] text-2xl font-semibold sm:text-3xl">
            Frequently asked questions
          </h2>
        </motion.div>
        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="glass overflow-hidden rounded-xl"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium">{faq.question}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className={cn('h-4 w-4 shrink-0 text-[var(--color-faint)] transition-transform', isOpen && 'rotate-180')}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 text-sm leading-relaxed text-[var(--color-muted)]">{faq.answer}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[var(--color-violet)]/20 via-[var(--color-surface)] to-[var(--color-cyan)]/10 px-6 py-14 text-center sm:px-12"
        >
          <h2 className="font-[var(--font-display)] text-2xl font-semibold sm:text-3xl">
            Ready to improve your career?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[var(--color-muted)]">
            Join CareerAI and turn your resume into your strongest asset.
          </p>
          <Button size="lg" className="mt-7" icon={<ArrowRight className="h-4 w-4" />} onClick={() => navigate('/register')}>
            Start Now
          </Button>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

/** ATS score progress ring, built from SVG + a CSS custom property gradient. */
function ScoreRing({ score = 92 }: { score?: number }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14 -rotate-90">
      <circle cx="32" cy="32" r={radius} strokeWidth="5" className="fill-none stroke-white/10" />
      <motion.circle
        cx="32"
        cy="32"
        r={radius}
        strokeWidth="5"
        strokeLinecap="round"
        className="fill-none stroke-[var(--color-cyan)]"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
      />
    </svg>
  );
}

/** Floating AI-dashboard composition: resume preview, ATS score, skills, and analysis cards. */
function FloatingDashboard() {
  return (
    <div className="relative h-[420px] w-full sm:h-[460px]">
      {/* glow behind the composition */}
      <div
        className="absolute inset-0 -z-10 opacity-80"
        style={{
          background:
            'radial-gradient(45% 45% at 50% 40%, rgba(124,92,252,0.25), transparent 70%), radial-gradient(35% 35% at 75% 75%, rgba(34,211,238,0.2), transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Resume preview — anchor card */}
      <motion.div
        className="absolute left-1/2 top-6 w-56 -translate-x-1/2"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Card padding="sm" className="shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
          <div className="mb-3 flex items-center gap-2">
            <FileText className="h-3.5 w-3.5 text-[var(--color-cyan)]" />
            <span className="text-[11px] font-medium text-[var(--color-muted)]">resume.pdf</span>
          </div>
          <div className="space-y-1.5">
            <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-[var(--color-violet)] to-[var(--color-cyan)] opacity-90" />
            <div className="h-1.5 w-full rounded-full bg-white/10" />
            <div className="h-1.5 w-5/6 rounded-full bg-white/[0.07]" />
            <div className="h-1.5 w-full rounded-full bg-white/10" />
            <div className="h-1.5 w-2/3 rounded-full bg-white/[0.07]" />
          </div>
        </Card>
      </motion.div>

      {/* ATS score card */}
      <motion.div
        className="absolute right-0 top-24 w-40"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      >
        <Card padding="sm" className="shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
          <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-[var(--color-faint)]">ATS Score</p>
          <div className="flex items-center gap-2">
            <div className="relative">
              <ScoreRing score={92} />
              <span className="absolute inset-0 flex items-center justify-center font-[var(--font-mono)] text-xs font-semibold text-[var(--color-ink)]">
                92
              </span>
            </div>
            <span className="flex items-center gap-1 text-[11px] font-medium text-[var(--color-success)]">
              <TrendingUp className="h-3 w-3" /> +14
            </span>
          </div>
        </Card>
      </motion.div>

      {/* Skills card */}
      <motion.div
        className="absolute left-0 top-40 w-40"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      >
        <Card padding="sm" className="shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wide text-[var(--color-faint)]">Top Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {['React', 'TypeScript', 'Node'].map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-[var(--color-muted)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* AI analysis card */}
      <motion.div
        className="absolute bottom-6 left-4 w-48"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
      >
        <Card padding="sm" className="shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-cyan)]">
              <BrainCircuit className="h-3.5 w-3.5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-medium">AI Analysis</p>
              <p className="truncate text-[10px] text-[var(--color-faint)]">3 improvements found</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Floating notification pill */}
      <motion.div
        className="absolute bottom-16 right-2 flex items-center gap-1.5 rounded-full border border-white/10 bg-[var(--color-elevated)]/90 px-3 py-1.5 text-[10px] font-medium text-[var(--color-ink)] shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -8] }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
      >
        <Zap className="h-3 w-3 text-[var(--color-cyan)]" /> Cover letter ready
      </motion.div>

      {/* Ambient dots */}
      <motion.div
        className="absolute left-8 bottom-2 h-2 w-2 rounded-full bg-[var(--color-violet)]"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-10 top-4 h-1.5 w-1.5 rounded-full bg-[var(--color-cyan)]"
        animate={{ opacity: [0.3, 0.9, 0.3] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
    </div>
  );
}
