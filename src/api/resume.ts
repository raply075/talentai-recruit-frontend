import apiClient, { type ApiEnvelope } from "./axios";
import type { ApiResume, StructuredResume } from "../types/resume";
import type { UploadProgressEvent } from "../types/resume";

interface UploadResumeResponse {
  resume: ApiResume;
  analysis: unknown;
  structured_resume: StructuredResume;
}

export async function fetchResumes(): Promise<ApiResume[]> {
  const response = await apiClient.get<ApiEnvelope<ApiResume[]>>("/resumes");
  return response.data.data;
}

export async function fetchResumeById(id: string): Promise<ApiResume> {
  const response = await apiClient.get<ApiEnvelope<ApiResume>>(
    `/resumes/${id}`,
  );

  return response.data.data;
}

export async function uploadResume(
  file: File,
  onProgress?: (event: UploadProgressEvent) => void,
): Promise<ApiResume> {
  const formData = new FormData();

  formData.append("resume", file);

  const response = await apiClient.post<ApiEnvelope<UploadResumeResponse>>(
    "/resumes/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (evt) => {
        if (onProgress && evt.total) {
          onProgress({
            loaded: evt.loaded,
            total: evt.total,
          });
        }
      },
    },
  );

  return {
    ...response.data.data.resume,
    structured_resume: response.data.data.structured_resume,
  };
}

export async function deleteResume(id: string): Promise<void> {
  await apiClient.delete<ApiEnvelope<null>>(`/resumes/${id}`);
}
