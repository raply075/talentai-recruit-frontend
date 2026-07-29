import { useRef, useState, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Trash2, ImagePlus, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Card from '../common/Card';
import { getInitials } from '../../utils/helpers';

const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_AVATAR_SIZE_MB = 2;

interface AvatarCardProps {
  name: string;
  avatarUrl: string | null;
  onUpload: (file: File) => Promise<unknown>;
  onDelete: () => Promise<unknown>;
  isUploading: boolean;
  isDeleting: boolean;
  progress: number;
}

export default function AvatarCard({
  name,
  avatarUrl,
  onUpload,
  onDelete,
  isUploading,
  isDeleting,
  progress,
}: AvatarCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const busy = isUploading || isDeleting;

  const validateAndUpload = async (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error('Please choose a JPG, PNG, or WEBP image');
      return;
    }
    if (file.size > MAX_AVATAR_SIZE_MB * 1024 * 1024) {
      toast.error(`Image must be under ${MAX_AVATAR_SIZE_MB}MB`);
      return;
    }
    try {
      await onUpload(file);
      toast.success('Profile photo updated');
    } catch {
      toast.error('Upload failed. Please try again.');
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndUpload(file);
    e.target.value = '';
  };

  const handleDelete = async () => {
    try {
      await onDelete();
      toast.success('Profile photo removed');
    } catch {
      toast.error('Could not remove your photo. Try again.');
    }
  };

  return (
    <Card
      hover
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
      className="flex flex-col items-center text-center"
    >
      <h3 className="mb-5 self-start font-[var(--font-display)] text-base font-semibold">Profile photo</h3>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        className="hidden"
        onChange={handleFileChange}
      />

      <motion.div
        role="button"
        tabIndex={busy ? -1 : 0}
        aria-label={avatarUrl ? 'Change profile photo' : 'Upload profile photo'}
        aria-disabled={busy}
        onDragOver={(e) => {
          e.preventDefault();
          if (!busy) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (busy) return;
          const dropped = e.dataTransfer.files?.[0];
          if (dropped) validateAndUpload(dropped);
        }}
        onClick={() => !busy && inputRef.current?.click()}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !busy) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        animate={{
          borderColor: isDragging ? 'rgba(124,92,252,0.6)' : 'rgba(255,255,255,0.1)',
          scale: isDragging ? 1.02 : 1,
        }}
        whileHover={{ scale: busy ? 1 : 1.03 }}
        transition={{ duration: 0.2 }}
        className="focus-ring group relative flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]"
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-white/[0.04] to-white/[0.01] text-[var(--color-faint)]">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-cyan)] text-sm font-semibold text-white">
              {getInitials(name)}
            </span>
            <ImagePlus className="h-4 w-4" />
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {isUploading ? (
            <Loader2 className="h-5 w-5 animate-spin text-white" />
          ) : (
            <Camera className="h-5 w-5 text-white" />
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {isUploading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 w-full overflow-hidden"
          >
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[var(--color-violet)] to-[var(--color-cyan)]"
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
            <p className="mt-1.5 text-xs text-[var(--color-faint)]" aria-live="polite">Uploading… {progress}%</p>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-4 text-xs text-[var(--color-faint)]">JPG, PNG, or WEBP — up to {MAX_AVATAR_SIZE_MB}MB</p>

      <div className="mt-4 flex w-full gap-2">
        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          className="focus-ring flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl border border-[var(--color-border)] bg-white/[0.03] text-xs font-medium text-[var(--color-ink)] transition-colors hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Camera className="h-3.5 w-3.5" /> {avatarUrl ? 'Change' : 'Upload'}
        </motion.button>
        {avatarUrl && (
          <motion.button
            whileTap={{ scale: 0.97 }}
            disabled={busy}
            onClick={handleDelete}
            className="focus-ring flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/10 text-[var(--color-danger)] transition-colors hover:bg-[var(--color-danger)]/20 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Remove photo"
          >
            {isDeleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
          </motion.button>
        )}
      </div>
    </Card>
  );
}
