import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminLoginForm from '@/components/admin/AdminLoginForm';

// Mock fetch
global.fetch = vi.fn();

describe('AdminLoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form correctly', () => {
    render(<AdminLoginForm onSuccess={() => {}} />);
    expect(screen.getByText('Admin Access')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeDisabled(); // Disabled when empty
  });

  it('calls onSuccess when login succeeds', async () => {
    const onSuccess = vi.fn();
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<AdminLoginForm onSuccess={onSuccess} />);
    
    const input = screen.getByPlaceholderText('Password');
    fireEvent.change(input, { target: { value: 'correct-password' } });
    
    const button = screen.getByRole('button', { name: 'Sign In' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it('shows error message when login fails', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ success: false, message: 'Invalid password' }),
    });

    render(<AdminLoginForm onSuccess={() => {}} />);
    
    const input = screen.getByPlaceholderText('Password');
    fireEvent.change(input, { target: { value: 'wrong-password' } });
    
    const button = screen.getByRole('button', { name: 'Sign In' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Invalid password')).toBeInTheDocument();
    });
  });
});
