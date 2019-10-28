import { CharMap } from './charMap.class';


export class Vigenere {

    private readonly startCodeASCII = 47;
    private readonly endCodeASCII = 125;
    private readonly excludeCodesASCII = [92, 94, 96];
    private _charactersList: CharMap[] = [];
    private _squareVigenere: CharMap[][] = [];

    constructor() {
        this._charactersList = this.buildCharacterList();
        this._squareVigenere = this.buildSquareVigenere();
    }

    private buildCharacterList(): CharMap[] {
        let charactersList: CharMap[] = [];
        let counter = 0;
        charactersList.push(new CharMap(counter, ' '));
        counter ++;
        for (let i = 0; i <= this.endCodeASCII; i ++) {
            if ((i >= this.startCodeASCII && i <= this.endCodeASCII)) {
                charactersList.push(new CharMap(counter, String.fromCharCode(i)));
                counter ++;
            }
        }
        return charactersList;
    }

    private buildSquareVigenere(): CharMap[][] {
        let squareVigenere: CharMap[][] = [];
        const lengthCharacterList = this._charactersList.length;
        for (let row = 0; row <  lengthCharacterList; row ++) {
            squareVigenere[row] = [];
            for (let column = 0; column < lengthCharacterList; column ++) {
                const numericRepresentationOfRow = this._charactersList[row].numericRepresentation;
                const numericRepresentationOfColumn = this._charactersList[column].numericRepresentation;
                // aqui la formula de wikipedia para el cifrado E(Xi) = ( Xi + Ki ) mod L
                const charRepresentation = this.charactersList[ ( column + row ) % lengthCharacterList ].charRepresentation;
                squareVigenere[row][column] = new CharMap((numericRepresentationOfRow + numericRepresentationOfColumn) % lengthCharacterList, charRepresentation);
            }
        }
        return squareVigenere;
    }

    public get charactersList(): CharMap[] {
        return this._charactersList;
    }

    public get squareVigenere(): CharMap[][] {
        return this._squareVigenere;
    }


}