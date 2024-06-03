import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideNzIcons } from './icons-provider';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpBackend, HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { apiInterceptor } from './interceptors/api.interceptor';
import { tokenInterceptorProvider } from './interceptors/token.interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { EmployeesEffects } from './store/effects/employee.effect';
import { appReducers } from './store/states/app.state';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { ProjectsEffects } from './store/effects/project.effect';
import { CvsEffects } from './store/effects/cv.effect';
import { SharedEffects } from './store/effects/shared.effect';
import { provideClientHydration } from '@angular/platform-browser';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideNzIcons(),
        importProvidersFrom(FormsModule),
        provideAnimationsAsync(),
        provideToastr({
            timeOut: 3000,
            positionClass: 'toast-bottom-center',
            preventDuplicates: true,
        }),
        provideHttpClient(withInterceptors([apiInterceptor])),
        importProvidersFrom(TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpBackend]
            }
        })),
        tokenInterceptorProvider,
        provideStore(appReducers),
        provideEffects(EmployeesEffects, ProjectsEffects, CvsEffects, SharedEffects),
        provideNzI18n(en_US), provideClientHydration()
    ],
};

export function HttpLoaderFactory(handler: HttpBackend) {
    const http = new HttpClient(handler);

    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}