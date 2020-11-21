import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LessonService} from '../../services/lesson-service';
import {TopicService} from '../../services/topic-service';

@Component({
  selector: 'app-topic-pills',
  templateUrl: './topic-pills.component.html',
  styleUrls: ['./topic-pills.component.css']
})
export class TopicPillsComponent implements OnInit {


  topics = [];
  topicId = '';
  courseId = '';
  moduleId = '';
  lesson = {_id: ''};

  constructor(private activatedRoute: ActivatedRoute,
              private topicService: TopicService,
              private lessonService: LessonService) { }

  createTopic = () =>
    this.topicService.createTopicForLesson(this.lesson)
      .then(actualTopic => this.topics.push(actualTopic))

  deleteTopic = (topic) =>
    this.topicService.deleteTopic(topic)
      .then(status => this.topics = this.topics.filter(t => t !== topic))

  editing = (topic) =>
    topic.editing = true

  save = (topic) => {
    topic.editing = false;
    this.topicService.updateTopic(topic);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (typeof params.courseId) {
        this.courseId = params.courseId;
      }
      if (typeof params.moduleId) {
        this.moduleId = params.moduleId;
      }
      if (typeof params.topicId) {
        this.topicId = params.topicId;
      }

      const lessonId = params.lessonId;
      if (typeof lessonId !== 'undefined') {
        this.lessonService.findLessonsById(lessonId)
          .then(lesson => this.lesson = lesson);
        this.topicService.findTopicsForLesson(lessonId)
          .then(topics => this.topics = topics);
      }
    });
  }

}
