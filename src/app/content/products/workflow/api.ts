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
    en: 'The Workflow REST API lets other systems start requests, act on them and read process data. All endpoints use JSON over HTTPS.',
    ar: 'تتيح واجهة Workflow البرمجية للأنظمة الأخرى بدء الطلبات واتخاذ الإجراءات عليها وقراءة بيانات العمليات. تستخدم جميع النقاط JSON عبر HTTPS.',
  },
  baseUrl: 'https://api.yaquotitech.com/workflow/v1',
  format: placeholderApiFormat,
  versioning: placeholderApiVersioning,
  auth: placeholderApiAuth,
  authExample: `curl https://api.yaquotitech.com/workflow/v1/processes \\
  -H "Authorization: Bearer <API_KEY>"`,
  groups: [
    {
      id: 'processes',
      title: { en: 'Processes', ar: 'العمليات' },
      endpoints: [
        {
          id: 'list-processes',
          method: 'GET',
          path: '/processes',
          title: { en: 'List processes', ar: 'عرض العمليات' },
          summary: { en: 'List published processes.', ar: 'عرض العمليات المنشورة.' },
          params: [
            {
              name: 'cursor',
              type: 'string',
              required: false,
              desc: { en: 'Cursor from the previous page.', ar: 'المؤشر من الصفحة السابقة.' },
            },
            {
              name: 'limit',
              type: 'integer',
              required: false,
              desc: {
                en: 'Items per page (1–100, default 20).',
                ar: 'العناصر في كل صفحة (1–100، الافتراضي 20).',
              },
            },
          ],
          response: `{
  "items": [
    { "id": "proc_leave", "name": "Leave request", "version": 3, "published": true }
  ],
  "next": null
}`,
        },
      ],
    },
    {
      id: 'requests',
      title: { en: 'Requests', ar: 'الطلبات' },
      endpoints: [
        {
          id: 'create-request',
          method: 'POST',
          path: '/requests',
          title: { en: 'Start a request', ar: 'بدء طلب' },
          summary: {
            en: 'Start a new request on a published process.',
            ar: 'بدء طلب جديد على عملية منشورة.',
          },
          params: [
            {
              name: 'processId',
              type: 'string',
              required: true,
              desc: { en: 'The published process to run.', ar: 'العملية المنشورة المراد تشغيلها.' },
            },
            {
              name: 'fields',
              type: 'object',
              required: true,
              desc: { en: 'Values for the process form fields.', ar: 'قيم حقول نموذج العملية.' },
            },
          ],
          request: `{
  "processId": "proc_leave",
  "fields": { "from": "2026-12-01", "to": "2026-12-05", "reason": "Annual leave" }
}`,
          response: `{
  "id": "req_10482",
  "status": "in_progress",
  "currentStep": "Line manager approval"
}`,
        },
        {
          id: 'get-request',
          method: 'GET',
          path: '/requests/{id}',
          title: { en: 'Get a request', ar: 'جلب طلب' },
          summary: {
            en: 'Get a request with its status and activity history.',
            ar: 'جلب طلب مع حالته وسجل نشاطه.',
          },
          params: [
            {
              name: 'id',
              type: 'string',
              required: true,
              desc: { en: 'The request id, in the path.', ar: 'معرّف الطلب في المسار.' },
            },
          ],
          response: `{
  "id": "req_10482",
  "status": "approved",
  "history": [
    { "at": "2026-11-20T09:12:00Z", "by": "a.hassan", "action": "approve" }
  ]
}`,
        },
        {
          id: 'act-on-request',
          method: 'POST',
          path: '/requests/{id}/actions',
          title: { en: 'Act on a request', ar: 'اتخاذ إجراء على طلب' },
          summary: {
            en: 'Approve, reject or return a request on behalf of a performer.',
            ar: 'الموافقة على طلب أو رفضه أو إعادته نيابة عن المنفذ.',
          },
          params: [
            {
              name: 'action',
              type: '"approve" | "reject" | "return"',
              required: true,
              desc: { en: 'What to do with the request.', ar: 'الإجراء المطلوب على الطلب.' },
            },
            {
              name: 'comment',
              type: 'string',
              required: false,
              desc: { en: 'Shown in the request history.', ar: 'يظهر في سجل الطلب.' },
            },
          ],
          request: `{ "action": "approve", "comment": "Approved" }`,
          response: `{ "id": "req_10482", "status": "approved" }`,
        },
      ],
    },
  ],
  errors: placeholderApiErrors,
};
