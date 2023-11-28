import { Sequelize } from "sequelize-typescript";

import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/product.repository";
import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";


describe("Test list product use case", () => {

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
        const productRepository = new ProductRepository();
        const usecase = new ListProductUseCase(productRepository);

        const masterSword = new Product("1", "Master Sword", 5000);
        const hylianShield = new Product("2", "Hylian Shield", 3000);

        await productRepository.create(masterSword);
        await productRepository.create(hylianShield);

        const output = {
            products: [
                {
                    id: masterSword.id,
                    name: masterSword.name,
                    price: masterSword.price
                },
                {
                    id: hylianShield.id,
                    name: hylianShield.name,
                    price: hylianShield.price
                }
            ]
        }

        const result = await usecase.execute({});
        expect(result).toEqual(output)
    });

});