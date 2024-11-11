import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Course } from "../model/course";
import { CourseDialogComponent } from "../course-dialog/course-dialog.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { tap } from "rxjs/operators";

@Component({
  selector: "courses-card-list",
  templateUrl: "./courses-card-list.component.html",
  styleUrl: "./courses-card-list.component.scss",
})
export class CoursesCardListComponent {
  @Input({ required: true }) courses: Course[];
  @Output() updatedData: EventEmitter<boolean> = new EventEmitter();

  constructor(private dialog: MatDialog) {}

  editCourse(course: Course) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .pipe(tap(() => this.updatedData.emit(true)))
      .subscribe();
  }
}
