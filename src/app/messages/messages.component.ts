import { messageService } from "./../services/message.service";
import { Component, inject, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Message } from "../model/message";
import { tap } from "rxjs/operators";

@Component({
  selector: "messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.css"],
})
export class MessagesComponent implements OnInit {
  showMessage = false;
  messageService = inject(messageService);
  message$: Observable<string>;
  ngOnInit() {
    this.message$ = this.messageService.message$.pipe(
      tap(() => (this.showMessage = true))
    );
  }
}
