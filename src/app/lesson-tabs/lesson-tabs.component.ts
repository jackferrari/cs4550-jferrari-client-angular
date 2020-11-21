import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ModuleService} from '../../services/module-service';
import {CourseService} from '../../services/course-service';
import {LessonService} from '../../services/lesson-service';

@Component({
  selector: 'app-lesson-tabs',
  templateUrl: './lesson-tabs.component.html',
  styleUrls: ['./lesson-tabs.component.css']
})
export class LessonTabsComponent implements OnInit {


  lessons = [];
  lessonId = '';
  courseId = '';
  module = {_id: ''};

  constructor(private activatedRoute: ActivatedRoute,
              private moduleService: ModuleService,
              private lessonService: LessonService) { }

  createLesson = () =>
    this.lessonService.createLessonForModule(this.module)
      .then(actualLesson => this.lessons.push(actualLesson))

  deleteLesson = (lesson) =>
    this.lessonService.deleteLesson(lesson)
      .then(status => this.lessons = this.lessons.filter(l => l !== lesson))

  editing = (lesson) =>
    lesson.editing = true

  save = (lesson) => {
    lesson.editing = false;
    this.lessonService.updateLesson(lesson);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (typeof params.courseId) {
        this.courseId = params.courseId;
      }
      if (typeof params.lessonId) {
        this.lessonId = params.lessonId;
      }
      const moduleId = params.moduleId;
      if (typeof moduleId !== 'undefined') {
        this.moduleService.findModuleById(moduleId)
          .then(module => this.module = module);
        this.lessonService.findLessonsForModuleId(moduleId)
          .then(lessons => this.lessons = lessons);
      }
    });
  }

}
