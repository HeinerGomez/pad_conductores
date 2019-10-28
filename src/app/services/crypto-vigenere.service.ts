import { Injectable } from '@angular/core';
import { Vigenere } from '@security/vigenere.class';
import { CodeVigenere } from '@security/codeVigenere.class';
import { DecodeVigenere } from '@security/decodeVigenere.class';
import { CharMap } from '@security/charMap.class';

@Injectable({
  providedIn: 'root'
})
export class CryptoVigenereService {

  private codeVigenere: CodeVigenere;
  private decodeVigenere: DecodeVigenere;
  private charactersListBase: CharMap[];
  private squareVigenereBase: CharMap[][];

  constructor() {
    const vigenere = new Vigenere();
    this.charactersListBase = vigenere.charactersList;
    this.squareVigenereBase = vigenere.squareVigenere;
    this.codeVigenere = new CodeVigenere();
    this.decodeVigenere = new DecodeVigenere();
  }

  public encodeTerm(key: string, term: string) {
    const charactersListOfKey = CharMap.fromTermString(key);
    const charactersListOfTerm = CharMap.fromTermString(term);
    const charactersListEncode = this.codeVigenere._codeVigenere(charactersListOfKey, charactersListOfTerm, this.charactersListBase, this.squareVigenereBase);
    const termEncode = this.codeVigenere.getValue(charactersListEncode);
    return termEncode;
  }

  public decodeTerm(key: string, term: string) {
    const charactersListOfKey = CharMap.fromTermString(key);
    const charactersListOfTerm = CharMap.fromTermString(term);
    const charactersListDecode = this.decodeVigenere._decodeVigenere(charactersListOfKey, charactersListOfTerm, this.charactersListBase, this.squareVigenereBase);
    const termDecode = this.decodeVigenere.getValue(charactersListDecode);
    return termDecode;
  }

}
