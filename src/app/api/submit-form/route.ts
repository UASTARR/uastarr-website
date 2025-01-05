import { NextRequest, NextResponse } from 'next/server';
import { addResponse } from '@/library/google/api';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const success = await addResponse(body);

    if (success) {
      return NextResponse.json(
        { message: 'Form submitted successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Failed to process the form submission' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
