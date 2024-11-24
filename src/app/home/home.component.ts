import { messageService } from "./../services/message.service";
import { loadingService } from "./../services/loading.service";
import { Component, inject, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { Observable, throwError } from "rxjs";
import { coursesServices } from "../services/courses.service";
import { catchError, finalize, map, startWith } from "rxjs/operators";
import { CourseStore } from "../services/course.store";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  loadingService = inject(loadingService);
  messageService = inject(messageService);
  courseStore = inject(CourseStore);
  courses$: Observable<Course[]>;
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
