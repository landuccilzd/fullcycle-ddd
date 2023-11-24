import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
    name: "Princesa Zelda",
    address: {
        street: "Castelo de Hyrule",
        number: 10,
        zip: "86020-010",
        city: "Hyrule"
    }
};

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test for create customer use case", () => {

    it("Should create a customer", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
        const output = await customerCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city
            }
        });

    });
    
    it("Should throw an error when name is missing and not create a customer", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        input.name = "";

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow("O nome é obrigatório");
    });

    it("Should throw an error when street is missing and not create a customer", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        input.name = "Princesa Zelda"; //?
        input.address.street = "";

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow("A rua é obrigatória");
    });    
});
