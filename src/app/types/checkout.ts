import { z } from 'zod';

export const checkoutSchema = z.object({
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),

  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  address: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  province: z.string().min(1, 'Province is required'),
  postalCode: z.string().min(5, 'Valid postal code is required'),
  country: z.string().min(1, 'Country is required'),

  notes: z.string().optional(),

  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the terms and conditions' }),
  }),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export interface CartItemBase {
  id: string;
  quantity: number;
  size: string;
}

export interface CartItem extends CartItemBase {
  name: string;
  price: number;
}
