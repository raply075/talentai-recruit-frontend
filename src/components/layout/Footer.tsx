import { Sparkles, Mail } from 'lucide-react';
import type { SVGProps } from 'react';

// lucide-react (as pinned in this project) doesn't ship brand marks, so
// GitHub/LinkedIn are small inline glyphs sized and colored to match the
// rest of the icon set instead of pulling in a whole extra icon package.
function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.1 3.29 9.42 7.86 10.95.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.2.66.79.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.48v6.26ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}

const FOOTER_LINKS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: 'Quick Links',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Help Center', href: '#top' },
      { label: 'Privacy Policy', href: '#top' },
      { label: 'Terms of Service', href: '#top' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#top' },
      { label: 'Careers', href: '#top' },
      { label: 'Contact', href: '#top' },
    ],
  },
];

const SOCIALS = [
  { icon: GitHubIcon, label: 'GitHub', href: 'https://github.com' },
  { icon: LinkedInIcon, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: Mail, label: 'Email', href: 'mailto:hello@careerai.app' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[var(--color-surface)]/60 px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand + blurb */}
          <div className="col-span-2 lg:col-span-2">
            <a href="#top" className="group flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-cyan)] shadow-[0_0_20px_-4px_rgba(124,92,252,0.7)]">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-[var(--font-display)] text-lg font-semibold tracking-tight">CareerAI</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--color-muted)]">
              AI-powered resume analysis, cover letters, and interview practice
              — built to help you land your next role faster.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={social.label}
                  className="focus-ring flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-[var(--color-muted)] transition-colors hover:border-white/20 hover:bg-white/5 hover:text-[var(--color-ink)]"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h3 className="text-sm font-semibold text-[var(--color-ink)]">{column.heading}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="focus-ring rounded text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 sm:flex-row">
          <p className="text-xs text-[var(--color-faint)]">
            © {new Date().getFullYear()} CareerAI. All rights reserved.
          </p>
          <p className="text-xs text-[var(--color-faint)]">Project by Raply Fediansyah</p>
        </div>
      </div>
    </footer>
  );
}
