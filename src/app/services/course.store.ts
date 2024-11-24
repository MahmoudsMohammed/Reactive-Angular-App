import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
@Injectable({ providedIn: "root" })
export class CourseStore {
  constructor(private http: HttpClient) {
    this.getCourses();
  }
  private courses = new BehaviorSubject<Course[]>([]);
  courses$ = this.courses.asObservable();

  getCourses(): void {
    this.http
      .get("/api/courses")
      .pipe(map((data) => data["payload"]))
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
