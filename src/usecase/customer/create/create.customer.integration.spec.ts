import { Sequelize } from "sequelize-typescript";

import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CreateCustomerUseCase from "./create.customer.usecase";


describe("Test create customer use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });
    
        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it ("Should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        const customer = new Customer("1", "Princesa Zelda");
        const address = new Address("Castelo de Hyrule", 10, "86020-000", "Hyrule");
        customer.changeAddress(address);

        const input = {
            name: customer.name,
            address: {
                street: customer.address.street,
                city: customer.address.city,
                number: customer.address.number,
                zip: customer.address.zip
            }
        }        
        const result = await usecase.execute(input);

        const output = {
            id: expect.any(String),
            name: customer.name,
            address: {
                street: customer.address.street,
                city: customer.address.city,
                number: customer.address.number,
                zip: customer.address.zip
            }
        }
        expect(result).toEqual(output)
    });

});