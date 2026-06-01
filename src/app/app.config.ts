import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authTokenHttpInterceptInterceptor } from './services/auth-token-http-intercept-interceptor';
import { authQrAccessHttpInterceptor } from './services/auth-qr-access-http-interceptor';
import { CookieService } from 'ngx-cookie-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        authTokenHttpInterceptInterceptor,
        authQrAccessHttpInterceptor,
      ]),
    ),
    CookieService,
    provideRouter(routes),
    provideCharts(withDefaultRegisterables()),
  ],
};
