// workflow: identity used by menus, footer, product rows and the contact dialog.
// Kept separate from product.ts so every page doesn't download the full docs content.
import type { ProductMeta } from '../../types';

export const workflowMeta: ProductMeta = {
  id: 'workflow',
  icon: 'workflow',
  name: {
    en: 'Yaquoti Workflow',
    ar: 'ياقوتي Workflow',
  },
  tagline: {
    en: 'Design, run and measure every business process in one platform.',
    ar: 'صمّم كل عملية عمل ونفّذها وقِس أداءها في منصة واحدة.',
  },
  summary: {
    en: 'A configurable platform for requests, approvals and service processes — with SLAs, dashboards, a customer portal and full audit history.',
    ar: 'منصة قابلة للإعداد للطلبات والموافقات وعمليات الخدمة — مع اتفاقيات مستوى الخدمة ولوحات المعلومات وبوابة العملاء وسجل تدقيق كامل.',
  },
  logo: {
    src: 'assets/logos/yaquoti-workflow.png',
    src2x: 'assets/logos/yaquoti-workflow@2x.png',
    width: 132,
    height: 36,
  },
};
