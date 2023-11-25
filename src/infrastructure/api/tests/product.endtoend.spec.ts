import {app, sequelize} from "../express";
import request from "supertest";

describe("End to end tests for products", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("Should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Master Sword",
                price: 5000
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Master Sword");
        expect(response.body.price).toBe(5000);
    });

    it("Should not create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Master Sword"
            });

        expect(response.status).toBe(500);
    });

    it("Should list all products", async () => {
        const responseMasterSword = await request(app)
            .post("/product")
            .send({
                name: "Master Sword",
                price: 5000
            });
        expect(responseMasterSword.status).toBe(200);

        const responseHylianShield = await request(app)
            .post("/product")
            .send({
                name: "Hylian Shield",
                price: 3000
            });
        expect(responseHylianShield.status).toBe(200);

        const responseList = await request(app).get("/product").send()
        expect(responseList.status).toBe(200);
        expect(responseList.body.products.length).toBe(2);

        const masterSword = responseList.body.products[0];
        expect(masterSword.name).toBe("Master Sword");
        expect(masterSword.price).toBe(5000);

        const hylianShield = responseList.body.products[1];
        expect(hylianShield.name).toBe("Hylian Shield");
        expect(hylianShield.price).toBe(3000);
    });        
});
