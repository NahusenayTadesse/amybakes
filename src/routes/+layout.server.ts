import { db } from '$lib/server/db';
import {
	products,
	productCategories,
	user,
	roles,
	prices,
	orders,
	orderItems
} from '$lib/server/db/schema';
import { eq, min, desc, sum, count } from 'drizzle-orm';
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

	const productsData = await db
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

	const allPrices = await db.select().from(prices);

	// Then filter in memory

	const productList = productsData.map((p) => ({
		...p,
		priceList: allPrices
			.filter((price) => price.productId === p.productId) // use productId here too
			.map((price) => ({
				amount: price.amount,
				price: price.price
			}))
	}));

	// 3. Return everything at once
	return {
		productList,
		bestSelling
	};
};
