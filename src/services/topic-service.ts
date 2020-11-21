import {Injectable} from '@angular/core';

@Injectable()
export class TopicService {
  findTopicsForLessonId = (lessonId) =>
    fetch(`https://wbdv-generic-server.herokuapp.com/api/jferrari/lessons/${lessonId}/topics`)
      .then(response => response.json())
  findTopicsForLesson = (lesson) =>
    fetch(`https://wbdv-generic-server.herokuapp.com/api/jferrari/lessons/${lesson._id}/topics`)
      .then(response => response.json())
  updateTopic = (topic) =>
    fetch(`https://wbdv-generic-server.herokuapp.com/api/jferrari/topics/${topic._id}`, {
      method: 'PUT',
      body: JSON.stringify(topic),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json())
  createTopicForLesson = (lesson) =>
    fetch(`https://wbdv-generic-server.herokuapp.com/api/jferrari/lessons/${lesson._id}/topics`, {
      method: 'POST',
      body: JSON.stringify({title: 'New Topic'}),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json())
  deleteTopic = (topic) =>
    fetch(`https://wbdv-generic-server.herokuapp.com/api/jferrari/topics/${topic._id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
}
