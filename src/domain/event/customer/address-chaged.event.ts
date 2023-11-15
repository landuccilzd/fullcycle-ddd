import EventInterface from "../@shared/events.interface";

export default class AddressChangedEvent implements EventInterface {

    dateTimeOccurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dateTimeOccurred = new Date();
        this.eventData = eventData;
    }

}