import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Verifies a reCAPTCHA token with Google's API
 * @param token The reCAPTCHA token to verify
 * @returns A promise that resolves to a boolean indicating if verification was successful
 */
export async function verifyRecaptcha(token: string): Promise<boolean> {
  const recaptchaSecretKey = process.env.recaptcha_secret_key;

  if (!recaptchaSecretKey) {
    throw new Error('Missing reCAPTCHA secret key in the server configuration');
  }

  try {
    const response = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: recaptchaSecretKey,
          response: token,
        }),
      }
    );
    if (!response.ok) {
      throw new Error(
        `reCAPTCHA API response: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

/**
 * Middleware to handle reCAPTCHA verification in API routes
 * @param req The request object containing the reCAPTCHA token
 * @param tokenFieldName The field name where the token is stored in the request body (default: 'recaptchaToken')
 * @returns Either an error response if verification fails, or null if verification succeeds
 */
export async function handleRecaptchaVerification(
  req: Request,
  tokenFieldName: string = 'recaptchaToken'
): Promise<NextResponse | null> {
  try {
    const body = await req.json();
    const token = body[tokenFieldName];

    if (!token) {
      return NextResponse.json(
        { error: 'reCAPTCHA token is required' },
        { status: 400 }
      );
    }
    const isValid = await verifyRecaptcha(token);

    if (!isValid) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 400 }
      );
    }
    return null;
  } catch (error) {
    console.error('Error in reCAPTCHA verification:', error);
    return NextResponse.json(
      { error: 'reCAPTCHA verification failed due to an error' },
      { status: 500 }
    );
  }
}
