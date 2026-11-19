import type { Text } from '../../../content/types';
import { ui } from '../../../content/ui';

/** The product-site navigation, shared by ProductHeader and MobileNav. `path` is relative to /systems/:id. */
export const productNavItems: readonly { readonly path: string; readonly label: Text }[] = [
  { path: '', label: ui.productNav.home },
  { path: 'docs', label: ui.productNav.docs },
  { path: 'use-cases', label: ui.productNav.useCases },
  { path: 'upcoming', label: ui.productNav.upcoming },
  { path: 'pricing', label: ui.productNav.pricing },
  { path: 'apis', label: ui.productNav.apis },
  { path: 'release-notes', label: ui.productNav.releaseNotes },
];
