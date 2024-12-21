import { inject, Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: "secureUrl",
})
export class SecureUrl implements PipeTransform {
  _domSanitizer = inject(DomSanitizer);
  transform(value: any, ...args: any[]) {
    return this._domSanitizer.bypassSecurityTrustUrl(value);
  }
}
