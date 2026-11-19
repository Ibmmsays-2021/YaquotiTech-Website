// Per-solution "Use cases" and "Upcoming" content (keyed by solution id). Texts are { en, ar }.
// NOTE: these are starter texts — replace them with the real use cases and roadmap.

export const status = {
  dev: { en: 'In development', ar: 'قيد التطوير' },
  planned: { en: 'Planned', ar: 'مخطط' },
  exploring: { en: 'Exploring', ar: 'قيد الدراسة' },
};

export const extras = {
  workflow: {
    useCasesLead: {
      en: 'Where organisations use the Workflow System every day.',
      ar: 'أين تستخدم المؤسسات نظام Workflow كل يوم.',
    },
    useCases: [
      {
        icon: 'users',
        title: { en: 'HR requests & approvals', ar: 'طلبات الموارد البشرية وموافقاتها' },
        desc: { en: 'Leave, onboarding, letters and expense claims routed to the right approver automatically.', ar: 'الإجازات والتعيين والخطابات والمطالبات المالية تُوجَّه تلقائيًا إلى المعتمد المناسب.' },
        outcomes: {
          en: ['Multi-level approvals by role or line manager', 'Self-service submission for employees', 'Full history for every decision'],
          ar: ['موافقات متعددة المستويات حسب الدور أو المدير المباشر', 'تقديم ذاتي للموظفين', 'سجل كامل لكل قرار'],
        },
      },
      {
        icon: 'inbox',
        title: { en: 'IT & service desk', ar: 'الدعم التقني ومكتب الخدمة' },
        desc: { en: 'Incidents and service requests tracked against SLAs, with clear ownership at every step.', ar: 'تتبع الحوادث وطلبات الخدمة وفق اتفاقيات مستوى الخدمة مع مسؤولية واضحة في كل خطوة.' },
        outcomes: {
          en: ['Working calendars and SLA timers', 'Automatic escalation on delay', 'Knowledge base linked to requests'],
          ar: ['تقاويم عمل ومؤقتات اتفاقيات الخدمة', 'تصعيد تلقائي عند التأخر', 'قاعدة معرفة مرتبطة بالطلبات'],
        },
      },
      {
        icon: 'briefcase',
        title: { en: 'Procurement & purchasing', ar: 'المشتريات والتوريد' },
        desc: { en: 'Purchase requests, quotations and approvals with budget checks and a clear audit trail.', ar: 'طلبات الشراء وعروض الأسعار والموافقات مع فحص الميزانية وسجل تدقيق واضح.' },
        outcomes: {
          en: ['Conditional routing by amount or department', 'Parallel approvals', 'Reports on cycle time and spend'],
          ar: ['توجيه مشروط حسب المبلغ أو الإدارة', 'موافقات متوازية', 'تقارير عن زمن الدورة والإنفاق'],
        },
      },
      {
        icon: 'globe',
        title: { en: 'Customer-facing services', ar: 'خدمات موجهة للعملاء' },
        desc: { en: 'Let customers submit and follow requests through a branded portal instead of email and phone calls.', ar: 'دع العملاء يقدمون طلباتهم ويتابعونها عبر بوابة بهويتك بدلًا من البريد والمكالمات.' },
        outcomes: {
          en: ['Branded customer portal', 'Status notifications by email', 'Less manual follow-up for your team'],
          ar: ['بوابة عملاء بهويتك', 'إشعارات الحالة عبر البريد', 'متابعة يدوية أقل لفريقك'],
        },
      },
      {
        icon: 'shield',
        title: { en: 'Compliance & audit', ar: 'الامتثال والتدقيق' },
        desc: { en: 'Prove who did what and when, across every process, without chasing paper trails.', ar: 'أثبت من فعل ماذا ومتى في كل عملية دون ملاحقة الأوراق.' },
        outcomes: {
          en: ['Immutable activity history', 'Role-based permissions', 'Exportable reports for auditors'],
          ar: ['سجل نشاط غير قابل للتعديل', 'صلاحيات حسب الدور', 'تقارير قابلة للتصدير للمدققين'],
        },
      },
    ],
    upcomingLead: {
      en: 'What we are working on next for the Workflow System. Priorities may change as we learn from customers.',
      ar: 'ما نعمل عليه لاحقًا في نظام Workflow. قد تتغير الأولويات بحسب ملاحظات العملاء.',
    },
    upcoming: [
      { status: 'dev', icon: 'chart', title: { en: 'Bottleneck analytics', ar: 'تحليلات الاختناقات' }, desc: { en: 'Automatically highlight the steps and performers where requests slow down.', ar: 'إبراز الخطوات والمنفذين الذين تتأخر عندهم الطلبات تلقائيًا.' } },
      { status: 'dev', icon: 'bell', title: { en: 'Mobile approvals', ar: 'الموافقات عبر الجوال' }, desc: { en: 'Approve, reject and comment on requests from your phone.', ar: 'وافق على الطلبات أو ارفضها أو علّق عليها من هاتفك.' } },
      { status: 'planned', icon: 'zap', title: { en: 'Process templates library', ar: 'مكتبة قوالب العمليات' }, desc: { en: 'Start from ready-made processes for HR, IT and procurement and adapt them.', ar: 'ابدأ من عمليات جاهزة للموارد البشرية والتقنية والمشتريات وعدّلها.' } },
      { status: 'exploring', icon: 'search', title: { en: 'AI-assisted process design', ar: 'تصميم العمليات بمساعدة الذكاء الاصطناعي' }, desc: { en: 'Describe a process in plain language and get a draft you can refine.', ar: 'صف العملية بلغة بسيطة واحصل على مسودة يمكنك تحسينها.' } },
    ],
  },

  sdb: {
    useCasesLead: {
      en: 'How teams put SDB to work as their data layer.',
      ar: 'كيف تعتمد الفرق على SDB كطبقة للبيانات.',
    },
    useCases: [
      {
        icon: 'users',
        title: { en: 'Customer & master data', ar: 'بيانات العملاء والبيانات الرئيسية' },
        desc: { en: 'One trusted record for customers, assets and contracts, shared by every application.', ar: 'سجل موثوق واحد للعملاء والأصول والعقود تشاركه كل التطبيقات.' },
        outcomes: {
          en: ['Single source of truth', 'Validation and uniqueness rules', 'Relations modelled visually'],
          ar: ['مصدر واحد للحقيقة', 'قواعد تحقق وتفرد', 'علاقات تُنمذج بصريًا'],
        },
      },
      {
        icon: 'code',
        title: { en: 'Application back end', ar: 'خلفية التطبيقات' },
        desc: { en: 'Give web and mobile apps a secure, ready-made API on top of your modelled data.', ar: 'امنح تطبيقات الويب والجوال واجهة آمنة جاهزة فوق بياناتك المنمذجة.' },
        outcomes: {
          en: ['Secured query endpoints', 'Fine-grained access control', 'Schema versions that evolve safely'],
          ar: ['نقاط استعلام آمنة', 'تحكم دقيق في الصلاحيات', 'إصدارات مخطط تتطور بأمان'],
        },
      },
      {
        icon: 'refresh',
        title: { en: 'Migration & consolidation', ar: 'الترحيل والدمج' },
        desc: { en: 'Move data out of legacy systems and spreadsheets, and keep sources in sync while you transition.', ar: 'انقل البيانات من الأنظمة القديمة والجداول وأبقِ المصادر متزامنة أثناء الانتقال.' },
        outcomes: {
          en: ['Import and transform existing data', 'Incremental synchronisation', 'Cut-over with confidence'],
          ar: ['استيراد البيانات الحالية وتحويلها', 'مزامنة تدريجية', 'انتقال بثقة'],
        },
      },
      {
        icon: 'chart',
        title: { en: 'Reporting data hub', ar: 'مركز بيانات التقارير' },
        desc: { en: 'Bring data from many systems into one place that analysts and BI tools can rely on.', ar: 'اجمع البيانات من أنظمة متعددة في مكان واحد يعتمد عليه المحللون وأدوات الذكاء التجاري.' },
        outcomes: {
          en: ['Connectors for common sources', 'Consistent definitions', 'Monitored and auditable'],
          ar: ['موصلات للمصادر الشائعة', 'تعريفات متسقة', 'مراقَب وقابل للتدقيق'],
        },
      },
      {
        icon: 'lock',
        title: { en: 'Protected & regulated data', ar: 'بيانات محمية وخاضعة للتنظيم' },
        desc: { en: 'Keep sensitive data encrypted, backed up and traceable to meet internal and regulatory needs.', ar: 'أبقِ البيانات الحساسة مشفّرة ومحمية بنسخ احتياطية وقابلة للتتبع لتلبية المتطلبات الداخلية والتنظيمية.' },
        outcomes: {
          en: ['Encryption and backups', 'Point-in-time recovery', 'Complete audit trail'],
          ar: ['تشفير ونسخ احتياطي', 'استرجاع إلى نقطة زمنية', 'سجل تدقيق كامل'],
        },
      },
    ],
    upcomingLead: {
      en: 'What we are working on next for SDB. Priorities may change as we learn from customers.',
      ar: 'ما نعمل عليه لاحقًا في SDB. قد تتغير الأولويات بحسب ملاحظات العملاء.',
    },
    upcoming: [
      { status: 'dev', icon: 'search', title: { en: 'Visual query builder', ar: 'منشئ استعلامات مرئي' }, desc: { en: 'Build and test queries by clicking, then publish them as endpoints.', ar: 'ابنِ الاستعلامات واختبرها بالنقر ثم انشرها كنقاط نهاية.' } },
      { status: 'dev', icon: 'activity', title: { en: 'Change streams', ar: 'تدفقات التغيير' }, desc: { en: 'Get notified in real time when records change, to drive integrations.', ar: 'احصل على إشعار فوري عند تغيّر السجلات لتشغيل التكاملات.' } },
      { status: 'planned', icon: 'hdd', title: { en: 'Cross-region replication', ar: 'النسخ بين المناطق' }, desc: { en: 'Keep a hot copy of your data in a second region for resilience.', ar: 'احتفظ بنسخة فعالة من بياناتك في منطقة ثانية لمزيد من الاستمرارية.' } },
      { status: 'exploring', icon: 'zap', title: { en: 'Natural-language queries', ar: 'استعلامات بلغة طبيعية' }, desc: { en: 'Ask questions about your data in plain language.', ar: 'اطرح أسئلة عن بياناتك بلغة بسيطة.' } },
    ],
  },
};
