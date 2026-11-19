import { Injectable, Injector, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { restoreFocusQuietly } from './focus';
import { I18n } from './i18n';

/**
 * Opens the docs search dialog. The dialog, the CDK and the product's full docs content are loaded
 * on first use, so pages that never search don't download them.
 */
@Injectable({ providedIn: 'root' })
export class DocsSearchService {
  private readonly injector = inject(Injector);
  private readonly i18n = inject(I18n);
  private readonly doc = inject(DOCUMENT);
  private isOpen = false;
  private opening = false;

  async open(productId: string): Promise<void> {
    if (this.isOpen || this.opening) return;
    this.opening = true;
    const trigger = this.doc.activeElement;
    try {
      const [{ Dialog }, { Overlay }, { DocsSearchDialog }] = await Promise.all([
        import('@angular/cdk/dialog'),
        import('@angular/cdk/overlay'),
        import('../shared/ui/docs-search-dialog/docs-search-dialog'),
      ]);
      const overlay = this.injector.get(Overlay);
      const ref = this.injector.get(Dialog).open(DocsSearchDialog, {
        data: { productId },
        ariaLabel: 'Search documentation',
        ariaModal: true,
        direction: this.i18n.dir(),
        panelClass: 'search-panel',
        backdropClass: 'git-backdrop',
        autoFocus: 'input',
        restoreFocus: false,
        width: '680px',
        maxWidth: 'calc(100vw - 32px)',
        // Near the top, like a command palette, so the list can grow downwards.
        positionStrategy: overlay.position().global().centerHorizontally().top('10vh'),
      });
      this.isOpen = true;
      ref.closed.subscribe(() => (this.isOpen = false));
      restoreFocusQuietly(trigger, ref.closed, this.doc);
    } finally {
      this.opening = false;
    }
  }
}

/**
 * After navigating to a search result: wait for the section to render (the docs page swaps its
 * content after navigation), scroll to it and flash it so the reader sees where they landed.
 */
export function scrollToSection(fragment: string | null, doc: Document = document): void {
  const win = doc.defaultView;
  if (!win) return;
  if (!fragment) {
    win.scrollTo(0, 0);
    return;
  }
  // Jump without the page's smooth scrolling, then hold the section in place for a moment: content
  // above it may still be laying out, and the router's own anchor scroll runs a little later.
  // Anything the reader does (wheel, touch, keys, clicks) ends the hold at once.
  const hold = (el: HTMLElement) => {
    const until = win.performance.now() + 1000;
    let stopped = false;
    const stop = () => (stopped = true);
    const events = ['wheel', 'touchstart', 'keydown', 'mousedown'] as const;
    events.forEach((e) => win.addEventListener(e, stop, { once: true, passive: true }));
    const step = () => {
      if (stopped || win.performance.now() > until) {
        events.forEach((e) => win.removeEventListener(e, stop));
        return;
      }
      // Where scrollIntoView puts it: the page's scroll-padding plus the element's own scroll-margin.
      const target =
        (parseFloat(win.getComputedStyle(doc.documentElement).scrollPaddingTop) || 0) +
        (parseFloat(win.getComputedStyle(el).scrollMarginTop) || 0);
      if (Math.abs(el.getBoundingClientRect().top - target) > 2) {
        el.scrollIntoView({ block: 'start', behavior: 'instant' });
      }
      win.requestAnimationFrame(step);
    };
    step();
  };
  let tries = 0;
  const attempt = () => {
    const el = doc.getElementById(fragment);
    if (el) {
      hold(el);
      el.classList.remove('search-flash');
      void el.offsetWidth; // restart the animation
      el.classList.add('search-flash');
      win.setTimeout(() => el.classList.remove('search-flash'), 1600);
    } else if (++tries < 90) {
      win.requestAnimationFrame(attempt);
    }
  };
  win.requestAnimationFrame(attempt);
}
