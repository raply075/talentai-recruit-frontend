import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Download, FileDown, RotateCcw, Building2, Briefcase, Sparkles } from 'lucide-react';
import jsPDF from 'jspdf';
import toast from 'react-hot-toast';
import Card from '../common/Card';
import Button from '../common/Button';
import type { CoverLetter } from '../../types/coverLetter';

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'cover-letter';
}

interface CoverLetterResultProps {
  coverLetter: CoverLetter;
  onGenerateAgain: () => void;
}

export default function CoverLetterResult({ coverLetter, onGenerateAgain }: CoverLetterResultProps) {
  const [copied, setCopied] = useState(false);
  const fileBaseName = `cover-letter-${slugify(coverLetter.company)}-${slugify(coverLetter.position)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coverLetter.content);
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Could not copy to clipboard');
    }
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([coverLetter.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileBaseName}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const marginX = 56;
    const marginY = 64;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxWidth = pageWidth - marginX * 2;
    const lineHeight = 16;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);

    const lines = doc.splitTextToSize(coverLetter.content, maxWidth);
    let cursorY = marginY;

    lines.forEach((line: string) => {
      if (cursorY > pageHeight - marginY) {
        doc.addPage();
        cursorY = marginY;
      }
      doc.text(line, marginX, cursorY);
      cursorY += lineHeight;
    });

    doc.save(`${fileBaseName}.pdf`);
  };

  return (
    <Card
      hover
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Sparkles aria-hidden="true" className="h-4 w-4 text-[var(--color-cyan)]" />
            <h2 className="font-[var(--font-display)] text-base font-semibold">Cover Letter</h2>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[var(--color-muted)]">
            <span className="flex items-center gap-1.5">
              <Building2 aria-hidden="true" className="h-3.5 w-3.5 text-[var(--color-faint)]" /> {coverLetter.company}
            </span>
            <span className="flex items-center gap-1.5">
              <Briefcase aria-hidden="true" className="h-3.5 w-3.5 text-[var(--color-faint)]" /> {coverLetter.position}
            </span>
            <span className="rounded-full border border-white/10 bg-gradient-to-br from-[var(--color-violet)]/15 to-[var(--color-cyan)]/10 px-2.5 py-0.5 text-xs font-medium capitalize text-[var(--color-ink)]">
              {coverLetter.tone}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" onClick={handleCopy} icon={copied ? <Check aria-hidden="true" className="h-3.5 w-3.5" /> : <Copy aria-hidden="true" className="h-3.5 w-3.5" />}>
            {copied ? 'Copied' : 'Copy'}
          </Button>
          <Button variant="secondary" size="sm" onClick={handleDownloadTxt} icon={<Download aria-hidden="true" className="h-3.5 w-3.5" />}>
            TXT
          </Button>
          <Button variant="secondary" size="sm" onClick={handleDownloadPdf} icon={<FileDown aria-hidden="true" className="h-3.5 w-3.5" />}>
            PDF
          </Button>
          <Button variant="ghost" size="sm" onClick={onGenerateAgain} icon={<RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />}>
            Generate Again
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6"
      >
        <p className="whitespace-pre-line font-[var(--font-sans)] text-[15px] leading-[1.75] text-[var(--color-ink)]/90">
          {coverLetter.content}
        </p>
      </motion.div>
    </Card>
  );
}
