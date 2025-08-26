import { describe, it, expect } from 'vitest';
import { z } from 'zod';

const baseSchema = z.object({
  role: z.enum(['Buyer', 'Seller']),
  zip: z.string().min(3).max(10),
  timeline: z.string().min(2),
  budget: z.string().min(1),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  consent: z.literal(true),
});

describe('Booking validation', () => {
  it('validates a Buyer flow', () => {
    const result = baseSchema.safeParse({
      role: 'Buyer',
      zip: '30309',
      timeline: '0-3 months',
      budget: '800k',
      name: 'Jordan',
      email: 'jordan@example.com',
      phone: '4045550000',
      consent: true,
    });
    expect(result.success).toBe(true);
  });

  it('fails without consent', () => {
    const result = baseSchema.safeParse({
      role: 'Seller',
      zip: '30309',
      timeline: '0-3 months',
      budget: '1.2m',
      name: 'Sam',
      email: 'sam@example.com',
      phone: '4045550000',
      consent: false,
    });
    expect(result.success).toBe(false);
  });
});


