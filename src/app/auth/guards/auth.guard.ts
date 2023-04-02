import { CanActivateFn, Router, } from "@angular/router";
import {inject} from "@angular/core";
import {InfoService} from "../../shared/services/info.service";

export const AuthGuard: CanActivateFn = () => {
  if (!inject(InfoService).user.value?.isExpired) return inject(Router).navigate(['/auth']);
  return true;
};
