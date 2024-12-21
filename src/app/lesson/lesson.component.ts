import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { Lesson } from "../model/lesson";

@Component({
  selector: "lesson",
  templateUrl: "./lesson.component.html",
  styleUrls: ["./lesson.component.css"],
})
export class LessonComponent implements OnChanges {
  @Input({ required: true }) lesson: Lesson;
  @Output() back = new EventEmitter<boolean>();

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes["lesson"].currentValue);
  }
}
