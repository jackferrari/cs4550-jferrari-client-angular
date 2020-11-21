import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ModuleService} from '../../services/module-service';
import {CourseService} from '../../services/course-service';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent implements OnInit {

  modules = [];
  moduleId = '';
  course = {title: '', _id: ''};

  constructor(private activatedRoute: ActivatedRoute,
              private moduleService: ModuleService,
              private courseService: CourseService) { }

  createModule = () =>
    this.moduleService.createModuleForCourse(this.course)
      .then(actualCourse => this.modules.push(actualCourse))

  deleteModule = (module) =>
    this.moduleService.deleteModule(module)
      .then(status => this.modules = this.modules.filter(m => m !== module))

  editing = (module) =>
    module.editing = true

  save = (module) => {
    module.editing = false;
    this.moduleService.updateModule(module);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      if (typeof params.moduleId) {
        this.moduleId = params.moduleId;
      }
      const courseId = params.courseId;
      if (typeof courseId !== 'undefined') {
        this.courseService.getCourseById(courseId)
          .then(course => this.course = course);
        this.moduleService.findModulesForCourseId(courseId)
          .then(modules => this.modules = modules);
      }
    });
  }

}
