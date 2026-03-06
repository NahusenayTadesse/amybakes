import { db } from '$lib/server/db';
import { products, productCategories, user, roles, prices } from '$lib/server/db/schema';
import { eq, min } from 'drizzle-orm';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const productList = await db
		.select({
			productId: products.id,
			productName: products.name,
			price: min(prices.price),
			amount: min(prices.amount),
			image: products.featuredImage,
			category: productCategories.name
		})
		.from(products)
		.leftJoin(productCategories, eq(productCategories.id, products.categoryId))
		// Join the prices table to access the price rows
		.leftJoin(prices, eq(prices.productId, products.id))
		.where(eq(products.isActive, true))
		// We must group by the product ID to ensure the min() function
		// calculates the lowest price per individual product
		.groupBy(products.id, productCategories.name);

	// 3. Return everything at once
	return {
		productList
	};
};
