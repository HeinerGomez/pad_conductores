import { CharMap } from './charMap.class';
export class CodeVigenere {

    public _codeVigenere(key: CharMap[], value: CharMap[], characterList: CharMap[], squaredVigenere: CharMap[][]): CharMap[] {
        const lengthKey = key.length;
        const lengthValue = value.length;
        let codeVigenere: CharMap[] = [];
        let row = 0;
        let column = 0;
        let counter = 0;
        for (let i = 0; i < lengthValue; i ++) {
            row = this.getPositionRow(key[counter], squaredVigenere);
            column = this.getPositionColumn(value[i], squaredVigenere);
            codeVigenere[i] = this.getCharacterPosition(row, column, characterList);
            counter ++;
            if (counter == lengthKey) {
                counter = 0;
            }
        }
        return codeVigenere;
    }

    private getPositionRow(character: CharMap, squaredVigenere: CharMap[][]): number {
        for (let i = 0; i < squaredVigenere.length; i ++) {
            if (character.charRepresentation == squaredVigenere[i][0].charRepresentation) {
                return i;
            }
        }
        return -1;
    }

    private getPositionColumn(character: CharMap, squaredVigenere: CharMap[][]): number {
        for (let i = 0; i < squaredVigenere[0].length; i ++) {
            if (character.charRepresentation == squaredVigenere[0][i].charRepresentation) {
                return i;
            }
        }
        return -1;
    }

    private getCharacterPosition(row: number, column: number, characterList: CharMap[]) {
        // aqui la formula de wikipedia para el cifrado E(Xi) = ( Xi + Ki ) mod L
        let numericRepresentation = (row + column) % characterList.length;
        for (let i = 0; i <= numericRepresentation; i ++) {
            if (characterList[i]) {
                if (numericRepresentation == characterList[i].numericRepresentation) {
                    return characterList[i];
                }
            }
        }
        return null;
    }

    public getValue(characterList: CharMap[]): string {
        let value: string = "";
        for (let i = 0; i < characterList.length; i ++) {
            if (characterList[i]) {
                value += characterList[i].charRepresentation;
            }
        }
        return value;
    }

}