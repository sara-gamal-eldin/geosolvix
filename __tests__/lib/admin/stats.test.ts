import { describe, it, expect } from 'vitest';
import { computeStats, VisitorLog } from '@/lib/admin/stats';
import { Timestamp } from 'firebase/firestore';

describe('computeStats', () => {
  it('returns zeros for empty data', () => {
    const stats = computeStats([]);
    expect(stats.total).toBe(0);
    expect(stats.unique).toBe(0);
  });

  it('computes total and unique correctly', () => {
    const logs: VisitorLog[] = [
      { id: '1', sessionId: 'sess-1', userAgent: '', isNewVisitor: true, pathname: '/', timestamp: null },
      { id: '2', sessionId: 'sess-1', userAgent: '', isNewVisitor: false, pathname: '/about', timestamp: null },
      { id: '3', sessionId: 'sess-2', userAgent: '', isNewVisitor: true, pathname: '/', timestamp: null },
    ];
    const stats = computeStats(logs);
    
    // 3 total visits
    expect(stats.total).toBe(3);
    // 2 unique sessions ('sess-1' and 'sess-2')
    expect(stats.unique).toBe(2);
  });

  it('handles missing sessionId gracefully', () => {
    const logs: VisitorLog[] = [
      { id: '1', sessionId: 'sess-1', userAgent: '', isNewVisitor: true, pathname: '/', timestamp: null },
      { id: '2', sessionId: '', userAgent: '', isNewVisitor: false, pathname: '/about', timestamp: null },
    ];
    const stats = computeStats(logs);
    
    expect(stats.total).toBe(2);
    // 1 valid session
    expect(stats.unique).toBe(1);
  });
});
