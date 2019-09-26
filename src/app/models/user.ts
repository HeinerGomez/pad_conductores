export class User {

    private _cellphone: string;
    private _email: string;
    private _firstLastName: string;
    private _name: string;
    private _secondLastName: string;
    private _whatsapp: string;
    private _answer: string;
    private _question: number;
    private _documentNumber: string;
    private _subscriptionStatus: boolean;

    constructor(user: any = false) {
        if (user) {
            this.build(user);
        }
    }

    public get cellphone(): string {
        return this._cellphone;
    }

    public set cellphone(value: string) {
        this._cellphone = value;
    }

    public get email(): string {
        return this._email;
    }

    public set email(value: string) {
        this._email = value;
    }

    public get firstLastName(): string  {
        return this._firstLastName;
    }

    public set firstLastName(value: string) {
        this._firstLastName = value;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get secondLastName(): string {
        return this._secondLastName;
    }

    public set secondLastName(value: string) {
        this._secondLastName = value;
    }

    public get whatsapp(): string {
        return this._whatsapp;
    }

    public set whatsapp(value: string) {
        this._whatsapp = value;
    }

    public get answer(): string {
        return this._answer;
    }

    public set answer(value: string) {
        this._answer = value;
    }

    public get question(): number {
        return this._question;
    }

    public set question(value: number) {
        this._question = value;
    }

    public get documentNumber(): string {
        return this._documentNumber;
    }

    public set documentNumber(value: string) {
        this._documentNumber = value;
    }

    public get subscriptionStatus(): boolean {
        return this._subscriptionStatus;
    }

    public set subscriptionStatus(value: boolean) {
        this._subscriptionStatus = value;
    }

    private build(user: any): void {
        this._cellphone = user.celular;
        this._email = user.email;
        this._firstLastName = user.firstLastName;
        this._name = user.name;
        this._secondLastName = user.second_lastname;
        this._whatsapp = user.whatsapp;
        this._answer = user.answer;
        this._question = user.question_id;
        this._subscriptionStatus = user.stateSubscription;
    }

}