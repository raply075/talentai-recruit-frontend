export interface DashboardStats {
  totalResumes: number;
  averageAtsScore: number;
  matchedSkillsCount: number;
  careerLevel: string;
  scoreTrend: number; // percentage change
}

export interface ScoreHistoryPoint {
  label: string;
  score: number;
}
