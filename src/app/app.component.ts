import { Component, inject, OnInit } from "@angular/core";
import { loadingService } from "./services/loading.service";
import { messageService } from "./services/message.service";
import { CourseStore } from "./services/course.store";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [loadingService, messageService],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  logout() {}
}
