import {Injectable} from '@angular/core';

@Injectable()
export class LessonService {
  findLessonsForModuleId = (moduleId) =>
    fetch(`https://wbdv-generic-server.herokuapp.com/api/jferrari/modules/${moduleId}/lessons`)
      .then(response => response.json())
  findLessonsById = (lessonId) =>
    fetch(`https://wbdv-generic-server.herokuapp.com/api/jferrari/lessons/${lessonId}`)
      .then(response => response.json())
  findLessonsForModule = (module) =>
    fetch(`https://wbdv-generic-server.herokuapp.com/api/jferrari/modules/${module._id}/lessons`)
      .then(response => response.json())
  updateLesson = (lesson) =>
    fetch(`https://wbdv-generic-server.herokuapp.com/api/jferrari/lessons/${lesson._id}`, {
      method: 'PUT',
      body: JSON.stringify(lesson),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json())
  createLessonForModule = (module) =>
    fetch(`https://wbdv-generic-server.herokuapp.com/api/jferrari/modules/${module._id}/lessons`, {
      method: 'POST',
      body: JSON.stringify({title: 'New Lesson'}),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json())
  deleteLesson = (lesson) =>
    fetch(`https://wbdv-generic-server.herokuapp.com/api/jferrari/lessons/${lesson._id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
}
