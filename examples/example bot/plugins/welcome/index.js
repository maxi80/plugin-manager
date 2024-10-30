module.exports.initialize = async (config, { client, eventEmitter }) => {
    console.log(`Initializing ${config.name}...`);

    // Event listener for new member joins
    client.on('guildMemberAdd', member => {
        const channel = member.guild.channels.cache.get(config.welcomeChannelId);
        if (!channel) {
            console.error(`Channel with ID ${config.welcomeChannelId} not found.`);
            return;
        }
        
        // Send a welcome message
        channel.send(`Welcome to the server, ${member}! We're glad to have you here.`);
    });

    console.log(`${config.name} initialized and listening for new members.`);
};
