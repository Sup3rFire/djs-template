const { readdirSync } = require("fs");

module.exports.execute = async (client, message, args, Discord) => {

	const commandName = args.join(" ").toLowerCase()
    const command = client.commands.get(commandName) || client.commands.find(c => c.info.aliases && c.info.aliases.includes(commandName));
    if (!command) return message.channel.send("That command doesn't exist!");
    
    let dir = client.commandDir;
    fs.readdirSync(dir).forEach(dirs => {
        const commands = fs.readdirSync(`${dir}${dirs}/`).filter(files => files.endsWith('.js'));
        if (commands.includes(`${commandName}.js`)) {
			const commandFile = `${dir}${dirs}/${commandName}.js`;
			try {
				delete require.cache[require.resolve(commandFile)];
				const pull = require(commandName);
				client.commands.set(commandName, pull);
				return message.channel.send(`Successfully reloaded ${commandName}!`);
			}
			catch (err) {
				message.channel.send(`There was an error while reloading \`${command.name}\``);
				return console.error(err);
			}
        }
    });

};

module.exports.info = {
    name: 'reload',
    description: 'Reloads a command',
    usage: '(command)',
    args: true,
    cooldown: 3,
    developer: true
};