import { useCallback, useRef, useState, type DragEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, X, CheckCircle2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../common/Button';
import { formatFileSize } from '../../utils/helpers';
import { ACCEPTED_RESUME_TYPES, MAX_UPLOAD_SIZE_MB } from '../../utils/constants';

interface UploadFormProps {
  onUpload: (file: File) => Promise<void>;
  isUploading: boolean;
  progress: number;
}

export default function UploadForm({ onUpload, isUploading, progress }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateAndSet = useCallback((candidate: File) => {
    setErrorMessage(null);
    const ext = `.${candidate.name.split('.').pop()?.toLowerCase()}`;
    if (!ACCEPTED_RESUME_TYPES.includes(ext)) {
      toast.error('Please upload a PDF or Word document');
      return;
    }
    if (candidate.size > MAX_UPLOAD_SIZE_MB * 1024 * 1024) {
      toast.error(`File must be under ${MAX_UPLOAD_SIZE_MB}MB`);
      return;
    }
    setFile(candidate);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const dropped = e.dataTransfer.files?.[0];
      if (dropped) validateAndSet(dropped);
    },
    [validateAndSet]
  );

  const handleSubmit = async () => {
    if (!file) return;
    setErrorMessage(null);
    try {
      await onUpload(file);
      setIsSuccess(true);
      toast.success('Resume uploaded and analyzed');
    } catch {
      setErrorMessage('Upload failed. Please check your file and try again.');
      toast.error('Upload failed. Please try again.');
    }
  };

  const resetFile = () => {
    setFile(null);
    setErrorMessage(null);
  };

  return (
    <div className="flex flex-col gap-5">
      <motion.div
        role="button"
        tabIndex={isUploading || isSuccess ? -1 : 0}
        aria-label="Upload resume — drag and drop a file here, or press Enter to browse"
        aria-disabled={isUploading || isSuccess}
        onDragOver={(e) => {
          e.preventDefault();
          if (!isUploading && !isSuccess) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={isUploading || isSuccess ? undefined : handleDrop}
        onClick={() => {
          if (!isUploading && !isSuccess) inputRef.current?.click();
        }}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !isUploading && !isSuccess) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        animate={{
          borderColor: isDragging ? 'rgba(124,92,252,0.6)' : 'rgba(255,255,255,0.1)',
          scale: isDragging ? 1.01 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="focus-ring glass flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed px-6 py-16 text-center transition-colors hover:border-white/20"
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_RESUME_TYPES.join(',')}
          className="hidden"
          onChange={(e) => {
            const selected = e.target.files?.[0];
            if (selected) validateAndSet(selected);
          }}
        />
        <motion.div
          animate={{ y: isDragging ? -4 : 0 }}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-violet)]/20 to-[var(--color-cyan)]/10"
        >
          <UploadCloud className="h-6 w-6 text-[var(--color-cyan)]" />
        </motion.div>
        <div>
          <p className="font-medium">Drag &amp; drop your resume</p>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            or click to browse — PDF, DOC, DOCX up to {MAX_UPLOAD_SIZE_MB}MB
          </p>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {file && (
          <motion.div
            key="file-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="glass overflow-hidden rounded-2xl p-4"
          >
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="flex flex-col items-center gap-2 py-2 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.05 }}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-success)]/15"
                  >
                    <CheckCircle2 className="h-6 w-6 text-[var(--color-success)]" />
                  </motion.div>
                  <p className="text-sm font-medium">Analysis complete</p>
                  <p className="text-xs text-[var(--color-faint)]">Taking you to your resume…</p>
                </motion.div>
              ) : (
                <motion.div key="details" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04]">
                      <FileText className="h-4.5 w-4.5 text-[var(--color-muted)]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-[var(--color-faint)]">{formatFileSize(file.size)}</p>
                    </div>
                    {!isUploading && (
                      <button
                        onClick={resetFile}
                        aria-label="Remove file"
                        className="focus-ring flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-faint)] hover:bg-white/5 hover:text-[var(--color-ink)]"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {isUploading && (
                    <div className="mt-4">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-[var(--color-violet)] to-[var(--color-cyan)]"
                          animate={{ width: `${progress}%` }}
                          transition={{ ease: 'easeOut' }}
                        />
                      </div>
                      <p className="mt-1.5 text-right text-xs text-[var(--color-faint)]" aria-live="polite">
                        {progress < 100 ? `Uploading… ${progress}%` : 'Analyzing with AI…'}
                      </p>
                    </div>
                  )}

                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 flex items-start gap-2 rounded-xl border border-[var(--color-danger)]/25 bg-[var(--color-danger)]/10 p-3"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-danger)]" />
                      <p className="text-xs text-[var(--color-danger)]">{errorMessage}</p>
                    </motion.div>
                  )}

                  {!isUploading && (
                    <Button className="mt-4" fullWidth onClick={handleSubmit}>
                      Analyze Resume
                    </Button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
