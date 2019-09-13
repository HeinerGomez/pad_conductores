import { Component, OnInit } from '@angular/core';
import { QuestionServiceRating } from '../../interfaces/own/questionServiceRating.interface';
import { StarRating } from '../../interfaces/own/starRating.interfaces';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { Question } from 'src/app/models/question';
import { OffersApiService } from 'src/app/services/api/offers-api.service';
import { RatingServiceCompanyOutput } from '../../converts/outputs/rating-service-company-output.convert';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rating-service-company-modal',
  templateUrl: './rating-service-company-modal.page.html',
  styleUrls: ['./rating-service-company-modal.page.scss'],
})
export class RatingServiceCompanyModalPage implements OnInit {
 
  public stateStar: boolean = false;
  public questions: QuestionServiceRating[] = [];
  public isValidServiceRating: boolean;
  private offerId: number;
  public reactiveForm: FormGroup;

  constructor(
    private modalController: ModalController, private utilsService: UtilitiesService,
    private navController: NavController, private offersAPIService: OffersApiService,
    private navParams: NavParams, private formBuilder: FormBuilder
  ) {
    this.isValidServiceRating = false;
    this.offerId = this.navParams.get('offerId');
    this.reactiveForm = this.defineReactiveForm();
  }

  ngOnInit() {
    this.getQuestions();
  }

  private defineReactiveForm(): FormGroup {
    return this.formBuilder.group({
      'observations': ['', Validators.required]
    });
  }

  private getQuestions(): void {
    let stars: StarRating[] = this.buildStarsRating();
    this.offersAPIService.getDependencies().subscribe((questions: Question[]) => {
      this.questions = this.buildQuestionsService(questions, stars);
    });
  }

  private buildStarsRating(): StarRating[] {
    const stars = 5; // este es el numero de estrellas que se van a pintar por modulo
    let starsRating: StarRating[] = [];
    for (let i = 0; i < stars; i ++) {
      starsRating.push({
        'id': (i + 1),
        'isMarked': false,
        'path': 'assets/imgs/star-outline.png'
      });
    }
    return starsRating;
  }

  private buildQuestionsService(questions: Question[], stars: StarRating[]): QuestionServiceRating[] {
    let _questions: QuestionServiceRating[] = [];
    _questions = questions.map((question: Question) => {
      return <QuestionServiceRating> {
        'id': question.id,
        'name': question.name,
        'comments': '',
        'stars': stars
      };
    });
    return _questions;
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

  public handleTapSendButtom(): void {

    let ratingServiceCompanyOutput = new RatingServiceCompanyOutput(this.questions);
    const { observations } = this.reactiveForm.value;
    let dataForRequest = ratingServiceCompanyOutput.convertRatingServiceForRequestAPI(this.offerId, observations);
    this.offersAPIService.qualificationOffer(dataForRequest).subscribe(response => {
      this.modalController.dismiss().then(() => {
        this.navController.navigateRoot('/tab-offers/tabs/offers');
        this.utilsService.showSnackbar('Oferta Calificada con exíto', 'success');
      });
    }, error => {
      this.utilsService.showSnackbar('No fue posible realizar la calificación', 'warning');
    });
  }

}
