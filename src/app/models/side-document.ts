export class SideDocument {

    private _id: number;
    private _documentName: string;
    private _name: string;
    private _state: string;
    private _pathImage: string;
    private _comments: string;

    constructor(sideDocument: any = false) {
        if (sideDocument) {
            this.build(sideDocument);
        } 
    }

    public get id(): number {
        return this._id;
    }

    public set documentName(documentName) {
        this._documentName = documentName;
    }

    public get documentName(): string {
        return this._documentName;
    }

    public get name(): string {
        return this._name;
    }

    public get state(): string {
        return this._state;
    }

    public set pathImage(pathImage: string) {
        this._pathImage = pathImage;
    }

    public get pathImage(): string {
        return this._pathImage;
    }

    public get comments(): string {
        return this._comments;
    }

    private build(sideDocument: any) {
        this._id = new Date().valueOf();// sideDocument.id; => asi debe quedar
        this._documentName = ''; // se asigna despues
        this._name = sideDocument.name_side;
        this._pathImage = (sideDocument.route == null ? '' : sideDocument.route);
        this._state = this.buildState(sideDocument.state);
        this._comments = sideDocument.observation;
    }

    private buildState(state: number | string) {
        let _state = '';
        switch(state) {
            case 0: // En revision
                _state = this._pathImage == '' ? 'Sin Archivo' : 'En Revisión';
                break;
            case 1: // Aprobado
                _state = 'Aprobado';
                break;
            case 2: // Rechazado
                _state = 'Rechazado';
                break;
            default: _state = 'Desconocido';
        }
        return _state;
    }

}