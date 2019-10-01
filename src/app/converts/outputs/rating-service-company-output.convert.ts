import { QuestionServiceRating } from '../../interfaces/own/questionServiceRating.interface';

export class RatingServiceCompanyOutput {

    constructor(private questions: QuestionServiceRating[]) {
        
    }

    public convertRatingServiceForRequestAPI(offerId: number, observation) {
        let dataForRequest = {
            'offer_id': offerId,
            'questions': [],
            'observation': observation,
            'ind_envio': "1"
        };
        dataForRequest.questions = this.questions.map((question: QuestionServiceRating) => {
            return {
                'question_id': question.id,
                'ranking': question.stars.filter((star => star.isMarked)).length
            };
        });
        return dataForRequest;
    }

}