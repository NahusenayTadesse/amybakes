import { db } from '$lib/server/db';
import {
	productCategories,
	products,
	prices,
	productImages,
	discounts
} from '$lib/server/db/schema';
import { eq, sql, min } from 'drizzle-orm';
import type { LayoutServerLoad } from './$types';

import { error } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ params }) => {
	const { id } = params;

	const result = await db
		.select({
			url: productImages.imageUrl
		})
		.from(productImages)
		.where(eq(productImages.productId, Number(id)));

	const images = result.map((img) => img.url);

	const product = await db
		.select({
			productId: products.id,
			productName: products.name,
			price: sql<number>`MIN(${prices.price}) * (1 - COALESCE(${discounts.amount}, 0) / 100)`,
			description: products.description,
			category: productCategories.name,
			image: products.featuredImage,
			discountPercentage: discounts.amount,
			discountName: discounts.name,
			discountDescription: discounts.description
		})
		.from(products)
		.leftJoin(productCategories, eq(productCategories.id, products.categoryId))
		.leftJoin(prices, eq(prices.productId, products.id))
		.leftJoin(discounts, eq(discounts.productId, products.id))
		.where(eq(products.id, Number(id)))
		.then((rows) => rows[0]);

	if (!product) {
		error(404, 'Product not found');
	}

	const priceList = await db
		.select({
			amount: sql<number>`CAST(${prices.amount} AS SIGNED)`,
			price: sql<number>`${prices.price} * (1 - COALESCE(${discounts.amount}, 0) / 100)`
		})
		.from(prices)
		.leftJoin(discounts, eq(discounts.productId, prices.productId))
		.where(eq(prices.productId, Number(id)));

	return {
		product,
		priceList,
		images,
		result
	};
};
