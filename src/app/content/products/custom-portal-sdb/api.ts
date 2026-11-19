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
    en: 'The Custom Portal SDB API lets you manage portal content and read submissions from your own systems. All endpoints use JSON over HTTPS.',
    ar: 'تتيح واجهة البوابة المخصصة SDB إدارة محتوى البوابة وقراءة المُرسلات من أنظمتك. تستخدم جميع النقاط JSON عبر HTTPS.',
  },
  baseUrl: 'https://api.yaquotitech.com/custom-portal-sdb/v1',
  format: placeholderApiFormat,
  versioning: placeholderApiVersioning,
  auth: placeholderApiAuth,
  authExample: `curl https://api.yaquotitech.com/custom-portal-sdb/v1/pages \\
  -H "Authorization: Bearer <API_KEY>"`,
  groups: [
    {
      id: 'pages',
      title: { en: 'Pages', ar: 'الصفحات' },
      endpoints: [
        {
          id: 'list-pages',
          method: 'GET',
          path: '/pages',
          title: { en: 'List pages', ar: 'عرض الصفحات' },
          summary: { en: 'List portal pages.', ar: 'عرض صفحات البوابة.' },
          params: [
            {
              name: 'published',
              type: 'boolean',
              required: false,
              desc: {
                en: 'Only published (or only draft) pages.',
                ar: 'الصفحات المنشورة فقط (أو المسودات فقط).',
              },
            },
          ],
          response: `{
  "items": [{ "id": "pg_home", "title": "Home", "published": true }]
}`,
        },
        {
          id: 'update-page',
          method: 'PATCH',
          path: '/pages/{id}',
          title: { en: 'Update a page', ar: 'تحديث صفحة' },
          summary: {
            en: 'Update a page’s title or publish state.',
            ar: 'تحديث عنوان الصفحة أو حالة نشرها.',
          },
          params: [
            {
              name: 'id',
              type: 'string',
              required: true,
              desc: { en: 'The page id, in the path.', ar: 'معرّف الصفحة في المسار.' },
            },
            {
              name: 'title',
              type: 'string',
              required: false,
              desc: { en: 'New page title.', ar: 'عنوان الصفحة الجديد.' },
            },
            {
              name: 'published',
              type: 'boolean',
              required: false,
              desc: { en: 'Publish or unpublish the page.', ar: 'نشر الصفحة أو إلغاء نشرها.' },
            },
          ],
          request: `{ "title": "Welcome", "published": true }`,
          response: `{ "id": "pg_home", "title": "Welcome", "published": true }`,
        },
      ],
    },
    {
      id: 'submissions',
      title: { en: 'Submissions', ar: 'المُرسلات' },
      endpoints: [
        {
          id: 'list-submissions',
          method: 'GET',
          path: '/submissions',
          title: { en: 'List submissions', ar: 'عرض المُرسلات' },
          summary: { en: 'List form submissions.', ar: 'عرض النماذج المُرسلة.' },
          params: [
            {
              name: 'form',
              type: 'string',
              required: false,
              desc: { en: 'Only submissions from this form.', ar: 'المُرسلات من هذا النموذج فقط.' },
            },
            {
              name: 'since',
              type: 'date-time',
              required: false,
              desc: { en: 'Only submissions after this time.', ar: 'المُرسلات بعد هذا الوقت فقط.' },
            },
          ],
          response: `{
  "items": [{ "id": "sub_918", "form": "contact", "createdAt": "2026-11-20T09:12:00Z" }]
}`,
        },
      ],
    },
  ],
  errors: placeholderApiErrors,
};
