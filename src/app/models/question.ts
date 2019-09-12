export class Question {

    private _id: number;
    private _name: string;
    private _createdAt: string;
    private _indicatorQuestion: number;
    private 

    constructor(questionsAPI: any = false) {
        if (questionsAPI) {
            this.build(questionsAPI);
        }
    }

    public get id(): number {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get createdAt(): string {
        return this._createdAt;
    }

    public get indicatorQuestion(): number {
        return this._indicatorQuestion;
    }

    private build(questionsAPI: any) {
        this._id = questionsAPI.id;
        this._name = questionsAPI.name;
        this._createdAt = questionsAPI.created_at;
        this._indicatorQuestion = questionsAPI.ind_question;
    }

}