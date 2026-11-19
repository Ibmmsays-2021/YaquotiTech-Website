import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService, type ContactResult } from '../../../core/contact/contact';
import { CONTACT_TOPICS, OTHER_TOPIC, isContactTopic } from '../../../core/contact/contact-topics';
import {
  ContactDraft,
  EMPTY_DRAFT,
  type ContactDialogOptions,
} from '../../../core/contact/contact-dialog';
import { I18n } from '../../../core/i18n';
import { CONTACT_INTENTS, brand, ui, type ContactIntent } from '../../../content/ui';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';

type State = 'idle' | 'sending' | ContactResult | 'error';

/** The single "Get in touch" dialog. Open it with ContactDialogService.open({ topic, intent }). */
@Component({
  selector: 'app-get-in-touch-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, Button, Icon],
  templateUrl: './get-in-touch-dialog.html',
  host: { '(window:beforeunload)': 'warnIfUnsent($event)' },
  styleUrl: './get-in-touch-dialog.scss',
})
export class GetInTouchDialog {
  protected readonly i18n = inject(I18n);
  protected readonly ui = ui;
  protected readonly c = ui.contact;
  protected readonly brand = brand;
  protected readonly topics = CONTACT_TOPICS;
  protected readonly intents = CONTACT_INTENTS;

  private readonly ref = inject(DialogRef);
  private readonly data = inject<ContactDialogOptions | null>(DIALOG_DATA, { optional: true });
  private readonly drafts = inject(ContactDraft);
  private readonly contact = inject(ContactService);
  private readonly doc = inject(DOCUMENT);

  protected readonly state = signal<State>('idle');
  protected readonly submitted = signal(false);

  // Typed reactive form (the brief asks for Reactive Forms). A closed dialog keeps its draft,
  // so nothing typed is lost; topic and intent always come from where the dialog was opened.
  private readonly draft = this.drafts.value;
  protected readonly form = inject(NonNullableFormBuilder).group({
    name: [this.draft.name, [Validators.required, Validators.maxLength(120)]],
    email: [this.draft.email, [Validators.required, Validators.email, Validators.maxLength(200)]],
    company: [this.draft.company, Validators.maxLength(160)],
    phone: [this.draft.phone, Validators.maxLength(40)],
    topic: [isContactTopic(this.data?.topic) ? this.data.topic : OTHER_TOPIC, Validators.required],
    intent: [(this.data?.intent ?? 'question') as ContactIntent, Validators.required],
    message: [this.draft.message, [Validators.required, Validators.maxLength(4000)]],
  });

  constructor() {
    this.ref.closed.subscribe(() => {
      const v = this.form.getRawValue();
      // Sent messages are cleared; anything else is kept for next time.
      this.drafts.value =
        this.state() === 'idle' || this.state() === 'error'
          ? { name: v.name, email: v.email, company: v.company, phone: v.phone, message: v.message }
          : EMPTY_DRAFT;
    });
  }

  protected invalid(name: keyof typeof this.form.controls): boolean {
    const ctl = this.form.controls[name];
    return ctl.invalid && (ctl.touched || this.submitted());
  }

  protected errorFor(name: 'name' | 'email' | 'message'): string {
    const ctl = this.form.controls[name];
    const c = this.c;
    if (ctl.hasError('maxlength')) return this.i18n.t(c.tooLong);
    if (ctl.hasError('email')) return this.i18n.t(c.invalidEmail);
    return this.i18n.t(
      name === 'name' ? c.nameRequired : name === 'email' ? c.emailRequired : c.messageRequired,
    );
  }

  async submit(): Promise<void> {
    this.submitted.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      const first = this.doc.querySelector<HTMLElement>('.git form .ng-invalid:not(form)');
      first?.focus();
      return;
    }
    const v = this.form.getRawValue();
    const topic = this.topics.find((t) => t.id === v.topic);
    this.state.set('sending');
    try {
      const result = await this.contact.send({
        name: v.name.trim(),
        email: v.email.trim(),
        company: v.company.trim(),
        phone: v.phone.trim(),
        topicId: v.topic,
        topicLabel: topic ? this.i18n.t(topic.label) : v.topic,
        intent: v.intent,
        intentLabel: this.i18n.t(this.c.intents[v.intent]),
        message: v.message.trim(),
        lang: this.i18n.lang(),
        page: this.doc.location?.pathname ?? '',
      });
      this.state.set(result);
    } catch {
      this.state.set('error');
    }
  }

  /** Leaving the page with unsent text asks for confirmation (closing the dialog keeps a draft). */
  protected warnIfUnsent(e: BeforeUnloadEvent): void {
    const s = this.state();
    if (this.form.dirty && (s === 'idle' || s === 'error')) e.preventDefault();
  }

  close(): void {
    this.ref.close();
  }
}
