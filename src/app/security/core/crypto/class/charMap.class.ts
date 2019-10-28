

export class CharMap {

    private _numericRepresentation: number;
    private _charRepresentation: string;

    // constructor generico
    constructor(numericRepresentation: number, charRepresentation: string) {
        this._numericRepresentation = numericRepresentation;
        this._charRepresentation = charRepresentation;
    }
    // constructor de una cadena
    static fromTermString(term: string ) {
        let newCharMap: CharMap[] = [];
        for(let i = 0; i < term.length; i ++) {
            newCharMap.push(new CharMap(i, term.charAt(i)));
        }
        return newCharMap;
    }
    

    public get numericRepresentation(): number {
        return this._numericRepresentation;
    }

    public set numericRepresentation(value: number) {
        this._numericRepresentation = value;
    }

    public get charRepresentation(): string {
        return this._charRepresentation;
    }

    public set charRepresentation(value: string) {
        this._charRepresentation = value;
    }

}