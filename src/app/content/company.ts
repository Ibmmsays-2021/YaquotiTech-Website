// Company-site copy, ported verbatim from legacy/src/content/company.mjs.
import type { Item, Step, Text, TextList } from './types';

// TODO: real content — `lead` still says "Two products — Workflow and SDB"; the site now has three products.
export const home: {
  eyebrow: Text;
  title: Text;
  lead: Text;
  productsHead: Step;
  servicesHead: Step;
  processHead: Text;
  process: readonly Step[];
  whyHead: Text;
  why: readonly Item[];
  cta: Step;
} = {
  eyebrow: {
    en: 'Technology company',
    ar: 'شركة تقنية',
  },
  title: {
    en: 'We build, integrate and advise on the systems that run your business.',
    ar: 'نبني وندمج ونستشير في الأنظمة التي تُدير أعمالك.',
  },
  lead: {
    en: 'Two products — Workflow and SDB — backed by two services: consultation and integration. One team, from the first workshop to long-term support.',
    ar: 'منتجان — Workflow وSDB — يدعمهما خدمتان: الاستشارات والتكامل. فريق واحد من أول ورشة عمل حتى الدعم طويل الأمد.',
  },
  productsHead: {
    title: {
      en: 'Solutions built for real operations',
      ar: 'حلول مصممة للعمليات الفعلية',
    },
    desc: {
      en: 'Each solution ships with its own documentation — every module explained on its own page.',
      ar: 'يأتي كل حل مع توثيقه الخاص — وكل وحدة موضّحة في صفحتها.',
    },
  },
  servicesHead: {
    title: {
      en: 'Services that make technology land',
      ar: 'خدمات تجعل التقنية تُثمر',
    },
    desc: {
      en: 'Whether you use our products or your own stack, we help you choose well and connect everything.',
      ar: 'سواء استخدمت منتجاتنا أو بنيتك الخاصة، نساعدك على الاختيار بحكمة وربط كل شيء.',
    },
  },
  processHead: {
    en: 'How we work',
    ar: 'طريقة عملنا',
  },
  process: [
    {
      title: {
        en: 'Discover',
        ar: 'الاستكشاف',
      },
      desc: {
        en: 'Workshops to understand your processes, systems and goals.',
        ar: 'ورش عمل لفهم عملياتك وأنظمتك وأهدافك.',
      },
    },
    {
      title: {
        en: 'Design',
        ar: 'التصميم',
      },
      desc: {
        en: 'A clear target solution, scope and roadmap you can approve.',
        ar: 'حل مستهدف ونطاق وخارطة طريق واضحة تعتمدها.',
      },
    },
    {
      title: {
        en: 'Deliver',
        ar: 'التنفيذ',
      },
      desc: {
        en: 'Iterative delivery with demos, testing and training.',
        ar: 'تنفيذ تكراري مع عروض واختبارات وتدريب.',
      },
    },
    {
      title: {
        en: 'Support',
        ar: 'الدعم',
      },
      desc: {
        en: 'Monitoring, improvements and a team that stays reachable.',
        ar: 'مراقبة وتحسينات وفريق يبقى متاحًا دائمًا.',
      },
    },
  ],
  whyHead: {
    en: 'Why teams choose us',
    ar: 'لماذا تختارنا الفرق',
  },
  why: [
    {
      icon: 'zap',
      title: {
        en: 'Product depth',
        ar: 'عمق المنتج',
      },
      desc: {
        en: 'We build the platforms we deploy, so we fix root causes — not symptoms.',
        ar: 'نبني المنصات التي ننشرها، فنعالج الأسباب الجذرية لا الأعراض.',
      },
    },
    {
      icon: 'plug',
      title: {
        en: 'Open by design',
        ar: 'مفتوحة بالتصميم',
      },
      desc: {
        en: 'APIs, directory sign-in and connectors let our products fit your landscape.',
        ar: 'واجهات برمجية وتسجيل دخول عبر الدليل وموصلات تُلائم بيئتك.',
      },
    },
    {
      icon: 'shield',
      title: {
        en: 'Secure & auditable',
        ar: 'آمنة وقابلة للتدقيق',
      },
      desc: {
        en: 'Role-based access and full activity history are built in, not bolted on.',
        ar: 'الصلاحيات حسب الدور وسجل النشاط الكامل مدمجان أصلًا.',
      },
    },
    {
      icon: 'globe',
      title: {
        en: 'Made for the region',
        ar: 'مصممة للمنطقة',
      },
      desc: {
        en: 'Native Arabic and English experiences, including right-to-left layouts.',
        ar: 'تجربة عربية وإنجليزية أصيلة تشمل الاتجاه من اليمين لليسار.',
      },
    },
  ],
  cta: {
    title: {
      en: 'Ready to simplify how your business runs?',
      ar: 'هل أنت مستعد لتبسيط سير أعمالك؟',
    },
    desc: {
      en: 'Tell us about your process or system — we will reply with a concrete next step.',
      ar: 'أخبرنا عن عمليتك أو نظامك — وسنرد عليك بخطوة تالية واضحة.',
    },
  },
};

// TODO: real content — the second story paragraph describes SDB as "our second solution".
export const about: {
  title: Text;
  lead: Text;
  storyHead: Text;
  story: TextList;
  mission: Item;
  vision: Item;
  valuesHead: Text;
  values: readonly Item[];
  expertiseHead: Text;
  expertise: TextList;
} = {
  title: {
    en: 'About the company',
    ar: 'عن الشركة',
  },
  lead: {
    en: 'We are a technology company focused on two things: products that automate how organisations work, and services that make those — and other — systems work together.',
    ar: 'نحن شركة تقنية تركّز على أمرين: منتجات تُؤتمت طريقة عمل المؤسسات، وخدمات تجعل تلك الأنظمة وغيرها تعمل معًا.',
  },
  storyHead: {
    en: 'Our story',
    ar: 'قصتنا',
  },
  story: {
    en: [
      'Most organisations run on a patchwork of spreadsheets, email threads and disconnected systems. We started by building a workflow platform that turns those habits into clear, trackable processes.',
      'As customers grew, they asked two things: “help us decide what to automate” and “connect it to what we already have”. Those questions became our consultation and integration services, and our second solution, SDB, grew from the same need for dependable data.',
    ],
    ar: [
      'تعمل معظم المؤسسات على خليط من الجداول ورسائل البريد وأنظمة غير مترابطة. بدأنا ببناء منصة سير عمل تحوّل هذه العادات إلى عمليات واضحة يمكن تتبعها.',
      'ومع نمو العملاء سألونا سؤالين: «ساعدنا في تحديد ما نؤتمته» و«اربطه بما لدينا». أصبح هذان السؤالان خدمتي الاستشارات والتكامل، ونما حلنا الثاني SDB من الحاجة نفسها إلى بيانات موثوقة.',
    ],
  },
  mission: {
    icon: 'target',
    title: {
      en: 'Mission',
      ar: 'رسالتنا',
    },
    desc: {
      en: 'Give every organisation clear, reliable and connected systems — without the complexity.',
      ar: 'منح كل مؤسسة أنظمة واضحة وموثوقة ومترابطة — دون تعقيد.',
    },
  },
  vision: {
    icon: 'eye',
    title: {
      en: 'Vision',
      ar: 'رؤيتنا',
    },
    desc: {
      en: 'To be the regional partner organisations trust with the core of their operations.',
      ar: 'أن نكون الشريك الإقليمي الذي تثق به المؤسسات في جوهر عملياتها.',
    },
  },
  valuesHead: {
    en: 'What we value',
    ar: 'قيمنا',
  },
  values: [
    {
      icon: 'check',
      title: {
        en: 'Clarity',
        ar: 'الوضوح',
      },
      desc: {
        en: 'Plain language, honest scope, no surprises.',
        ar: 'لغة بسيطة ونطاق صادق ولا مفاجآت.',
      },
    },
    {
      icon: 'shield',
      title: {
        en: 'Reliability',
        ar: 'الموثوقية',
      },
      desc: {
        en: 'Systems that are tested, monitored and supported.',
        ar: 'أنظمة مُختبرة ومُراقبة ومدعومة.',
      },
    },
    {
      icon: 'users',
      title: {
        en: 'Partnership',
        ar: 'الشراكة',
      },
      desc: {
        en: 'We succeed when your team succeeds.',
        ar: 'ننجح حين ينجح فريقك.',
      },
    },
    {
      icon: 'refresh',
      title: {
        en: 'Continuous improvement',
        ar: 'التحسين المستمر',
      },
      desc: {
        en: 'Every release is shaped by real feedback.',
        ar: 'كل إصدار تصيغه ملاحظات حقيقية.',
      },
    },
  ],
  expertiseHead: {
    en: 'Where we are strongest',
    ar: 'أين نتميز',
  },
  expertise: {
    en: [
      'Business process automation',
      'Approvals, requests & service management',
      'Enterprise integration & APIs',
      'Data platforms & reporting',
      'Identity, access & auditing',
      'Arabic / English product experiences',
    ],
    ar: [
      'أتمتة العمليات التجارية',
      'الموافقات والطلبات وإدارة الخدمات',
      'التكامل المؤسسي والواجهات البرمجية',
      'منصات البيانات والتقارير',
      'الهوية والصلاحيات والتدقيق',
      'تجارب منتجات بالعربية والإنجليزية',
    ],
  },
};

export const servicesIntro: { title: Text; lead: Text } = {
  title: {
    en: 'Services',
    ar: 'الخدمات',
  },
  lead: {
    en: 'Two focused services that help you choose the right technology and make it work with everything else.',
    ar: 'خدمتان مركّزتان تساعدانك على اختيار التقنية المناسبة وجعلها تعمل مع كل ما حولها.',
  },
};

export const contact: { title: Text; lead: Text; email: string; hours: Text } = {
  title: {
    en: 'Let’s talk',
    ar: 'لنتحدث',
  },
  lead: {
    en: 'Tell us what you are trying to improve. We typically reply within one business day.',
    ar: 'أخبرنا بما تريد تحسينه. نردّ عادةً خلال يوم عمل واحد.',
  },
  email: 'hello@yaquotitech.com',
  hours: {
    en: 'Sun – Thu, 9:00 – 17:00',
    ar: 'الأحد – الخميس، 9:00 – 17:00',
  },
};
