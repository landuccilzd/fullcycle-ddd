import Customer from "../entity/customer";
import { v4 as uuid} from "uuid";
import Address from "../value-object/address";

export default class CustomerFactory {
    
    public static create(name: string): Customer {
        let customer = new Customer(uuid(), name);
        return customer;
    }

    public static createWithAddress(name: string, street: string, number: number, zip: string, city: string): Customer {
        let customer = new Customer(uuid(), name);
        const address = new Address(street, number, zip, city);
        customer.changeAddress(address);
        return customer;
    }
}