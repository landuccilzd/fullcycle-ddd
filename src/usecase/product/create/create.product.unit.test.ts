import CreateProductUseCase from "./create.product.usecase";

const input = {
    name: "Master Sword",
    price: 5000
};

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Unit test for create product use case", () => {

    it("Should create a product", async () => {
        const repository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(repository);
        const output = await createProductUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });
    
    it("Should throw an error when name is missing and not create a product", async () => {
        const repository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(repository);

        input.name = "";

        await expect(createProductUseCase.execute(input)).rejects.toThrow("O Nome é obrigatório");
    });

    it("Should throw an error when price is lower or equal zero and not create a product", async () => {
        const repository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(repository);

        input.name = "Master Sword";
        input.price = -1;

        await expect(createProductUseCase.execute(input)).rejects.toThrow("O Preço é obrigatório");
    });    
});
