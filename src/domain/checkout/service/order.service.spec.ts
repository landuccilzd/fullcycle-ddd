import Customer from "../../customer/entity/customer";
import OrderItem from "../entity/order_item";
import Order from "../entity/order";
import OrderService from "./order.service";

describe("Order service unit tests", () => {

    it("should get total of all orders", () => {
        const item1 = new OrderItem("1", 10, 100, "1");
        const item2 = new OrderItem("2", 20, 200, "1");
        const item3 = new OrderItem("3", 30, 300, "2");
        const order1 = new Order("1", "1", [item1])
        const order2 = new Order("2", "1", [item2, item3])

        const total = OrderService.total([order1, order2]);
        expect(total).toBe(14000);
    });

    it ("sould place an order", () => {
        const customer = new Customer("1", "Princesa Zelda");
        const item1 = new OrderItem("1", 10, 10, "1");

        const order = OrderService.placeOrder(customer, [item1])

        expect(customer.rewardPoints).toBe(50);
        expect(order.total()).toBe(100);
    });

});