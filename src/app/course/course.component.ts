import { coursesServices } from "./../services/courses.service";
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Course } from "../model/course";
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll,
  shareReplay,
  catchError,
  finalize,
  first,
} from "rxjs/operators";
import { merge, fromEvent, Observable, concat, throwError } from "rxjs";
import { Lesson } from "../model/lesson";

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
})
export class CourseComponent implements OnInit {
  course: Course;
  lessons: Lesson[];
  courseId: string;
  constructor(
    private route: ActivatedRoute,
    private coursesServices: coursesServices
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((data) => data["courseId"]),
        switchMap((id) => this.coursesServices.courseDetails(id)),
        first(),
        finalize(() => console.log("the Observable is Finished"))
      )
      .subscribe(console.log);
  }
}
