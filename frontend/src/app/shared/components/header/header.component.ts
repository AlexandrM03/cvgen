import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { LocalStorage } from '../../../services/local-storage.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [NzLayoutModule, NzMenuModule, NzDropDownModule, TranslateModule, NzIconModule],
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
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
