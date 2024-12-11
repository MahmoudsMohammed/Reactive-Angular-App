import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { CourseComponent } from "./course/course.component";
import { LoginComponent } from "./login/login.component";
import { SearchLessonsComponent } from "./search-lessons/search-lessons.component";
import { authGuard } from "./Guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: "search-lessons",
    component: SearchLessonsComponent,
    canActivate: [authGuard],
  },
  {
    path: "about",
    component: AboutComponent,
    canActivate: [authGuard],
  },
  {
    path: "courses/:courseId",
    component: CourseComponent,
    canActivate: [authGuard],
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "**",
    redirectTo: "/",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
