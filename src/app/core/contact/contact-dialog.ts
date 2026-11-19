import { DOCUMENT } from '@angular/common';
import { Injectable, Injector, inject } from '@angular/core';
import type { ContactIntent } from '../../content/ui';
import { I18n } from '../i18n';

export interface ContactDialogOptions {
  /** Preselected topic: a product id, a service id or 'other'. */
  readonly topic?: string;
  /** Preselected "I'd like to…" choice. */
  readonly intent?: ContactIntent;
}

export interface ContactDraftValue {
  readonly name: string;
  readonly email: string;
  readonly company: string;
  readonly phone: string;
  readonly message: string;
}

export const EMPTY_DRAFT: ContactDraftValue = {
  name: '',
  email: '',
  company: '',
  phone: '',
  message: '',
};

/** What the visitor typed, kept (in memory only) when the dialog is closed without sending. */
@Injectable({ providedIn: 'root' })
export class ContactDraft {
  value: ContactDraftValue = EMPTY_DRAFT;
}

/**
 * The one way to open the shared "Get in touch" dialog.
 * The dialog, Angular CDK Dialog and Forms are loaded on first use, so pages don't pay for them up front.
 */
@Injectable({ providedIn: 'root' })
export class ContactDialogService {
  private readonly injector = inject(Injector);
  private readonly i18n = inject(I18n);
  private readonly doc = inject(DOCUMENT);
  private isOpen = false;
  private opening = false;

  async open(options: ContactDialogOptions = {}): Promise<void> {
    if (this.isOpen || this.opening) return;
    this.opening = true;
    try {
      const [{ Dialog }, { GetInTouchDialog }] = await Promise.all([
        import('@angular/cdk/dialog'),
        import('../../shared/ui/get-in-touch-dialog/get-in-touch-dialog'),
      ]);
      // Autofocus the first field only with a fine pointer (desktop); on touch screens it would pop
      // the keyboard over the sheet, so focus goes to the dialog itself instead.
      const finePointer = this.doc.defaultView?.matchMedia?.('(pointer: fine)').matches ?? true;
      const ref = this.injector.get(Dialog).open(GetInTouchDialog, {
        data: options,
        ariaLabelledBy: 'git-title',
        ariaModal: true,
        direction: this.i18n.dir(),
        panelClass: 'git-panel',
        backdropClass: 'git-backdrop',
        autoFocus: finePointer ? '#git-name' : 'dialog',
        restoreFocus: true,
        // A fixed width keeps CDK centring the panel; small screens get a full-screen sheet (base.scss).
        width: '600px',
        maxWidth: 'calc(100vw - 32px)',
      });
      this.isOpen = true;
      ref.closed.subscribe(() => (this.isOpen = false));
    } finally {
      this.opening = false;
    }
  }
}
