import { Component, OnInit } from '@angular/core';
import { QuestionServiceRating } from '../interfaces/own/questionServiceRating.interface';
import { StarRating } from '../interfaces/own/starRating.interfaces';

@Component({
  selector: 'app-rating-service-company-modal',
  templateUrl: './rating-service-company-modal.page.html',
  styleUrls: ['./rating-service-company-modal.page.scss'],
})
export class RatingServiceCompanyModalPage implements OnInit {

  public stateStar: boolean = false;
  public questions: QuestionServiceRating[] = [];

  constructor() {
    let stars: StarRating[] = [];
    stars.push({
      'id': 1,
      'isMarked': false,
      'path': 'assets/imgs/star-outline.png'
    });
    stars.push({
      'id': 2,
      'isMarked': false,
      'path': 'assets/imgs/star-outline.png'
    });
    stars.push({
      'id': 3,
      'isMarked': false,
      'path': 'assets/imgs/star-outline.png'
    });
    stars.push({
      'id': 4,
      'isMarked': false,
      'path': 'assets/imgs/star-outline.png'
    });
    stars.push({
      'id': 5,
      'isMarked': false,
      'path': 'assets/imgs/star-outline.png'
    });
    this.questions.push({
      'id': 1, 
      'name': 'Rapidez en la entrega de documentos',
      'comments': '',
      'stars': stars
    });
    this.questions.push({
      'id': 2, 
      'name': 'Rapidez en el pago del anticipo',
      'comments': '',
      'stars': stars
    });
    this.questions.push({
      'id': 3, 
      'name': 'Cobros no definidos en la oferta',
      'comments': '',
      'stars': stars
    });
    this.questions.push({
      'id': 4, 
      'name': 'Facilidad en la entrega de cumplidos',
      'comments': '',
      'stars': stars
    });
    this.questions.push({
      'id': 5, 
      'name': 'Rapidez en el pago del excedente',
      'comments': '',
      'stars': stars
    });
  }

  ngOnInit() {
  }

}
