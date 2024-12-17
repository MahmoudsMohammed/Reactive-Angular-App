import { loadingService } from "./../services/loading.service";
import { messageService } from "./../services/message.service";
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
} from "rxjs/operators";
import { merge, fromEvent, Observable, concat, throwError } from "rxjs";
import { Lesson } from "../model/lesson";

@Component({
  selector: "course",
  templateUrl: "./search-lessons.component.html",
  styleUrls: ["./search-lessons.component.css"],
})
export class SearchLessonsComponent {
  constructor(
    private coursesServices: coursesServices,
    private messageService: messageService,
    private loadingService: loadingService
  ) {}
  lessons$: Observable<Lesson[]>;
  onSearch(search: string) {
    if (search !== "") {
      this.lessons$ = this.loadingService
        .showUntilHide(this.coursesServices.searchLessons(search))
        .pipe(
          catchError((e) => {
            this.messageService.setMessage(
              "There Is Some Error Please Try Later"
            );
            return throwError(e);
          })
        );
    }
  }
}
