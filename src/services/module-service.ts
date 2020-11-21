import {Injectable} from '@angular/core';

@Injectable()
export class ModuleService {
  findModulesForCourseId = (courseId) =>
    fetch(`https://wbdv-generic-server.herokuapp.com/api/jferrari/courses/${courseId}/modules`)
      .then(response => response.json())
  findModulesForCourse = (course) =>
    fetch(`https://wbdv-generic-server.herokuapp.com/api/jferrari/courses/${course._id}/modules`)
      .then(response => response.json())
  updateModule = (module) =>
    fetch(`https://wbdv-generic-server.herokuapp.com/api/jferrari/modules/${module._id}`, {
      method: 'PUT',
      body: JSON.stringify(module),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json())
  createModuleForCourse = (course) =>
    fetch(`https://wbdv-generic-server.herokuapp.com/api/jferrari/courses/${course._id}/modules`, {
      method: 'POST',
      body: JSON.stringify({title: 'New Module'}),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json())
  deleteModule = (module) =>
    fetch(`https://wbdv-generic-server.herokuapp.com/api/jferrari/modules/${module._id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
}
