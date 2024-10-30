# maxi-plugin-manager

A flexible and dynamic plugin management system for Discord bots, allowing developers to load, unload, and manage plugins easily.

## Installation

You can install the package using npm:

```bash
npm install maxi-plugin-manager
```

## Usage

Here's a basic example of how to use the `maxi-plugin-manager` in your Discord bot:

```typescript
import { PluginManager } from 'maxi-plugin-manager';

const pluginManager = new PluginManager({ pluginDir: './plugins' });

// Load all plugins
await pluginManager.loadAllPlugins();

// Load a specific plugin
const config = {
    name: 'myPlugin',
    description: 'An example plugin',
    version: '1.0.0'
};
const pluginPath = './path/to/myPlugin';
await pluginManager.loadPlugin(pluginPath, config);
```

## API Reference

### PluginManager

- **Constructor**: `new PluginManager(options: PluginManagerOptions)`

  - `options` (optional): An object that can contain:
    - `pluginDir`: The directory where plugins are located (default is `./plugins`).
    - `vmOptions`: Options for the VM sandbox.

- **Methods**:
  - `loadAllPlugins(): Promise<void>`: Loads all plugins from the specified directory.
  - `loadPlugin(pluginPath: string, config: PluginConfig): Promise<void>`: Loads a specific plugin using its path and configuration.
  - `unloadPlugin(name: string): Promise<void>`: Unloads a specified plugin by name.
  - `on(event: string, listener: (...args: any[]) => void): void`: Registers an event listener.
  - `off(event: string, listener: (...args: any[]) => void): void`: Unregisters an event listener.

### EventManager

Handles custom events for plugin management.

- **Methods**:
  - `on(event: string, listener: (...args: any[]) => void): void`: Registers an event listener.
  - `off(event: string, listener: (...args: any[]) => void): void`: Unregisters an event listener.
  - `emit(event: string, ...args: any[]): void`: Emits an event.

### PluginLoader

Responsible for loading and unloading plugins.

- **Methods**:
  - `loadAllPlugins(): Promise<void>`: Loads all plugins from the specified directory.
  - `loadPlugin(pluginPath: string, config: PluginConfig): Promise<void>`: Loads a specific plugin using its path and configuration.
  - `unloadPlugin(name: string): Promise<void>`: Unloads a specified plugin by name.

## Creating a Plugin

To create a plugin, create a directory for your plugin with an `index.js` or `index.ts` file and a `config.json` file. Your `config.json` should look something like this:

```json
{
    "name": "myPlugin",
    "description": "An example plugin",
    "version": "1.0.0"
}
```

Your `index.js` file should export an `initialize` method:

```javascript
module.exports.initialize = async (config) => {
    console.log(`Plugin ${config.name} loaded.`);
    // Plugin logic here...
};
```
