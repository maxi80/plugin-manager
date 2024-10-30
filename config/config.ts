export const DEFAULT_PLUGIN_DIR = './plugins'; // Default if not specified
export const DEFAULT_VM_OPTIONS = {
    timeout: 1000,
    require: {
        external: true,
        builtin: ['fs', 'path']
    }
};

export const PLUGIN_DIR = process.env.PLUGIN_DIR || DEFAULT_PLUGIN_DIR;