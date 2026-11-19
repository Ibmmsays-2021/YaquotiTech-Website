// migration-tools: identity used by menus, footer, product rows and the contact dialog.
// TODO: real content — tagline and summary are placeholders. No logo yet (add `logo` here).
import type { ProductMeta } from '../../types';

export const migrationToolsMeta: ProductMeta = {
  id: 'migration-tools',
  icon: 'refresh',
  // Non-breaking spaces keep the product name on one line.
  name: { en: 'Migration Tools', ar: 'أدوات الترحيل' },
  tagline: {
    en: 'Move data out of legacy systems safely, with checks at every step.',
    ar: 'انقل البيانات من الأنظمة القديمة بأمان مع التحقق في كل خطوة.',
  },
  summary: {
    en: 'Plan, run and verify data migrations from old databases and spreadsheets — with progress tracking, validation reports and a way back if something goes wrong.',
    ar: 'خطّط لترحيل البيانات من قواعد البيانات والجداول القديمة ونفّذه وتحقق منه — مع تتبع التقدم وتقارير التحقق وإمكانية التراجع عند الحاجة.',
  },
};
