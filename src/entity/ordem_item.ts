export default class OrderItem {
    private _id: string;
    private _productId: string;
    private _quantity: number;
    private _price: number;

    constructor(id: string, quantity: number, price: number, productId: string) {
        this._id = id;
        this._productId = productId;
        this._quantity = quantity;
        this._price = price;
        this.validate();
    }

    validate() {
        if (this._id.length === 0) {
            throw new Error("O ID é obrigatório");
        }

        if (this._quantity <= 0) {
            throw new Error("A Quantidade deve ser maior que 0");
        }

        if (this._price <= 0) {
            throw new Error("O Preço deve ser maior que 0");
        }        
    }

    get price(): number {
        return this._price;
    }

    orderItemTotal(): number {
        return this._price * this._quantity;
    }
}