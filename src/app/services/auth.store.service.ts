import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../model/user";
import { HttpClient } from "@angular/common/http";
import { map, shareReplay, tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class authStoreService {
  private user = new BehaviorSubject<User>(null);
  user$ = this.user.asObservable();
  loginIn$: Observable<boolean>;
  LogOut$: Observable<boolean>;

  constructor(private http: HttpClient) {
    // check for user data in LS
    if (localStorage.getItem("user")) {
      this.user.next(JSON.parse(localStorage.getItem("user")));
    }
    // Map user Data into a boolean expression
    this.loginIn$ = this.user$.pipe(map((user) => !!user));
    this.LogOut$ = this.loginIn$.pipe(map((data) => !data));
  }

  login(email: string, password: string): Observable<User> {
    // this is http request make it hot as best practice to reduce requests
    return this.http.post<User>("/api/login", { email, password }).pipe(
      tap((user) => {
        this.user.next(user);
        localStorage.setItem("user", JSON.stringify(user));
      }),
      shareReplay(1)
    );
  }

  logOut() {
    this.user.next(null);
    localStorage.removeItem("user");
  }
}
