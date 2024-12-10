import { Component, OnInit } from "@angular/core";
import { authStoreService } from "./services/auth.store.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(public authStore: authStoreService, public router: Router) {}

  ngOnInit() {}

  logout() {
    this.authStore.logOut();
    this.router.navigateByUrl("/login");
  }
}
