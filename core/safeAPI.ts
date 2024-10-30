import { EventEmitter } from 'events';

export default class SafeAPI {
    private pluginName: string;
    private eventEmitter: EventEmitter;

    constructor(pluginName: string, eventEmitter: EventEmitter) {
        this.pluginName = pluginName;
        this.eventEmitter = eventEmitter;
    }

    emitEvent(eventName: string, payload: any): void {
        this.eventEmitter.emit(eventName, { plugin: this.pluginName, ...payload });
    }

    log(message: string): void {
        console.log(`[Plugin ${this.pluginName}] ${message}`);
    }
}