import { Component, inject, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { Observable } from "rxjs";
import { CourseStore } from "../services/course.store";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  courseStore = inject(CourseStore);
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  ngOnInit() {
    this.updateView();
  }

  updateView() {
    this.beginnerCourses$ = this.courseStore.getCoursesByCategory("BEGINNER");
    this.advancedCourses$ = this.courseStore.getCoursesByCategory("ADVANCED");
  }
}
