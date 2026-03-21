import { db } from '$lib/server/db';
import { products, productCategories, prices, discounts } from '$lib/server/db/schema';
import { eq, inArray } from 'drizzle-orm';
import type { PageServerLoad, Actions } from '../$types';
import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { schema } from './schema';
export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(schema));
	// First, get products
	const productsData = await db
		.select({
			id: products.id,
			name: products.name,
			image: products.featuredImage,
			discountName: discounts.name,
			dicountDescription: discounts.description,
			discountPercentage: discounts.amount,
			category: productCategories.name,
			description: products.description
		})
		.from(products)
		.leftJoin(discounts, eq(discounts.productId, products.id))
		.leftJoin(productCategories, eq(productCategories.id, products.categoryId));

	// Then, get prices for those products
	const productIds = productsData.map((p) => p.id);
	const pricesData = await db.select().from(prices);

	// Then filter in memory

	const relevantPrices = pricesData.filter((p) => productIds.includes(p.productId));

	// Merge in application code
	const productList = productsData.map((p) => ({
		...p,
		priceList: relevantPrices
			.filter((price) => price.productId === p.id)
			.map((price) => ({
				amount: price.amount + ' Pieces',
				price: 'ETB ' + price.price
			}))
	}));

	return {
		productList,
		form
	};
};

export const actions: Actions = {
	addDiscount: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(schema));

		if (!form.valid) {
			// Stay on the same page and set a flash message
			return message(form, { type: 'error', text: 'Please check your form data.' });
		}

		const { ids, name, description, amount } = form.data;

		try {
			await db.transaction(async (tx) => {
				// 1. Upload images first (usually done before the DB transaction starts
				// to avoid keeping a DB connection open during slow network I/O)

				await tx.delete(discounts).where(inArray(discounts.productId, ids)); // Clean and direct
				if (amount > 0) {
					const priceRecords = ids.map((p) => ({
						productId: p,
						name: name,
						description: description,
						amount: amount,
						createdBy: locals?.user?.id
					}));
					await tx.insert(discounts).values(priceRecords);
				}
			});

			// Stay on the same page and set a flash message

			return message(form, { type: 'success', text: 'New Discount Successfully Added' });
		} catch (err) {
			return message(
				form,
				{
					type: 'error',
					text: 'An error occurred while adding the Discount.' + err?.message
				},
				{ status: 500 }
			);
		}
	}
};
