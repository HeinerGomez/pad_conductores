export class RegisterOutput {

    constructor(private data: any) {}

    public convertRegisterForRequestAPI(): any {
        let registerForAPI = {
            'user_id': '', // en una solicitud de suscripcion no hay un usuario asignado aún,
            'resource_type_id': 1, // el tipo de recurso siempre va a ser 1
            'configuration_id': this.data.vehicleConfiguration,
            'sponsor': this.data.referralCode, // codigo del referido
            'license_plate': this.data.licensePlate,
            'document_number': this.data.cardDocumentId,
            'name': this.data.fullName,
            'celular': this.data.cellphone,
            'whatsapp': this.data.whatsapp,
            'email': this.data.email
        }
        return registerForAPI;
    }

}