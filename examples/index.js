// Import required modules
const { Client, GatewayIntentBits } = require('discord.js');
const { PluginManager } = require('maxi-plugin-manager');
require('dotenv').config();

// Create a new Discord client instance
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// Initialize the Plugin Manager
const pluginManager = new PluginManager({
    pluginDir: './plugins'
});

// Event listener for when the bot is ready
client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Load all plugins when the bot starts
    try {
        await pluginManager.loadAllPlugins();
        console.log('All plugins loaded successfully.');
    } catch (error) {
        console.error('Error loading plugins:', error);
    }
});

// Basic command handler to reload plugins
client.on('messageCreate', async (message) => {
    if (message.content === '!reload') {
        try {
            await pluginManager.unloadAllPlugins();
            await pluginManager.loadAllPlugins();
            message.channel.send('Plugins reloaded successfully!');
        } catch (error) {
            console.error('Error reloading plugins:', error);
            message.channel.send('Failed to reload plugins.');
        }
    }
});

// Log in to Discord
client.login(process.env.BOT_TOKEN);
