import { Component } from '@angular/core';
import { AuthFormComponent } from '../../shared/components/auth-form/auth-form.component';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [AuthFormComponent, NzFlexModule],
    templateUrl: './auth.component.html'
})
export class AuthComponent {

}
