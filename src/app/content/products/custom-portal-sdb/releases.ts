// TODO: real release notes — placeholder versions, dates and notes.
import type { Release } from '../../types';

export const releases: readonly Release[] = [
  {
    version: '1.0.0',
    date: '2026-09-01',
    title: { en: 'First release', ar: 'الإصدار الأول' },
    notes: [
      {
        tag: 'new',
        text: { en: 'Branded pages, forms and sign-in.', ar: 'صفحات ونماذج وتسجيل دخول بهويتك.' },
      },
    ],
  },
];
