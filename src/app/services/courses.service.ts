import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { map, shareReplay } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class coursesServices {
  constructor(private http: HttpClient) {}

  allCourses(): Observable<Course[]> {
    return this.http.get<Course[]>("/api/courses").pipe(
      map((courses) => courses["payload"].sort(sortCoursesBySeqNo)),
      shareReplay()
    );
  }

  updateCourse(courseId: string, changes: Partial<Course>) {
    return this.http.put(`/api/courses/${courseId}`, changes);
  }
}
