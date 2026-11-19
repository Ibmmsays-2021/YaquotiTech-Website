import { DOCUMENT } from '@angular/common';
import { Injectable, InjectionToken, Provider, inject } from '@angular/core';
import { brand, type ContactIntent } from '../../content/ui';
import type { Lang } from '../../content/types';

export interface ContactMessage {
  readonly name: string;
  readonly email: string;
  readonly company: string;
  readonly phone: string;
  readonly topicId: string;
  /** Human-readable topic in the visitor's language. */
  readonly topicLabel: string;
  readonly intent: ContactIntent;
  /** Human-readable intent in the visitor's language. */
  readonly intentLabel: string;
  readonly message: string;
  readonly lang: Lang;
  /** Page the dialog was opened from. */
  readonly page: string;
}

/**
 * 'sent'      – the message reached our backend.
 * 'handed-off' – the visitor's email app was opened with the message ready (mailto).
 */
export type ContactResult = 'sent' | 'handed-off';

/** Swap the implementation without touching the dialog: see provideContact(). */
export abstract class ContactService {
  abstract send(message: ContactMessage): Promise<ContactResult>;
}

/**
 * When provided, messages are POSTed as JSON to this URL instead of opening a mailto: link.
 * Example (app.config.ts): `{ provide: CONTACT_ENDPOINT, useValue: 'https://api.example.com/contact' }`
 */
export const CONTACT_ENDPOINT = new InjectionToken<string>('CONTACT_ENDPOINT');

/** Default: opens the visitor's email app with subject and body prefilled (the old site's behaviour). */
@Injectable()
export class MailtoContactService extends ContactService {
  private readonly doc = inject(DOCUMENT);

  send(m: ContactMessage): Promise<ContactResult> {
    const subject = `${m.intentLabel} — ${m.topicLabel}`;
    const body = [
      `Name: ${m.name}`,
      `Email: ${m.email}`,
      `Company: ${m.company || '-'}`,
      `Phone: ${m.phone || '-'}`,
      `Topic: ${m.topicLabel}`,
      `Request: ${m.intentLabel}`,
      `Page: ${m.page}`,
      '',
      m.message,
    ].join('\n');
    const url = `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const win = this.doc.defaultView;
    if (!win) return Promise.reject(new Error('No window to open the email app from.'));
    win.location.href = url;
    return Promise.resolve('handed-off');
  }
}

/** Posts the message as JSON to CONTACT_ENDPOINT. Any non-2xx response is an error. */
@Injectable()
export class HttpContactService extends ContactService {
  private readonly endpoint = inject(CONTACT_ENDPOINT);

  async send(m: ContactMessage): Promise<ContactResult> {
    const res = await fetch(this.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(m),
    });
    if (!res.ok) throw new Error(`Contact endpoint answered ${res.status}`);
    return 'sent';
  }
}

/** Uses HttpContactService when CONTACT_ENDPOINT is provided, otherwise mailto. */
export function provideContact(): Provider[] {
  return [
    MailtoContactService,
    HttpContactService,
    {
      provide: ContactService,
      useFactory: () =>
        inject(CONTACT_ENDPOINT, { optional: true })
          ? inject(HttpContactService)
          : inject(MailtoContactService),
    },
  ];
}
