import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { map, shareReplay, tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class coursesServices {
  courses$: Observable<Course[]>;
  constructor(private http: HttpClient) {
    this.courses$ = this.http.get<Course[]>("/api/courses").pipe(
      map((courses) => courses["payload"].sort(sortCoursesBySeqNo)),
      shareReplay()
    );
  }

  filterCategory(cat: string): Observable<Course[]> {
    return this.courses$.pipe(
      map((courses: Course[]) =>
        courses.filter((course) => course.category === cat)
      )
    );
  }
}
