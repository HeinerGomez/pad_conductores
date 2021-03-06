export const FORMREGEX = {
    idCardCC: '^[0-9]{7,15}$',
    textWithSpaces: '^(\\S\\D[a-zA-Z]+)\\D+[a-zA-Z]+$',
    cellPhone: '^([1-9]{1})([0-9]{9})$',
    email: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
    licensePlate: '^[a-zA-Z]{3}\\d{3}$',
    year: '^[0-9]{4}$'
};