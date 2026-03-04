import { z } from 'zod/v4';
const ethiopianPhoneRegex = /^(?:\+251|251|0)?([79]\d{8})$/;

export const add = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.email('Invalid email').optional(),
	phone: z
		.string()
		.trim()
		.regex(ethiopianPhoneRegex, 'Invalid Ethiopian phone number')
		// Optional: Transform the input to a standardized format (e.g., +251...)
		.transform((val) => {
			const match = val.match(ethiopianPhoneRegex);
			const mainNumber = match?.[1];
			return `+251${mainNumber}`;
		}),

	selectedProducts: z
		.object({
			product: z.number({ message: 'Product is required' }).int().positive('Product is required'),
			quantity: z.number().int().positive('Number of products must be at least 1')
		})
		.array()
});
