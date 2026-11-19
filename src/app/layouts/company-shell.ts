import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteFooter } from '../shared/ui/nav/site-footer';
import { SiteHeader } from '../shared/ui/nav/site-header';
import { ShellBase } from './shell-base';

/** Layout for the company site. */
@Component({
  selector: 'app-company-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, SiteHeader, SiteFooter],
  template: `
    <a class="skip-link" [href]="url.path() + '#main'" (click)="skip($event)">{{
      i18n.t(ui.nav.skip)
    }}</a>
    <app-site-header />
    <main id="main" tabindex="-1"><router-outlet /></main>
    <!-- Server-rendered, hydrated when scrolled into view. The placeholder reserves the footer's
         space for in-app navigation so nothing shifts while its chunk loads. -->
    @defer (on immediate; hydrate on viewport) {
      <app-site-footer />
    } @placeholder {
      <div class="footer-placeholder" aria-hidden="true"></div>
    }
  `,
  styles: `
    main {
      display: block;
      min-height: 60vh;
      outline: none;
    }
    .footer-placeholder {
      min-height: 420px;
      background: var(--color-navy);
    }
  `,
})
export class CompanyShell extends ShellBase {}
