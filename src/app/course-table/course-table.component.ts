import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CourseService} from '../../services/course-service';

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.css']
})
export class CourseTableComponent implements OnInit {

  courses = [];
  courseId = '';

  constructor(private activateRoute: ActivatedRoute,
              private service: CourseService,
              private courseService: CourseService) { }

  createCourse = () =>
    this.courseService.createCourse()
      .then(actualCourse => this.courses.push(actualCourse))

  deleteCourse = (course) =>
    this.courseService.deleteCourse(course)
      .then(status => this.courses = this.courses.filter(c => c !== course))

  editing = (course) =>
    course.editing = true

  save = (course) => {
    course.editing = false;
    this.courseService.updateCourse(course);
  }

  ngOnInit(): void {

    this.activateRoute.params.subscribe(params => {
      if (typeof params.courseId) {
        this.courseId = params.courseId;
      }
    });

    this.service.fetchAllCourses()
      .then(courses => this.courses = courses);
  }

}
