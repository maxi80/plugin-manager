import { EventEmitter } from 'events';

export default class EventManager extends EventEmitter {
    emitCustomEvent(eventName: string, data: any): void {
        this.emit(eventName, data);
    }

    listenToEvent(eventName: string, callback: (data: any) => void): void {
        this.on(eventName, callback);
    }
}