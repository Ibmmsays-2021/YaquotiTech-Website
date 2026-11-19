// TODO: real release notes — placeholder versions, dates and notes.
import type { Release } from '../../types';

export const releases: readonly Release[] = [
  {
    version: '4.2.0',
    date: '2026-10-28',
    title: { en: 'Faster dashboards', ar: 'لوحات معلومات أسرع' },
    notes: [
      {
        tag: 'new',
        text: { en: 'Saved views on request lists.', ar: 'طرق عرض محفوظة لقوائم الطلبات.' },
      },
      {
        tag: 'improved',
        text: {
          en: 'Dashboards load up to twice as fast.',
          ar: 'تُحمَّل لوحات المعلومات بسرعة تصل إلى الضعف.',
        },
      },
      {
        tag: 'fixed',
        text: {
          en: 'SLA timers now pause correctly on holidays.',
          ar: 'تتوقف مؤقتات اتفاقيات الخدمة الآن بشكل صحيح في العطلات.',
        },
      },
    ],
  },
  {
    version: '4.1.0',
    date: '2026-09-15',
    title: { en: 'Parallel approvals', ar: 'الموافقات المتوازية' },
    notes: [
      {
        tag: 'new',
        text: {
          en: 'Steps can wait for several approvers at once.',
          ar: 'يمكن للخطوة انتظار عدة معتمدين في الوقت نفسه.',
        },
      },
      {
        tag: 'improved',
        text: {
          en: 'Clearer email notifications in Arabic.',
          ar: 'إشعارات بريد أوضح باللغة العربية.',
        },
      },
    ],
  },
  {
    version: '4.0.0',
    date: '2026-07-01',
    title: { en: 'API v1', ar: 'الإصدار الأول من الواجهة البرمجية' },
    notes: [
      {
        tag: 'breaking',
        text: {
          en: 'Legacy SOAP endpoints removed; use the REST API.',
          ar: 'أُزيلت نقاط SOAP القديمة؛ استخدم واجهة REST.',
        },
      },
      { tag: 'new', text: { en: 'REST API with API keys.', ar: 'واجهة REST مع مفاتيح API.' } },
    ],
  },
];
