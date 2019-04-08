import { ButtonData } from './buttonData.interface';

export interface ModalData {
    'closeButton': boolean,
    'pathImage': String,
    'title': String,
    'textOne': String,
    'textTwo'?: String,
    'buttonOne'?: ButtonData,
    'buttonTwo'?: ButtonData
}