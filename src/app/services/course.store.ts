import { messageService } from "./message.service";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { loadingService } from "./loading.service";
@Injectable({ providedIn: "root" })
export class CourseStore {
  constructor(
    private http: HttpClient,
    private loadingService: loadingService,
    private messageService: messageService
  ) {
    this.getCourses();
  }
  private courses = new BehaviorSubject<Course[]>([]);
  courses$ = this.courses.asObservable();

  getCourses(): void {
    this.loadingService
      .showUntilHide(this.http.get("/api/courses"))
      .pipe(
        map((data) => data["payload"]),
        catchError((err) => {
          this.messageService.setMessage("There Is Network Error ;)");
          return throwError((err) => new Error(err));
        })
      )
      .subscribe({
        next: (data) => this.courses.next(data),
      });
  }

  getCoursesByCategory(cat: string): Observable<Course[]> {
    return this.courses$.pipe(
      map((data) =>
        data.filter((c) => c.category === cat).sort(sortCoursesBySeqNo)
      )
    );
  }
}
