import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ContactDialogService } from '../../core/contact/contact-dialog';
import { I18n } from '../../core/i18n';
import { ui, type ContactIntent } from '../../content/ui';
import { Button } from './button/button';

/** Closing call to action; opens the shared dialog with the right topic. */
@Component({
  selector: 'app-cta-band',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
  template: `
    <section class="container" [attr.aria-labelledby]="'cta-' + uid">
      <div class="band">
        <div>
          <h2 [id]="'cta-' + uid">{{ heading() }}</h2>
          <p>{{ desc() }}</p>
        </div>
        <button
          type="button"
          appButton="light"
          (click)="contact.open({ topic: topic(), intent: intent() })"
        >
          {{ label() || i18n.t(ui.nav.getInTouch) }}
        </button>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
      padding-block: 0 var(--section-y);
    }
    .band {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 24px 48px;
      padding: clamp(32px, 5vw, 56px);
      border-radius: var(--radius-lg);
      background: var(--color-navy);
      color: color-mix(in srgb, var(--color-navy) 30%, white);
    }
    h2 {
      color: #fff;
      margin-block-end: 8px;
    }
    p {
      max-width: 34em;
    }
  `,
})
export class CtaBand {
  private static next = 0;
  protected readonly uid = ++CtaBand.next;
  protected readonly i18n = inject(I18n);
  protected readonly contact = inject(ContactDialogService);
  protected readonly ui = ui;
  readonly heading = input.required<string>();
  readonly desc = input('');
  readonly label = input('');
  readonly topic = input<string | undefined>(undefined);
  readonly intent = input<ContactIntent | undefined>(undefined);
}
