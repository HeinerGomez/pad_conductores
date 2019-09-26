import { User } from '../../models/user';
export class UserOutput {

    constructor(private data: any, private user: User) {}

    public convertUserForUpdatePersonalData(): any {
        let dataForAPI = {
            "personal": {
                "name": this.data.names,
                "first_lastname": "",
                "second_lastname": "",
                "celular": this.data.cellphone,
                "whatsapp": this.data.whatsapp,
                "email": this.data.email
            },
            "security": {
                "question_id": this.user.question,
                "answer": this.user.answer
            }
        };
        console.log("This is the data has been send: ", dataForAPI);
        return dataForAPI;
    }

    public convertUserForChangePassword(): any {
        let dataForAPI = {
            "users":{
                "name": this.data.username,
                "email": this.user.email,
                "password": this.data.newPassword,
                "password_confirmation": this.data.newPasswordRepeat,
                "question_id": this.data.securityQuestion,
                "answer": this.data.answerQuestion
            }
        };
        console.log("This is the data has been send: ", dataForAPI);
        return dataForAPI;
    }

}