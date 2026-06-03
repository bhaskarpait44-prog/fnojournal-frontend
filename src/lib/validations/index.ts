import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const signupSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms of service',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const tradeSchema = z.object({
  underlying: z.string().min(1, 'Underlying symbol is required'),
  instrument_type: z.enum(['CE', 'PE', 'FUT']),
  strike_price: z.number().nullable().optional(),
  expiry_date: z.string().min(1, 'Expiry date is required'),
  action: z.enum(['BUY', 'SELL']),
  entry_datetime: z.string().min(1, 'Entry time is required'),
  exit_datetime: z.string().min(1, 'Exit time is required'),
  entry_price: z.number().positive('Entry price must be positive'),
  exit_price: z.number().positive('Exit price must be positive'),
  lots: z.number().int().positive('Lots must be at least 1'),
  lot_size: z.number().int().positive(),
  brokerage: z.number().min(0).default(0),
  stt: z.number().min(0).default(0),
  exchange_charges: z.number().min(0).default(0),
  gst: z.number().min(0).default(0),
  sebi_charges: z.number().min(0).default(0),
  strategy_tag: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
export type TradeFormValues = z.infer<typeof tradeSchema>;
