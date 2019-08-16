import { SideDocument } from './side-document';

export class Document {

    private _id: number;
    private _name: string;
    private _numberSides: number;
    private _pathImageSticker: string;
    private _state: string;
    private _ribbonStatus: string;
    private _typeResource: number;
    private _sides: SideDocument[];

    constructor(document: any = false) {
        if (document) {
            this.build(document);
        }
    }

    public get id(): number {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get numberSides(): number {
        return this._numberSides;
    }

    public set pathImageSticker(pathImageSticker: string) {
        this._pathImageSticker = pathImageSticker;
    }

    public get pathImageSticker(): string {
        return this._pathImageSticker;
    }

    public get state(): string {
        return this._state;
    }

    public get ribbonStatus(): string {
        return this._ribbonStatus;
    }

    public get typeResource(): number {
        return this._typeResource;
    }

    public get sides(): SideDocument [] {
        return this._sides;
    }

    private build(document: any) {
        this._id = new Date().valueOf();// document.document_id; => asi debe quedar
        this._name = document.document_name;
        this._numberSides = document.sides.length;
        this._pathImageSticker = document.sides[0].route == null ? '' : document.sides[0].route; // el sticker siempre será la primera imagen
        this._state = document.state_name;
        this._ribbonStatus = this.buildRibbonStatus(document.color);
        this._typeResource = document.resource_type_id; // 1 => conductores y 2 => vehiculos
        this._sides = document.sides.map((side: any) => {
            const sideDocument = new SideDocument(side);
            sideDocument.documentName = this._name;
            return sideDocument;
        });
    }

    private buildRibbonStatus(state: string) {
        let ribbonStatus = '';
        switch(state) {
            case 'blue': 
                ribbonStatus = 'ribbon-review';
                break;
            case 'green': 
                ribbonStatus = 'ribbon-approved';
                break;
            case 'orange': 
                ribbonStatus = 'ribbon-pending';
                break;
            case 'ribbon-rejected': 
                ribbonStatus = 'ribbon-rejected';
                break;
            default: ribbonStatus = 'unknow'; 
        }
        return ribbonStatus;
    }

}