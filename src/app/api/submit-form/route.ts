import { NextRequest, NextResponse } from 'next/server';
import { addResponse } from '@/library/google/api';
import dotenv from 'dotenv';
import { handleRecaptchaVerification } from '../utils/recaptcha';

dotenv.config();

export async function POST(req: NextRequest) {
  try {
    const recaptchaError = await handleRecaptchaVerification(
      req.clone() as Request
    );
    if (recaptchaError) {
      return recaptchaError;
    }
    const { recaptchaToken, ...formData } = await req.json();
    const success = await addResponse(formData);

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
