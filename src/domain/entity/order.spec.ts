import OrderItem from "./ordem_item";
import Order from "./order";

describe("Order unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      let order = new Order("", "", [])
    }).toThrow("O ID é obrigatório");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      let order = new Order("123", "", [])
    }).toThrow("O ID do Cliente é obrigatório");
  });

  it("should throw error when items is empty", () => {
    expect(() => {
      let order = new Order("123", "123", [])
    }).toThrow("É obrigatório inserir ítens no pedido");
  });  

  it ("should calculate total of order", () => {
    const item1 = new OrderItem("1", 5, 10, "");
    const item2 = new OrderItem("2", 10, 20, "");
    const order = new Order("1", "1", [item1, item2])
    const total = order.total();
    expect(total).toBe(250);
  });

  it ("should check if quantity is greater then 0", () => {
    expect(() => {
      const item = new OrderItem("1", 0, 10, "");
    }).toThrow("A Quantidade deve ser maior que 0");
  });
  
  it ("should check if price is greater then 0", () => {
    expect(() => {
      const item = new OrderItem("1", 10, 0, "");
    }).toThrow("O Preço deve ser maior que 0");    
  });  

});