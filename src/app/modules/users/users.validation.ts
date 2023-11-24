import { z } from "zod";

const orderSchema = z.object({
        productName: z.string(),
        price: z.number(),
        quantity: z.number()
})

export const userValidationSchema = z.object({
    
        userId: z.number(),
        username: z.string().min(1, "username must not be empty"),
        password: z.string().min(8, "password must be at least 8 characters long"),
        fullName: z.object({
        firstName:z.string().min(1, "firstname must not be empty"),
        lastName:z.string().min(1, "lastname must not be empty")
        }),
        age: z.number().positive('age must be a positive number'),
        email: z.string().email('Invalid email format'),
        isActive: z.boolean(),
        hobbies: z.array(z.string()),
        address: z.object({
        street:z.string(),
        city:z.string(),
        country:z.string(),
        }),
        orders:z.array(orderSchema).optional(),
 
})

export default userValidationSchema;