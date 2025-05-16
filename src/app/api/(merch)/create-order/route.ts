import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { CartItemBase, CheckoutFormData } from '@/app/types/checkout';
import { getMerchItemById } from '@/library/firebase/firestore';
import { createOrder } from '@/library/firebase/serverApp';
import dotenv from 'dotenv';

dotenv.config();
const stripe = new Stripe(process.env.stripe_secret_key as string);

interface OrderRequestBody {
  shippingDetails: CheckoutFormData;
  items: CartItemBase[];
  paymentDetails: {
    paymentIntentId: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    const { shippingDetails, items, paymentDetails }: OrderRequestBody =
      await req.json();

    if (
      !shippingDetails ||
      !items ||
      !Array.isArray(items) ||
      !paymentDetails
    ) {
      return NextResponse.json(
        { error: 'Invalid order data' },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentDetails.paymentIntentId
    );
    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json(
        { error: 'Payment has not been completed' },
        { status: 400 }
      );
    }

    // Re-calculate server-side to ensure data integrity
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
            imageUrl: merchItem.imgrefs?.[0] || null,
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

    const paymentAmount = paymentIntent.amount / 100;

    if (Math.abs(paymentAmount - total) > 0.01) {
      console.error(
        `Payment amount mismatch: ${paymentAmount} vs calculated ${total}`
      );
      return NextResponse.json(
        { error: 'Payment amount does not match order total' },
        { status: 400 }
      );
    }

    const orderData = {
      createdAt: new Date(),
      shippingDetails,
      items: itemsData,
      payment: {
        id: paymentDetails.paymentIntentId,
        amount: total,
        status: paymentIntent.status,
      },
      pricing: {
        subtotal,
        tax,
        shipping,
        total,
      },
      status: 'processing',
    };
    const orderId = await createOrder(orderData);

    // TODO: Add fulfillment logic here with Gelato API

    return NextResponse.json({
      success: true,
      orderId,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to create order',
      },
      { status: 500 }
    );
  }
}
