import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Icon } from '../icon/icon';

let uid = 0;

/**
 * Disclosure-pattern dropdown for the header (button + panel, not an ARIA menu, because it holds
 * plain navigation links). Opens on click/Enter/Space and on hover; Esc closes and returns focus.
 * The panel stays in the DOM so links are crawlable and in tab order when open.
 */
@Component({
  selector: 'app-nav-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <button
      #trigger
      type="button"
      class="trigger"
      [class.active]="active()"
      [attr.aria-expanded]="open()"
      [attr.aria-controls]="panelId"
      (click)="open.set(!open())"
    >
      {{ label() }}
      <app-icon name="chevron" [size]="16" [class.rot]="open()" />
    </button>
    <div class="panel" [id]="panelId" [class.open]="open()" [class.wide]="wide()">
      <ng-content />
    </div>
  `,
  host: {
    '(mouseenter)': 'hover(true)',
    '(mouseleave)': 'hover(false)',
    '(focusout)': 'focusOut($event)',
    '(keydown.escape)': 'escape()',
  },
  styleUrl: './nav-dropdown.scss',
})
export class NavDropdown {
  readonly label = input.required<string>();
  readonly active = input(false);
  readonly wide = input(false);
  protected readonly open = signal(false);
  protected readonly panelId = `nav-panel-${++uid}`;
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly trigger = viewChild.required<ElementRef<HTMLButtonElement>>('trigger');
  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    inject(Router)
      .events.pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(inject(DestroyRef)),
      )
      .subscribe(() => this.open.set(false));
  }

  protected hover(on: boolean): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.open.set(on), on ? 80 : 160);
  }

  protected focusOut(e: FocusEvent): void {
    const next = e.relatedTarget as Node | null;
    if (!next || !this.host.nativeElement.contains(next)) this.open.set(false);
  }

  protected escape(): void {
    if (!this.open()) return;
    this.open.set(false);
    this.trigger().nativeElement.focus();
  }
}
