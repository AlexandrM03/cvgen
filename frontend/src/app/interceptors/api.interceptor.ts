import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
    const newReq = req.clone({ url: `http://localhost:3000/api${req.url}` });
    return next(newReq);
};
