// Product registry. To add a product: create `content/products/<id>/` (product.ts, pricing.ts,
// api.ts, releases.ts) and add it to this list. Routes, menus, the sitemap and the contact
// dialog's topic list are all generated from it.
import type { Product } from '../types';
import { customPortalSdb } from './custom-portal-sdb/product';
import { migrationTools } from './migration-tools/product';
import { workflow } from './workflow/product';

export const PRODUCTS: readonly Product[] = [workflow, customPortalSdb, migrationTools];

export const productById = (id: string): Product | undefined => PRODUCTS.find((p) => p.id === id);
