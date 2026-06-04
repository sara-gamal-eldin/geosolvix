import { Timestamp } from "firebase/firestore";

export type VisitorLog = {
  id: string;
  sessionId: string;
  userAgent: string;
  isNewVisitor: boolean;
  pathname: string;
  timestamp: Timestamp | null;
};

export type DashboardStats = {
  total: number;
  unique: number;
};

/**
 * Computes the total and unique visitors from a list of logs.
 * This is a pure function extracted for testability.
 */
export function computeStats(logs: VisitorLog[]): DashboardStats {
  if (!logs || logs.length === 0) {
    return { total: 0, unique: 0 };
  }

  const uniqueSessions = new Set<string>();
  
  for (const log of logs) {
    if (log.sessionId) {
      uniqueSessions.add(log.sessionId);
    }
  }

  return {
    total: logs.length,
    unique: uniqueSessions.size,
  };
}
