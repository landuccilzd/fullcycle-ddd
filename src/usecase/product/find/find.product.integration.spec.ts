import { Sequelize } from "sequelize-typescript";

import ProductRepository from "../../../infrastructure/product/repository/product.repository";
import FindProductUseCase from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";


describe("Test find products use case", () => {

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

    it ("Should find a product", async () => {
        const repository = new ProductRepository();
        const usecase = new FindProductUseCase(repository);

        const product = new Product("1", "Master Sword", 5000);

        await repository.create(product);

        const output = {
            id: product.id,
            name: product.name,
            price: product.price
        }

        const result = await usecase.execute({ id: "1" });
        expect(result).toEqual(output)
    });

});