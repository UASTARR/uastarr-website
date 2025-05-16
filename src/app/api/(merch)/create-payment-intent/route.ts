import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { CartItemBase } from '@/app/types/checkout';
import { getMerchItemById } from '@/library/firebase/firestore';
import dotenv from 'dotenv';
import { handleRecaptchaVerification } from '../../utils/recaptcha';

dotenv.config();
const stripe = new Stripe(process.env.stripe_secret_key as string);

export async function POST(req: NextRequest) {
  try {
    const recaptchaError = await handleRecaptchaVerification(
      req.clone() as Request
    );
    if (recaptchaError) {
      return recaptchaError;
    }
    const { items, currency = 'cad' } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Invalid cart items' },
        { status: 400 }
      );
    }

    // Fetch all items from Firestore to get accurate pricing
    const itemsData = await Promise.all(
      items.map(async (item: CartItemBase) => {
        try {
          const merchItem = await getMerchItemById(item.id);

          if (merchItem.sizes && !merchItem.sizes.includes(item.size)) {
            throw new Error(
              `Size ${item.size} is not valid for ${merchItem.name}`
            );
          }

          return {
            id: item.id,
            name: merchItem.name,
            price: merchItem.price,
            quantity: item.quantity,
            size: item.size,
          };
        } catch (error) {
          throw new Error(
            `Error retrieving item ${item.id}: ${
              error instanceof Error ? error.message : 'Unknown error'
            }`
          );
        }
      })
    );

    const subtotal = itemsData.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const shipping = 0; // Free shipping for now
    const tax = subtotal * 0.05; // 5% GST for Alberta
    const total = subtotal + shipping + tax;

    const amountInCents = Math.round(total * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: currency.toLowerCase(),
      metadata: {
        items: JSON.stringify(
          itemsData.map((item) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            size: item.size,
            price: item.price,
          }))
        ),
        subtotal: subtotal.toString(),
        tax: tax.toString(),
        shipping: shipping.toString(),
        total: total.toString(),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: total,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to create payment intent',
      },
      { status: 500 }
    );
  }
}
