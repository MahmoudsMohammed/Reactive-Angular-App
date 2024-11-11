import { messageService } from "./../services/message.service";
import { loadingService } from "./../services/loading.service";
import { coursesServices } from "./../services/courses.service";
import { Component, inject, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import moment from "moment";
import { catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs";

@Component({
  selector: "course-dialog",
  templateUrl: "./course-dialog.component.html",
  styleUrls: ["./course-dialog.component.css"],
  providers: [loadingService, messageService],
})
export class CourseDialogComponent {
  coursesServices = inject(coursesServices);
  loadingService = inject(loadingService);
  messageService = inject(messageService);
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
    this.loadingService
      .showUntilHide(this.coursesServices.updateCourse(this.course.id, changes))
      .pipe(
        catchError((err) => {
          this.messageService.setMessage("Can't Save Change Please Try Later");
          return throwError(err);
        }),
        tap(() => this.dialogRef.close(changes))
      )
      .subscribe();
  }

  close() {
    this.dialogRef.close();
  }
}
