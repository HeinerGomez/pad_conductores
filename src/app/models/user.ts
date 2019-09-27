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
    private _licensePlate: string;
    private _vehicleId: number;
    private _driverId: number;
    private _configurationId: number;
    private _model: string;

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

    public get licensePlate(): string {
        return this._licensePlate;
    }

    public set licensePlate(value: string) {
        this._licensePlate = value;
    }

    public get vehicleId(): number {
        return this._vehicleId;
    }

    public set vehicleId(value: number) {
        this._vehicleId = value;
    }

    public get driverId(): number {
        return this._driverId;
    }

    public set driverId(value: number) {
        this._driverId = value;
    }

    public get configurationId(): number {
        return this._configurationId;
    }

    public set configurationId(value: number) {
        this._configurationId = value;
    }

    public get model(): string {
        return this._model;
    }

    public set model(value: string) {
        this._model = value;
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
        this._driverId = user.driver_id;
        this._vehicleId = user.vehicle_id;
        this._model = user.model;
        this._configurationId = user.combination_configuration_id;
        this._licensePlate = user.license_plate;
    }

}