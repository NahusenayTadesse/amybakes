import { auth } from '$lib/server/auth';
import { redirect } from 'sveltekit-flash-message/server';

import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { orders, orderItems, products, transactions } from '$lib/server/db/schema';
import { eq, gte, and, sql } from 'drizzle-orm';
export const load: PageServerLoad = async () => {
	const salesReport = await db
		.select({
			orderId: orders.id,
			orderStatus: orders.status,
			productName: products.name,
			quantityPurchased: orderItems.quantity,
			unitPrice: orderItems.price,
			lineTotal: orderItems.amount, // Based on your schema's 'amount' field
			totalPaid: transactions.amount,
			paymentStatus: transactions.paymentStatus,
			receipt: transactions.recieptLink
		})
		.from(orders)
		.innerJoin(orderItems, eq(orders.id, orderItems.orderId))
		.innerJoin(products, eq(orderItems.productId, products.id))
		.leftJoin(transactions, eq(orders.transactionId, transactions.id))
		.where(eq(orders.createdAt, new Date()));

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const dailyStats = await db
		.select({
			totalOrders: sql<number>`count(distinct ${orders.id})`,
			totalItemsSold: sql<number>`coalesce(sum(${orderItems.quantity}), 0)`,
			totalRevenue: sql<number>`coalesce(sum(${orderItems.price} * ${orderItems.quantity}), 0)`,
			averageOrderValue: sql<number>`
      coalesce(
        sum(${orderItems.price} * ${orderItems.quantity})
        / nullif(count(distinct ${orders.id}), 0),
        0
      )
    `,
			totalPaymentsCollected: sql<number>`
      coalesce(
        sum(
          case
            when ${transactions.paymentStatus} in ('paid','partially_paid','overpaid')
            then ${transactions.amount}
            else 0
          end
        ),
        0
      )
    `
		})
		.from(orders)
		.leftJoin(orderItems, eq(orders.id, orderItems.orderId))
		.leftJoin(transactions, eq(orders.transactionId, transactions.id))
		.where(
			and(
				eq(orders.status, 'delivered'),
				sql`${orders.createdAt} >= CURRENT_DATE()`,
				sql`${orders.createdAt} < CURRENT_DATE() + INTERVAL 1 DAY`
			)
		)
		.then((rows) => rows[0]);
	return {
		salesReport,
		dailyStats
	};
};

export const actions: Actions = {
	logout: async (event) => {
		await auth.api.signOut({
			headers: event.request.headers
		});
		redirect('/login', { type: 'success', message: 'Logout Successful' }, event.cookies);
	}
};
