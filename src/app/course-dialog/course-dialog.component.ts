import { coursesServices } from "./../services/courses.service";
import { AfterViewInit, Component, inject, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import moment from "moment";
import { finalize, tap } from "rxjs/operators";

@Component({
  selector: "course-dialog",
  templateUrl: "./course-dialog.component.html",
  styleUrls: ["./course-dialog.component.css"],
})
export class CourseDialogComponent {
  coursesServices = inject(coursesServices);
  form: FormGroup;
  course: Course;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course
  ) {
    this.course = course;

    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required],
    });
  }

  save() {
    const changes = this.form.value;
    console.log(changes);
    this.coursesServices
      .updateCourse(this.course.id, changes)
      .pipe(
        tap(() => this.dialogRef.close(changes)),
        finalize(() => console.log("Course Completed"))
      )
      .subscribe();
  }

  close() {
    this.dialogRef.close();
  }
}
