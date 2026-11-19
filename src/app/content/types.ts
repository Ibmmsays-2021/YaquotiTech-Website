// Content model. Every user-facing string is `{ en, ar }`.

/** Languages the content is written in. */
export type Lang = 'en' | 'ar';
/**
 * Languages the site publishes: English only. The Arabic text stays in the content so it can be
 * switched back on by adding 'ar' here; old /ar URLs redirect to English (see app.routes.ts).
 */
export const LANGS: readonly Lang[] = ['en'];

/** A value in both languages. */
export type Tr<T = string> = Readonly<Record<Lang, T>>;
export type Text = Tr<string>;
export type TextList = Tr<readonly string[]>;
/** Question/answer or setting/description pairs. */
export type Pairs = Tr<readonly (readonly [string, string])[]>;

export type IconName =
  | 'activity'
  | 'arrow'
  | 'arrow-left'
  | 'book'
  | 'briefcase'
  | 'chart'
  | 'check'
  | 'chevron'
  | 'clock'
  | 'code'
  | 'compass'
  | 'copy'
  | 'database'
  | 'external'
  | 'eye'
  | 'file'
  | 'globe'
  | 'hdd'
  | 'image'
  | 'inbox'
  | 'key'
  | 'layers'
  | 'lock'
  | 'mail'
  | 'menu'
  | 'plug'
  | 'refresh'
  | 'search'
  | 'shield'
  | 'sliders'
  | 'tag'
  | 'target'
  | 'users'
  | 'workflow'
  | 'x'
  | 'zap'
  | 'bell'
  | 'phone';

export interface Item {
  readonly icon: IconName;
  readonly title: Text;
  readonly desc: Text;
}

export interface Step {
  readonly title: Text;
  readonly desc: Text;
}

// ---------- company ----------

export interface Service {
  readonly id: string;
  readonly icon: IconName;
  readonly title: Text;
  readonly summary: Text;
  readonly lead: Text;
  readonly coverHead: Text;
  readonly cover: readonly Item[];
  readonly phasesHead: Text;
  readonly phases: readonly Step[];
  readonly deliversHead: Text;
  readonly delivers: TextList;
}

// ---------- products ----------

export interface LogoAsset {
  readonly src: string;
  readonly src2x: string;
  readonly width: number;
  readonly height: number;
}

interface DocModuleBase {
  readonly id: string;
  readonly icon: IconName;
  readonly title: Text;
  readonly summary: Text;
}

/** A module described by short structured sections (overview, capabilities, steps…). */
export interface SectionDocModule extends DocModuleBase {
  readonly overview: Text;
  readonly features: TextList;
  readonly steps: TextList;
  readonly config: Pairs;
  readonly faq: Pairs;
}

/** What a guide page is for (Diátaxis): landing page, explanation, how-to, reference or help. */
export type GuidePageKind = 'overview' | 'concepts' | 'tasks' | 'reference' | 'help' | 'glossary';

/** One page of a user guide. The module's landing page has the empty id. */
export interface GuidePage {
  readonly id: string;
  readonly kind: GuidePageKind;
  readonly title: string;
  readonly summary: string;
  /** The page's main headings, e.g. its tasks; shown on the module's landing cards. */
  readonly items: readonly string[];
  readonly toc: readonly { readonly id: string; readonly label: string; readonly level: number }[];
  /** Trusted HTML from our own Markdown; links start with __DOCS__ (the docs root in the current language). */
  readonly html: string;
}

/** A full user guide converted from Markdown by scripts/guides.mjs and split into pages. */
export interface GuideContent {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly pages: readonly GuidePage[];
}

/** A module documented by a full user guide. Guides are written in English only for now. */
export interface GuideDocModule extends DocModuleBase {
  readonly guide: GuideContent;
}

export type DocModule = SectionDocModule | GuideDocModule;

export const isGuideModule = (m: DocModule): m is GuideDocModule => 'guide' in m;

export interface DocGroup {
  readonly label: Text;
  readonly modules: readonly string[];
}

export interface UseCase {
  readonly icon: IconName;
  readonly title: Text;
  readonly desc: Text;
  readonly outcomes: TextList;
}

export type RoadmapStatus = 'dev' | 'planned' | 'exploring';

export interface RoadmapItem {
  readonly status: RoadmapStatus;
  readonly icon: IconName;
  readonly title: Text;
  readonly desc: Text;
}

export interface PricingPlan {
  readonly id: string;
  readonly name: Text;
  readonly price: Text;
  readonly period: Text;
  readonly desc: Text;
  readonly features: TextList;
  readonly featured?: boolean;
}

export interface ComparisonRow {
  readonly label: Text;
  /** One value per plan, in plan order: included / not included / a short text. */
  readonly values: readonly (boolean | Text)[];
}

export interface Pricing {
  readonly lead: Text;
  readonly plans: readonly PricingPlan[];
  readonly comparison: readonly ComparisonRow[];
  readonly faq: Pairs;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiParam {
  readonly name: string;
  readonly type: string;
  readonly required: boolean;
  readonly desc: Text;
}

export interface ApiEndpoint {
  readonly id: string;
  readonly method: HttpMethod;
  readonly path: string;
  /** Short name shown in the endpoint index, e.g. "Start a request". */
  readonly title: Text;
  readonly summary: Text;
  readonly params?: readonly ApiParam[];
  readonly request?: string;
  readonly response: string;
}

/** A resource group in the API reference (e.g. "Requests"), shown as a heading in the index. */
export interface ApiGroup {
  readonly id: string;
  readonly title: Text;
  readonly endpoints: readonly ApiEndpoint[];
}

export interface ApiError {
  readonly status: string;
  readonly meaning: Text;
}

export interface ApiReference {
  readonly overview: Text;
  readonly baseUrl: string;
  /** Request/response format, e.g. "JSON over HTTPS". */
  readonly format: Text;
  readonly versioning: Text;
  readonly auth: Text;
  readonly authExample: string;
  readonly groups: readonly ApiGroup[];
  readonly errors: {
    readonly overview: Text;
    readonly codes: readonly ApiError[];
    readonly example: string;
  };
}

export type ReleaseTag = 'new' | 'improved' | 'fixed' | 'breaking';

export interface Release {
  readonly version: string;
  /** ISO date, e.g. 2026-10-01 */
  readonly date: string;
  readonly title: Text;
  readonly notes: readonly { readonly tag: ReleaseTag; readonly text: Text }[];
}

/** The light part of a product: enough for menus, footer, product rows and the contact dialog. */
export interface ProductMeta {
  readonly id: string;
  readonly icon: IconName;
  readonly name: Text;
  readonly full?: Text;
  readonly tagline: Text;
  readonly summary: Text;
  /** Real logo; when missing, ProductLogo renders the Yaquoti mark + name as a wordmark. */
  readonly logo?: LogoAsset;
}

/**
 * One product = one config object. Adding a product means adding a folder in
 * `content/products/` and one line in `content/products/index.ts`.
 */
export interface Product extends ProductMeta {
  /** Key capabilities shown on the overview and product home. */
  readonly capabilities: readonly Item[];
  /** "Who it's for" on the company overview page. */
  readonly audience: { readonly lead: Text; readonly items: readonly Item[] };
  readonly docs: {
    readonly gettingStarted: TextList;
    readonly groups: readonly DocGroup[];
    readonly modules: readonly DocModule[];
  };
  readonly useCases: { readonly lead: Text; readonly items: readonly UseCase[] };
  readonly upcoming: { readonly lead: Text; readonly items: readonly RoadmapItem[] };
  readonly pricing: Pricing;
  readonly api: ApiReference;
  readonly releases: readonly Release[];
}
