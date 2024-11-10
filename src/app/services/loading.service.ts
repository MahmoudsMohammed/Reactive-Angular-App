import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class loadingService {
  private isLoad: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  loading$: Observable<boolean> = this.isLoad.asObservable();

  loadOn() {
    this.isLoad.next(true);
  }

  loadOff() {
    this.isLoad.next(false);
  }
}
