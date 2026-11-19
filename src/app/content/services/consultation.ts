// Ported verbatim from legacy/src/content/company.mjs.
import type { Service } from '../types';

export const consultation: Service = {
  id: 'consultation',
  icon: 'compass',
  title: {
    en: 'Consultation',
    ar: 'الاستشارات',
  },
  summary: {
    en: 'Independent, practical advice on processes, architecture and technology choices.',
    ar: 'استشارات عملية ومستقلة حول العمليات والبنية والخيارات التقنية.',
  },
  lead: {
    en: 'We help you decide what to automate, how to design it and in what order — then leave you with a plan your team can execute with us or without us.',
    ar: 'نساعدك على تحديد ما يجب أتمتته وكيف تصممه وبأي ترتيب — ثم نترك لك خطة يستطيع فريقك تنفيذها معنا أو بدوننا.',
  },
  coverHead: {
    en: 'What we cover',
    ar: 'ما نغطيه',
  },
  cover: [
    {
      icon: 'workflow',
      title: {
        en: 'Process assessment',
        ar: 'تقييم العمليات',
      },
      desc: {
        en: 'Map current processes, find bottlenecks and quantify the opportunity.',
        ar: 'رسم العمليات الحالية وتحديد الاختناقات وتقدير الفرصة.',
      },
    },
    {
      icon: 'layers',
      title: {
        en: 'Solution architecture',
        ar: 'هندسة الحلول',
      },
      desc: {
        en: 'Target architecture, build-vs-buy decisions and security considerations.',
        ar: 'البنية المستهدفة وقرارات البناء مقابل الشراء واعتبارات الأمان.',
      },
    },
    {
      icon: 'search',
      title: {
        en: 'System & vendor selection',
        ar: 'اختيار الأنظمة والموردين',
      },
      desc: {
        en: 'Requirements, scoring and demos so you choose with evidence.',
        ar: 'متطلبات وتقييم وعروض تجريبية لتختار بناءً على أدلة.',
      },
    },
    {
      icon: 'chart',
      title: {
        en: 'Roadmap & business case',
        ar: 'خارطة الطريق وجدوى الأعمال',
      },
      desc: {
        en: 'A phased plan with effort, risk and expected return.',
        ar: 'خطة مرحلية بالجهد والمخاطر والعائد المتوقع.',
      },
    },
    {
      icon: 'users',
      title: {
        en: 'Change & adoption',
        ar: 'التغيير والتبني',
      },
      desc: {
        en: 'Training plans and governance so the new way of working sticks.',
        ar: 'خطط تدريب وحوكمة ليترسخ أسلوب العمل الجديد.',
      },
    },
    {
      icon: 'shield',
      title: {
        en: 'Health checks',
        ar: 'فحوصات الصحة',
      },
      desc: {
        en: 'Review existing systems for performance, security and maintainability.',
        ar: 'مراجعة الأنظمة القائمة من حيث الأداء والأمان وقابلية الصيانة.',
      },
    },
  ],
  phasesHead: {
    en: 'How an engagement runs',
    ar: 'كيف يسير المشروع',
  },
  phases: [
    {
      title: {
        en: 'Kick-off',
        ar: 'الانطلاق',
      },
      desc: {
        en: 'Agree goals, stakeholders and success measures.',
        ar: 'الاتفاق على الأهداف وأصحاب المصلحة ومقاييس النجاح.',
      },
    },
    {
      title: {
        en: 'Assess',
        ar: 'التقييم',
      },
      desc: {
        en: 'Interviews, workshops and a review of current systems.',
        ar: 'مقابلات وورش عمل ومراجعة للأنظمة الحالية.',
      },
    },
    {
      title: {
        en: 'Recommend',
        ar: 'التوصية',
      },
      desc: {
        en: 'Options with trade-offs and a clear recommendation.',
        ar: 'خيارات مع المفاضلات وتوصية واضحة.',
      },
    },
    {
      title: {
        en: 'Hand over',
        ar: 'التسليم',
      },
      desc: {
        en: 'Roadmap, documentation and an executive read-out.',
        ar: 'خارطة الطريق والتوثيق وعرض تنفيذي.',
      },
    },
  ],
  deliversHead: {
    en: 'What you get',
    ar: 'ما ستحصل عليه',
  },
  delivers: {
    en: [
      'Current-state process and system map',
      'Prioritised opportunity list',
      'Target architecture and options analysis',
      'Phased roadmap with effort estimates',
      'Executive summary for decision makers',
    ],
    ar: [
      'خريطة العمليات والأنظمة الحالية',
      'قائمة فرص مرتبة بالأولوية',
      'البنية المستهدفة وتحليل الخيارات',
      'خارطة طريق مرحلية مع تقدير الجهد',
      'ملخص تنفيذي لأصحاب القرار',
    ],
  },
};
