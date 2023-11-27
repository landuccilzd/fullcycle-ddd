import { Sequelize } from "sequelize-typescript";

import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";


describe("Test list customer use case", () => {

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

    it ("Should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const usecase = new ListCustomerUseCase(customerRepository);

        const zelda = new Customer("1", "Princesa Zelda");
        const addressZelda = new Address("Castelo de Hyrule", 10, "86020-000", "Hyrule");
        zelda.changeAddress(addressZelda);

        const link = new Customer("2", "Link");
        const addressLink = new Address("Casa da colina", 7, "86020-010", "Haetano Village");
        link.changeAddress(addressLink);

        await customerRepository.create(zelda);
        await customerRepository.create(link);

        const output = {
            customers: [
                {
                    id: zelda.id,
                    name: zelda.name,
                    address: {
                        street: zelda.address.street,
                        city: zelda.address.city,
                        number: zelda.address.number,
                        zip: zelda.address.zip
                    }
                },
                {
                    id: link.id,
                    name: link.name,
                    address: {
                        street: link.address.street,
                        city: link.address.city,
                        number: link.address.number,
                        zip: link.address.zip
                    }
                }
            ]
        }

        const result = await usecase.execute({});
        expect(result).toEqual(output)
    });

});