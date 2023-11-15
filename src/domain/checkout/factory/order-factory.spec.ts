import OrderFactory from "./order-factory";

describe("Order factory unit test", () => {

    it("Should create an order", () => {
        const orderProps = {
            name: "Princesa Zelda",
            items: [
                {
                    product: {
                        name: "Master Sword",
                        price: 5000
                    },
                    quantity: 1
                },
                {
                    product: {
                        name: "Hylian Shield",
                        price: 3000
                    },
                    quantity: 1
                },
                {
                    product: {
                        name: "Deku Seed",
                        price: 10
                    },
                    quantity: 100
                }
            ]
        }

        const order = OrderFactory.create(orderProps);

        expect(order.id).toBeDefined();
        expect(order.customerId).toBeDefined();
        expect(order.items).toHaveLength(3);
        expect(order.items[0].productId).toBeDefined();
        expect(order.items[0].price).toBe(5000);
        expect(order.items[0].quantity).toBe(1);
        expect(order.items[1].productId).toBeDefined();
        expect(order.items[1].price).toBe(3000);
        expect(order.items[1].quantity).toBe(1);
        expect(order.items[2].productId).toBeDefined()
        expect(order.items[2].price).toBe(10);
        expect(order.items[2].quantity).toBe(100);
    });

});