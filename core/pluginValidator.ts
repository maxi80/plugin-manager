import { PluginConfig } from '../types';

export function validateConfig(config: PluginConfig): boolean {
    const requiredKeys = ['name'];
    return requiredKeys.every(key => config.hasOwnProperty(key));
}
