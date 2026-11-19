import { PRODUCT_CATALOG } from '../../content/products/catalog';
import { SERVICES } from '../../content/services';
import type { Text } from '../../content/types';
import { ui } from '../../content/ui';

export interface ContactTopic {
  readonly id: string;
  readonly label: Text;
}

export const OTHER_TOPIC = 'other';

/** Products, then services, then "Something else" — generated, so new products appear automatically. */
export const CONTACT_TOPICS: readonly ContactTopic[] = [
  ...PRODUCT_CATALOG.map((p) => ({ id: p.id, label: p.name })),
  ...SERVICES.map((s) => ({ id: s.id, label: s.title })),
  { id: OTHER_TOPIC, label: ui.contact.other },
];

export const isContactTopic = (id: string | null | undefined): id is string =>
  !!id && CONTACT_TOPICS.some((t) => t.id === id);
