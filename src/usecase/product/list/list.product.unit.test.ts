
import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

const masterSword = new Product("1", "Master Sword", 5000);
const hylianShield = new Product("2", "Hylian Shield", 3000);

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([masterSword, hylianShield])),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test for list product use case", () => {

    it("Should list products", async () => {
        const repository = MockRepository();
        const listProductUseCase = new ListProductUseCase(repository);

        const input = {};
        const output = await listProductUseCase.execute(input);

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(masterSword.id)
        expect(output.products[0].name).toBe(masterSword.name)
        expect(output.products[0].price).toBe(masterSword.price)
        expect(output.products[1].id).toBe(hylianShield.id)
        expect(output.products[1].name).toBe(hylianShield.name)
        expect(output.products[1].price).toBe(hylianShield.price)
    });

});
