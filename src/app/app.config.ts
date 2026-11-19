import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import { routes } from './app.routes';
import { provideContact } from './core/contact/contact';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      // Route params, data and query params arrive as component inputs.
      withComponentInputBinding(),
      // Child pages see the parent's :productId.
      withRouterConfig({ paramsInheritanceStrategy: 'always' }),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
    ),
    // Angular 22: incremental hydration and event replay are on by default.
    provideClientHydration(),
    // Contact form: mailto by default. To post to a backend instead, also provide
    // { provide: CONTACT_ENDPOINT, useValue: 'https://…/contact' }.
    provideContact(),
  ],
};
