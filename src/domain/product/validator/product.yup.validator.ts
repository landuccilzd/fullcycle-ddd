import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import * as yup from "yup";

export default class ProductYupValidator implements ValidatorInterface<Product> {

    validate(entity: Product): void {
        try {
            yup.object().shape({
                id: yup.string().required("O ID é obrigatório"),
                name: yup.string().required("O nome é obrigatório"),
                price: yup.number().required("O preço é obrigatório").min(0, "O preço deve ser maior que ${min}")
            }).validateSync({
                id: entity.id,
                name: entity.name,
                price: entity.price
            }, { 
                abortEarly: false
            });
        } catch (errors) {
            const e = errors as yup.ValidationError;
            e.errors.forEach((error) => {
                entity.notification.addError({
                    context: "Product",
                    message: error
                });                
            });
        }
    }

}