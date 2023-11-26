import Product from "./product";

describe("Product unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Produto 1", 100)
    }).toThrow("Product: O ID é obrigatório");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("1", "", 100)
    }).toThrow("Product: O nome é obrigatório");
  }); 
  
  it("should throw error when id and name is empty", () => {
    expect(() => {
      const product = new Product("", "", 100)
    }).toThrow("Product: O ID é obrigatório, Product: O nome é obrigatório");
  });

  it("should throw error when price is lower then 0", () => {
    expect(() => {
      const product = new Product("1", "Produto 1", -1)
    }).toThrow("Product: O preço deve ser maior que 0");
  });    

  it("should change name", () => {
    const product = new Product("1", "Produto 1", 100);
    product.changeName("Produto 2");
    expect(product.name).toBe("Produto 2");
  });

  it ("should change price", () => {
    const product = new Product("1", "Produto 1", 100);
    product.changePrice(200);
    expect(product.price).toBe(200);
  });

});