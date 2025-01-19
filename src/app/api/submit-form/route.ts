import { NextRequest, NextResponse } from 'next/server';
import { addResponse } from '@/library/google/api';
import dotenv from 'dotenv';

dotenv.config();

export async function POST(req: NextRequest) {
  try {
    const { recaptchaToken, ...formData } = await req.json();
    const recaptchaSecretKey = process.env.recaptcha_secret_key;

    if (!recaptchaSecretKey) {
      return NextResponse.json(
        { error: 'Missing reCAPTCHA secret key in the server configuration' },
        { status: 500 }
      );
    }

    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: recaptchaSecretKey,
          response: recaptchaToken,
        }),
      }
    );
    const recaptchaResult = await recaptchaResponse.json();

    if (!recaptchaResult.success) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 400 }
      );
    }
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
