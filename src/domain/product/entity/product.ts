import AbstractEntity from "../../@shared/entity/abstract.entity";
import NotificationError from "../../@shared/notification/notification.error";
import ProductInterface from "./product.interface";

export default class Product extends AbstractEntity implements ProductInterface {

    private _name: string;
    private _price: number;
    
    constructor (id: string, name: string, price: number) {
        super();
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();
    }

    validate() {
        if (this._id.length === 0) {
            this.notification.addError({
                context: "Product",
                message: "O ID é obrigatório"
            });
        }

        if (this._name.length === 0) {
            this.notification.addError({
                context: "Product",
                message: "O Nome é obrigatório"
            });            
        }

        if (this._price < 0) {
            this.notification.addError({
                context: "Product",
                message: "O Preço é obrigatório"
            });
        }

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.errors)
        }
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    changePrice(price: number) {
        this._price = price;
        this.validate();    
    }
}