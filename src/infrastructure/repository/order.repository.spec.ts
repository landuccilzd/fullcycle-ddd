import { Sequelize } from "sequelize-typescript";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import CustomerModel from "../db/sequelize/model/customer.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/ordem_item";
import Order from "../../domain/entity/order";
import OrderRepository from "./order.repository";

describe("Order repository unit test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ OrderModel, OrderItemModel, CustomerModel, ProductModel ]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });    

    it ("Should create an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Princesa Zelda");
        const address = new Address("Castelo de Hyrule", 10, "86020-000", "Hyrule");
        customer.changeAddress(address);
        customer.activate();
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Hylian Shield", 3000);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", 1, product.price, product.id);
        const order = new Order("1", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderFound = await OrderModel.findOne({ 
            where: { id: order.id },
            include: ["items"]
        });

        expect(orderFound.toJSON()).toStrictEqual({
            id: "1",
            customer_id: order.customerId,
            total: order.total(),
            items: [
                {
                    id: "1",
                    product_id: "1",
                    order_id: "1",
                    quantity: 1
                }
            ]
        });

    });

    it ("Should update an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("1", "Princesa Zelda");
        const address1 = new Address("Castelo de Hyrule", 10, "86020-000", "Hyrule Castle");
        customer1.changeAddress(address1);
        customer1.activate();
        await customerRepository.create(customer1);
        
        const customer2 = new Customer("2", "Link");
        const address2 = new Address("Alto da Colina", 20, "86030-000", "Haetano Village");
        customer2.changeAddress(address2);
        customer2.activate();
        await customerRepository.create(customer2);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Hylian Shield", 3000);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", 1, product.price, product.id);
        const order = new Order("1", customer1.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        order.changeCustomerId("2");

        await orderRepository.update(order);

        const orderFound = await OrderModel.findOne({ 
            where: { id: order.id },
            include: ["items"]
        });

        expect(orderFound.toJSON()).toStrictEqual({
            id: "1",
            customer_id: order.customerId,
            total: order.total(),
            items: [
                {
                    id: "1",
                    product_id: "1",
                    order_id: "1",
                    quantity: 1
                }
            ]
        });

    });    

    it ("Should find an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Princesa Zelda");
        const address = new Address("Castelo de Hyrule", 10, "86020-000", "Hyrule Castle");
        customer.changeAddress(address);
        customer.activate();        
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Hylian Shield", 3000);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", 1, product.price, product.id);
        const order = new Order("1", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const foundOrder = await orderRepository.find("1");
        expect(order).toStrictEqual(foundOrder);
    });


    it ("Should throw an error when order is not found", async () => {
        const orderRepository = new OrderRepository();
        expect(async () => {
            await orderRepository.find("kjsadhfakjh");
        }).rejects.toThrow("Pedido não encontrado");
    });


    it ("Should find all products", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Princesa Zelda");
        const address = new Address("Castelo de Hyrule", 10, "86020-000", "Hyrule Castle");
        customer.changeAddress(address);
        customer.activate();        
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product1 = new Product("1", "Hylian Shield", 3000);
        const product2 = new Product("2", "Master Sword", 5000);
        await productRepository.create(product1);
        await productRepository.create(product2);

        const orderItem1 = new OrderItem("1", 1, product1.price, product1.id);
        const order1 = new Order("1", customer.id, [orderItem1]);

        const orderItem2 = new OrderItem("2", 1, product2.price, product2.id);
        const order2 = new Order("2", customer.id, [orderItem2]);        

        const orderRepository = new OrderRepository();
        await orderRepository.create(order1);
        await orderRepository.create(order2);

        const orders = await orderRepository.findAll();

        expect(orders).toHaveLength(2);
        expect(orders).toContainEqual(order1);
        expect(orders).toContainEqual(order2);
    });

});
