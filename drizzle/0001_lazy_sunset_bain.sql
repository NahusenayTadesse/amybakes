ALTER TABLE `products` DROP FOREIGN KEY `products_supplier_id_product_suppliers_id_fk`;
--> statement-breakpoint
ALTER TABLE `products` DROP COLUMN `commission_amount`;--> statement-breakpoint
ALTER TABLE `products` DROP COLUMN `supplier_id`;