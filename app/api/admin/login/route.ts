import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      // Create response
      const response = NextResponse.json({ success: true });
      
      // Set secure HTTP-only cookie
      // In production, we should use a signed JWT, but for this simple setup,
      // a generic token prevents client-side extraction.
      response.cookies.set('geosolvix_admin_auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });
      
      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Invalid password' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
