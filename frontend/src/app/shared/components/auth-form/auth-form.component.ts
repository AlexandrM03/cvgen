import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth.service';
import { SessionStorage } from '../../../services/session-storage.service';
import { LocalStorage } from '../../../services/local-storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-auth-form',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule, NzCheckboxModule, NzGridModule, TranslateModule],
    templateUrl: './auth-form.component.html'
})
export class AuthFormComponent {
    constructor(
        private fb: NonNullableFormBuilder,
        private auth: AuthService,
        private sessionStorage: SessionStorage,
        private localStorage: LocalStorage,
        private router: Router,
        private toastr: ToastrService
    ) { }

    isLoading = false;

    validateForm: FormGroup<{
        username: FormControl<string>;
        password: FormControl<string>;
        remember: FormControl<boolean>;
    }> = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
        remember: [true]
    });

    submitForm(): void {
        if (this.validateForm.valid) {
            this.isLoading = true;
            this.auth.login({
                username: this.validateForm.get('username')!.value,
                password: this.validateForm.get('password')!.value
            }).subscribe({
                next: data => {
                    if (this.validateForm.get('remember')!.value) {
                        this.localStorage.setItem('accessToken', data.accessToken);
                        this.localStorage.setItem('refreshToken', data.refreshToken);
                    } else {
                        this.sessionStorage.setItem('accessToken', data.accessToken);
                        this.sessionStorage.setItem('refreshToken', data.refreshToken);
                    }

                    this.router.navigate(['dashboard', 'employees']);
                    this.isLoading = false;
                },
                error: (err) => {
                    this.toastr.error(err.error.message);
                    this.isLoading = false;
                }
            });
        } else {
            Object.values(this.validateForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }
}
