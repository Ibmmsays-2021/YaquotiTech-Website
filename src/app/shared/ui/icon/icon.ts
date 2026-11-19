import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Bell,
  BookOpen,
  Briefcase,
  ChartColumn,
  Check,
  ChevronDown,
  Clock,
  Code,
  Compass,
  Copy,
  Database,
  ExternalLink,
  Eye,
  FileText,
  Globe,
  HardDrive,
  Image,
  Inbox,
  KeyRound,
  Layers,
  Lock,
  Mail,
  Menu,
  Phone,
  Plug,
  RefreshCw,
  Search,
  Shield,
  SlidersHorizontal,
  Tag,
  Target,
  Users,
  Workflow,
  X,
  Zap,
  type IconNode,
} from 'lucide';
import type { IconName } from '../../../content/types';

/** One icon set (Lucide, ISC licence). Only the icons listed here end up in the bundle. */
const ICONS: Record<IconName, IconNode> = {
  activity: Activity,
  arrow: ArrowRight,
  'arrow-left': ArrowLeft,
  bell: Bell,
  book: BookOpen,
  briefcase: Briefcase,
  chart: ChartColumn,
  check: Check,
  chevron: ChevronDown,
  clock: Clock,
  code: Code,
  compass: Compass,
  copy: Copy,
  database: Database,
  external: ExternalLink,
  eye: Eye,
  file: FileText,
  globe: Globe,
  hdd: HardDrive,
  image: Image,
  inbox: Inbox,
  key: KeyRound,
  layers: Layers,
  lock: Lock,
  mail: Mail,
  menu: Menu,
  phone: Phone,
  plug: Plug,
  refresh: RefreshCw,
  search: Search,
  shield: Shield,
  sliders: SlidersHorizontal,
  tag: Tag,
  target: Target,
  users: Users,
  workflow: Workflow,
  x: X,
  zap: Zap,
};

/** Icons that imply direction and must mirror in RTL. */
const DIRECTIONAL = new Set<IconName>(['arrow', 'arrow-left', 'external']);

const esc = (v: string) => v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

@Component({
  selector: 'app-icon',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[innerHTML]': 'svg()',
    '[class.flip-rtl]': 'directional()',
    'aria-hidden': 'true',
    '[style.--icon-size.px]': 'size()',
  },
  styles: `
    :host {
      display: inline-flex;
      flex: none;
      width: var(--icon-size, 20px);
      height: var(--icon-size, 20px);
    }
  `,
})
export class Icon {
  private readonly sanitizer = inject(DomSanitizer);

  readonly name = input.required<IconName>();
  readonly size = input(20);
  readonly stroke = input(1.75);

  protected readonly directional = computed(() => DIRECTIONAL.has(this.name()));

  protected readonly svg = computed<SafeHtml>(() => {
    const nodes = ICONS[this.name()];
    const children = nodes
      .map(([tag, attrs]) => {
        const a = Object.entries(attrs)
          .map(([k, v]) => `${k}="${esc(String(v))}"`)
          .join(' ');
        return `<${tag} ${a}/>`;
      })
      .join('');
    const markup = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${this.stroke()}" stroke-linecap="round" stroke-linejoin="round" focusable="false">${children}</svg>`;
    // Static markup built from the bundled Lucide data above — never from user input.
    return this.sanitizer.bypassSecurityTrustHtml(markup);
  });
}
