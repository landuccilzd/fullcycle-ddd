import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("1", "Master Sword", 5000);

const input = {
    id: product.id,
    name: "Hylian Shield",
    price: 3000
};

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test for update product use case", () => {

    it("Should update a product", async () => {
        const repository = MockRepository();
        const updateProductUseCase = new UpdateProductUseCase(repository);

        const output = await updateProductUseCase.execute(input);
        expect(output).toEqual(input);
    });
    
    it("Should throw an error when name is missing and not update a product", async () => {
        const repository = MockRepository();
        const updateProductUseCase = new UpdateProductUseCase(repository);

        input.name = "";

        await expect(updateProductUseCase.execute(input)).rejects.toThrow("Product: O Nome é obrigatório");
    });

    it("Should throw an error when price is lower or equal zero and not update a product", async () => {
        const repository = MockRepository();
        const updateProductUseCase = new UpdateProductUseCase(repository);

        input.name = "Master Sword";
        input.price = -1;

        await expect(updateProductUseCase.execute(input)).rejects.toThrow("Product: O Nome é obrigatório");
    });


});
