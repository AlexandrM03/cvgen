import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalStorage } from '../../services/local-storage.service';

@Component({
    selector: 'app-auth-layout',
    standalone: true,
    imports: [RouterModule, NzIconModule, NzFlexModule, NzDropDownModule, TranslateModule],
    templateUrl: './auth-layout.component.html'
})
export class AuthLayoutComponent {
    constructor(
        private translate: TranslateService,
        private localStorage: LocalStorage
    ) {
        if (this.localStorage.getItem('lang')) {
            this.translate.use(this.localStorage.getItem('lang'));
        } else {
            this.translate.use('en');
        }
    }

    onLanguageChange(lang: string): void {
        this.translate.use(lang);
        this.localStorage.setItem('lang', lang);
    }
}
