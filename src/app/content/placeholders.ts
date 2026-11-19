// Shared PLACEHOLDER builders. Everything produced here is TODO content: neutral wording,
// no invented prices or promises. Replace per product once real content exists.
import type { ApiReference, ComparisonRow, Item, Pairs, PricingPlan, Text } from './types';

const sub = (t: Text, name: Text): Text => ({
  en: t.en.replace('{name}', name.en),
  ar: t.ar.replace('{name}', name.ar),
});

/** TODO: real content — who each product is for. */
export function audiencePlaceholder(name: Text): { lead: Text; items: readonly Item[] } {
  return {
    lead: sub(
      {
        en: 'Teams that use {name} today.',
        ar: 'الفرق التي تستخدم {name} اليوم.',
      },
      name,
    ),
    items: [
      {
        icon: 'briefcase',
        title: { en: 'Operations leaders', ar: 'قادة العمليات' },
        desc: {
          en: 'Who need clear ownership and visibility across teams.',
          ar: 'الذين يحتاجون إلى مسؤولية واضحة ورؤية شاملة عبر الفرق.',
        },
      },
      {
        icon: 'sliders',
        title: { en: 'IT and system administrators', ar: 'مسؤولو التقنية والأنظمة' },
        desc: {
          en: 'Who configure, secure and integrate the platform.',
          ar: 'الذين يضبطون المنصة ويؤمّنونها ويربطونها بالأنظمة الأخرى.',
        },
      },
      {
        icon: 'users',
        title: { en: 'Everyday users', ar: 'المستخدمون اليوميون' },
        desc: {
          en: 'Who want simple, fast tools in Arabic and English.',
          ar: 'الذين يريدون أدوات بسيطة وسريعة بالعربية والإنجليزية.',
        },
      },
    ],
  };
}

/** TODO: real pricing — tier names, prices and limits. No prices are shown until confirmed. */
export const placeholderPlans: readonly PricingPlan[] = [
  {
    id: 'starter',
    name: { en: 'Starter', ar: 'المبتدئ' },
    price: { en: 'Contact us', ar: 'تواصل معنا' },
    period: { en: 'for pricing', ar: 'لمعرفة السعر' },
    desc: {
      en: 'For a single team getting started.',
      ar: 'لفريق واحد في بداياته.',
    },
    features: {
      en: ['Up to 25 users', 'Core modules', 'Email support'],
      ar: ['حتى 25 مستخدمًا', 'الوحدات الأساسية', 'دعم عبر البريد'],
    },
  },
  {
    id: 'business',
    name: { en: 'Business', ar: 'الأعمال' },
    price: { en: 'Contact us', ar: 'تواصل معنا' },
    period: { en: 'for pricing', ar: 'لمعرفة السعر' },
    desc: {
      en: 'For departments running several processes.',
      ar: 'للإدارات التي تدير عدة عمليات.',
    },
    features: {
      en: ['Up to 250 users', 'All modules', 'Single sign-on', 'Priority support'],
      ar: ['حتى 250 مستخدمًا', 'جميع الوحدات', 'تسجيل دخول موحد', 'دعم ذو أولوية'],
    },
    featured: true,
  },
  {
    id: 'enterprise',
    name: { en: 'Enterprise', ar: 'المؤسسات' },
    price: { en: 'Custom', ar: 'حسب الطلب' },
    period: { en: 'tailored to you', ar: 'مصمم لاحتياجك' },
    desc: {
      en: 'For organisation-wide rollouts.',
      ar: 'للتطبيق على مستوى المؤسسة.',
    },
    features: {
      en: ['Unlimited users', 'Cloud or on-premises', 'Custom SLAs', 'Dedicated contact'],
      ar: ['مستخدمون بلا حدود', 'سحابي أو داخل مقرك', 'اتفاقيات خدمة مخصصة', 'جهة تواصل مخصصة'],
    },
  },
];

const yes = true;
const no = false;

/** TODO: real pricing — comparison rows. */
export const placeholderComparison: readonly ComparisonRow[] = [
  {
    label: { en: 'Users', ar: 'المستخدمون' },
    values: [
      { en: 'Up to 25', ar: 'حتى 25' },
      { en: 'Up to 250', ar: 'حتى 250' },
      { en: 'Unlimited', ar: 'بلا حدود' },
    ],
  },
  {
    label: { en: 'Arabic and English interface', ar: 'واجهة عربية وإنجليزية' },
    values: [yes, yes, yes],
  },
  { label: { en: 'Single sign-on', ar: 'تسجيل دخول موحد' }, values: [no, yes, yes] },
  { label: { en: 'API access', ar: 'الوصول إلى الواجهات البرمجية' }, values: [no, yes, yes] },
  { label: { en: 'On-premises deployment', ar: 'التشغيل داخل مقرك' }, values: [no, no, yes] },
  {
    label: { en: 'Support', ar: 'الدعم' },
    values: [
      { en: 'Email', ar: 'البريد' },
      { en: 'Priority', ar: 'أولوية' },
      { en: 'Dedicated', ar: 'مخصص' },
    ],
  },
];

/** TODO: real pricing FAQ. */
export const placeholderPricingFaq: Pairs = {
  en: [
    [
      'How is pricing calculated?',
      'Tell us about your teams and processes and we will propose the right plan.',
    ],
    ['Can we change plans later?', 'Yes. You can move between plans as your needs change.'],
    [
      'Do you offer on-premises deployment?',
      'On-premises and private-cloud options are available on the Enterprise plan.',
    ],
    [
      'Can we see it before deciding?',
      'Yes — request a demo and we will walk you through it on your own scenario.',
    ],
  ],
  ar: [
    ['كيف يُحسب السعر؟', 'أخبرنا عن فرقك وعملياتك وسنقترح الخطة المناسبة.'],
    ['هل يمكننا تغيير الخطة لاحقًا؟', 'نعم، يمكنك الانتقال بين الخطط مع تغيّر احتياجاتك.'],
    [
      'هل يتوفر التشغيل داخل مقرنا؟',
      'تتوفر خيارات التشغيل داخل المقر أو السحابة الخاصة ضمن خطة المؤسسات.',
    ],
    ['هل يمكننا رؤيته قبل القرار؟', 'نعم — اطلب عرضًا تجريبيًا وسنعرضه لك على سيناريو خاص بك.'],
  ],
};

export const placeholderPricingLead = (name: Text): Text =>
  sub(
    {
      en: 'Plans for {name}, from a single team to the whole organisation.',
      ar: 'خطط {name} من فريق واحد حتى المؤسسة بأكملها.',
    },
    name,
  );

export const placeholderApiAuth: Text = {
  en: 'Every request needs an API key, sent as a Bearer token in the Authorization header. Keys are created by an administrator and can be revoked at any time.',
  ar: 'يتطلب كل طلب مفتاح API يُرسل كرمز Bearer في ترويسة Authorization. ينشئ المسؤول المفاتيح ويمكن إلغاؤها في أي وقت.',
};

/** TODO: real API reference — request/response format. */
export const placeholderApiFormat: Text = {
  en: 'JSON over HTTPS, UTF-8. Dates use ISO 8601 in UTC.',
  ar: 'JSON عبر HTTPS بترميز UTF-8. تستخدم التواريخ صيغة ISO 8601 بتوقيت UTC.',
};

/** TODO: real API reference — versioning policy. */
export const placeholderApiVersioning: Text = {
  en: 'The version is part of the URL (/v1). Breaking changes only ship in a new version, announced in the release notes.',
  ar: 'الإصدار جزء من العنوان (/v1). لا تصدر التغييرات الجذرية إلا في إصدار جديد يُعلن عنه في ملاحظات الإصدار.',
};

/** TODO: real API reference — error format and codes. */
export const placeholderApiErrors: ApiReference['errors'] = {
  overview: {
    en: 'Errors use standard HTTP status codes and a JSON body with a machine-readable code and a message you can show to people. Retry 429 and 5xx responses with back-off; fix the request for other 4xx codes.',
    ar: 'تستخدم الأخطاء رموز HTTP القياسية مع جسم JSON يحتوي رمزًا آليًا ورسالة يمكن عرضها للمستخدمين. أعد محاولة الاستجابات 429 و5xx مع التمهّل، وصحّح الطلب في رموز 4xx الأخرى.',
  },
  codes: [
    {
      status: '400',
      meaning: {
        en: 'The request is malformed or a field is invalid.',
        ar: 'الطلب غير صحيح أو أحد الحقول غير صالح.',
      },
    },
    {
      status: '401',
      meaning: { en: 'The API key is missing or invalid.', ar: 'مفتاح API مفقود أو غير صالح.' },
    },
    {
      status: '403',
      meaning: {
        en: 'The key is valid but not allowed to do this.',
        ar: 'المفتاح صالح لكنه غير مسموح له بهذا الإجراء.',
      },
    },
    { status: '404', meaning: { en: 'The resource does not exist.', ar: 'المورد غير موجود.' } },
    {
      status: '429',
      meaning: {
        en: 'Too many requests — slow down and retry.',
        ar: 'طلبات كثيرة جدًا — أبطئ ثم أعد المحاولة.',
      },
    },
    {
      status: '500',
      meaning: {
        en: 'Something failed on our side — retry later.',
        ar: 'حدث خطأ لدينا — أعد المحاولة لاحقًا.',
      },
    },
  ],
  example: `{
  "error": {
    "code": "validation_failed",
    "message": "The field \\"from\\" must be a date.",
    "field": "from"
  }
}`,
};
