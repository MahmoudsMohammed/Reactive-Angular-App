import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class messageService {
  message = new BehaviorSubject<string>("");
  message$ = this.message.asObservable();
  setMessage(message: string) {
    this.message.next(message);
  }
}
