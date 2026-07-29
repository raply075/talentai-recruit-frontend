import { useCallback, useEffect, useState } from 'react';
import { resumeService } from '../services/resumeService';
import type { Resume, UploadProgressEvent } from '../types/resume';

export function useResumeList() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await resumeService.list();
      setResumes(data);
    } catch {
      setError('Could not load your resumes. Try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional initial fetch on mount
    refresh();
  }, [refresh]);

  const remove = useCallback(async (id: string) => {
    await resumeService.remove(id);
    setResumes((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return { resumes, isLoading, error, refresh, remove };
}

export function useResumeUpload() {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const upload = useCallback(async (file: File): Promise<Resume> => {
    setIsUploading(true);
    setProgress(0);
    try {
      const result = await resumeService.upload(file, (e: UploadProgressEvent) => {
        setProgress(Math.round((e.loaded / e.total) * 100));
      });
      return result;
    } finally {
      setIsUploading(false);
    }
  }, []);

  return { upload, progress, isUploading };
}
