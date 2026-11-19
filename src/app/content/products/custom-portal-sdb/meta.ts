// custom-portal-sdb: identity used by menus, footer, product rows and the contact dialog.
// TODO: real content — tagline and summary are the old site's placeholder SDB copy. No logo yet.
// Kept separate from product.ts so every page doesn't download the full docs content.
import type { ProductMeta } from '../../types';

export const customPortalSdbMeta: ProductMeta = {
  id: 'custom-portal-sdb',
  icon: 'database',
  name: {
    // Non-breaking space keeps "SDB" with the rest of the name.
    en: 'Custom Portal SDB',
    ar: 'البوابة المخصصة SDB',
  },
  tagline: {
    en: 'One dependable data layer for your applications, reports and integrations.',
    ar: 'طبقة بيانات موثوقة واحدة لتطبيقاتك وتقاريرك وتكاملاتك.',
  },
  summary: {
    en: 'A managed data platform that models your data, connects your sources, exposes secure APIs and keeps everything backed up, monitored and auditable.',
    ar: 'منصة بيانات مُدارة تنمذج بياناتك وتربط مصادرك وتوفر واجهات آمنة وتُبقي كل شيء محميًا بنسخ احتياطية ومراقبًا وقابلًا للتدقيق.',
  },
};
