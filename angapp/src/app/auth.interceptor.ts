import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import {AuthService} from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authservice: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let tokenizedReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${this.authservice.getToken()}`
            }
        });
        return next.handle( tokenizedReq);
    }
}