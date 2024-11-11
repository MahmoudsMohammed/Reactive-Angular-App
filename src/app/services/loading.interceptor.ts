import { loadingService } from "./loading.service";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

@Injectable()
export class loadingInterceptor implements HttpInterceptor {
  loadingService = inject(loadingService);
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.loadingService.showUntilHide(next.handle(req));
  }
}
