import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  DestroyRef,
  PLATFORM_ID,
  afterNextRender,
  effect,
  inject,
  signal,
  type Signal,
} from '@angular/core';

/**
 * Tracks which of the given element ids is the section being read: the last one whose top has
 * scrolled above a line just under the sticky header. Before the first section that is the first
 * one; scrolled to the very bottom it is the last one, so short final sections can still be reached.
 *
 * It works from the scroll position rather than an IntersectionObserver band, and looks the
 * elements up on every check, so it stays right when the page reuses this component for different
 * content (the docs page does, between modules) and on pages too short to scroll a heading into a
 * band. Browser-only; on the server it stays ''.
 * Call from an injection context (a component constructor or field initialiser).
 */
export function scrollSpy(ids: () => readonly string[]): Signal<string> {
  const active = signal('');
  const doc = inject(DOCUMENT);
  const destroyRef = inject(DestroyRef);
  let frame = 0;

  const update = () => {
    frame = 0;
    const win = doc.defaultView;
    if (!win) return;
    const els = ids()
      .map((id) => doc.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) {
      active.set('');
      return;
    }
    const header =
      parseFloat(win.getComputedStyle(doc.documentElement).getPropertyValue('--header-h')) || 0;
    const line = header + 32;
    const scrolled = win.scrollY > 0;
    const atBottom =
      scrolled && win.innerHeight + win.scrollY >= doc.documentElement.scrollHeight - 2;
    let current = els[0];
    for (const el of els) if (el.getBoundingClientRect().top <= line) current = el;
    active.set(atBottom ? els[els.length - 1].id : current.id);
  };
  const schedule = () => {
    const win = doc.defaultView;
    if (win && !frame) frame = win.requestAnimationFrame(update);
  };

  afterNextRender(() => {
    const win = doc.defaultView;
    if (!win) return;
    win.addEventListener('scroll', schedule, { passive: true });
    win.addEventListener('resize', schedule, { passive: true });
    schedule();
    destroyRef.onDestroy(() => {
      win.removeEventListener('scroll', schedule);
      win.removeEventListener('resize', schedule);
      if (frame) win.cancelAnimationFrame(frame);
    });
  });

  // New content (another module in the same page component): check again once it has rendered.
  const browser = isPlatformBrowser(inject(PLATFORM_ID));
  effect(() => {
    ids();
    if (browser) doc.defaultView?.setTimeout(schedule);
  });

  return active.asReadonly();
}
