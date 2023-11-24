import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer = new Customer("1", "Princesa Zelda");
const address = new Address("Castelo de Hyrule", 10, "86020-000", "Hyrule");
customer.changeAddress(address);

const customerLink = new Customer("2", "Link");
const addressLink = new Address("Casa da colina", 7, "86020-010", "Haetano Village");
customerLink.changeAddress(addressLink);

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer, customerLink])),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test for list customer use case", () => {

    it("Should list customers", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new ListCustomerUseCase(customerRepository);

        const input = {};
        const output = await customerUpdateUseCase.execute(input);

        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(customer.id)
        expect(output.customers[0].name).toBe(customer.name)
        expect(output.customers[0].address.street).toBe(customer.address.street)
        expect(output.customers[1].id).toBe(customerLink.id)
        expect(output.customers[1].name).toBe(customerLink.name)
        expect(output.customers[1].address.street).toBe(customerLink.address.street)        
    });

});
