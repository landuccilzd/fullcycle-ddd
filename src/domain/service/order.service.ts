import Customer from "../entity/customer";
import OrderItem from "../entity/ordem_item";
import Order from "../entity/order";
import {v4 as uuid} from "uuid";

export default class OrderService {

    static total(orders: Order[]): number {
        return orders.reduce((acc, order) => acc + order.total(), 0);
    }

    static placeOrder(customer:Customer, items: OrderItem[]): Order {
        if (items.length === 0) {
            throw new Error("É necessário inserir itens");
        }

        const order = new Order(uuid(), customer.id, items)
        customer.addRewardPoints(order.total() / 2);
        return order;
    }
}