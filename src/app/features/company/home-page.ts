import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  afterNextRender,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactDialogService } from '../../core/contact/contact-dialog';
import { isContactTopic } from '../../core/contact/contact-topics';
import { I18n } from '../../core/i18n';
import { Seo } from '../../core/seo';
import { home } from '../../content/company';
import { PRODUCT_CATALOG } from '../../content/products/catalog';
import { SERVICES } from '../../content/services';
import { CONTACT_INTENTS, ui, type ContactIntent } from '../../content/ui';
import { Hero } from '../../shared/ui/hero/hero';
import { SectionHeader } from '../../shared/ui/section-header/section-header';
import { Button } from '../../shared/ui/button/button';
import { CtaBand } from '../../shared/ui/cta-band';
import { Icon } from '../../shared/ui/icon/icon';
import { ProductRows } from './product-rows';

/** Home. Also serves /contact (old links): same page, with the dialog opened on load. */
@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Hero, SectionHeader, Button, CtaBand, Icon, ProductRows],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit {
  protected readonly i18n = inject(I18n);
  protected readonly contact = inject(ContactDialogService);
  private readonly seo = inject(Seo);
  protected readonly ui = ui;
  protected readonly home = home;
  protected readonly products = PRODUCT_CATALOG;
  protected readonly services = SERVICES;

  /** Route data: true on /contact. */
  readonly openContact = input(false);
  /** Query params on /contact, e.g. ?topic=workflow&intent=demo */
  readonly topic = input<string | undefined>(undefined);
  readonly intent = input<string | undefined>(undefined);

  constructor() {
    afterNextRender(() => {
      if (!this.openContact()) return;
      const topic = this.topic();
      const intent = this.intent();
      this.contact.open({
        topic: isContactTopic(topic) ? topic : undefined,
        intent: CONTACT_INTENTS.includes(intent as ContactIntent)
          ? (intent as ContactIntent)
          : undefined,
      });
    });
  }

  ngOnInit(): void {
    const t = this.i18n.t;
    this.seo.set(
      this.openContact()
        ? { title: t(ui.contact.title), description: t(ui.contact.lead), path: 'contact' }
        : { description: t(home.lead), path: '' },
    );
  }
}
