import Product from "./product";

describe("Product unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Produto 1", 100)
    }).toThrow("O ID é obrigatório");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("1", "", 100)
    }).toThrow("O Nome é obrigatório");
  });  

  it("should throw error when price is lower then 0", () => {
    expect(() => {
      const product = new Product("1", "Produto 1", -1)
    }).toThrow("O Preço é obrigatório");
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