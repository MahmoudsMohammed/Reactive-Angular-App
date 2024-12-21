import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { map, shareReplay } from "rxjs/operators";
import { Lesson } from "../model/lesson";

@Injectable({ providedIn: "root" })
export class coursesServices {
  constructor(private http: HttpClient) {}

  allCourses(): Observable<Course[]> {
    return this.http.get<Course[]>("/api/courses").pipe(
      map((courses) => courses["payload"].sort(sortCoursesBySeqNo)),
      shareReplay()
    );
  }

  searchLessons(keyword: string): Observable<Lesson[]> {
    return this.http
      .get<Lesson[]>(`/api/lessons?filter=${keyword}&pageSize=10000`)
      .pipe(
        map((res) => res["payload"]),
        shareReplay(1)
      );
  }

  courseDetails(id): Observable<Course> {
    return this.http.get<Course>(`/api/courses/${id}`);
  }
}
