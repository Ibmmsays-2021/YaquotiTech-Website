import { ChangeDetectionStrategy, Component, OnInit, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { home } from '../../content/company';
import { scrollSpy } from '../../core/scroll-spy';
import { ApiEndpoint, METHOD_TONE } from '../../shared/ui/api-endpoint/api-endpoint';
import { Breadcrumbs } from '../../shared/ui/breadcrumbs/breadcrumbs';
import { Button } from '../../shared/ui/button/button';
import { CodeBlock } from '../../shared/ui/code-block/code-block';
import { CtaBand } from '../../shared/ui/cta-band';
import { Hero } from '../../shared/ui/hero/hero';
import { Icon } from '../../shared/ui/icon/icon';
import { ProductPageBase } from './product-page-base';

/**
 * API reference: a sticky index (highlights the section in view) beside the reference column.
 * Overview → Authentication → resource groups with endpoints → Errors.
 */
@Component({
  selector: 'app-apis-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Hero, Breadcrumbs, Button, CodeBlock, ApiEndpoint, CtaBand, Icon],
  templateUrl: './apis-page.html',
  styleUrl: './apis-page.scss',
})
export class ApisPage extends ProductPageBase implements OnInit {
  protected readonly home = home;
  protected readonly methodTone = METHOD_TONE;
  protected readonly navOpen = signal(false);

  protected readonly api = computed(() => this.product().api);

  /** Section ids in reading order, for the index highlight. */
  protected readonly active = scrollSpy(() => [
    'overview',
    'authentication',
    ...this.api().groups.flatMap((g) => g.endpoints.map((e) => e.id)),
    'errors',
  ]);

  ngOnInit(): void {
    this.setSeo(this.i18n.t(this.ui.productNav.apis), this.i18n.t(this.api().overview), 'apis');
  }
}
