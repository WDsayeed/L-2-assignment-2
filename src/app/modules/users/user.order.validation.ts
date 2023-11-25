import { z } from "zod";

const orderSchema = z.object({
        productName: z.string(),
        price: z.number(),
        quantity: z.number(),
});


const orderValidationSchema = z.object(
        {     
                orders: z.array(orderSchema).optional()
        }
)
export default orderValidationSchema;