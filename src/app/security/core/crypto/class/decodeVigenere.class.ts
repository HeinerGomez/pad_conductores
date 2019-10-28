import { CharMap } from './charMap.class';

export class DecodeVigenere {

    public _decodeVigenere(key: CharMap[], codeVigenere: CharMap[], characterList: CharMap[], squaredVigenere: CharMap[][]): CharMap[] {
        let lengthCodeVigenere = codeVigenere.length;
        let column = 0;
        let columnBaseForDecode: CharMap[] = [];
        let decodeVigenere: CharMap[] = [];
        let counter = 0;
        for (let i = 0; i < lengthCodeVigenere; i ++) {
            column = this.getPositionColumn(key[counter], squaredVigenere);
            counter ++;
            if (counter == key.length) {
                counter = 0;
            }
            for (let j = 0; j < characterList.length; j++) {
                columnBaseForDecode[j] = squaredVigenere[j][column];
            }
            decodeVigenere[i] = characterList[this.getPositionCharEncode(columnBaseForDecode, codeVigenere[i])];
        }
        return decodeVigenere;
    }

    private getPositionColumn(character: CharMap, squaredVigenere: CharMap[][]): number {
        for (let i = 0; i < squaredVigenere[0].length; i ++) {
            if (character.charRepresentation == squaredVigenere[0][i].charRepresentation) {
                return i;
            }
        }
        return -1;
    }

    private getPositionCharEncode(columnBaseForDecode: CharMap[], charEncode: CharMap): number {
        for (let i = 0; i < columnBaseForDecode.length; i ++) {
            if (columnBaseForDecode[i].charRepresentation == charEncode.charRepresentation) {
                return i;
            }
        }
        return -1;
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