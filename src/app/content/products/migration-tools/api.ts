// TODO: real API reference — placeholder endpoints, base URL, parameters and payloads.
import {
  placeholderApiAuth,
  placeholderApiErrors,
  placeholderApiFormat,
  placeholderApiVersioning,
} from '../../placeholders';
import type { ApiReference } from '../../types';

export const api: ApiReference = {
  overview: {
    en: 'The Migration Tools API lets you create migration jobs, follow their progress and roll them back. All endpoints use JSON over HTTPS.',
    ar: 'تتيح واجهة أدوات الترحيل إنشاء مهام الترحيل ومتابعة تقدمها والتراجع عنها. تستخدم جميع النقاط JSON عبر HTTPS.',
  },
  baseUrl: 'https://api.yaquotitech.com/migration-tools/v1',
  format: placeholderApiFormat,
  versioning: placeholderApiVersioning,
  auth: placeholderApiAuth,
  authExample: `curl https://api.yaquotitech.com/migration-tools/v1/migrations \\
  -H "Authorization: Bearer <API_KEY>"`,
  groups: [
    {
      id: 'migrations',
      title: { en: 'Migrations', ar: 'مهام الترحيل' },
      endpoints: [
        {
          id: 'create-migration',
          method: 'POST',
          path: '/migrations',
          title: { en: 'Create a migration', ar: 'إنشاء مهمة ترحيل' },
          summary: { en: 'Create a migration job.', ar: 'إنشاء مهمة ترحيل.' },
          params: [
            {
              name: 'source',
              type: 'object',
              required: true,
              desc: { en: 'Where the data comes from.', ar: 'مصدر البيانات.' },
            },
            {
              name: 'target',
              type: 'object',
              required: true,
              desc: { en: 'Where the data goes.', ar: 'وجهة البيانات.' },
            },
            {
              name: 'tables',
              type: 'string[]',
              required: false,
              desc: {
                en: 'Tables to move (all if omitted).',
                ar: 'الجداول المراد نقلها (جميعها إن لم تُحدّد).',
              },
            },
          ],
          request: `{
  "source": { "type": "sqlserver", "connection": "src_main" },
  "target": { "type": "sdb", "workspace": "ws_prod" },
  "tables": ["customers", "contracts"]
}`,
          response: `{ "id": "mig_2207", "status": "queued" }`,
        },
        {
          id: 'get-migration',
          method: 'GET',
          path: '/migrations/{id}',
          title: { en: 'Get a migration', ar: 'جلب مهمة ترحيل' },
          summary: {
            en: 'Get the status and progress of a migration job.',
            ar: 'جلب حالة مهمة الترحيل ومدى تقدمها.',
          },
          params: [
            {
              name: 'id',
              type: 'string',
              required: true,
              desc: { en: 'The migration id, in the path.', ar: 'معرّف المهمة في المسار.' },
            },
          ],
          response: `{
  "id": "mig_2207",
  "status": "running",
  "progress": { "rows": 182400, "total": 250000 }
}`,
        },
        {
          id: 'migration-logs',
          method: 'GET',
          path: '/migrations/{id}/logs',
          title: { en: 'Read the log', ar: 'قراءة السجل' },
          summary: { en: 'Read the job log.', ar: 'قراءة سجل المهمة.' },
          params: [
            {
              name: 'level',
              type: '"info" | "warn" | "error"',
              required: false,
              desc: {
                en: 'Only entries at this level or above.',
                ar: 'الإدخالات بهذا المستوى أو أعلى فقط.',
              },
            },
          ],
          response: `{
  "items": [
    { "at": "2026-11-20T09:12:00Z", "level": "info", "message": "customers: 50000 rows copied" }
  ]
}`,
        },
        {
          id: 'rollback-migration',
          method: 'POST',
          path: '/migrations/{id}/rollback',
          title: { en: 'Roll back', ar: 'التراجع' },
          summary: {
            en: 'Roll a completed job back to its starting point.',
            ar: 'التراجع عن مهمة مكتملة إلى نقطة بدايتها.',
          },
          response: `{ "id": "mig_2207", "status": "rolling_back" }`,
        },
      ],
    },
  ],
  errors: placeholderApiErrors,
};
