import OrderItem from "./ordem_item";

export default class Order {

    private _id: string;
    private _customerId: string;
    private _items: OrderItem[]

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this.validate();
    }

    validate() {
        if (this._id.length === 0) {
            throw new Error("O ID é obrigatório");
        }

        if (this._customerId.length === 0) {
            throw new Error("O ID do Cliente é obrigatório");
        }

        if (this._items.length === 0) {
            throw new Error("É obrigatório inserir ítens no pedido");
        }        
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
    }
}