import { z } from 'zod';

const orderSchema = z.object({
  productName: z.string().optional(),
  price: z.number().optional(),
  quantity: z.number().optional(),
});

const userUpdateValidationSchema = z.object({
  userId: z.number().optional(),
  username: z.string().min(1, 'username must not be empty').optional(),
  password: z.string().min(8, 'password must be at least 8 characters long').optional(),
  fullName: z.object({
    firstName: z.string().min(1, 'firstname must not be empty').optional(),
    lastName: z.string().min(1, 'lastname must not be empty').optional(),
  }).optional(),
  age: z.number().positive('age must be a positive number').optional(),
  email: z.string().email('Invalid email format').optional(),
  isActive: z.boolean().optional(),
  hobbies: z.array(z.string()).optional(),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
  orders: z.array(orderSchema).optional(),
});

export default userUpdateValidationSchema;
