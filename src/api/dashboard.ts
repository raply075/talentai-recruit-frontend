import apiClient from './axios';
import type { DashboardStats, ScoreHistoryPoint } from '../types/dashboard';

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const { data } = await apiClient.get<DashboardStats>('/dashboard/stats');
  return data;
}

export async function fetchScoreHistory(): Promise<ScoreHistoryPoint[]> {
  const { data } = await apiClient.get<ScoreHistoryPoint[]>('/dashboard/score-history');
  return data;
}
