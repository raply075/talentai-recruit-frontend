import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Copy, Check, ChevronDown, MessageCircle, Lightbulb } from 'lucide-react';
import toast from 'react-hot-toast';
import Card from '../common/Card';
import Button from '../common/Button';
import { cn } from '../../utils/helpers';
import type { InterviewQuestion } from '../../types/interview';

interface InterviewCardProps {
  question: InterviewQuestion;
  index: number;
}

export default function InterviewCard({ question, index }: InterviewCardProps) {
  const [copied, setCopied] = useState(false);
  const [answerCopied, setAnswerCopied] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(question.question);
      setCopied(true);
      toast.success('Question copied');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Could not copy to clipboard');
    }
  };

  const handleCopyAnswer = async () => {
    try {
      await navigator.clipboard.writeText(question.sampleAnswer);
      setAnswerCopied(true);
      toast.success('Sample answer copied');
      setTimeout(() => setAnswerCopied(false), 2000);
    } catch {
      toast.error('Could not copy to clipboard');
    }
  };

  return (
    <Card
      hover
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.04 * index }}
    >
      <div className="flex items-start gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-cyan)] font-[var(--font-mono)] text-xs font-semibold text-white">
          {index + 1}
        </span>
        <p className="flex-1 font-medium leading-relaxed text-[var(--color-ink)]">{question.question}</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          icon={copied ? <Check aria-hidden="true" className="h-3.5 w-3.5" /> : <Copy aria-hidden="true" className="h-3.5 w-3.5" />}
          aria-label="Copy question"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setShowAnswer((prev) => !prev)}
          aria-expanded={showAnswer}
          className="focus-ring flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-[var(--color-muted)] transition-colors hover:border-white/20 hover:text-[var(--color-ink)]"
        >
          <MessageCircle aria-hidden="true" className="h-3.5 w-3.5" />
          Show Sample Answer
          <ChevronDown aria-hidden="true" className={cn('h-3.5 w-3.5 transition-transform', showAnswer && 'rotate-180')} />
        </button>
        <button
          type="button"
          onClick={() => setShowTips((prev) => !prev)}
          aria-expanded={showTips}
          className="focus-ring flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-[var(--color-muted)] transition-colors hover:border-white/20 hover:text-[var(--color-ink)]"
        >
          <Lightbulb aria-hidden="true" className="h-3.5 w-3.5" />
          Show Tips
          <ChevronDown aria-hidden="true" className={cn('h-3.5 w-3.5 transition-transform', showTips && 'rotate-180')} />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {showAnswer && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="mb-1.5 flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-cyan)]">
                  Sample Answer
                </p>
                <button
                  type="button"
                  onClick={handleCopyAnswer}
                  aria-label="Copy sample answer"
                  className="focus-ring flex items-center gap-1 rounded-md p-1 text-[var(--color-faint)] hover:bg-white/5 hover:text-[var(--color-ink)]"
                >
                  {answerCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
              <p className="whitespace-pre-line text-sm leading-relaxed text-[var(--color-muted)]">
                {question.sampleAnswer}
              </p>
            </div>
          </motion.div>
        )}
        {showTips && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-[var(--color-violet)]">Tips</p>
              <p className="whitespace-pre-line text-sm leading-relaxed text-[var(--color-muted)]">{question.tips}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
