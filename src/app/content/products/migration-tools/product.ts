// Migration Tools.
// TODO: real content — this whole product is PLACEHOLDER copy (there was no Migration Tools content in the
// old site). Docs modules are empty, so its docs page shows "coming soon" until modules are added.
import { audiencePlaceholder } from '../../placeholders';
import type { Product } from '../../types';
import { api } from './api';
import { migrationToolsMeta } from './meta';
import { pricing } from './pricing';
import { releases } from './releases';

export const migrationTools: Product = {
  ...migrationToolsMeta,
  capabilities: [
    {
      icon: 'plug',
      title: { en: 'Connect old and new', ar: 'اربط القديم بالجديد' },
      desc: {
        en: 'Read from legacy databases and spreadsheets, write to your new system.',
        ar: 'اقرأ من قواعد البيانات والجداول القديمة واكتب في نظامك الجديد.',
      },
    },
    {
      icon: 'check',
      title: { en: 'Validate before you switch', ar: 'تحقّق قبل الانتقال' },
      desc: {
        en: 'Row counts, required fields and duplicates checked on every run.',
        ar: 'عدد الصفوف والحقول الإلزامية والتكرارات تُفحص في كل تشغيل.',
      },
    },
    {
      icon: 'refresh',
      title: { en: 'Roll back if needed', ar: 'تراجع عند الحاجة' },
      desc: {
        en: 'Every run can be returned to its starting point.',
        ar: 'يمكن إعادة كل تشغيل إلى نقطة بدايته.',
      },
    },
  ],
  audience: audiencePlaceholder(migrationToolsMeta.name),
  docs: {
    gettingStarted: { en: [], ar: [] },
    groups: [],
    modules: [],
  },
  useCases: {
    lead: {
      en: 'Where teams use Migration Tools.',
      ar: 'أين تستخدم الفرق أدوات الترحيل.',
    },
    items: [
      {
        icon: 'database',
        title: { en: 'Replacing a legacy system', ar: 'استبدال نظام قديم' },
        desc: {
          en: 'Move years of records into a new platform without re-keying.',
          ar: 'انقل سنوات من السجلات إلى منصة جديدة دون إعادة إدخال.',
        },
        outcomes: {
          en: ['Mapped and cleaned data', 'Validation report per run', 'A tested cut-over plan'],
          ar: ['بيانات مربوطة ومنقّاة', 'تقرير تحقق لكل تشغيل', 'خطة انتقال مُختبرة'],
        },
      },
      {
        icon: 'file',
        title: { en: 'From spreadsheets to a database', ar: 'من الجداول إلى قاعدة بيانات' },
        desc: {
          en: 'Bring scattered spreadsheets into one structured, trusted store.',
          ar: 'اجمع الجداول المتفرقة في مخزن واحد منظم وموثوق.',
        },
        outcomes: {
          en: [
            'Duplicates found and merged',
            'Consistent field formats',
            'Clear ownership of data',
          ],
          ar: ['اكتشاف التكرارات ودمجها', 'صيغ حقول موحدة', 'مسؤولية واضحة عن البيانات'],
        },
      },
    ],
  },
  upcoming: {
    lead: {
      en: 'What we are working on next for Migration Tools. Priorities may change as we learn from customers.',
      ar: 'ما نعمل عليه لاحقًا في أدوات الترحيل. قد تتغير الأولويات بحسب ملاحظات العملاء.',
    },
    items: [
      {
        status: 'dev',
        icon: 'activity',
        title: { en: 'Live progress view', ar: 'عرض التقدم المباشر' },
        desc: {
          en: 'Watch each table move, with errors as they happen.',
          ar: 'تابع نقل كل جدول مع الأخطاء لحظة حدوثها.',
        },
      },
      {
        status: 'planned',
        icon: 'sliders',
        title: { en: 'Visual field mapping', ar: 'ربط الحقول بصريًا' },
        desc: {
          en: 'Map old fields to new ones by dragging, with previews.',
          ar: 'اربط الحقول القديمة بالجديدة بالسحب مع معاينة.',
        },
      },
      {
        status: 'exploring',
        icon: 'zap',
        title: { en: 'Incremental sync', ar: 'مزامنة تدريجية' },
        desc: {
          en: 'Keep old and new systems in step during a long transition.',
          ar: 'أبقِ النظامين القديم والجديد متزامنين خلال فترة انتقال طويلة.',
        },
      },
    ],
  },
  pricing,
  api,
  releases,
};
