import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { I18n } from '../../../core/i18n';
import type { ApiEndpoint as ApiEndpointModel, HttpMethod } from '../../../content/types';
import { ui } from '../../../content/ui';
import { CodeBlock, type CodeTab } from '../code-block/code-block';
import { type BadgeTone } from '../status-badge/status-badge';

export const METHOD_TONE: Record<HttpMethod, BadgeTone> = {
  GET: 'sky',
  POST: 'green',
  PUT: 'yellow',
  PATCH: 'yellow',
  DELETE: 'red',
};

/**
 * One endpoint: signature, title, description and parameter table, with its request/response
 * examples beside it (kept in view while the description scrolls on wide screens).
 */
@Component({
  selector: 'app-api-endpoint',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CodeBlock],
  template: `
    <div class="prose">
      <p class="sig" dir="ltr">
        <span [class]="'method tone-' + tone()">{{ endpoint().method }}</span>
        <code translate="no">{{ endpoint().path }}</code>
      </p>
      <h3 [id]="endpoint().id + '-h'">{{ i18n.t(endpoint().title) }}</h3>
      <p class="desc">{{ i18n.t(endpoint().summary) }}</p>
      @if (endpoint().params?.length) {
        <div
          class="table-wrap"
          tabindex="0"
          role="region"
          [attr.aria-labelledby]="endpoint().id + '-params'"
        >
          <table>
            <caption [id]="endpoint().id + '-params'">
              {{
                i18n.t(ui.ref.parameters)
              }}
            </caption>
            <thead>
              <tr>
                <th scope="col">{{ i18n.t(ui.ref.name) }}</th>
                <th scope="col">{{ i18n.t(ui.ref.type) }}</th>
                <th scope="col">{{ i18n.t(ui.ref.required) }}</th>
                <th scope="col">{{ i18n.t(ui.common.description) }}</th>
              </tr>
            </thead>
            <tbody>
              @for (p of endpoint().params; track p.name) {
                <tr>
                  <td>
                    <code translate="no">{{ p.name }}</code>
                  </td>
                  <td dir="ltr" translate="no" class="type">{{ p.type }}</td>
                  <td>{{ i18n.t(p.required ? ui.ref.yes : ui.ref.no) }}</td>
                  <td>{{ i18n.t(p.desc) }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    </div>
    <app-code-block class="examples" [tabs]="examples()" [label]="i18n.t(endpoint().title)" />
  `,
  host: {
    '[id]': 'endpoint().id',
    '[attr.aria-labelledby]': 'endpoint().id + "-h"',
    role: 'article',
  },
  styles: `
    :host {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: clamp(24px, 3vw, 40px);
      align-items: start;
      padding-block: 40px;
      border-block-start: 1px solid var(--border);
      scroll-margin-top: calc(var(--header-h) + 24px);
    }
    .prose {
      display: grid;
      gap: 14px;
      min-width: 0;
    }
    .sig {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      justify-self: start;
    }
    .sig code {
      min-width: 0;
      overflow-wrap: anywhere;
      background: none;
      padding: 0;
      font-size: 0.9375rem;
      font-weight: 600;
    }
    .method {
      display: inline-grid;
      place-items: center;
      min-width: 3.5rem;
      padding: 3px 8px;
      border-radius: 6px;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.02em;
    }
    .tone-sky {
      background: var(--status-sky-bg);
      color: var(--status-sky-fg);
    }
    .tone-green {
      background: var(--status-green-bg);
      color: var(--status-green-fg);
    }
    .tone-yellow {
      background: var(--status-yellow-bg);
      color: var(--status-yellow-fg);
    }
    .tone-red {
      background: var(--status-red-bg);
      color: var(--status-red-fg);
    }
    h3 {
      font-size: 1.1875rem;
    }
    .desc {
      color: var(--text-body);
    }
    .table-wrap {
      overflow-x: auto;
    }
    table {
      width: 100%;
      min-width: 26rem;
      border-collapse: collapse;
      font-size: 0.875rem;
    }
    caption {
      caption-side: top;
      text-align: start;
      padding-block-end: 8px;
      font-weight: 600;
      color: var(--text);
    }
    th,
    td {
      padding: 10px 12px 10px 0;
      padding-inline: 0 12px;
      text-align: start;
      vertical-align: top;
      border-block-end: 1px solid var(--border);
    }
    th {
      font-size: 0.8125rem;
      color: var(--text-muted);
      font-weight: 600;
    }
    td {
      color: var(--text-body);
    }
    td code {
      font-size: 0.8125rem;
    }
    .type {
      font-family: var(--font-mono);
      font-size: 0.8125rem;
      text-align: start;
    }
    .examples {
      position: sticky;
      inset-block-start: calc(var(--header-h) + 24px);
    }
    @media (max-width: 1180px) {
      :host {
        grid-template-columns: minmax(0, 1fr);
      }
      .examples {
        position: static;
      }
    }
  `,
})
export class ApiEndpoint {
  protected readonly i18n = inject(I18n);
  protected readonly ui = ui;
  readonly endpoint = input.required<ApiEndpointModel>();
  protected readonly tone = computed(() => METHOD_TONE[this.endpoint().method]);
  protected readonly examples = computed<readonly CodeTab[]>(() => {
    const e = this.endpoint();
    const t = this.i18n.t;
    return [
      ...(e.request ? [{ label: t(this.ui.common.request), code: e.request }] : []),
      { label: t(this.ui.common.response), code: e.response },
    ];
  });
}
