import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./events.interface";

export default class EventDispatcher implements EventDispatcherInterface {

    private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

    get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
        return this.eventHandlers;
    }

    notify(event: EventInterface): void {
        const eventName = event.constructor.name
        if (this.eventHandlers[eventName]) {
            this.eventHandlers[eventName].forEach((eventHandler) => {
                eventHandler.handle(event);
            });
        }
    }

    register(event: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        if (!this.eventHandlers[event]) {
            this.eventHandlers[event] = [];
        }
        this.eventHandlers[event].push(eventHandler);
    }
    
    unregister(event: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        if (this.eventHandlers[event]) {
            const index = this.eventHandlers[event].indexOf(eventHandler);

            if (index >= 0) {
                this.eventHandlers[event].splice(index, 1);
            }
        }
    }
    
    unregisterAll(): void {
        this.eventHandlers = {};
    }

}