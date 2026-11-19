// Ported verbatim from legacy/src/content/company.mjs.
import type { Service } from '../types';

export const integration: Service = {
  id: 'integration',
  icon: 'plug',
  title: {
    en: 'Integration',
    ar: 'التكامل',
  },
  summary: {
    en: 'Connect your systems so data and approvals flow without re-keying.',
    ar: 'اربط أنظمتك لتتدفق البيانات والموافقات دون إعادة إدخال.',
  },
  lead: {
    en: 'We connect our products — and yours — with ERP, HR, finance, identity and communication systems, so information is entered once and trusted everywhere.',
    ar: 'نربط منتجاتنا ومنتجاتك مع أنظمة الموارد والمالية والهوية والاتصالات، فتُدخل المعلومة مرة واحدة ويُوثق بها في كل مكان.',
  },
  coverHead: {
    en: 'Integration types',
    ar: 'أنواع التكامل',
  },
  cover: [
    {
      icon: 'code',
      title: {
        en: 'REST & webhook APIs',
        ar: 'واجهات REST وWebhook',
      },
      desc: {
        en: 'Secure, versioned APIs and event notifications for real-time exchange.',
        ar: 'واجهات آمنة ومُرقّمة بالإصدارات وإشعارات أحداث لتبادل فوري.',
      },
    },
    {
      icon: 'briefcase',
      title: {
        en: 'ERP, HR & finance',
        ar: 'الموارد والمالية والـERP',
      },
      desc: {
        en: 'Sync employees, vendors, cost centres and postings.',
        ar: 'مزامنة الموظفين والموردين ومراكز التكلفة والقيود.',
      },
    },
    {
      icon: 'lock',
      title: {
        en: 'Identity & directory',
        ar: 'الهوية والدليل',
      },
      desc: {
        en: 'Active Directory, single sign-on and Google/Microsoft sign-in.',
        ar: 'Active Directory وتسجيل الدخول الموحد ودخول Google وMicrosoft.',
      },
    },
    {
      icon: 'mail',
      title: {
        en: 'Email, SMS & chat',
        ar: 'البريد والرسائل والدردشة',
      },
      desc: {
        en: 'Notifications and approvals delivered where people already are.',
        ar: 'إشعارات وموافقات تصل حيث يتواجد الناس أصلًا.',
      },
    },
    {
      icon: 'database',
      title: {
        en: 'Data & reporting',
        ar: 'البيانات والتقارير',
      },
      desc: {
        en: 'Feed warehouses and BI tools with clean, governed data.',
        ar: 'تغذية مستودعات البيانات وأدوات ذكاء الأعمال ببيانات نظيفة ومحكومة.',
      },
    },
    {
      icon: 'refresh',
      title: {
        en: 'Migration',
        ar: 'ترحيل البيانات',
      },
      desc: {
        en: 'Move data from legacy systems with validation and rollback plans.',
        ar: 'نقل البيانات من الأنظمة القديمة مع التحقق وخطط التراجع.',
      },
    },
  ],
  phasesHead: {
    en: 'Our integration approach',
    ar: 'منهجية التكامل',
  },
  phases: [
    {
      title: {
        en: 'Analyse',
        ar: 'التحليل',
      },
      desc: {
        en: 'Inventory systems, data owners and interfaces.',
        ar: 'حصر الأنظمة ومالكي البيانات والواجهات.',
      },
    },
    {
      title: {
        en: 'Design',
        ar: 'التصميم',
      },
      desc: {
        en: 'Data mapping, error handling and security model.',
        ar: 'ربط البيانات ومعالجة الأخطاء ونموذج الأمان.',
      },
    },
    {
      title: {
        en: 'Build & test',
        ar: 'البناء والاختبار',
      },
      desc: {
        en: 'Automated tests against realistic data and failure cases.',
        ar: 'اختبارات آلية على بيانات واقعية وحالات الفشل.',
      },
    },
    {
      title: {
        en: 'Run & monitor',
        ar: 'التشغيل والمراقبة',
      },
      desc: {
        en: 'Alerting, logs and a runbook for support teams.',
        ar: 'تنبيهات وسجلات ودليل تشغيل لفرق الدعم.',
      },
    },
  ],
  deliversHead: {
    en: 'What you get',
    ar: 'ما ستحصل عليه',
  },
  delivers: {
    en: [
      'Working, tested interfaces in your environments',
      'Interface specifications and data mappings',
      'Monitoring and failure alerts',
      'Runbook and knowledge transfer',
      'Optional managed support',
    ],
    ar: [
      'واجهات تعمل ومُختبرة في بيئاتك',
      'مواصفات الواجهات وربط البيانات',
      'مراقبة وتنبيهات الأعطال',
      'دليل تشغيل ونقل معرفة',
      'دعم مُدار اختياري',
    ],
  },
};
