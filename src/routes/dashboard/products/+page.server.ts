import { db } from '$lib/server/db';
import { products, productCategories, productSuppliers, prices } from '$lib/server/db/schema';
import { eq, sql, min } from 'drizzle-orm';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async () => {
	const productList = await db
		.select({
			productId: products.id,
			name: products.name,
			// We select the min price from the prices table
			price: min(prices.price),
			image: products.featuredImage,
			category: productCategories.name,
			description: products.description
		})
		.from(products)
		.leftJoin(productCategories, eq(productCategories.id, products.categoryId))
		// Join the prices table to access the price rows
		.leftJoin(prices, eq(prices.productId, products.id))
		.where(eq(products.isActive, true))
		// We must group by the product ID to ensure the min() function
		// calculates the lowest price per individual product
		.groupBy(products.id, productCategories.name);

	return {
		productList
	};
};
