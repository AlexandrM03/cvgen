import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LocalStorage } from '../../services/local-storage.service';
import { SessionStorage } from '../../services/session-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
    const sessionStorage = inject(SessionStorage);
    const localStorage = inject(LocalStorage);

    if (sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken')) {
        return true;
    }
    return false;
};
