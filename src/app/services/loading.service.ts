import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { concatMap, finalize, tap } from "rxjs/operators";
@Injectable({ providedIn: "root" })
export class loadingService {
  private isLoad: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  loading$: Observable<boolean> = this.isLoad.asObservable();

  showUntilHide<T>(obs$: Observable<T>) {
    return of(null).pipe(
      tap(() => this.loadOn()),
      concatMap(() => obs$),
      finalize(() => this.loadOff())
    );
  }
  loadOn() {
    this.isLoad.next(true);
  }

  loadOff() {
    this.isLoad.next(false);
  }
}
