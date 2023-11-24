import ProductFactory from "./product-factory";

describe("Product factory unit test", () => {

    it("Should create a project type a", () => {
        const productA = ProductFactory.create("A", "Product A", 10);

        expect(productA.id).toBeDefined();
        expect(productA.name).toBe("Product A");
        expect(productA.price).toBe(10);
        expect(productA.constructor.name).toBe("Product");
    });

    it("Should create a project type b", () => {
        const productA = ProductFactory.create("B", "Product B", 20);

        expect(productA.id).toBeDefined();
        expect(productA.name).toBe("Product B");
        expect(productA.price).toBe(40);
        expect(productA.constructor.name).toBe("ProductB");
    });

    it("Should throw an error if create a project type not supported", () => {
        expect(() => 
            ProductFactory.create("C", "Product C", 30)
        ).toThrow("Tipo de produto não suportado");
    });
});