import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class messageService {
  private message = new BehaviorSubject<string>("");
  message$ = this.message.asObservable();
  setMessage(message: string) {
    this.message.next(message);
  }
}
