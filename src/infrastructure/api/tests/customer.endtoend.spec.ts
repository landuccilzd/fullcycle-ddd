import {app, sequelize} from "../express";
import request from "supertest";

describe("End to end tests for customer", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("Should create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "Princesa Zelda",
                address: {
                    street: "Castelo de Hyrule",
                    number: 10,
                    zip: "86020-000",
                    city: "Hyrule"
                }
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Princesa Zelda");
        expect(response.body.address.street).toBe("Castelo de Hyrule");
        expect(response.body.address.number).toBe(10);
        expect(response.body.address.zip).toBe("86020-000");
        expect(response.body.address.city).toBe("Hyrule");
    });

    it("Should not create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "Princesa Zelda"
            });

        expect(response.status).toBe(500);
    });

    it("Should list all customers", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "Princesa Zelda",
                address: {
                    street: "Castelo de Hyrule",
                    number: 10,
                    zip: "86020-000",
                    city: "Hyrule"
                }
            });
        expect(response.status).toBe(200);

        const responseLink = await request(app)
            .post("/customer")
            .send({
                name: "Link",
                address: {
                    street: "Casa da Colina",
                    number: 7,
                    zip: "86020-010",
                    city: "Haetano Village"
                }
            });
        expect(responseLink.status).toBe(200);

        const responseList = await request(app).get("/customer").send()
        expect(responseList.status).toBe(200);
        expect(responseList.body.customers.length).toBe(2);

        const zelda = responseList.body.customers[0];
        expect(zelda.name).toBe("Princesa Zelda");
        expect(zelda.address.street).toBe("Castelo de Hyrule");

        const link = responseList.body.customers[1];
        expect(link.name).toBe("Link");
        expect(link.address.street).toBe("Casa da Colina");
    });        
});
