import Address from "../../customer/value-object/address";
import Customer from "../../customer/entity/customer";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import WriteToLog1WhenCustomerIsCreatedHandler from "../../customer/event/handler/write-to-log1-when-customer-is-created.handler";
import WriteToLog2WhenCustomerIsCreatedHandler from "../../customer/event/handler/write-to-log2-when-customer-is-created.handler";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import WriteToLogWhenAddressIsChanged from "../../customer/event/handler/write-to-log-when-address-is-changed.handler copy";
import AddressChangedEvent from "../../customer/event/address-chaged.event";

describe("Event Dispatcher unit Tests", () => {

    it ("should register an event handler", () => {        
        const eventDispatcher = new EventDispatcher();
        const sendEmailEventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", sendEmailEventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toHaveLength(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(sendEmailEventHandler);
    });

    it ("should unregister an event handler", () => {        
        const eventDispatcher = new EventDispatcher();
        const sendEmailEventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", sendEmailEventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toHaveLength(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(sendEmailEventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", sendEmailEventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toHaveLength(0);
    });

    it ("should notify all send email event handlers", () => {        
        const eventDispatcher = new EventDispatcher();
        const sendEmailEventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(sendEmailEventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", sendEmailEventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toHaveLength(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(sendEmailEventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            id: "1",
            product: "Master Sword",
            price: 5000,
            email: "link@hyrule.com.hy"
        });
        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });    

    it ("should register a write to log1 event handler", () => {        
        const eventDispatcher = new EventDispatcher();
        const writeToLog1EventHandler = new WriteToLog1WhenCustomerIsCreatedHandler();

        eventDispatcher.register("CustomerCreatedEvent", writeToLog1EventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toHaveLength(1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(writeToLog1EventHandler);
    });

    it ("should register a write to log2 event handler", () => {        
        const eventDispatcher = new EventDispatcher();
        const writeToLog2EventHandler = new WriteToLog2WhenCustomerIsCreatedHandler();

        eventDispatcher.register("CustomerCreatedEvent", writeToLog2EventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toHaveLength(1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(writeToLog2EventHandler);
    });      

    it ("should unregister a write to log1 event handler", () => {        
        const eventDispatcher = new EventDispatcher();
        const writeToLog1EventHandler = new WriteToLog1WhenCustomerIsCreatedHandler();

        eventDispatcher.register("CustomerCreatedEvent", writeToLog1EventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toHaveLength(1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(writeToLog1EventHandler);

        eventDispatcher.unregister("CustomerCreatedEvent", writeToLog1EventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toHaveLength(0);
    });

    it ("should unregister a write to log2 event handler", () => {        
        const eventDispatcher = new EventDispatcher();
        const writeToLog2EventHandler = new WriteToLog2WhenCustomerIsCreatedHandler();

        eventDispatcher.register("CustomerCreatedEvent", writeToLog2EventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toHaveLength(1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(writeToLog2EventHandler);

        eventDispatcher.unregister("CustomerCreatedEvent", writeToLog2EventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toHaveLength(0);
    });

    it ("should notify all write to log1 event handlers", () => {        
        const eventDispatcher = new EventDispatcher();
        const writeToLog1EventHandler = new WriteToLog1WhenCustomerIsCreatedHandler();
        const spyEventHandler = jest.spyOn(writeToLog1EventHandler, "handle");

        eventDispatcher.register("CustomerCreatedEvent", writeToLog1EventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toHaveLength(1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(writeToLog1EventHandler);

        const customer = new Customer("1", "Princesa Zelda");
        const address = new Address("Castelo de Hyrule", 10, "86020-000", "Hyrule");
        customer.changeAddress(address);
        customer.activate();        

        const customerCreatedEvent = new CustomerCreatedEvent(customer);
        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });

    it ("should notify all write to log2 event handlers", () => {        
        const eventDispatcher = new EventDispatcher();
        const writeToLog2EventHandler = new WriteToLog2WhenCustomerIsCreatedHandler();
        const spyEventHandler = jest.spyOn(writeToLog2EventHandler, "handle");

        eventDispatcher.register("CustomerCreatedEvent", writeToLog2EventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toHaveLength(1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(writeToLog2EventHandler);

        const customer = new Customer("2", "She ra");
        const address = new Address("Castelo de cristal", 20, "86030-000", "Eternia");
        customer.changeAddress(address);
        customer.activate();        

        const customerCreatedEvent = new CustomerCreatedEvent(customer);
        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });    

    it ("should register an address change event handler", () => {        
        const eventDispatcher = new EventDispatcher();
        const addressChangedEventHandler = new WriteToLogWhenAddressIsChanged();

        eventDispatcher.register("AddresChangedEvent", addressChangedEventHandler);

        expect(eventDispatcher.getEventHandlers["AddresChangedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["AddresChangedEvent"]).toHaveLength(1);
        expect(eventDispatcher.getEventHandlers["AddresChangedEvent"][0]).toMatchObject(addressChangedEventHandler);
    });

    it ("should unregister an address changed event handler", () => {        
        const eventDispatcher = new EventDispatcher();
        const addressChangedEventHandler = new WriteToLogWhenAddressIsChanged();

        eventDispatcher.register("AddresChangedEvent", addressChangedEventHandler);

        expect(eventDispatcher.getEventHandlers["AddresChangedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["AddresChangedEvent"]).toHaveLength(1);
        expect(eventDispatcher.getEventHandlers["AddresChangedEvent"][0]).toMatchObject(addressChangedEventHandler);

        eventDispatcher.unregister("AddresChangedEvent", addressChangedEventHandler);

        expect(eventDispatcher.getEventHandlers["AddresChangedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["AddresChangedEvent"]).toHaveLength(0);
    });

    it ("should notify all address changed event handlers", () => {        
        const eventDispatcher = new EventDispatcher();
        const addressChangedEventHandler = new WriteToLogWhenAddressIsChanged();
        const spyEventHandler = jest.spyOn(addressChangedEventHandler, "handle");

        eventDispatcher.register("AddressChangedEvent", addressChangedEventHandler);

        expect(eventDispatcher.getEventHandlers["AddressChangedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["AddressChangedEvent"]).toHaveLength(1);
        expect(eventDispatcher.getEventHandlers["AddressChangedEvent"][0]).toMatchObject(addressChangedEventHandler);

        const customer = new Customer("2", "She ra");
        const address = new Address("Castelo de cristal", 20, "86030-000", "Eternia");
        customer.changeAddress(address);
        customer.activate();

        const addressChangedEvent = new AddressChangedEvent(customer);
        eventDispatcher.notify(addressChangedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });

    it ("should unregister all event handlers", () => {        
        const eventDispatcher = new EventDispatcher();
        const sendEmailEventHandler = new SendEmailWhenProductIsCreatedHandler();
        const writeToLog1EventHandler = new WriteToLog1WhenCustomerIsCreatedHandler();
        const writeToLog2EventHandler = new WriteToLog2WhenCustomerIsCreatedHandler();
        
        eventDispatcher.register("ProductCreatedEvent", sendEmailEventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toHaveLength(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(sendEmailEventHandler);

        eventDispatcher.register("CustomerCreatedEvent", writeToLog1EventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toHaveLength(1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(writeToLog1EventHandler);

        eventDispatcher.register("CustomerCreatedEvent", writeToLog2EventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toHaveLength(2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(writeToLog2EventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    });
});