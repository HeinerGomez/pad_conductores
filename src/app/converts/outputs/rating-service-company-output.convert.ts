import { QuestionServiceRating } from '../../interfaces/own/questionServiceRating.interface';

export class RatingServiceCompanyOutput {

    constructor(private questions: QuestionServiceRating[]) {
        
    }

    public convertRatingServiceForRequestAPI(offerId: number) {
        let dataForRequest = {
            'offer_id': offerId,
            'questions': []
        };
        dataForRequest.questions = this.questions.map((question: QuestionServiceRating) => {
            return {
                'question_id': question.id,
                'ranking': question.stars
            };
        });
        return dataForRequest;
    }

}