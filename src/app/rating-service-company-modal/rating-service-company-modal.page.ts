import { Component, OnInit } from '@angular/core';
import { QuestionServiceRating } from '../interfaces/own/questionServiceRating.interface';
import { StarRating } from '../interfaces/own/starRating.interfaces';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-rating-service-company-modal',
  templateUrl: './rating-service-company-modal.page.html',
  styleUrls: ['./rating-service-company-modal.page.scss'],
})
export class RatingServiceCompanyModalPage implements OnInit {

  public stateStar: boolean = false;
  public questions: QuestionServiceRating[] = [];
  public isValidServiceRating: boolean;

  constructor(private modalController: ModalController) {
    this.isValidServiceRating = false;
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

  /**
   * @description Tiene como objetivo marcar/des-marcar las estrellas seleccionadas
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-05-03
   * @param void
   * @returns void
   */
  public handleTapStar(question: QuestionServiceRating, star: StarRating): void {
    const newStars: StarRating[] = [];
    for(let _star of question.stars) {
      if (star.id >= _star['id']) {
        newStars.push({'id': _star.id, 'isMarked': true, 'path': 'assets/imgs/star.png'});
      } else {
        newStars.push({'id': _star.id, 'isMarked': false, 'path': 'assets/imgs/star-outline.png'});
      }
    }
    question.stars = newStars;
    this.observeChangeStar();
  }

  /**
   * @description Tiene como objetivo observar los cambios de estado  de  las estrellas con el fin de 
   *              determinar si todas las preguntas/items han sido calificados
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-05-03
   * @param void
   * @returns void
   */
  private observeChangeStar(): void {
    let countNotAnswer = 0;
    for (let question of this.questions) {
      /*
       * se selecciona la primera estrella de cada pregunta y se evalua si esta marcada,
       * de estar marcada se asume que la pregunta ya ha sido calificada.
       */
      if (question.stars[0].isMarked == false) {
        countNotAnswer ++;
      }
    }
    if (countNotAnswer == 0) {
      this.isValidServiceRating = true;
    }
  }

   /**
   * @description Tiene como objetivo cerrar el modal
   * @author Heiner Gómez <alejandro.gomez@grupooet.com>
   * @date 2019-05-03
   * @param void
   * @returns void
   */
  public handleTapCloseButton(): void {
    this.modalController.dismiss();
  }

}
