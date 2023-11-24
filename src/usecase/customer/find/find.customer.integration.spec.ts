import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/db/sequelize/model/customer.model";
import CustomerRepository from "../../../infrastructure/repository/customer.repository";
import Customer from "../../../domain/entity/customer";
import Address from "../../../domain/entity/address";
import FindCustomerUseCase from "./find.customer.usecase";


describe("Test find customer use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });
    
        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it ("Should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        const customer = new Customer("1", "Princesa Zelda");
        const address = new Address("Castelo de Hyrule", 10, "86020-000", "Hyrule");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const output = {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                city: customer.address.city,
                number: customer.address.number,
                zip: customer.address.zip
            }
        }

        const input = { id: "1" }
        const result = await usecase.execute(input);
        expect(result).toEqual(output)
    });

});