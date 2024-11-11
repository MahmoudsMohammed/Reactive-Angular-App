import { messageService } from "./../services/message.service";
import { loadingService } from "./../services/loading.service";
import { Component, inject, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { Observable, throwError } from "rxjs";
import { coursesServices } from "../services/courses.service";
import { catchError, finalize, map, startWith } from "rxjs/operators";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  courseService = inject(coursesServices);
  loadingService = inject(loadingService);
  messageService = inject(messageService);
  courses$: Observable<Course[]>;
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  ngOnInit() {
    this.updateView();
  }

  updateView() {
    this.courses$ = this.loadingService
      .showUntilHide(this.courseService.allCourses())
      .pipe(
        catchError((err) => {
          this.messageService.setMessage("Internal Server Error");
          return throwError(err);
        })
      );

    this.beginnerCourses$ = this.courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category === "BEGINNER")
      )
    );
    this.advancedCourses$ = this.courses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category === "ADVANCED")
      )
    );
  }
}
