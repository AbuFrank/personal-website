import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // In a real app, you would:
    // 1. Validate the form data
    // 2. Send email via service like Nodemailer or Resend
    // 3. Store in database if needed

    console.log('Contact form submitted:', body);

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message' },
      { status: 500 }
    );
  }
}