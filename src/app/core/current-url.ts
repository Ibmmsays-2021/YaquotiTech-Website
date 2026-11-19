import { Injectable, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { LANGS, type Lang } from '../content/types';

/** The current URL as a signal, plus the same page in another language. */
@Injectable({ providedIn: 'root' })
export class CurrentUrl {
  private readonly router = inject(Router);

  readonly url = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  /** Path without query/fragment. */
  readonly path = computed(() => this.url().split(/[?#]/)[0] ?? '/');

  /** Path after the language segment ('' for a language home). */
  readonly pathAfterLang = computed(() => {
    const parts = this.path().split('/').filter(Boolean);
    if (parts.length && (LANGS as readonly string[]).includes(parts[0] ?? '')) parts.shift();
    return parts.join('/');
  });

  /** Same page in `lang`. */
  inLang(lang: Lang): string {
    const rest = this.pathAfterLang();
    return `/${lang}${rest ? `/${rest}` : ''}`;
  }
}
