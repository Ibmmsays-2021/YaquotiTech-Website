// Workflow solution + one entry per documented module. Texts are { en, ar } (arrays inside for lists).

export const workflow = {
  id: 'workflow',
  icon: 'workflow',
  name: { en: 'Workflow System', ar: 'نظام Workflow' },
  tagline: {
    en: 'Design, run and measure every business process in one platform.',
    ar: 'صمّم كل عملية عمل ونفّذها وقِس أداءها في منصة واحدة.',
  },
  summary: {
    en: 'A configurable platform for requests, approvals and service processes — with SLAs, dashboards, a customer portal and full audit history.',
    ar: 'منصة قابلة للإعداد للطلبات والموافقات وعمليات الخدمة — مع اتفاقيات مستوى الخدمة ولوحات المعلومات وبوابة العملاء وسجل تدقيق كامل.',
  },
  value: [
    { icon: 'workflow', t: { en: 'Model it visually', ar: 'نمذجة بصرية' }, d: { en: 'Stages, steps, rules and approvals configured by administrators — no code.', ar: 'مراحل وخطوات وقواعد وموافقات يضبطها المسؤولون — دون برمجة.' } },
    { icon: 'clock', t: { en: 'Stay on time', ar: 'التزم بالوقت' }, d: { en: 'Working calendars, holidays and SLAs keep every request accountable.', ar: 'تقاويم عمل وعطلات واتفاقيات خدمة تُبقي كل طلب مسؤولًا.' } },
    { icon: 'chart', t: { en: 'See everything', ar: 'شاهد كل شيء' }, d: { en: 'Dashboards and dynamic reports turn process data into decisions.', ar: 'لوحات معلومات وتقارير ديناميكية تحوّل البيانات إلى قرارات.' } },
  ],
  fitHead: { en: 'How the modules fit together', ar: 'كيف تترابط الوحدات' },
  fit: {
    en: ['Design', 'Run', 'Measure', 'Administer'],
    ar: ['التصميم', 'التشغيل', 'القياس', 'الإدارة'],
  },
  fitGroups: [
    ['process-management', 'knowledge-base'],
    ['requests', 'customer-portal', 'notifications'],
    ['dashboards-reports', 'time-sla'],
    ['users-groups', 'identity-directory', 'developer-space', 'administration'],
  ],
  gettingStarted: {
    steps: {
      en: [
        'Sign in and set up the organisation, groups and users (Users & Groups).',
        'Define working time, holidays and SLAs (Time & SLA).',
        'Model your first process and publish it (Process Management).',
        'Configure notifications and, if needed, the Customer Portal.',
        'Submit a test request, follow it to completion, then review the Dashboards.',
      ],
      ar: [
        'سجّل الدخول وأعدّ المؤسسة والمجموعات والمستخدمين (المستخدمون والمجموعات).',
        'حدّد أوقات العمل والعطلات واتفاقيات الخدمة (الوقت واتفاقيات الخدمة).',
        'صمّم أول عملية وانشرها (إدارة العمليات).',
        'اضبط الإشعارات وبوابة العملاء عند الحاجة.',
        'قدّم طلبًا تجريبيًا وتابعه حتى الإغلاق ثم راجع لوحات المعلومات.',
      ],
    },
  },
};

export const workflowModules = [
  {
    id: 'process-management',
    icon: 'workflow',
    title: { en: 'Process Management', ar: 'إدارة العمليات' },
    summary: { en: 'Model processes with stages, steps, rules and approvals, then publish them for live use.', ar: 'نمذجة العمليات بمراحل وخطوات وقواعد وموافقات ثم نشرها للاستخدام الفعلي.' },
    overview: {
      en: 'Process Management is where administrators describe how work moves through the organisation. A process is made of stages and steps; each step has performers, form fields, conditions and optional automatic actions.',
      ar: 'إدارة العمليات هي المكان الذي يصف فيه المسؤولون كيف ينتقل العمل داخل المؤسسة. تتكون العملية من مراحل وخطوات، ولكل خطوة منفذون وحقول نموذج وشروط وإجراءات تلقائية اختيارية.',
    },
    features: {
      en: ['Visual designer for stages and steps', 'Conditional routing and business-rule triggers', 'Single, parallel and multi-level approvals', 'Draft and publish lifecycle with versions', 'Per-step performers, forms and permissions'],
      ar: ['مصمم بصري للمراحل والخطوات', 'توجيه مشروط ومحفزات قواعد العمل', 'موافقات فردية ومتوازية ومتعددة المستويات', 'دورة مسودة ونشر مع إصدارات', 'منفذون ونماذج وصلاحيات لكل خطوة'],
    },
    steps: {
      en: ['Create the process and choose its request type.', 'Add stages and steps, and assign performers.', 'Define form fields, conditions and rules.', 'Test the draft, then publish.'],
      ar: ['أنشئ العملية واختر نوع الطلب.', 'أضف المراحل والخطوات وعيّن المنفذين.', 'عرّف حقول النموذج والشروط والقواعد.', 'اختبر المسودة ثم انشرها.'],
    },
    config: {
      en: [['Request type', 'Groups processes by business category.'], ['Step performer', 'The user, group or role responsible for a step.'], ['Rules & triggers', 'Conditions that route a request or perform actions automatically.'], ['Version', 'Draft and published states for safe change.']],
      ar: [['نوع الطلب', 'تجميع العمليات حسب الفئة التجارية.'], ['منفذ الخطوة', 'المستخدم أو المجموعة أو الدور المسؤول عن الخطوة.'], ['القواعد والمحفزات', 'شروط توجّه الطلب أو تنفذ إجراءات تلقائيًا.'], ['الإصدار', 'حالتا مسودة ومنشور لتغيير آمن.']],
    },
    faq: {
      en: [['Can business users edit a process?', 'Only administrators with process-management permission can change a process; everyone else works with the published version.'], ['How do I test safely?', 'Keep changes in draft and submit test requests before publishing.']],
      ar: [['هل يمكن لمستخدمي الأعمال تعديل العملية؟', 'يمكن فقط للمسؤولين الذين لديهم صلاحية إدارة العمليات تعديلها، بينما يعمل الجميع على النسخة المنشورة.'], ['كيف أختبر بأمان؟', 'أبقِ التعديلات كمسودة وقدّم طلبات تجريبية قبل النشر.']],
    },
  },
  {
    id: 'requests',
    icon: 'inbox',
    title: { en: 'Requests', ar: 'الطلبات' },
    summary: { en: 'Create, route, perform and track requests with full conversation and activity history.', ar: 'إنشاء الطلبات وتوجيهها وتنفيذها وتتبعها مع سجل كامل للمحادثات والنشاط.' },
    overview: {
      en: 'Requests are the day-to-day heart of the system. Users raise a request from a published process, the platform routes it step by step, and every action is recorded in the request’s conversation and activity log.',
      ar: 'الطلبات هي قلب العمل اليومي. يرفع المستخدم طلبًا من عملية منشورة، وتوجّهه المنصة خطوة بخطوة، ويُسجل كل إجراء في محادثة الطلب وسجل نشاطه.',
    },
    features: {
      en: ['Create requests from any published process', 'Smart lists with filters, search and saved views', 'Assign, reassign, delegate and perform steps', 'Comments, attachments and a conversation tab', 'Complete activity and audit trail'],
      ar: ['إنشاء طلبات من أي عملية منشورة', 'قوائم ذكية بمرشحات وبحث وعروض محفوظة', 'إسناد وإعادة إسناد وتفويض وتنفيذ الخطوات', 'تعليقات ومرفقات وتبويب محادثة', 'سجل نشاط وتدقيق كامل'],
    },
    steps: {
      en: ['Choose a process and fill in the request form.', 'The request is routed to the performer of the first step.', 'Performers act on the step — approve, reject, return or complete.', 'The request advances until the final step closes it.'],
      ar: ['اختر العملية واملأ نموذج الطلب.', 'يُوجَّه الطلب إلى منفذ الخطوة الأولى.', 'يتصرف المنفذون في الخطوة — موافقة أو رفض أو إعادة أو إكمال.', 'يتقدم الطلب حتى تغلقه الخطوة الأخيرة.'],
    },
    config: {
      en: [['Request list views', 'Filters by status, process, assignee and dates.'], ['Attachments', 'Allowed file types and size limits per field.'], ['Delegation', 'Hand a step to another user for a period.'], ['Activity log', 'Read-only history of who did what and when.']],
      ar: [['عروض قائمة الطلبات', 'مرشحات حسب الحالة والعملية والمسند إليه والتواريخ.'], ['المرفقات', 'أنواع الملفات المسموحة وحدود الحجم لكل حقل.'], ['التفويض', 'تسليم خطوة لمستخدم آخر لفترة محددة.'], ['سجل النشاط', 'سجل للقراءة فقط لمن فعل ماذا ومتى.']],
    },
    faq: {
      en: [['Can I see what happened to a request?', 'Yes — the activity log and conversation tab show every action, comment and transition.'], ['Can a request be returned to a previous step?', 'Yes, when the process allows a return action for that step.']],
      ar: [['هل أستطيع معرفة ما جرى للطلب؟', 'نعم — يعرض سجل النشاط وتبويب المحادثة كل إجراء وتعليق وانتقال.'], ['هل يمكن إعادة الطلب لخطوة سابقة؟', 'نعم، عندما تسمح العملية بإجراء الإعادة لتلك الخطوة.']],
    },
  },
  {
    id: 'customer-portal',
    icon: 'users',
    title: { en: 'Customer Portal', ar: 'بوابة العملاء' },
    summary: { en: 'A simple, branded portal where customers submit requests and follow their progress.', ar: 'بوابة بسيطة بهوية مؤسستك يقدّم فيها العملاء طلباتهم ويتابعون تقدمها.' },
    overview: {
      en: 'The Customer Portal gives external users — customers and vendors — a focused interface separate from the internal application. They can raise requests, look up status and read helpful articles without seeing internal details.',
      ar: 'تمنح بوابة العملاء المستخدمين الخارجيين — عملاء وموردين — واجهة مركّزة منفصلة عن التطبيق الداخلي. يمكنهم رفع الطلبات والاستعلام عن الحالة وقراءة المقالات المفيدة دون رؤية التفاصيل الداخلية.',
    },
    features: {
      en: ['Dedicated home page with quick actions', 'Submit new requests from exposed processes', 'Request inquiry by reference number', 'Knowledge-base articles for self-service', 'Arabic and English interface'],
      ar: ['صفحة رئيسية مخصصة بإجراءات سريعة', 'تقديم طلبات جديدة من العمليات المتاحة', 'الاستعلام عن الطلب برقم المرجع', 'مقالات قاعدة المعرفة للخدمة الذاتية', 'واجهة بالعربية والإنجليزية'],
    },
    steps: {
      en: ['Decide which processes are available to customers.', 'Create or invite customer accounts.', 'Customers sign in, submit and track their requests.', 'Staff respond through the normal Requests module.'],
      ar: ['حدّد العمليات المتاحة للعملاء.', 'أنشئ حسابات العملاء أو ادعُهم.', 'يسجل العملاء الدخول ويقدمون طلباتهم ويتابعونها.', 'يرد الموظفون عبر وحدة الطلبات المعتادة.'],
    },
    config: {
      en: [['Exposed processes', 'Which processes appear in the portal.'], ['Customer accounts', 'Managed in Users & Groups → customers and vendors.'], ['Visible fields', 'Which request information customers can see.'], ['Language', 'Default portal language per customer.']],
      ar: [['العمليات المتاحة', 'العمليات التي تظهر في البوابة.'], ['حسابات العملاء', 'تُدار من المستخدمون والمجموعات ← العملاء والموردون.'], ['الحقول الظاهرة', 'معلومات الطلب التي يراها العميل.'], ['اللغة', 'لغة البوابة الافتراضية لكل عميل.']],
    },
    faq: {
      en: [['Do customers see internal comments?', 'No. Only information explicitly shared with the customer is visible.'], ['Can customers upload files?', 'Yes, where the request form includes an attachment field.']],
      ar: [['هل يرى العملاء التعليقات الداخلية؟', 'لا. تظهر فقط المعلومات المشاركة صراحةً مع العميل.'], ['هل يستطيع العملاء رفع ملفات؟', 'نعم، حيث يتضمن نموذج الطلب حقل مرفقات.']],
    },
  },
  {
    id: 'dashboards-reports',
    icon: 'chart',
    title: { en: 'Dashboards & Reports', ar: 'لوحات المعلومات والتقارير' },
    summary: { en: 'Live dashboards and dynamic reports that turn process data into decisions.', ar: 'لوحات معلومات حية وتقارير ديناميكية تحوّل بيانات العمليات إلى قرارات.' },
    overview: {
      en: 'See workload, cycle times and SLA performance at a glance, then drill into the underlying requests. Dynamic reports let administrators build and share their own views of the data.',
      ar: 'اطلع على حجم العمل وأزمنة الدورة وأداء اتفاقيات الخدمة بنظرة واحدة، ثم تعمق في الطلبات الأساسية. تتيح التقارير الديناميكية للمسؤولين بناء عروضهم الخاصة للبيانات ومشاركتها.',
    },
    features: {
      en: ['Role-aware dashboards with key metrics', 'Drill down from charts to request lists', 'Dynamic report builder with filters and columns', 'Scheduled and exportable reports', 'SLA compliance and bottleneck views'],
      ar: ['لوحات معلومات تراعي الدور بمؤشرات رئيسية', 'التعمق من الرسوم إلى قوائم الطلبات', 'منشئ تقارير ديناميكي بمرشحات وأعمدة', 'تقارير مجدولة وقابلة للتصدير', 'عروض الالتزام باتفاقيات الخدمة والاختناقات'],
    },
    steps: {
      en: ['Open the dashboard that matches your role.', 'Filter by process, period or team.', 'Drill into a metric to see the requests behind it.', 'Save or export a report to share.'],
      ar: ['افتح لوحة المعلومات المناسبة لدورك.', 'صفِّ حسب العملية أو الفترة أو الفريق.', 'تعمق في المؤشر لرؤية الطلبات خلفه.', 'احفظ التقرير أو صدّره للمشاركة.'],
    },
    config: {
      en: [['Report definition', 'Data source, filters, columns and grouping.'], ['Access', 'Who can view or edit a report.'], ['Export', 'Excel / CSV output for further analysis.'], ['Refresh', 'Dashboards read live data on load.']],
      ar: [['تعريف التقرير', 'مصدر البيانات والمرشحات والأعمدة والتجميع.'], ['الوصول', 'من يستطيع عرض التقرير أو تعديله.'], ['التصدير', 'مخرجات Excel / CSV لمزيد من التحليل.'], ['التحديث', 'تقرأ لوحات المعلومات بيانات حية عند التحميل.']],
    },
    faq: {
      en: [['Can I build my own report?', 'Yes, with the dynamic report builder if you have the reporting permission.'], ['Can reports be exported?', 'Yes, results can be exported for use in spreadsheets and BI tools.']],
      ar: [['هل أستطيع بناء تقريري الخاص؟', 'نعم، باستخدام منشئ التقارير الديناميكي إذا كانت لديك صلاحية التقارير.'], ['هل يمكن تصدير التقارير؟', 'نعم، يمكن تصدير النتائج للجداول وأدوات ذكاء الأعمال.']],
    },
  },
  {
    id: 'users-groups',
    icon: 'users',
    title: { en: 'Users & Groups', ar: 'المستخدمون والمجموعات' },
    summary: { en: 'Manage organisation structure, users, groups, roles, customers and vendors.', ar: 'إدارة هيكل المؤسسة والمستخدمين والمجموعات والأدوار والعملاء والموردين.' },
    overview: {
      en: 'Access in the system flows from the organisation structure. Users belong to groups and roles; groups and roles decide who can start, perform and see which processes and screens.',
      ar: 'ينبع الوصول في النظام من هيكل المؤسسة. ينتمي المستخدمون إلى مجموعات وأدوار، وتحدد هذه من يستطيع بدء العمليات وتنفيذها ورؤية الشاشات.',
    },
    features: {
      en: ['Organisation units and hierarchy', 'User profiles, activation and language', 'Groups used as step performers', 'Role-based permissions', 'Customers and vendors as separate account types'],
      ar: ['وحدات المؤسسة والتسلسل الهرمي', 'ملفات المستخدمين والتفعيل واللغة', 'مجموعات تُستخدم كمنفذين للخطوات', 'صلاحيات حسب الدور', 'العملاء والموردون كأنواع حسابات منفصلة'],
    },
    steps: {
      en: ['Define the organisation structure.', 'Create groups and roles.', 'Add or import users and place them in groups.', 'Review permissions with a test account.'],
      ar: ['حدّد هيكل المؤسسة.', 'أنشئ المجموعات والأدوار.', 'أضف المستخدمين أو استورِدهم وضعهم في مجموعات.', 'راجع الصلاحيات بحساب تجريبي.'],
    },
    config: {
      en: [['Organisation unit', 'Department / branch hierarchy.'], ['Group', 'A set of users that can perform a step together.'], ['Role', 'A bundle of permissions assigned to users.'], ['Account status', 'Active, inactive or locked.']],
      ar: [['وحدة المؤسسة', 'تسلسل الأقسام والفروع.'], ['المجموعة', 'مجموعة مستخدمين يمكنها تنفيذ خطوة معًا.'], ['الدور', 'حزمة صلاحيات تُمنح للمستخدمين.'], ['حالة الحساب', 'نشط أو غير نشط أو مقفل.']],
    },
    faq: {
      en: [['Can I import users?', 'Yes — directly from Active Directory (see Identity & Directory) or by bulk upload.'], ['What is the difference between groups and roles?', 'Groups decide who performs work; roles decide what screens and actions a user may use.']],
      ar: [['هل يمكن استيراد المستخدمين؟', 'نعم — من Active Directory مباشرة (انظر الهوية والدليل) أو بالرفع الجماعي.'], ['ما الفرق بين المجموعات والأدوار؟', 'تحدد المجموعات من ينفذ العمل، وتحدد الأدوار الشاشات والإجراءات المسموحة للمستخدم.']],
    },
  },
  {
    id: 'notifications',
    icon: 'bell',
    title: { en: 'Notifications', ar: 'الإشعارات' },
    summary: { en: 'In-app and email notifications that tell people exactly when they need to act.', ar: 'إشعارات داخل التطبيق وعبر البريد تخبر الناس بدقة متى يجب أن يتصرفوا.' },
    overview: {
      en: 'Notifications keep work moving without people refreshing lists. Administrators configure which events notify whom, using templates in each language.',
      ar: 'تُبقي الإشعارات العمل متحركًا دون أن يحدّث الناس القوائم. يضبط المسؤولون أي الأحداث تُبلّغ من، باستخدام قوالب بكل لغة.',
    },
    features: {
      en: ['In-app notification centre', 'Email notifications from templates', 'Event-based rules (assigned, overdue, completed…)', 'Per-language templates with placeholders', 'User preferences'],
      ar: ['مركز إشعارات داخل التطبيق', 'إشعارات بريدية من قوالب', 'قواعد حسب الحدث (إسناد، تأخر، إكمال…)', 'قوالب لكل لغة مع متغيرات', 'تفضيلات المستخدم'],
    },
    steps: {
      en: ['Choose the event, e.g. “step assigned”.', 'Pick recipients: performer, requester, group or manager.', 'Write the template in each language.', 'Enable and test with a sample request.'],
      ar: ['اختر الحدث مثل «إسناد خطوة».', 'اختر المستلمين: المنفذ أو مقدم الطلب أو المجموعة أو المدير.', 'اكتب القالب بكل لغة.', 'فعّل واختبر بطلب تجريبي.'],
    },
    config: {
      en: [['Event', 'The trigger for a notification.'], ['Recipients', 'Who receives it.'], ['Template', 'Subject and body with placeholders.'], ['Channel', 'In-app, email, or both.']],
      ar: [['الحدث', 'المحفز للإشعار.'], ['المستلمون', 'من يستلمه.'], ['القالب', 'الموضوع والنص مع متغيرات.'], ['القناة', 'داخل التطبيق أو البريد أو كلاهما.']],
    },
    faq: {
      en: [['Can users mute notifications?', 'Users can manage their preferences; critical notifications can be kept mandatory.'], ['Are templates language-aware?', 'Yes, each recipient receives the template in their own language.']],
      ar: [['هل يمكن للمستخدمين كتم الإشعارات؟', 'يدير المستخدمون تفضيلاتهم، ويمكن إبقاء الإشعارات الحرجة إلزامية.'], ['هل القوالب تراعي اللغة؟', 'نعم، يستلم كل مستلم القالب بلغته.']],
    },
  },
  {
    id: 'time-sla',
    icon: 'clock',
    title: { en: 'Time & SLA', ar: 'الوقت واتفاقيات الخدمة' },
    summary: { en: 'Working calendars, holidays and service-level targets for every step.', ar: 'تقاويم عمل وعطلات ومستهدفات مستوى الخدمة لكل خطوة.' },
    overview: {
      en: 'Deadlines only make sense against real working time. Define calendars and holidays once; steps then measure duration and due dates correctly, and overdue work is flagged automatically.',
      ar: 'لا معنى للمواعيد النهائية إلا مقابل وقت العمل الحقيقي. عرّف التقاويم والعطلات مرة واحدة، فتقيس الخطوات المدد وتواريخ الاستحقاق بدقة ويُعلَّم العمل المتأخر تلقائيًا.',
    },
    features: {
      en: ['Working days and hours per calendar', 'Official and company holidays', 'SLA target per step or process', 'Overdue and at-risk highlighting', 'Calendar-aware due-date calculation'],
      ar: ['أيام وساعات العمل لكل تقويم', 'العطلات الرسمية وعطلات الشركة', 'مستهدف اتفاقية خدمة لكل خطوة أو عملية', 'إبراز المتأخر والمعرّض للتأخر', 'حساب تاريخ الاستحقاق وفق التقويم'],
    },
    steps: {
      en: ['Create the working calendar.', 'Add holidays for the year.', 'Set SLA targets on steps or processes.', 'Monitor compliance in the dashboards.'],
      ar: ['أنشئ تقويم العمل.', 'أضف عطلات السنة.', 'حدّد مستهدفات الخدمة على الخطوات أو العمليات.', 'راقب الالتزام في لوحات المعلومات.'],
    },
    config: {
      en: [['Working week', 'Days and hours counted as working time.'], ['Holiday', 'Dates excluded from working time.'], ['SLA target', 'Allowed duration for a step or process.'], ['Escalation', 'Action when a target is missed.']],
      ar: [['أسبوع العمل', 'الأيام والساعات المحتسبة كوقت عمل.'], ['العطلة', 'تواريخ مستثناة من وقت العمل.'], ['مستهدف الخدمة', 'المدة المسموحة لخطوة أو عملية.'], ['التصعيد', 'الإجراء عند تفويت المستهدف.']],
    },
    faq: {
      en: [['Can different teams have different calendars?', 'Yes, create several calendars and assign them where needed.'], ['Are weekends configurable?', 'Yes, the working week is fully configurable.']],
      ar: [['هل يمكن لفرق مختلفة أن تملك تقاويم مختلفة؟', 'نعم، أنشئ عدة تقاويم وعيّنها حيث يلزم.'], ['هل عطلة نهاية الأسبوع قابلة للضبط؟', 'نعم، أسبوع العمل قابل للضبط بالكامل.']],
    },
  },
  {
    id: 'knowledge-base',
    icon: 'book',
    title: { en: 'Knowledge Base', ar: 'قاعدة المعرفة' },
    summary: { en: 'Categorised articles that help users and customers solve things themselves.', ar: 'مقالات مصنفة تساعد المستخدمين والعملاء على الحل بأنفسهم.' },
    overview: {
      en: 'Capture answers once and reuse them. Articles are organised in categories and can be shown to staff, customers or both — reducing repeated requests.',
      ar: 'دوّن الإجابات مرة واحدة وأعد استخدامها. تُنظَّم المقالات في فئات ويمكن عرضها للموظفين أو العملاء أو كليهما — مما يقلل الطلبات المتكررة.',
    },
    features: {
      en: ['Rich-text articles with images and attachments', 'Category tree', 'Search across titles and content', 'Audience control: staff, customers or both', 'Available inside the Customer Portal'],
      ar: ['مقالات نصية منسقة بصور ومرفقات', 'شجرة فئات', 'بحث في العناوين والمحتوى', 'التحكم بالجمهور: موظفون أو عملاء أو كلاهما', 'متاحة داخل بوابة العملاء'],
    },
    steps: {
      en: ['Create categories.', 'Write an article and choose its audience.', 'Publish — it appears in search and the portal.', 'Review and update articles regularly.'],
      ar: ['أنشئ الفئات.', 'اكتب مقالًا وحدد جمهوره.', 'انشر — فيظهر في البحث والبوابة.', 'راجع المقالات وحدّثها بانتظام.'],
    },
    config: {
      en: [['Category', 'Hierarchy used to organise articles.'], ['Audience', 'Who may read the article.'], ['Status', 'Draft or published.'], ['Attachments', 'Files linked to an article.']],
      ar: [['الفئة', 'التسلسل المستخدم لتنظيم المقالات.'], ['الجمهور', 'من يحق له قراءة المقال.'], ['الحالة', 'مسودة أو منشور.'], ['المرفقات', 'ملفات مرتبطة بالمقال.']],
    },
    faq: {
      en: [['Can articles be written in both languages?', 'Yes, publish an Arabic and an English version of the same topic.'], ['Who can edit articles?', 'Users with the knowledge-base permission.']],
      ar: [['هل يمكن كتابة المقالات باللغتين؟', 'نعم، انشر نسخة عربية وأخرى إنجليزية للموضوع نفسه.'], ['من يستطيع تعديل المقالات؟', 'المستخدمون الذين لديهم صلاحية قاعدة المعرفة.']],
    },
  },
  {
    id: 'identity-directory',
    icon: 'lock',
    title: { en: 'Identity & Directory', ar: 'الهوية والدليل' },
    summary: { en: 'Sign in with Active Directory or Google, and keep user data in sync.', ar: 'تسجيل الدخول عبر Active Directory أو Google مع مزامنة بيانات المستخدمين.' },
    overview: {
      en: 'Connect the system to your existing identity provider so users sign in with the credentials they already have, and so joiners, movers and leavers are reflected automatically.',
      ar: 'اربط النظام بمزود الهوية لديك ليسجل المستخدمون الدخول ببياناتهم الحالية، وتنعكس حالات الانضمام والنقل والمغادرة تلقائيًا.',
    },
    features: {
      en: ['Active Directory / LDAP user import and sync', 'Google OAuth sign-in', 'Email-and-password sign-in with policies', 'Automatic account activation and deactivation', 'Audit of sign-in activity'],
      ar: ['استيراد ومزامنة مستخدمي Active Directory / LDAP', 'تسجيل الدخول عبر Google OAuth', 'دخول بالبريد وكلمة المرور مع سياسات', 'تفعيل وتعطيل الحسابات تلقائيًا', 'تدقيق نشاط تسجيل الدخول'],
    },
    steps: {
      en: ['Register the directory connection details.', 'Map directory fields to user fields.', 'Run a first import and review the result.', 'Enable scheduled sync.'],
      ar: ['سجّل بيانات الاتصال بالدليل.', 'اربط حقول الدليل بحقول المستخدم.', 'شغّل أول استيراد وراجع النتيجة.', 'فعّل المزامنة المجدولة.'],
    },
    config: {
      en: [['Directory server', 'Host, port and base DN.'], ['Field mapping', 'Directory attributes → user fields.'], ['Sync schedule', 'How often users are refreshed.'], ['OAuth client', 'Google client ID configured by the administrator.']],
      ar: [['خادم الدليل', 'المضيف والمنفذ وBase DN.'], ['ربط الحقول', 'سمات الدليل ← حقول المستخدم.'], ['جدول المزامنة', 'عدد مرات تحديث المستخدمين.'], ['عميل OAuth', 'معرّف عميل Google الذي يضبطه المسؤول.']],
    },
    faq: {
      en: [['Is single sign-on supported?', 'Google sign-in and directory-based sign-in are supported; additional providers can be added through integration services.'], ['What happens when someone leaves?', 'Their directory account is disabled and the user is deactivated on the next sync.']],
      ar: [['هل يدعم النظام الدخول الموحد؟', 'يدعم الدخول عبر Google وعبر الدليل، ويمكن إضافة مزودين آخرين عبر خدمات التكامل.'], ['ماذا يحدث عند مغادرة موظف؟', 'يُعطَّل حسابه في الدليل ويُعطَّل المستخدم في المزامنة التالية.']],
    },
  },
  {
    id: 'developer-space',
    icon: 'code',
    title: { en: 'Developer Space', ar: 'مساحة المطورين' },
    summary: { en: 'APIs and tools to integrate the platform with your other systems.', ar: 'واجهات برمجية وأدوات لدمج المنصة مع أنظمتك الأخرى.' },
    overview: {
      en: 'Developer Space is the technical entry point for integrators: authenticated APIs to create and read requests, plus configuration to call out to external systems when a step runs.',
      ar: 'مساحة المطورين هي نقطة الدخول التقنية للمدمجين: واجهات موثقة لإنشاء الطلبات وقراءتها، وإعدادات لاستدعاء أنظمة خارجية عند تنفيذ خطوة.',
    },
    features: {
      en: ['REST API with token authentication', 'Create, read and update requests programmatically', 'Outbound calls from process steps', 'Interactive API reference', 'Sandbox-friendly configuration'],
      ar: ['واجهة REST بمصادقة بالرمز', 'إنشاء الطلبات وقراءتها وتحديثها برمجيًا', 'استدعاءات صادرة من خطوات العملية', 'مرجع واجهات تفاعلي', 'إعدادات ملائمة لبيئات الاختبار'],
    },
    steps: {
      en: ['Generate an API credential for the integration.', 'Explore endpoints in the API reference.', 'Call the API from your system.', 'Add an outbound call to a process step if needed.'],
      ar: ['أنشئ بيانات اعتماد للتكامل.', 'استكشف نقاط النهاية في مرجع الواجهات.', 'استدعِ الواجهة من نظامك.', 'أضف استدعاءً صادرًا لخطوة عند الحاجة.'],
    },
    config: {
      en: [['API credential', 'Token tied to an integration user.'], ['Base URL', 'Environment-specific API address.'], ['Outbound call', 'URL, method and payload sent from a step.'], ['Permissions', 'Integration users get least-privilege roles.']],
      ar: [['بيانات اعتماد الواجهة', 'رمز مرتبط بمستخدم التكامل.'], ['العنوان الأساسي', 'عنوان الواجهة حسب البيئة.'], ['الاستدعاء الصادر', 'العنوان والطريقة والبيانات المرسلة من الخطوة.'], ['الصلاحيات', 'يحصل مستخدمو التكامل على أقل صلاحيات لازمة.']],
    },
    faq: {
      en: [['Do you offer integration help?', 'Yes — see our Integration service for end-to-end delivery.'], ['Is there a test environment?', 'We recommend a separate environment; our team can help set one up.']],
      ar: [['هل تقدمون مساعدة في التكامل؟', 'نعم — راجع خدمة التكامل للتنفيذ الشامل.'], ['هل تتوفر بيئة اختبار؟', 'ننصح ببيئة منفصلة، ويمكن لفريقنا المساعدة في إعدادها.']],
    },
  },
  {
    id: 'administration',
    icon: 'sliders',
    title: { en: 'Administration', ar: 'الإدارة' },
    summary: { en: 'Organisation settings, translations, licensing and system-wide configuration.', ar: 'إعدادات المؤسسة والترجمات والترخيص والإعدادات العامة للنظام.' },
    overview: {
      en: 'The administration area gathers system-wide settings: organisation details, interface translations in each language, licence status and operational configuration.',
      ar: 'تجمع منطقة الإدارة الإعدادات العامة للنظام: بيانات المؤسسة وترجمات الواجهة بكل لغة وحالة الترخيص والإعدادات التشغيلية.',
    },
    features: {
      en: ['Organisation profile and branding', 'Editable translations for every interface language', 'Licence overview and usage', 'System-level request settings', 'Admin-only access with audit'],
      ar: ['ملف المؤسسة والهوية البصرية', 'ترجمات قابلة للتعديل لكل لغة واجهة', 'نظرة على الترخيص والاستخدام', 'إعدادات الطلبات على مستوى النظام', 'وصول للمسؤولين فقط مع تدقيق'],
    },
    steps: {
      en: ['Open Administration from the main menu.', 'Update organisation details and branding.', 'Review translations for your languages.', 'Check licence status before adding users.'],
      ar: ['افتح الإدارة من القائمة الرئيسية.', 'حدّث بيانات المؤسسة والهوية.', 'راجع الترجمات للغاتك.', 'تحقق من حالة الترخيص قبل إضافة المستخدمين.'],
    },
    config: {
      en: [['Organisation', 'Name, logo and contact details.'], ['Translations', 'Override interface text per language.'], ['Licence', 'Edition, validity and user limits.'], ['Request settings', 'Global defaults for requests.']],
      ar: [['المؤسسة', 'الاسم والشعار وبيانات الاتصال.'], ['الترجمات', 'تعديل نصوص الواجهة لكل لغة.'], ['الترخيص', 'الإصدار والصلاحية وحدود المستخدمين.'], ['إعدادات الطلبات', 'الإعدادات الافتراضية العامة للطلبات.']],
    },
    faq: {
      en: [['Can I change interface wording?', 'Yes, through the translations screen — no deployment needed.'], ['Who can open Administration?', 'Only users granted administrator permissions.']],
      ar: [['هل أستطيع تغيير صياغة الواجهة؟', 'نعم، من شاشة الترجمات — دون نشر جديد.'], ['من يستطيع فتح الإدارة؟', 'فقط المستخدمون الممنوحون صلاحيات المسؤول.']],
    },
  },
];
