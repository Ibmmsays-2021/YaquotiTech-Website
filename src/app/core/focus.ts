import type { Observable } from 'rxjs';

/** What a dialog closes with when it closed because the visitor followed a link. */
export const NAVIGATED = 'navigated';
// Also used when a dialog hands focus on to another dialog it opens.

/**
 * Use instead of the CDK's `restoreFocus: true`. When a dialog closes, focus goes back to the
 * button that opened it (for keyboard and screen-reader users) but without the focus ring the
 * browser would otherwise draw after a key press such as Esc or Enter. When the dialog closed by
 * navigating (`ref.close(NAVIGATED)`), focus stays with the new page instead.
 */
export function restoreFocusQuietly(
  trigger: Element | null,
  closed: Observable<unknown>,
  doc: Document,
): void {
  if (!(trigger instanceof HTMLElement)) return;
  closed.subscribe((result) => {
    if (result === NAVIGATED || !trigger.isConnected || trigger === doc.body) return;
    const active = doc.activeElement;
    // Leave focus alone if something else on the page already took it.
    if (active && active !== doc.body && !active.closest('.cdk-overlay-container')) return;
    trigger.focus({ preventScroll: true, focusVisible: false } as FocusOptions);
  });
}
