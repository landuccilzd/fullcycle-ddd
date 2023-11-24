import { Sequelize } from "sequelize-typescript";
import ProductModel from "./sequelize/product.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "./product.repository";

describe("Product repository unit test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ ProductModel ]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });    

    it ("Should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Produto 1", 10);
        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" } });

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Produto 1",
            price: 10
        });
    });

    it ("Should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Produto 1", 10);
        await productRepository.create(product);
        
        const productModel = await ProductModel.findOne({ where: { id: "1" } });
        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Produto 1",
            price: 10
        });

        product.changeName("Produto 2");
        product.changePrice(20);

        await productRepository.update(product);

        const productModel2 = await ProductModel.findOne({ where: { id: "1" } });
        expect(productModel2.toJSON()).toStrictEqual({
            id: "1",
            name: "Produto 2",
            price: 20
        });
    });    

    it ("Should find a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Produto 1", 10);
        await productRepository.create(product);

        const foundProduct = await productRepository.find("1");
        expect(foundProduct.id).toBe("1");
        expect(foundProduct.name).toBe("Produto 1");
        expect(foundProduct.price).toBe(10);
    });

    it ("Should find all products", async () => {
        const productRepository = new ProductRepository();
        const product1 = new Product("1", "Produto 1", 10);
        await productRepository.create(product1);

        const product2 = new Product("2", "Produto 2", 20);
        await productRepository.create(product2);        

        const foundProducts = await productRepository.findAll();

        expect(foundProducts[0].id).toBe("1");
        expect(foundProducts[0].name).toBe("Produto 1");
        expect(foundProducts[0].price).toBe(10);

        expect(foundProducts[1].id).toBe("2");
        expect(foundProducts[1].name).toBe("Produto 2");
        expect(foundProducts[1].price).toBe(20);
    });    

});
