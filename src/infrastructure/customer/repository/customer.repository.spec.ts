import { Sequelize } from "sequelize-typescript";
import CustomerModel from "./sequelize/customer.model";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerRepository from "./customer.repository";

describe("Customer repository unit test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ CustomerModel ]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });    

    it ("Should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Princesa Zelda");
        const address = new Address("Castelo de Hyrule", 10, "86020-000", "Hyrule");
        customer.changeAddress(address);
        customer.activate();

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints
        });

    });

    it ("Should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Princesa Zelda");
        const address = new Address("Castelo de Hyrule", 10, "86020-000", "Hyrule");
        customer.changeAddress(address);
        customer.activate();

        await customerRepository.create(customer);

        customer.changeName("She Ra");
        customer.addRewardPoints(10);

        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            street: address.street,
            number: address.number,
            zipcode: address.zip,
            city: address.city,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints
        });
    });    

    it ("Should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Princesa Zelda");
        const address = new Address("Castelo de Hyrule", 10, "86020-000", "Hyrule");
        customer.changeAddress(address);
        customer.activate();        
        await customerRepository.create(customer);

        const foundCustomer = await customerRepository.find("1");
        expect(customer).toStrictEqual(foundCustomer)
    });

    it ("Should throw an error when customer is not found", async () => {
        const customerRepository = new CustomerRepository();
        expect(async () => {
            await customerRepository.find("10");
        }).rejects.toThrow("Cliente não encontrado");
    });

    it ("Should find all products", async () => {
        const customerRepository = new CustomerRepository();

        const customer1 = new Customer("1", "Princesa Zelda");
        const address1 = new Address("Castelo de Hyrule", 10, "86020-000", "Hyrule");
        customer1.changeAddress(address1);
        customer1.activate();        
        customer1.addRewardPoints(10);

        const customer2 = new Customer("2", "She ra");
        const address2 = new Address("Castelo de cristal", 20, "86030-000", "Eternia");
        customer2.changeAddress(address2);
        customer2.activate();        
        customer2.addRewardPoints(20);

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const customers = await customerRepository.findAll();

        expect(customers).toHaveLength(2);
        expect(customers).toContainEqual(customer1);
        expect(customers).toContainEqual(customer2);
    });
});
