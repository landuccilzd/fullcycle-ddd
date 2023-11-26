import ValidatorInterface from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";
import * as yup from "yup";

export default class CustomerYupValidator implements ValidatorInterface<Customer> {

    validate(entity: Customer): void {
        try {
            yup.object().shape({
                id: yup.string().required("O ID é obrigatório"),
                name: yup.string().required("O nome é obrigatório")
            }).validateSync({
                id: entity.id,
                name: entity.name
            }, { 
                abortEarly: false
            });
        } catch (errors) {
            const e = errors as yup.ValidationError;
            e.errors.forEach((error) => {
                entity.notification.addError({
                    context: "Customer",
                    message: error
                });                
            });
        }
    }

}