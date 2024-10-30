export interface PluginConfig {
    name: string;
    description?: string;
    version?: string;
    [key: string]: any;
}

export interface PluginInstance {
    initialize?: (config: PluginConfig) => Promise<void>;
    destroy?: () => Promise<void>;
    [key: string]: any;
}