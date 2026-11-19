// Custom Portal SDB.
// TODO: real content — everything below was ported from legacy/src/content/{sdb,extras}.mjs, which was
// already PLACEHOLDER copy for "SDB". Rewrite tagline, summary, capabilities, modules, use cases and upcoming.
import type { Product } from '../../types';
import { audiencePlaceholder } from '../../placeholders';
import { api } from './api';
import { customPortalSdbMeta } from './meta';
import { pricing } from './pricing';
import { releases } from './releases';

const content = {
  capabilities: [
    {
      icon: 'layers',
      title: {
        en: 'Model once',
        ar: 'نمذجة مرة واحدة',
      },
      desc: {
        en: 'Define entities and relations visually; the platform handles the rest.',
        ar: 'عرّف الكيانات والعلاقات بصريًا وتتولى المنصة الباقي.',
      },
    },
    {
      icon: 'plug',
      title: {
        en: 'Connect anything',
        ar: 'اربط أي مصدر',
      },
      desc: {
        en: 'Connectors and APIs bring data in and serve it out securely.',
        ar: 'موصلات وواجهات تُدخل البيانات وتقدمها للخارج بأمان.',
      },
    },
    {
      icon: 'shield',
      title: {
        en: 'Protect it',
        ar: 'احمِها',
      },
      desc: {
        en: 'Fine-grained access, encryption, backups and a complete audit trail.',
        ar: 'صلاحيات دقيقة وتشفير ونسخ احتياطية وسجل تدقيق كامل.',
      },
    },
  ],
  docs: {
    gettingStarted: {
      en: [
        'Create a workspace and invite your team (Security & Access).',
        'Model your first entities and relations (Data Modeling).',
        'Connect a source or import existing data (Connectors, Migration & Sync).',
        'Expose the data through a secured endpoint (Query & API).',
        'Turn on backups and monitoring before going live.',
      ],
      ar: [
        'أنشئ مساحة عمل وادعُ فريقك (الأمان والصلاحيات).',
        'نمذج أول كياناتك وعلاقاتك (نمذجة البيانات).',
        'اربط مصدرًا أو استورد بيانات قائمة (الموصلات، الترحيل والمزامنة).',
        'اعرض البيانات عبر نقطة نهاية آمنة (الاستعلام والواجهات).',
        'فعّل النسخ الاحتياطي والمراقبة قبل الإطلاق.',
      ],
    },
    groups: [
      {
        label: {
          en: 'Model',
          ar: 'النمذجة',
        },
        modules: ['data-modeling'],
      },
      {
        label: {
          en: 'Connect',
          ar: 'الربط',
        },
        modules: ['connectors', 'query-api', 'migration-sync'],
      },
      {
        label: {
          en: 'Protect',
          ar: 'الحماية',
        },
        modules: ['security-access', 'backup-recovery'],
      },
      {
        label: {
          en: 'Operate',
          ar: 'التشغيل',
        },
        modules: ['monitoring-audit'],
      },
    ],
    modules: [
      {
        id: 'data-modeling',
        icon: 'layers',
        title: {
          en: 'Data Modeling',
          ar: 'نمذجة البيانات',
        },
        summary: {
          en: 'Define entities, fields, relations and validation rules visually.',
          ar: 'عرّف الكيانات والحقول والعلاقات وقواعد التحقق بصريًا.',
        },
        overview: {
          en: 'Data Modeling is the foundation of SDB. You describe the business objects you care about — customers, assets, contracts — and how they relate. The platform creates and evolves the storage underneath.',
          ar: 'نمذجة البيانات هي أساس SDB. تصف الكائنات التي تهمك — العملاء والأصول والعقود — وكيف ترتبط. وتنشئ المنصة التخزين وتطوره خلفها.',
        },
        features: {
          en: [
            'Visual entity and relation designer',
            'Typed fields with defaults and validation',
            'Schema versioning and safe migrations',
            'Reusable field and entity templates',
            'Documentation generated from the model',
          ],
          ar: [
            'مصمم بصري للكيانات والعلاقات',
            'حقول مُنمَّطة بقيم افتراضية وتحقق',
            'إصدارات للمخطط وترحيلات آمنة',
            'قوالب حقول وكيانات قابلة لإعادة الاستخدام',
            'توثيق مُولَّد من النموذج',
          ],
        },
        steps: {
          en: [
            'Create an entity and add fields.',
            'Define relations to other entities.',
            'Add validation and uniqueness rules.',
            'Publish the schema version.',
          ],
          ar: [
            'أنشئ كيانًا وأضف حقوله.',
            'عرّف العلاقات مع الكيانات الأخرى.',
            'أضف قواعد التحقق والتفرد.',
            'انشر إصدار المخطط.',
          ],
        },
        config: {
          en: [
            ['Entity', 'A business object stored as a table or collection.'],
            ['Field type', 'Text, number, date, choice, file, reference…'],
            ['Relation', 'One-to-one, one-to-many or many-to-many link.'],
            ['Schema version', 'A published, auditable state of the model.'],
          ],
          ar: [
            ['الكيان', 'كائن تجاري يُخزَّن كجدول أو مجموعة.'],
            ['نوع الحقل', 'نص أو رقم أو تاريخ أو اختيار أو ملف أو مرجع…'],
            ['العلاقة', 'ارتباط واحد لواحد أو واحد لمتعدد أو متعدد لمتعدد.'],
            ['إصدار المخطط', 'حالة منشورة وقابلة للتدقيق للنموذج.'],
          ],
        },
        faq: {
          en: [
            [
              'Can I change a model after data exists?',
              'Yes — schema changes are versioned and checked before they are applied.',
            ],
            ['Can I export the model?', 'Yes, the model and its documentation can be exported.'],
          ],
          ar: [
            [
              'هل أستطيع تغيير النموذج بعد وجود بيانات؟',
              'نعم — تُرقَّم تغييرات المخطط بإصدارات وتُفحص قبل تطبيقها.',
            ],
            ['هل يمكن تصدير النموذج؟', 'نعم، يمكن تصدير النموذج وتوثيقه.'],
          ],
        },
      },
      {
        id: 'connectors',
        icon: 'plug',
        title: {
          en: 'Connectors',
          ar: 'الموصلات',
        },
        summary: {
          en: 'Bring data in from databases, files and business applications.',
          ar: 'أدخل البيانات من قواعد البيانات والملفات وتطبيقات الأعمال.',
        },
        overview: {
          en: 'Connectors link SDB to the systems that already hold your data. Each connector handles authentication, scheduling and mapping so data arrives clean and on time.',
          ar: 'تربط الموصلات SDB بالأنظمة التي تحتفظ ببياناتك أصلًا. يتولى كل موصل المصادقة والجدولة والربط لتصل البيانات نظيفة وفي موعدها.',
        },
        features: {
          en: [
            'Relational database and file connectors',
            'REST / webhook source connector',
            'Field mapping and transformation',
            'Scheduled and on-demand runs',
            'Credential vault',
          ],
          ar: [
            'موصلات قواعد بيانات علائقية وملفات',
            'موصل مصدر REST / Webhook',
            'ربط الحقول والتحويل',
            'تشغيل مجدول وعند الطلب',
            'خزنة بيانات اعتماد',
          ],
        },
        steps: {
          en: [
            'Choose a connector type and enter connection details.',
            'Test the connection.',
            'Map source fields to your model.',
            'Run once, review, then schedule.',
          ],
          ar: [
            'اختر نوع الموصل وأدخل بيانات الاتصال.',
            'اختبر الاتصال.',
            'اربط حقول المصدر بنموذجك.',
            'شغّل مرة وراجع ثم جدول.',
          ],
        },
        config: {
          en: [
            ['Connection', 'Host, credentials and options for the source.'],
            ['Mapping', 'Source → entity field transformations.'],
            ['Schedule', 'Cron-style or interval-based runs.'],
            ['On error', 'Retry, skip or stop with alert.'],
          ],
          ar: [
            ['الاتصال', 'المضيف وبيانات الاعتماد وخيارات المصدر.'],
            ['الربط', 'تحويلات حقول المصدر ← الكيان.'],
            ['الجدول', 'تشغيل بنمط cron أو بفاصل زمني.'],
            ['عند الخطأ', 'إعادة المحاولة أو التخطي أو الإيقاف مع تنبيه.'],
          ],
        },
        faq: {
          en: [
            [
              'Are credentials stored securely?',
              'Yes, they are encrypted and never shown after saving.',
            ],
            ['Need a connector we do not have?', 'Our Integration service can build one for you.'],
          ],
          ar: [
            ['هل تُخزَّن بيانات الاعتماد بأمان؟', 'نعم، تُشفَّر ولا تُعرض بعد الحفظ.'],
            ['تحتاج موصلًا غير موجود؟', 'تستطيع خدمة التكامل لدينا بناءه لك.'],
          ],
        },
      },
      {
        id: 'query-api',
        icon: 'code',
        title: {
          en: 'Query & API',
          ar: 'الاستعلام والواجهات',
        },
        summary: {
          en: 'Query data and expose it through secured, documented APIs.',
          ar: 'استعلم عن البيانات وأتحها عبر واجهات آمنة وموثقة.',
        },
        overview: {
          en: 'Every entity in your model is instantly available to query. Build saved queries, then publish them as REST endpoints with authentication, paging and rate limits.',
          ar: 'يتاح كل كيان في نموذجك للاستعلام فورًا. ابنِ استعلامات محفوظة ثم انشرها كنقاط REST بمصادقة وترقيم صفحات وحدود معدل.',
        },
        features: {
          en: [
            'Visual and SQL-style query builder',
            'Saved, parameterised queries',
            'Auto-generated REST endpoints',
            'Filtering, sorting and paging',
            'Interactive API reference',
          ],
          ar: [
            'منشئ استعلامات بصري وبنمط SQL',
            'استعلامات محفوظة بمعاملات',
            'نقاط REST مُولَّدة تلقائيًا',
            'تصفية وفرز وترقيم صفحات',
            'مرجع واجهات تفاعلي',
          ],
        },
        steps: {
          en: [
            'Build and test a query.',
            'Save it with parameters.',
            'Publish it as an endpoint and choose who can call it.',
            'Share the API reference with consumers.',
          ],
          ar: [
            'ابنِ استعلامًا واختبره.',
            'احفظه بمعاملات.',
            'انشره كنقطة نهاية وحدد من يستدعيها.',
            'شارك مرجع الواجهة مع المستهلكين.',
          ],
        },
        config: {
          en: [
            ['Saved query', 'Reusable query with named parameters.'],
            ['Endpoint', 'Published route, method and response shape.'],
            ['Rate limit', 'Calls per minute per client.'],
            ['API key / token', 'Credential identifying the caller.'],
          ],
          ar: [
            ['الاستعلام المحفوظ', 'استعلام قابل لإعادة الاستخدام بمعاملات مسماة.'],
            ['نقطة النهاية', 'المسار والطريقة وشكل الاستجابة المنشورة.'],
            ['حد المعدل', 'عدد الاستدعاءات في الدقيقة لكل عميل.'],
            ['مفتاح / رمز الواجهة', 'بيانات اعتماد تعرّف المستدعي.'],
          ],
        },
        faq: {
          en: [
            [
              'Can I limit which fields an API returns?',
              'Yes, each endpoint defines its response fields.',
            ],
            ['Is there pagination?', 'Yes, all list endpoints support paging.'],
          ],
          ar: [
            [
              'هل أستطيع تحديد الحقول التي تعيدها الواجهة؟',
              'نعم، تحدد كل نقطة نهاية حقول استجابتها.',
            ],
            ['هل يوجد ترقيم صفحات؟', 'نعم، تدعم كل نقاط القوائم الترقيم.'],
          ],
        },
      },
      {
        id: 'security-access',
        icon: 'lock',
        title: {
          en: 'Security & Access',
          ar: 'الأمان والصلاحيات',
        },
        summary: {
          en: 'Workspaces, roles and row/field-level permissions with encryption.',
          ar: 'مساحات عمل وأدوار وصلاحيات على مستوى الصف والحقل مع التشفير.',
        },
        overview: {
          en: 'Security in SDB is layered: who can enter a workspace, which entities they may use, and which rows and fields they can see or change. Data is encrypted in transit and at rest.',
          ar: 'الأمان في SDB متعدد الطبقات: من يدخل مساحة العمل، وأي الكيانات يستخدم، وأي الصفوف والحقول يراها أو يغيرها. تُشفَّر البيانات أثناء النقل وفي حالة السكون.',
        },
        features: {
          en: [
            'Workspaces and role-based access',
            'Row- and field-level permissions',
            'Encryption in transit and at rest',
            'Single sign-on and API tokens',
            'Masking for sensitive fields',
          ],
          ar: [
            'مساحات عمل وصلاحيات حسب الدور',
            'صلاحيات على مستوى الصف والحقل',
            'تشفير أثناء النقل وفي حالة السكون',
            'دخول موحد ورموز واجهات',
            'إخفاء الحقول الحساسة',
          ],
        },
        steps: {
          en: [
            'Create roles that match job functions.',
            'Grant entity and field permissions to each role.',
            'Add row-level conditions where needed.',
            'Assign users and review the effective access.',
          ],
          ar: [
            'أنشئ أدوارًا تطابق الوظائف.',
            'امنح صلاحيات الكيانات والحقول لكل دور.',
            'أضف شروطًا على مستوى الصف عند الحاجة.',
            'عيّن المستخدمين وراجع الوصول الفعلي.',
          ],
        },
        config: {
          en: [
            ['Role', 'Named set of permissions.'],
            ['Row filter', 'Condition limiting visible records.'],
            ['Field mask', 'Hide or partially show a sensitive field.'],
            ['Token', 'Scoped credential for applications.'],
          ],
          ar: [
            ['الدور', 'مجموعة صلاحيات مسماة.'],
            ['مرشح الصف', 'شرط يحدد السجلات الظاهرة.'],
            ['قناع الحقل', 'إخفاء الحقل الحساس أو إظهاره جزئيًا.'],
            ['الرمز', 'بيانات اعتماد محددة النطاق للتطبيقات.'],
          ],
        },
        faq: {
          en: [
            [
              'Can access be limited per department?',
              'Yes, with row-level filters tied to a user attribute.',
            ],
            ['Is every change audited?', 'Yes — see Monitoring & Audit.'],
          ],
          ar: [
            ['هل يمكن تقييد الوصول لكل قسم؟', 'نعم، بمرشحات صف مرتبطة بسمة المستخدم.'],
            ['هل يُدقَّق كل تغيير؟', 'نعم — راجع المراقبة والتدقيق.'],
          ],
        },
      },
      {
        id: 'backup-recovery',
        icon: 'hdd',
        title: {
          en: 'Backup & Recovery',
          ar: 'النسخ الاحتياطي والاستعادة',
        },
        summary: {
          en: 'Automated backups with point-in-time restore and tested recovery.',
          ar: 'نسخ احتياطية آلية مع استعادة لنقطة زمنية واستعادة مُختبرة.',
        },
        overview: {
          en: 'Protect against mistakes and failures. SDB takes scheduled backups, keeps them for the retention period you choose, and lets you restore a whole workspace or a single entity.',
          ar: 'احمِ نفسك من الأخطاء والأعطال. يأخذ SDB نسخًا احتياطية مجدولة ويحتفظ بها للمدة التي تختارها ويتيح استعادة مساحة عمل كاملة أو كيان واحد.',
        },
        features: {
          en: [
            'Scheduled full and incremental backups',
            'Point-in-time restore',
            'Restore a workspace or a single entity',
            'Retention policies',
            'Restore drills in a safe sandbox',
          ],
          ar: [
            'نسخ احتياطية كاملة وتزايدية مجدولة',
            'استعادة لنقطة زمنية',
            'استعادة مساحة عمل أو كيان واحد',
            'سياسات احتفاظ',
            'تجارب استعادة في بيئة آمنة',
          ],
        },
        steps: {
          en: [
            'Set the backup schedule and retention.',
            'Choose a storage location.',
            'Run a test restore in a sandbox.',
            'Receive alerts if a backup fails.',
          ],
          ar: [
            'حدّد جدول النسخ ومدة الاحتفاظ.',
            'اختر موقع التخزين.',
            'نفّذ استعادة تجريبية في بيئة معزولة.',
            'استلم تنبيهات عند فشل نسخة.',
          ],
        },
        config: {
          en: [
            ['Schedule', 'When full and incremental backups run.'],
            ['Retention', 'How long backups are kept.'],
            ['Storage target', 'Where backup files are stored.'],
            ['Restore point', 'The moment to return the data to.'],
          ],
          ar: [
            ['الجدول', 'موعد تشغيل النسخ الكاملة والتزايدية.'],
            ['الاحتفاظ', 'مدة حفظ النسخ.'],
            ['وجهة التخزين', 'مكان تخزين ملفات النسخ.'],
            ['نقطة الاستعادة', 'اللحظة التي تُعاد إليها البيانات.'],
          ],
        },
        faq: {
          en: [
            [
              'How do I know backups work?',
              'Run a restore drill — we recommend doing this on a regular schedule.',
            ],
            ['Can I back up to my own storage?', 'Yes, choose a storage target you control.'],
          ],
          ar: [
            ['كيف أعرف أن النسخ تعمل؟', 'نفّذ تجربة استعادة — وننصح بإجرائها بانتظام.'],
            ['هل أستطيع النسخ إلى تخزيني الخاص؟', 'نعم، اختر وجهة تخزين تتحكم بها.'],
          ],
        },
      },
      {
        id: 'monitoring-audit',
        icon: 'activity',
        title: {
          en: 'Monitoring & Audit',
          ar: 'المراقبة والتدقيق',
        },
        summary: {
          en: 'Health metrics, alerts and a tamper-evident history of every change.',
          ar: 'مؤشرات صحة وتنبيهات وسجل لكل تغيير يصعب العبث به.',
        },
        overview: {
          en: 'Know what is happening in your data platform. Health dashboards show performance and capacity, alerts warn you early, and the audit log records who changed or accessed what.',
          ar: 'اعرف ما يحدث في منصة بياناتك. تعرض لوحات الصحة الأداء والسعة وتنبهك التنبيهات مبكرًا ويسجل سجل التدقيق من غيّر أو وصل إلى ماذا.',
        },
        features: {
          en: [
            'Performance and capacity dashboards',
            'Threshold and anomaly alerts',
            'Audit log of reads, writes and admin actions',
            'Searchable, exportable history',
            'Email and webhook alert delivery',
          ],
          ar: [
            'لوحات الأداء والسعة',
            'تنبيهات العتبات والشذوذ',
            'سجل تدقيق للقراءات والكتابات وإجراءات الإدارة',
            'سجل قابل للبحث والتصدير',
            'تنبيهات عبر البريد وWebhook',
          ],
        },
        steps: {
          en: [
            'Review the default health dashboard.',
            'Set alert thresholds that matter to you.',
            'Choose who receives alerts.',
            'Search the audit log when investigating.',
          ],
          ar: [
            'راجع لوحة الصحة الافتراضية.',
            'حدّد عتبات التنبيه التي تهمك.',
            'اختر من يستلم التنبيهات.',
            'ابحث في سجل التدقيق عند التحقيق.',
          ],
        },
        config: {
          en: [
            ['Alert rule', 'Metric, threshold and duration.'],
            ['Notification channel', 'Email or webhook destination.'],
            ['Audit scope', 'Which actions are recorded.'],
            ['Retention', 'How long audit entries are kept.'],
          ],
          ar: [
            ['قاعدة التنبيه', 'المؤشر والعتبة والمدة.'],
            ['قناة الإشعار', 'وجهة البريد أو Webhook.'],
            ['نطاق التدقيق', 'الإجراءات التي تُسجل.'],
            ['الاحتفاظ', 'مدة حفظ سجلات التدقيق.'],
          ],
        },
        faq: {
          en: [
            ['Can I export audit data?', 'Yes, to CSV or via the API.'],
            ['Is the audit log editable?', 'No, entries are append-only.'],
          ],
          ar: [
            ['هل أستطيع تصدير بيانات التدقيق؟', 'نعم، إلى CSV أو عبر الواجهة.'],
            ['هل سجل التدقيق قابل للتعديل؟', 'لا، السجلات للإضافة فقط.'],
          ],
        },
      },
      {
        id: 'migration-sync',
        icon: 'refresh',
        title: {
          en: 'Migration & Sync',
          ar: 'الترحيل والمزامنة',
        },
        summary: {
          en: 'Move data from legacy systems and keep sources in sync.',
          ar: 'انقل البيانات من الأنظمة القديمة وأبقِ المصادر متزامنة.',
        },
        overview: {
          en: 'Migrate once or sync continuously. SDB validates data before it lands, reports what was rejected and why, and can roll back a bad import.',
          ar: 'رحّل مرة واحدة أو زامن باستمرار. يتحقق SDB من البيانات قبل وصولها ويبلغ عما رُفض ولماذا، ويمكنه التراجع عن استيراد سيئ.',
        },
        features: {
          en: [
            'Bulk import from CSV / Excel / databases',
            'Validation and rejection reports',
            'Incremental and two-way sync',
            'Conflict rules',
            'Rollback of an import batch',
          ],
          ar: [
            'استيراد جماعي من CSV / Excel / قواعد البيانات',
            'تقارير التحقق والرفض',
            'مزامنة تزايدية وثنائية الاتجاه',
            'قواعد التعارض',
            'التراجع عن دفعة استيراد',
          ],
        },
        steps: {
          en: [
            'Upload or connect the source data.',
            'Map and validate in a dry run.',
            'Run the import as a batch.',
            'Review results; roll back if needed.',
          ],
          ar: [
            'ارفع بيانات المصدر أو اربطها.',
            'اربط وتحقق في تشغيل تجريبي.',
            'نفّذ الاستيراد كدفعة.',
            'راجع النتائج وتراجع عند الحاجة.',
          ],
        },
        config: {
          en: [
            ['Dry run', 'Validate without writing data.'],
            ['Batch', 'A tracked, reversible import unit.'],
            ['Conflict rule', 'Source wins, SDB wins or latest wins.'],
            ['Sync interval', 'How often changes are exchanged.'],
          ],
          ar: [
            ['تشغيل تجريبي', 'تحقق دون كتابة البيانات.'],
            ['الدفعة', 'وحدة استيراد متتبعة وقابلة للتراجع.'],
            ['قاعدة التعارض', 'المصدر يفوز أو SDB يفوز أو الأحدث يفوز.'],
            ['فاصل المزامنة', 'عدد مرات تبادل التغييرات.'],
          ],
        },
        faq: {
          en: [
            [
              'Can you run the migration for us?',
              'Yes — combine SDB with our Integration service.',
            ],
            [
              'What happens to rejected rows?',
              'They are listed with the reason so you can fix and re-run.',
            ],
          ],
          ar: [
            ['هل تنفذون الترحيل عنا؟', 'نعم — اجمع SDB مع خدمة التكامل لدينا.'],
            ['ماذا يحدث للصفوف المرفوضة؟', 'تُسرد مع السبب لتصلحها وتعيد التشغيل.'],
          ],
        },
      },
    ],
  },
  useCases: {
    lead: {
      en: 'How teams put SDB to work as their data layer.',
      ar: 'كيف تعتمد الفرق على SDB كطبقة للبيانات.',
    },
    items: [
      {
        icon: 'users',
        title: {
          en: 'Customer & master data',
          ar: 'بيانات العملاء والبيانات الرئيسية',
        },
        desc: {
          en: 'One trusted record for customers, assets and contracts, shared by every application.',
          ar: 'سجل موثوق واحد للعملاء والأصول والعقود تشاركه كل التطبيقات.',
        },
        outcomes: {
          en: [
            'Single source of truth',
            'Validation and uniqueness rules',
            'Relations modelled visually',
          ],
          ar: ['مصدر واحد للحقيقة', 'قواعد تحقق وتفرد', 'علاقات تُنمذج بصريًا'],
        },
      },
      {
        icon: 'code',
        title: {
          en: 'Application back end',
          ar: 'خلفية التطبيقات',
        },
        desc: {
          en: 'Give web and mobile apps a secure, ready-made API on top of your modelled data.',
          ar: 'امنح تطبيقات الويب والجوال واجهة آمنة جاهزة فوق بياناتك المنمذجة.',
        },
        outcomes: {
          en: [
            'Secured query endpoints',
            'Fine-grained access control',
            'Schema versions that evolve safely',
          ],
          ar: ['نقاط استعلام آمنة', 'تحكم دقيق في الصلاحيات', 'إصدارات مخطط تتطور بأمان'],
        },
      },
      {
        icon: 'refresh',
        title: {
          en: 'Migration & consolidation',
          ar: 'الترحيل والدمج',
        },
        desc: {
          en: 'Move data out of legacy systems and spreadsheets, and keep sources in sync while you transition.',
          ar: 'انقل البيانات من الأنظمة القديمة والجداول وأبقِ المصادر متزامنة أثناء الانتقال.',
        },
        outcomes: {
          en: [
            'Import and transform existing data',
            'Incremental synchronisation',
            'Cut-over with confidence',
          ],
          ar: ['استيراد البيانات الحالية وتحويلها', 'مزامنة تدريجية', 'انتقال بثقة'],
        },
      },
      {
        icon: 'chart',
        title: {
          en: 'Reporting data hub',
          ar: 'مركز بيانات التقارير',
        },
        desc: {
          en: 'Bring data from many systems into one place that analysts and BI tools can rely on.',
          ar: 'اجمع البيانات من أنظمة متعددة في مكان واحد يعتمد عليه المحللون وأدوات الذكاء التجاري.',
        },
        outcomes: {
          en: [
            'Connectors for common sources',
            'Consistent definitions',
            'Monitored and auditable',
          ],
          ar: ['موصلات للمصادر الشائعة', 'تعريفات متسقة', 'مراقَب وقابل للتدقيق'],
        },
      },
      {
        icon: 'lock',
        title: {
          en: 'Protected & regulated data',
          ar: 'بيانات محمية وخاضعة للتنظيم',
        },
        desc: {
          en: 'Keep sensitive data encrypted, backed up and traceable to meet internal and regulatory needs.',
          ar: 'أبقِ البيانات الحساسة مشفّرة ومحمية بنسخ احتياطية وقابلة للتتبع لتلبية المتطلبات الداخلية والتنظيمية.',
        },
        outcomes: {
          en: ['Encryption and backups', 'Point-in-time recovery', 'Complete audit trail'],
          ar: ['تشفير ونسخ احتياطي', 'استرجاع إلى نقطة زمنية', 'سجل تدقيق كامل'],
        },
      },
    ],
  },
  upcoming: {
    lead: {
      en: 'What we are working on next for SDB. Priorities may change as we learn from customers.',
      ar: 'ما نعمل عليه لاحقًا في SDB. قد تتغير الأولويات بحسب ملاحظات العملاء.',
    },
    items: [
      {
        status: 'dev',
        icon: 'search',
        title: {
          en: 'Visual query builder',
          ar: 'منشئ استعلامات مرئي',
        },
        desc: {
          en: 'Build and test queries by clicking, then publish them as endpoints.',
          ar: 'ابنِ الاستعلامات واختبرها بالنقر ثم انشرها كنقاط نهاية.',
        },
      },
      {
        status: 'dev',
        icon: 'activity',
        title: {
          en: 'Change streams',
          ar: 'تدفقات التغيير',
        },
        desc: {
          en: 'Get notified in real time when records change, to drive integrations.',
          ar: 'احصل على إشعار فوري عند تغيّر السجلات لتشغيل التكاملات.',
        },
      },
      {
        status: 'planned',
        icon: 'hdd',
        title: {
          en: 'Cross-region replication',
          ar: 'النسخ بين المناطق',
        },
        desc: {
          en: 'Keep a hot copy of your data in a second region for resilience.',
          ar: 'احتفظ بنسخة فعالة من بياناتك في منطقة ثانية لمزيد من الاستمرارية.',
        },
      },
      {
        status: 'exploring',
        icon: 'zap',
        title: {
          en: 'Natural-language queries',
          ar: 'استعلامات بلغة طبيعية',
        },
        desc: {
          en: 'Ask questions about your data in plain language.',
          ar: 'اطرح أسئلة عن بياناتك بلغة بسيطة.',
        },
      },
    ],
  },
} as const;

export const customPortalSdb: Product = {
  ...customPortalSdbMeta,
  ...content,
  // TODO: real content — who this product is for.
  audience: audiencePlaceholder(customPortalSdbMeta.name),
  pricing,
  api,
  releases,
};
