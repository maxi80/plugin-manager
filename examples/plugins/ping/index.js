module.exports.initialize = async (config, { client }) => {
    console.log(`Initializing ${config.name}...`);

    // Listen for message events
    client.on('messageCreate', message => {
        // Check if the message content is "!ping" and it's not from a bot
        if (message.content === '!ping' && !message.author.bot) {
            message.channel.send('Pong!');
        }
    });

    console.log(`${config.name} initialized. Listening for !ping commands.`);
};
