import Address from "./entity/address";
import Customer from "./entity/customer";
import OrderItem from "./entity/ordem_item";
import Order from "./entity/order";

let customer = new Customer("1", "Cris");
const address = new Address("Rua 1", 10, "86000-000", "Hyrule")
customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10);
const item2 = new OrderItem("2", "Item 2", 20);
const order = new Order("1", "1", [item1, item2]);