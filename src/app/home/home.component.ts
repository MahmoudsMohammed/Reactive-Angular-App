import { Component, inject, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { Observable } from "rxjs";
import { coursesServices } from "../services/courses.service";
import { map } from "rxjs/operators";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  courseService = inject(coursesServices);
  courses$: Observable<Course[]>;
  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  ngOnInit() {
    this.updateView();
  }

  updateView() {
    this.courses$ = this.courseService.allCourses();
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
