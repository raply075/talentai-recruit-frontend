import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import UploadForm from '../components/resume/UploadForm';
import { useResumeUpload } from '../hooks/useResume';
import { ROUTES } from '../utils/constants';

export default function UploadResume() {
  const { upload, progress, isUploading } = useResumeUpload();
  const navigate = useNavigate();

  const handleUpload = async (file: File) => {
    const resume = await upload(file);
    // Brief pause so the success animation in UploadForm is visible
    // before we navigate away. Purely presentational timing.
    await new Promise((resolve) => setTimeout(resolve, 900));
    navigate(ROUTES.RESUME_DETAIL(resume.id));
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 text-center">
          <h1 className="font-[var(--font-display)] text-2xl font-semibold">Upload Resume</h1>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            We&apos;ll analyze your resume and generate an ATS score in seconds.
          </p>
        </div>
        <UploadForm onUpload={handleUpload} isUploading={isUploading} progress={progress} />
      </div>
    </MainLayout>
  );
}
