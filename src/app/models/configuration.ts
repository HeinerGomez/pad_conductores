export class Configuration {

    private _id: number;
    private _configurationTypeId: number;
    private _name: string;
    private _description: string;
    private _createdAt: string;
    private _isEnabled: boolean;

    constructor(configuration: any = false) {
        if (configuration) {
            this.build(configuration);
        }
    }

    public get id(): number {
        return this._id;
    }

    public get configurationTypeId(): number {
        return this._configurationTypeId;
    }

    public get name(): string {
        return this._name;
    }

    public get description(): string {
        return this._description;
    }

    public get createdAt(): string {
        return this._createdAt;
    }

    public get isEnabled(): boolean {
        return this._isEnabled
    }

    private build(configuration: any) {
        console.log("The configurations: ", configuration);
        this._id = configuration.id;
        this._configurationTypeId = 1;
        this._name = configuration.configuration_name;
        this._description = configuration.trailer_description;
        this._createdAt = configuration.created_at;
        this._isEnabled = configuration.is_enabled == 1 ? true : false;
    }
}