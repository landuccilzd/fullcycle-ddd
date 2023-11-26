import ValidatorInterface from "../../@shared/validator/validator.interface";
import Address from "../value-object/address";
import * as yup from "yup";

export default class AddressYupValidator implements ValidatorInterface<Address> {

    validate(entity: Address): void {
        try {
            yup.object().shape({
                street: yup.string().required("A rua é obrigatória"),
                number: yup.string().required("O número é obrigatório"),
                zip: yup.string().required("O cep é obrigatório"),
                city: yup.string().required("A cidade é obrigatória"),
            }).validateSync({
                street: entity.street,
                number: entity.number,
                zip: entity.zip,
                city: entity.city
            }, { 
                abortEarly: false
            });
        } catch (errors) {
            const e = errors as yup.ValidationError;
            e.errors.forEach((error) => {
                entity.notification.addError({
                    context: "Address",
                    message: error
                });                
            });
        }
    }

}