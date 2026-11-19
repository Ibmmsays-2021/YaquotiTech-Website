// The Workflow docs: the help articles from the guide workspace (C:\Yaquoti-User-Guide\docs), one
// page each, grouped in the sidebar. The shorter section-style modules in product.ts are placeholder
// copy and stay hidden.
//
// The text, the groups and their order come from guides.generated.ts, written by
// `node scripts/guides.mjs` (it also runs before `npm start` and `npm run build`). To add, move or
// regroup an article, edit GROUPS in that script.
import type { DocGroup, GuideDocModule, Product } from '../../types';
import { GUIDES, GUIDE_GROUPS } from './guides.generated';

type Docs = Product['docs'];

/** The site is English only: the Arabic slots repeat the English text. */
const both = (en: string) => ({ en, ar: en });

const modules: GuideDocModule[] = GUIDE_GROUPS.flatMap((g) =>
  g.ids.map((id) => {
    const guide = GUIDES[id];
    return { id, icon: g.icon, title: both(guide.title), summary: both(guide.summary), guide };
  }),
);

const groups: DocGroup[] = GUIDE_GROUPS.map((g) => ({ label: both(g.label), modules: g.ids }));

/** Setup order for a new system, pointing at the articles that cover each step. */
const gettingStarted: Docs['gettingStarted'] = {
  en: [
    'Set up your organization: regions, sites, departments, roles and working hours (Organization).',
    'Add users, give them system roles and connect email and SMS (Users and permissions, System settings).',
    'Build the catalog: categories, sub categories and processes (Service catalog).',
    'Decide who takes part with groups, then design each step: approver, form, deadlines and rules (Process groups, Process steps).',
    'Submit a test request and follow it to completion (Raise and follow requests, Approve and manage requests).',
  ],
  ar: [],
};

/** The Workflow docs with the published help articles. */
export function withGuides(docs: Docs): Docs {
  return { ...docs, gettingStarted: { ...gettingStarted, ar: gettingStarted.en }, modules, groups };
}
