import { Component, Input } from "@angular/core";
import { Course } from "../model/course";

@Component({
  selector: "courses-card-list",
  templateUrl: "./courses-card-list.component.html",
  styleUrl: "./courses-card-list.component.scss",
})
export class CoursesCardListComponent {
  @Input({ required: true }) courses: Course[];
}
