import { Sequelize } from "sequelize-typescript";

import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

describe("Test update customer use case", () => {

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

    it ("Should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const usecase = new UpdateCustomerUseCase(customerRepository);

        const customer = new Customer("1", "Princesa Zelda");
        const address = new Address("Castelo de Hyrule", 10, "86020-000", "Hyrule");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const input = {
            id: customer.id,
            name: "Link",
            address: {
                street: "Casa da colina",
                city: "Hyrule",
                number: 7,
                zip: "86020-010"
            }
        }        
        const result = await usecase.execute(input);

        const output = {
            id: customer.id,
            name: "Link",
            address: {
                street: "Casa da colina",
                city: "Hyrule",
                number: 7,
                zip: "86020-010"
            }
        }
        expect(result).toEqual(output)
    });

});