import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("1", "Master Sword", 5000);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test find product use case", () => {

    it ("Should find a product", async () => {
        const repository = MockRepository();
        const usecase = new FindProductUseCase(repository);

        const output = {
            id: product.id,
            name: product.name,
            price: product.price
        }

        const input = { id: "1" }
        const result = await usecase.execute(input);
        expect(result).toEqual(output)
    });
    
    it ("Should not find a customer", async () => {
        const repository = MockRepository();
        repository.find.mockImplementation(() => {
            throw new Error("Produto não encontrado");
        });

        const usecase = new FindProductUseCase(repository);
        const input = { id: "1" }

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Produto não encontrado");
    });
});