import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "John");
    }).toThrow("O ID é obrigatório");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("123", "");
    }).toThrow("O nome é obrigatório");
  });

  it("should change name", () => {
    // Arrange
    const customer = new Customer("123", "John");

    // Act
    customer.changeName("Jane");

    // Assert
    expect(customer.name).toBe("Jane");
  });

  it("sould activate a customer", () => {
    const customer = new Customer("1", "Princeza Zelda");
    const address = new Address("Castelo de Hyrule", 123, "86020-000", "Hyrule");

    customer.changeAddress(address);
    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it ("should deactivate a customer", () => {
    const customer = new Customer("1", "Princeza Zelda");

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it ("sould throw error if addrees is undefined when activating", () => {
    expect(() => {
        const customer = new Customer("1", "Pricesa Zelda");
        customer.activate();
    }).toThrow("O endereço é obrigatório para a ativação do cliente");
  });

  it ("Should add reward points", () => {
    const customer = new Customer("1", "Pricesa Zelda");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });

});