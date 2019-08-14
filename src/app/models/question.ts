export class Question {

    private _id: number;
    private _name: string;
    private _createdAt: string;

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

    private build(questionsAPI: any) {
        this._id = questionsAPI.id;
        this._name = questionsAPI.name;
        this._createdAt = questionsAPI.created_at;
    }

}