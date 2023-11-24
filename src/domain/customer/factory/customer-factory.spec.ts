import CustomerFactory from "./customer-factory";

describe("Customer factory unit test", () => {

    it ("Should create a customer", () => {
        let customer = CustomerFactory.create("Princesa Zelda");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Princesa Zelda");
        expect(customer.isActive()).toBe(false);
        expect(customer.address).toBeUndefined();
    });

    it ("Should create a customer with an address", () => {
        let customer = CustomerFactory.createWithAddress("Princesa Zelda", "Castelo de Hyrule", 123, "86020-000", "Hyrule");
        customer.activate();

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Princesa Zelda");
        expect(customer.isActive()).toBe(true);
        expect(customer.address).toBeDefined();
        expect(customer.address.street).toBe("Castelo de Hyrule");
        expect(customer.address.number).toBe(123);
        expect(customer.address.zip).toBe("86020-000");
        expect(customer.address.city).toBe("Hyrule");
    });

    it ("Should throw an error if creating a customer without an address", () => {
        expect(() => {
            let customer = CustomerFactory.create("Princesa Zelda");
            customer.activate();
        }).toThrow("O endereço é obrigatório para a ativação do cliente");
    });
});