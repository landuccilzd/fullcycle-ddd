import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import AddressChangedEvent from "../address-chaged.event";

export default class WriteToLogWhenAddressIsChanged implements EventHandlerInterface<AddressChangedEvent> {
    
    handle(event: AddressChangedEvent): void {
        console.log( "Endereço do cliente: " + event.eventData  + " alterado para: " + event.eventData.address);
    }

}