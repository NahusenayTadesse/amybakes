import { db } from '$lib/server/db';
import { products, productCategories, prices, discounts, orderItems } from '$lib/server/db/schema';
import { eq, min, sql, desc, sum, count } from 'drizzle-orm';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const bestSelling = await db
		.select({
			id: products.id
		})
		.from(products)
		// Join products to orderItems, not orders
		.innerJoin(orderItems, eq(orderItems.productId, products.id))
		.groupBy(products.id)
		.orderBy(desc(sum(orderItems.quantity)))
		.limit(10);

	const discountedProducts = await db
		.select({
			id: products.id,
			name: discounts.name,
			description: discounts.description
		})
		.from(discounts)
		.leftJoin(products, eq(discounts.productId, products.id))
		.groupBy(products.id);

	const productsData = await db
		.select({
			productId: products.id,
			productName: products.name,
			price: sql<number>`MIN(${prices.price}) * (1 - COALESCE(${discounts.amount}, 0) / 100)`,
			amount: min(prices.amount),
			image: products.featuredImage,
			category: productCategories.name,
			discountPercentage: discounts.amount,
			discountName: discounts.name,
			discountDescription: discounts.description
		})
		.from(products)
		.leftJoin(productCategories, eq(productCategories.id, products.categoryId))
		.leftJoin(prices, eq(prices.productId, products.id))
		.leftJoin(discounts, eq(discounts.productId, products.id))
		.where(eq(products.isActive, true))
		.groupBy(products.id, productCategories.name);

	const allPrices = await db.select().from(prices);

	// Then filter in memory

	const productList = productsData.map((p) => ({
		...p,
		priceList: allPrices
			.filter((price) => price.productId === p.productId)
			.map((price) => {
				// Ensure discount is a number, default to 0 if null/undefined
				const discount = p.discountPercentage ?? 0;

				return {
					amount: price.amount,
					// Original price if discount is 0, otherwise the reduced price
					price: Number(price.price) * (1 - Number(discount) / 100)
				};
			})
	}));

	// 3. Return everything at once
	return {
		productList,
		bestSelling,
		discountedProducts
	};
};
