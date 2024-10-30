import fs from 'fs';
import path from 'path';
import { NodeVM, NodeVMOptions } from 'vm2';
import { PluginConfig, PluginInstance } from '../types/index';
import { validateConfig } from './pluginValidator';
import SafeAPI from './safeAPI';
import { EventEmitter } from 'events';

export default class PluginLoader {
    private plugins = new Map<string, { instance: PluginInstance; config: PluginConfig }>();
    private pluginDir: string;
    private vmOptions: NodeVMOptions;
    private eventEmitter: EventEmitter;

    constructor(pluginDir: string, vmOptions: NodeVMOptions, eventEmitter: EventEmitter) {
        this.pluginDir = pluginDir;
        this.vmOptions = vmOptions;
        this.eventEmitter = eventEmitter;
    }

    async loadAllPlugins(): Promise<void> {
        try {
            const pluginFolders = fs.readdirSync(this.pluginDir);
            for (const folder of pluginFolders) {
                const pluginPath = path.join(this.pluginDir, folder);
                const configPath = path.join(pluginPath, 'config.json');
                if (fs.existsSync(configPath)) {
                    const config: PluginConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
                    if (validateConfig(config)) {
                        await this.loadPlugin(pluginPath, config);
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    async loadPlugin(pluginPath: string, config: PluginConfig): Promise<void> {
        try {
            if (this.plugins.has(config.name)) {
                throw new Error(`Plugin ${config.name} is already loaded.`);
            }

            const pluginCode = fs.readFileSync(path.join(pluginPath, 'index.js'), 'utf-8');
            const vm = new NodeVM({ ...this.vmOptions, sandbox: { api: new SafeAPI(config.name, this.eventEmitter) } });
            const pluginInstance: PluginInstance = vm.run(pluginCode, pluginPath);

            if (pluginInstance.initialize) {
                await pluginInstance.initialize(config);
            }

            this.plugins.set(config.name, { instance: pluginInstance, config });
            this.eventEmitter.emit('pluginLoaded', config.name);
        } catch (error) {
            console.log(error);
        }
    }

    async unloadPlugin(name: string): Promise<void> {
        try {
            const plugin = this.plugins.get(name);
            if (!plugin) throw new Error(`Plugin ${name} is not loaded.`);
            if (plugin.instance.destroy) await plugin.instance.destroy();

            this.plugins.delete(name);
            this.eventEmitter.emit('pluginUnloaded', name);
        } catch (error) {
            console.log(error);
        }
    }
}