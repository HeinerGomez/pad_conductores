import { StarRating } from './starRating.interfaces';

export interface QuestionServiceRating {
    'id': number,
    'name': String,
    'comments': String,
    'stars': StarRating[]
}