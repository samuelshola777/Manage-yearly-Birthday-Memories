
import { z } from 'zod';

export const registerAppUserSchema = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    phone_number: z.string().min(1, "Phone number is required"),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    profile_picture: z.string().optional(),
    date_of_birth: z.date().optional(),
  });

export const updateAppUserSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phoneNumber: z.string().optional(),
    image: z.string().optional(),
    dateOfBirth: z.date().optional(),
  });
  
export const celebrateFriendSchema = z.object({
    contactMethod: z.enum(['email', 'phone']),
    contact: z.string(),
    message: z.string().optional(),
    mediaType: z.enum(['text', 'voice', 'image', 'video']).optional(),
    media: z.string().optional(),
  });

  export type RegisterAppUserSchema = z.infer<typeof registerAppUserSchema>;
  export type UpdateAppUserSchema = z.infer<typeof updateAppUserSchema>;
  export type CelebrateFriendSchema = z.infer<typeof celebrateFriendSchema>;