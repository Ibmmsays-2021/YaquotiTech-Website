// Central site configuration: brand, languages, navigation and shared UI strings.
// Change brand details here — everything else is generated from it.

export const LANGS = ['en', 'ar'];

export const brand = {
  name: { en: 'Yaquoti Tech', ar: 'ياقوتي تك' },
  short: 'YT',
  email: 'hello@yaquotitech.com',
  tagline: {
    en: 'Technology that keeps your business moving.',
    ar: 'تقنية تُبقي أعمالك في حركة دائمة.',
  },
};

export const langMeta = {
  en: { dir: 'ltr', label: 'English', short: 'EN', other: 'ar' },
  ar: { dir: 'rtl', label: 'العربية', short: 'ع', other: 'en' },
};

// Shared UI strings
export const ui = {
  nav: {
    home: { en: 'Home', ar: 'الرئيسية' },
    about: { en: 'About', ar: 'من نحن' },
    services: { en: 'Services', ar: 'الخدمات' },
    solutions: { en: 'Solutions', ar: 'الحلول' },
    docs: { en: 'Documentation', ar: 'التوثيق' },
    contact: { en: 'Contact', ar: 'تواصل معنا' },
    talk: { en: 'Talk to us', ar: 'تحدث إلينا' },
    menu: { en: 'Menu', ar: 'القائمة' },
    theme: { en: 'Toggle theme', ar: 'تبديل المظهر' },
    language: { en: 'Switch language', ar: 'تبديل اللغة' },
  },
  // Per-solution sub-navigation
  solNav: {
    overview: { en: 'Overview', ar: 'نظرة عامة' },
    docs: { en: 'Documentation', ar: 'التوثيق' },
    useCases: { en: 'Use cases', ar: 'حالات الاستخدام' },
    upcoming: { en: 'Upcoming', ar: 'قريبًا' },
    demo: { en: 'Book a demo', ar: 'احجز عرضًا تجريبيًا' },
  },
  demo: {
    title: { en: 'Book a demo', ar: 'احجز عرضًا تجريبيًا' },
    lead: {
      en: 'See it running on your own scenario. Tell us a little about your team and we will arrange a walkthrough.',
      ar: 'شاهده يعمل على سيناريو خاص بك. أخبرنا قليلًا عن فريقك وسنرتب لك عرضًا.',
    },
    message: { en: 'What would you like to see?', ar: 'ماذا تود أن ترى؟' },
    send: { en: 'Request demo', ar: 'اطلب العرض' },
    subject: { en: 'Demo request', ar: 'طلب عرض تجريبي' },
    expect: { en: 'What to expect', ar: 'ماذا تتوقع' },
    points: {
      en: ['A 30-minute walkthrough with a product specialist', 'Focused on your processes and questions', 'No commitment, no preparation needed'],
      ar: ['عرض لمدة 30 دقيقة مع مختص بالمنتج', 'مركّز على عملياتك وأسئلتك', 'دون التزام ودون حاجة لتحضير'],
    },
  },
  common: {
    status: { en: 'Status', ar: 'الحالة' },
    showSystem: { en: 'Show system', ar: 'عرض النظام' },
    insideHead: { en: 'Inside the system', ar: 'داخل النظام' },
    docsDesc: { en: 'setup, configuration and FAQ for each one.', ar: 'الإعداد والضبط والأسئلة الشائعة لكل وحدة.' },
    learnMore: { en: 'Learn more', ar: 'اعرف المزيد' },
    viewDocs: { en: 'View documentation', ar: 'عرض التوثيق' },
    explore: { en: 'Explore', ar: 'استكشف' },
    modules: { en: 'modules', ar: 'وحدات' },
    module: { en: 'Module', ar: 'وحدة' },
    overview: { en: 'Overview', ar: 'نظرة عامة' },
    capabilities: { en: 'Key capabilities', ar: 'القدرات الرئيسية' },
    howItWorks: { en: 'How it works', ar: 'كيف تعمل' },
    configuration: { en: 'Configuration', ar: 'الإعدادات' },
    faq: { en: 'Frequently asked questions', ar: 'الأسئلة الشائعة' },
    onThisPage: { en: 'On this page', ar: 'في هذه الصفحة' },
    setting: { en: 'Setting', ar: 'الإعداد' },
    description: { en: 'Description', ar: 'الوصف' },
    previous: { en: 'Previous', ar: 'السابق' },
    next: { en: 'Next', ar: 'التالي' },
    searchModules: { en: 'Filter modules…', ar: 'تصفية الوحدات…' },
    docsHome: { en: 'Documentation', ar: 'التوثيق' },
    gettingStarted: { en: 'Getting started', ar: 'البدء' },
    allModules: { en: 'All modules', ar: 'جميع الوحدات' },
    breadcrumbHome: { en: 'Home', ar: 'الرئيسية' },
    rights: { en: 'All rights reserved.', ar: 'جميع الحقوق محفوظة.' },
    ourSolutions: { en: 'Our solutions', ar: 'حلولنا' },
    ourServices: { en: 'Our services', ar: 'خدماتنا' },
    resources: { en: 'Resources', ar: 'الموارد' },
    solution: { en: 'Solution', ar: 'الحل' },
    service: { en: 'Service', ar: 'الخدمة' },
    notFound: { en: 'Page not found', ar: 'الصفحة غير موجودة' },
    backHome: { en: 'Back to home', ar: 'العودة للرئيسية' },
    deliverables: { en: 'What you get', ar: 'ما ستحصل عليه' },
    whatWeCover: { en: 'What we cover', ar: 'ما نغطيه' },
    ourApproach: { en: 'Our approach', ar: 'منهجيتنا' },
    startProject: { en: 'Start a project', ar: 'ابدأ مشروعك' },
  },
  contact: {
    name: { en: 'Full name', ar: 'الاسم الكامل' },
    email: { en: 'Work email', ar: 'البريد الإلكتروني' },
    company: { en: 'Company', ar: 'الشركة' },
    interest: { en: 'I am interested in', ar: 'أنا مهتم بـ' },
    message: { en: 'How can we help?', ar: 'كيف يمكننا مساعدتك؟' },
    send: { en: 'Send message', ar: 'إرسال الرسالة' },
    note: {
      en: 'Your email app will open with the message ready to send.',
      ar: 'سيفتح تطبيق البريد لديك مع الرسالة جاهزة للإرسال.',
    },
    opts: {
      en: ['Workflow system', 'SDB', 'Consultation', 'Integration', 'Something else'],
      ar: ['نظام Workflow', 'SDB', 'الاستشارات', 'التكامل', 'شيء آخر'],
    },
  },
};
