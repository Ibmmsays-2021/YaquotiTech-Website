import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { I18n } from '../../core/i18n';
import { ui } from '../../content/ui';
import { Icon } from './icon/icon';

/**
 * Framed placeholder for a product screenshot.
 * TODO: real content — replace with <img> of the product (16:10, with width/height set).
 */
@Component({
  selector: 'app-screenshot-placeholder',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <figure>
      <div
        class="frame"
        role="img"
        [attr.aria-label]="i18n.t(ui.common.screenshot) + ' — ' + name()"
      >
        <div class="chrome" aria-hidden="true"><span></span><span></span><span></span></div>
        <div class="canvas" aria-hidden="true">
          <div class="side"><i></i><i></i><i></i><i></i></div>
          <div class="main">
            <i class="w60"></i><i class="w90"></i><i class="w75"></i>
            <div class="tiles"><b></b><b></b><b></b></div>
          </div>
        </div>
      </div>
      <figcaption>
        <app-icon name="image" [size]="14" /> {{ i18n.t(ui.common.screenshot) }}
      </figcaption>
    </figure>
  `,
  styles: `
    figure {
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .frame {
      aspect-ratio: 16 / 10;
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      background: var(--surface);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .chrome {
      display: flex;
      gap: 6px;
      padding: 10px 12px;
      border-block-end: 1px solid var(--border);
      background: var(--navy-50);
    }
    .chrome span {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--navy-200);
    }
    .canvas {
      flex: 1;
      display: grid;
      grid-template-columns: 26% 1fr;
      background-image: radial-gradient(var(--navy-100) 1px, transparent 1px);
      background-size: 14px 14px;
    }
    .side {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 16px 14px;
      border-inline-end: 1px solid var(--border);
      background: var(--surface);
    }
    .side i,
    .main i {
      display: block;
      height: 8px;
      border-radius: 4px;
      background: var(--navy-100);
    }
    .side i:first-child {
      background: var(--primary-200);
    }
    .main {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 18px;
    }
    .w60 {
      width: 60%;
      height: 12px !important;
      background: var(--navy-200) !important;
    }
    .w90 {
      width: 90%;
    }
    .w75 {
      width: 75%;
    }
    .tiles {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-block-start: 8px;
    }
    .tiles b {
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      background: var(--surface);
    }
    .tiles b:first-child {
      border-color: var(--primary-200);
      background: var(--primary-50);
    }
    figcaption {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.8125rem;
      color: var(--text-muted);
    }
  `,
})
export class ScreenshotPlaceholder {
  protected readonly i18n = inject(I18n);
  protected readonly ui = ui;
  readonly name = input('');
}
