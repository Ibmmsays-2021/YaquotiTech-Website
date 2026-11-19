import { Directive, computed, inject, input } from '@angular/core';
import { ContactDialogService } from '../../core/contact/contact-dialog';
import { I18n } from '../../core/i18n';
import { Seo } from '../../core/seo';
import { productById } from '../../content/products';
import type { Product } from '../../content/types';
import { ui } from '../../content/ui';

/** Shared plumbing for product-site pages: the product (from the :productId route param) and helpers. */
@Directive()
export abstract class ProductPageBase {
  protected readonly i18n = inject(I18n);
  protected readonly seo = inject(Seo);
  protected readonly contact = inject(ContactDialogService);
  protected readonly ui = ui;

  /** Inherited from the parent `systems/:productId` route. */
  readonly productId = input.required<string>();
  // The shell's route only matches known products, so this is always defined.
  protected readonly product = computed(() => productById(this.productId()) as Product);

  /** Link inside this product's site: link('docs') → /en/systems/workflow/docs */
  protected link(sub = ''): string {
    return this.i18n.link(`systems/${this.productId()}${sub ? `/${sub}` : ''}`);
  }

  protected setSeo(title: string | undefined, description: string, sub = ''): void {
    const name = this.i18n.t(this.product().name);
    this.seo.set({
      title: title ? `${title} — ${name}` : name,
      description,
      path: `systems/${this.productId()}${sub ? `/${sub}` : ''}`,
    });
  }
}
