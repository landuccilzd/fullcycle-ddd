import Address from "../../../domain/entity/address";
import Customer from "../../../domain/entity/customer";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = new Customer("1", "Princesa Zelda");
const address = new Address("Castelo de Hyrule", 10, "86020-000", "Hyrule");
customer.changeAddress(address);

const input = {
    id: customer.id,
    name: "Link",
    address: {
        street: "Casa da colina",
        number: 7,
        zip: "86020-010",
        city: "Haetano Village"
    }
};

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test for update customer use case", () => {

    it("Should update a customer", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });
    

    it("Should throw an error when name is missing and not create a customer", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        input.name = "";

        await expect(customerUpdateUseCase.execute(input)).rejects.toThrow("O nome é obrigatório");
    });

    it("Should throw an error when street is missing and not create a customer", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        input.address.street = "";

        await expect(customerUpdateUseCase.execute(input)).rejects.toThrow("A rua é obrigatória");
    });    

});
