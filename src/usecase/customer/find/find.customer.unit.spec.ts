
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("1", "Princesa Zelda");
const address = new Address("Castelo de Hyrule", 10, "86020-000", "Hyrule");
customer.changeAddress(address);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}
describe("Unit test find customer use case", () => {

    it ("Should find a customer", async () => {
        const customerRepository = MockRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

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
    
    it ("Should not find a customer", async () => {
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Cliente não encontrado");
        });

        const usecase = new FindCustomerUseCase(customerRepository);
        const input = { id: "1" }

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Cliente não encontrado");
    });
});