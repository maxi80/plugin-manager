import PluginLoader from './core/pluginLoader';
import EventManager from './core/eventManager';
import { PLUGIN_DIR, DEFAULT_VM_OPTIONS } from './config/config';
import { PluginConfig } from './types';

export default class PluginManager {
    private loader: PluginLoader;
    private events: EventManager;

    constructor() {
        this.events = new EventManager();
        this.loader = new PluginLoader(PLUGIN_DIR, DEFAULT_VM_OPTIONS, this.events);
    }

    async loadAllPlugins(): Promise<void> {
        await this.loader.loadAllPlugins();
    }

    async loadPlugin(pluginPath: string, config: PluginConfig): Promise<void> {
        await this.loader.loadPlugin(pluginPath, config);
    }

    async unloadPlugin(name: string): Promise<void> {
        await this.loader.unloadPlugin(name);
    }

    on(event: string, listener: (...args: any[]) => void): void {
        this.events.on(event, listener);
    }

    off(event: string, listener: (...args: any[]) => void): void {
        this.events.off(event, listener);
    }
}