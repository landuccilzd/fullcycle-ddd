import { Sequelize } from "sequelize-typescript";

import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/product.repository";
import Product from "../../../domain/product/entity/product";
import CreateProductUseCase from "./create.product.usecase";


describe("Test create product use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });
    
        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it ("Should create a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const product = new Product("1", "Master Sword", 5000);

        const input = {
            name: product.name,
            price: product.price
        }        
        const result = await usecase.execute(input);

        const output = {
            id: expect.any(String),
            name: product.name,
            price: product.price
        }
        expect(result).toEqual(output)
    });

});