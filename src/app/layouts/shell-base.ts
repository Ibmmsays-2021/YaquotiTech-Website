import { DOCUMENT } from '@angular/common';
import { Directive, inject } from '@angular/core';
import { CurrentUrl } from '../core/current-url';
import { I18n } from '../core/i18n';
import { ui } from '../content/ui';

/**
 * Shared shell behaviour: the skip link. With <base href="/">, a bare "#main" would resolve to
 * "/#main", so the link points at the current path and focuses <main> without navigating.
 */
@Directive()
export abstract class ShellBase {
  protected readonly i18n = inject(I18n);
  protected readonly url = inject(CurrentUrl);
  protected readonly ui = ui;
  private readonly doc = inject(DOCUMENT);

  protected skip(e: Event): void {
    e.preventDefault();
    const main = this.doc.getElementById('main');
    main?.focus();
    main?.scrollIntoView();
  }
}
