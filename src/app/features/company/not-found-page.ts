import { ChangeDetectionStrategy, Component, OnInit, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18n } from '../../core/i18n';
import { Seo } from '../../core/seo';
import { ui } from '../../content/ui';
import { Hero } from '../../shared/ui/hero/hero';
import { Button } from '../../shared/ui/button/button';

@Component({
  selector: 'app-not-found-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Hero, Button, RouterLink],
  template: `
    <app-hero [heading]="i18n.t(ui.common.notFound)" [lead]="i18n.t(ui.common.notFoundLead)">
      <ng-container ngProjectAs="[heroAction]">
        <a appButton="primary" [routerLink]="i18n.link()">{{ i18n.t(ui.common.backHome) }}</a>
        <a appButton="secondary" [routerLink]="i18n.link('products')">{{
          i18n.t(ui.common.allProducts)
        }}</a>
      </ng-container>
    </app-hero>
  `,
})
export class NotFoundPage implements OnInit {
  protected readonly i18n = inject(I18n);
  private readonly seo = inject(Seo);
  protected readonly ui = ui;
  /** True when used as a route (sets the page title); false when embedded by another page. */
  readonly standalone = input(false);

  ngOnInit(): void {
    if (this.standalone()) {
      this.seo.set({
        title: this.i18n.t(ui.common.notFound),
        description: this.i18n.t(ui.common.notFoundLead),
        path: 'not-found',
        noindex: true,
      });
    }
  }
}
