// TODO: real release notes — placeholder versions, dates and notes.
import type { Release } from '../../types';

export const releases: readonly Release[] = [
  {
    version: '1.3.0',
    date: '2026-10-20',
    title: { en: 'Rollback', ar: 'التراجع' },
    notes: [
      {
        tag: 'new',
        text: {
          en: 'Roll a completed job back to its starting point.',
          ar: 'التراجع عن مهمة مكتملة إلى نقطة بدايتها.',
        },
      },
      {
        tag: 'fixed',
        text: {
          en: 'Large text columns no longer truncate.',
          ar: 'لم تعد أعمدة النصوص الطويلة تُقتطع.',
        },
      },
    ],
  },
  {
    version: '1.2.0',
    date: '2026-08-30',
    title: { en: 'Progress tracking', ar: 'تتبع التقدم' },
    notes: [
      {
        tag: 'improved',
        text: {
          en: 'Live row counts while a job runs.',
          ar: 'عدّ الصفوف مباشرة أثناء تشغيل المهمة.',
        },
      },
    ],
  },
];
