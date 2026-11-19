import { DOCUMENT } from '@angular/common';
import { Injectable, Injector, inject } from '@angular/core';
import { restoreFocusQuietly } from '../../../core/focus';
import { I18n } from '../../../core/i18n';
import type { ProductMeta } from '../../../content/types';
import { ui } from '../../../content/ui';
import type { MobileNavData } from './mobile-nav';

/** Opens the slide-in navigation. The panel and Angular CDK Dialog load on first use. */
@Injectable({ providedIn: 'root' })
export class MobileNavService {
  private readonly injector = inject(Injector);
  private readonly i18n = inject(I18n);
  private readonly doc = inject(DOCUMENT);

  async open(product: ProductMeta | null): Promise<void> {
    const trigger = this.doc.activeElement;
    const [{ Dialog }, { createGlobalPositionStrategy }, { MobileNav }] = await Promise.all([
      import('@angular/cdk/dialog'),
      import('@angular/cdk/overlay'),
      import('./mobile-nav'),
    ]);
    const ref = this.injector.get(Dialog).open(MobileNav, {
      data: { product } satisfies MobileNavData,
      ariaLabel: this.i18n.t(ui.nav.menu),
      direction: this.i18n.dir(),
      positionStrategy: createGlobalPositionStrategy(this.injector).end('0').top('0'),
      width: 'min(380px, 92vw)',
      height: '100dvh',
      backdropClass: 'sheet-backdrop',
      panelClass: 'sheet-panel',
      restoreFocus: false,
      autoFocus: 'first-tabbable',
    });
    restoreFocusQuietly(trigger, ref.closed, this.doc);
  }
}
