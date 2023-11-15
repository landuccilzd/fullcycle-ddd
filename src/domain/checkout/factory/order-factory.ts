import CustomerFactory from "../../customer/factory/customer-factory";
import ProductFactory from "../../product/factory/product-factory";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import { v4 as uuid } from "uuid";

interface OrderFactoryProps {
    name: string;
    items: {
        product: {
            name: string,
            price: number
        },
        quantity: number
    }[]
}

export default class OrderFactory {

    static create(orderProps: OrderFactoryProps): Order {
        const customer = CustomerFactory.create(orderProps.name);
        
        let orderItems:OrderItem[] = [];
        orderProps.items.forEach((item) => {
            const product = ProductFactory.create("A", item.product.name, item.product.price)
            const orderItem = new OrderItem(uuid(), item.quantity, product.price, product.id);
            orderItems.push(orderItem);
        });

        const order = new Order(uuid(), customer.id, orderItems);
        return order;
    }
}