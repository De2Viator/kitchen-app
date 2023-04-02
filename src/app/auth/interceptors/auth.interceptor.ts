import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {Router} from "@angular/router";
import {InfoService} from "../../shared/services/info.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly infoService: InfoService, private readonly router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.infoService.user.value?.isExpired|| '';
    const authReq = req.clone({
      setParams:{
        auth: token,
      }
    })
    return next.handle(authReq).pipe(catchError(err => {
      if(err.status === 401) this.router.navigate(['/auth']);
      return throwError(err);
    }))
  }
}
