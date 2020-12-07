import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuestionsServiceClient} from '../../services/question.service.client';
import {QuizzesServiceClient} from '../../services/quiz.service.client';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  questions = [];
  quizId = '';
  title = '';

  constructor(private questionSvc: QuestionsServiceClient,
              private quizSvc: QuizzesServiceClient,
              private route: ActivatedRoute) { }

  submitQuiz = () => {
    fetch(`http://localhost:3010/api/quizzes/${this.quizId}/attempts`, {
      method: 'POST',
      body: JSON.stringify(this.questions),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json())
      .then(result => console.log(result));
  }

  ngOnInit(): void {
    this.route.params.subscribe(ps => {
      this.quizId = ps.quizId;
      this.questionSvc.findQuestionsForQuiz(this.quizId)
        .then(qs => this.questions = qs);
      this.quizSvc.findQuizById(this.quizId)
        .then(quiz => this.title = quiz.title);
    });
  }


}
