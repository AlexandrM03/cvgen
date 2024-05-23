import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, TranslateModule],
    templateUrl: './app.component.html'
})
export class AppComponent {
    constructor(private translate: TranslateService) {
        translate.setDefaultLang('en');
        translate.use('en');

        const browserLang = translate.getBrowserLang();
        if (browserLang) {
            translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
        }
    }
}
