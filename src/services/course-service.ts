import {Injectable} from '@angular/core';

@Injectable()
export class CourseService {

  url = 'http://localhost:3010/api';

  fetchAllCourses = () =>
    fetch('${this.url}/jferrari/courses')
      .then(response => response.json())
  getCourseById = (courseId) =>
    fetch(`${this.url}/jferrari/courses/${courseId}`)
      .then(response => response.json())
  createCourse = () =>
    fetch(`${this.url}/jferrari/courses`, {
      method: 'POST',
      body: JSON.stringify({title: 'New Course'}),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json())
  updateCourse = (course) =>
    fetch(`${this.url}/jferrari/courses/${course._id}`, {
      method: 'PUT',
      body: JSON.stringify(course),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json())
  deleteCourse = (course) =>
    fetch(`${this.url}/jferrari/courses/${course._id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
}
