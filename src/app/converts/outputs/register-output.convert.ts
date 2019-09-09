export class RegisterOutput {

    constructor(private data: any) {}

    public convertRegisterForRequestAPI(device: string): any {
        let registerForAPI = {
            "0": {
                "users": {
                    "name": this.data.fullName,
                    "email": this.data.email,
                    "password": this.data.password,
                    "password_confirmation": this.data.repeatPassword,
                    "role_id": 37, // va quemado
                    "device": device
                },
                "subscriptions":{
                    "user_id": "",
                    "resource_type_id": 1, // siempre va 1
                    "configuration_id": this.data.vehicleConfiguration,
                    "sponsor": this.data.referralCode,
                    "license_plate": this.data.licensePlate,
                    "document_number": this.data.cardDocumentId,
                    "name": this.data.fullName,
                    "first_lastname": "",
                    "second_lastname": "",
                    "celular": this.data.cellphone,
                    "whatsapp": this.data.whatsapp,
                    "email": this.data.email
                }
            }
        };
        console.log("This is the data has been send: ", registerForAPI);
        return registerForAPI;
    }

}