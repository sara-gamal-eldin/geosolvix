import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import VisitorTracker from '@/components/VisitorTracker';

// Mock the Firebase module using vitest
vi.mock('firebase/firestore', () => {
  return {
    collection: vi.fn(),
    addDoc: vi.fn().mockResolvedValue({ id: 'mock-id' }),
    serverTimestamp: vi.fn(),
    doc: vi.fn(),
    setDoc: vi.fn().mockResolvedValue(undefined),
    increment: vi.fn(),
  };
});

// Mock the localized firebase DB
vi.mock('@/lib/firebase', () => ({
  db: {},
}));

describe('VisitorTracker', () => {
  let mockGetItem: any;
  let mockSetItem: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetItem = vi.spyOn(Storage.prototype, 'getItem');
    mockSetItem = vi.spyOn(Storage.prototype, 'setItem');
    
    // Reset window path
    Object.defineProperty(window, 'location', {
      value: { pathname: '/' },
      writable: true
    });
  });

  afterEach(() => {
    mockGetItem.mockRestore();
    mockSetItem.mockRestore();
  });

  it('generates a new session ID if none exists', async () => {
    mockGetItem.mockReturnValue(null);
    
    render(<VisitorTracker />);
    
    // Wait for async useEffect
    await new Promise(process.nextTick);
    
    expect(mockGetItem).toHaveBeenCalledWith('geosolvix_visitor_session_id');
    expect(mockSetItem).toHaveBeenCalledWith('geosolvix_visitor_session_id', expect.any(String));
  });

  it('reuses existing session ID for returning visitors', async () => {
    mockGetItem.mockReturnValue('existing-session-id');
    
    render(<VisitorTracker />);
    
    await new Promise(process.nextTick);
    
    expect(mockGetItem).toHaveBeenCalledWith('geosolvix_visitor_session_id');
    expect(mockSetItem).not.toHaveBeenCalled();
  });

  it('does not track visits to /admin paths', async () => {
    Object.defineProperty(window, 'location', {
      value: { pathname: '/admin/dashboard' },
      writable: true
    });

    render(<VisitorTracker />);
    
    await new Promise(process.nextTick);
    
    expect(mockGetItem).not.toHaveBeenCalled(); // Early return
  });
});
