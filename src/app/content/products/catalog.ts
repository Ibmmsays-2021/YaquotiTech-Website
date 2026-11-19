// Light product list (identity only). Used everywhere a product is named or linked, so the full
// docs content in ./index.ts is only downloaded by pages that show it.
// To add a product: add its meta here AND its full config in ./index.ts.
import type { ProductMeta } from '../types';
import { customPortalSdbMeta } from './custom-portal-sdb/meta';
import { migrationToolsMeta } from './migration-tools/meta';
import { workflowMeta } from './workflow/meta';

export const PRODUCT_CATALOG: readonly ProductMeta[] = [
  workflowMeta,
  customPortalSdbMeta,
  migrationToolsMeta,
];

export const productMetaById = (id: string): ProductMeta | undefined =>
  PRODUCT_CATALOG.find((p) => p.id === id);
