import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { eq, and, sql } from 'drizzle-orm';

import { addUser, loginSchema } from '$lib/ZodSchema';
import { add } from './schema';
import { db } from '$lib/server/db';
import { orders, orderItems, products, customers } from '$lib/server/db/schema';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(add));

	return {
		form
	};
};

export const actions: Actions = {
	add: async ({ request }) => {
		const form = await superValidate(request, zod4(add));
		console.log(form);
		if (!form.valid) {
			return message(form, { type: 'error', text: 'Please check the form for Errors' });
		}

		const { name, email, phone, address, selectedProducts } = form.data;

		try {
			await db.transaction(async (tx) => {
				let customer: number;

				const excCustomer = await tx
					.select({ value: customers.id })
					.from(customers)
					.where(eq(customers.phone, phone))
					.then((rows) => rows[0]);

				if (excCustomer) {
					customer = excCustomer.value;

					await tx
						.update(customers)
						.set({ name, email, address })
						.where(eq(customers.id, customer));
				} else {
					const [newCustomer] = await tx
						.insert(customers)
						.values({ name, email, phone, address })
						.$returningId();
					customer = newCustomer.id;
				}

				const [orderId] = await tx
					.insert(orders)
					.values({ customerId: customer, status: 'pending' })
					.$returningId();

				if (selectedProducts.length) {
					await tx.insert(orderItems).values(
						selectedProducts.map((product) => ({
							orderId: orderId.id,
							productId: Number(product.product),
							amount: Number(product.amount),
							quantity: Number(product.quantity),
							price: Number(product.price)
						}))
					);
				}
			});

			return message(form, { type: 'success', text: 'Order Successfully Added' });
		} catch (err) {
			console.error(err);
			return message(
				form,
				{
					type: 'error',
					text: 'Error Adding Orders: ' + err?.message
				},
				{
					status: 500
				}
			);
		}
	}
};

function getPrice(list: Array<{ value: number; price: string }>, value: number): number {
	const item = list.find((i) => i.value === value);
	return item ? Number(item.price) : 0;
}
