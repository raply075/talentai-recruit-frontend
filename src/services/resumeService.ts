import { fetchResumes, fetchResumeById, uploadResume, deleteResume } from '../api/resume';
import { mapResumeFromApi, mapResumeList } from '../utils/mappers';
import type { Resume, UploadProgressEvent } from '../types/resume';

/**
 * Mapping happens exclusively here. api/resume.ts returns raw
 * ApiResume/ApiResume[]; every function below returns the frontend
 * Resume domain model. Components never see ApiResume.
 */
export const resumeService = {
  async list(): Promise<Resume[]> {
    const apiResumes = await fetchResumes();
    return mapResumeList(apiResumes);
  },

  async get(id: string): Promise<Resume> {
    const apiResume = await fetchResumeById(id);
    return mapResumeFromApi(apiResume);
  },

  async upload(file: File, onProgress?: (e: UploadProgressEvent) => void): Promise<Resume> {
    const apiResume = await uploadResume(file, onProgress);
    return mapResumeFromApi(apiResume);
  },

  remove(id: string): Promise<void> {
    return deleteResume(id);
  },
};
