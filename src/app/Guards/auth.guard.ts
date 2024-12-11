import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { authStoreService } from "../services/auth.store.service";

export const authGuard: CanActivateFn = (route, state) => {
  return inject(authStoreService).loginIn$;
};
