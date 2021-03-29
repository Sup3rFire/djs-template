const fs = require("fs");

module.exports.execute = async (client, message, args, Discord) => {
  const reloadName = args.join(" ").toLowerCase();

  const command =
    client.commands.get(reloadName) ||
    client.commands.find(
      (c) => c.info.aliases && c.info.aliases.includes(reloadName)
    );
  const event = client.listenerCount(reloadName);

  if (command) {
    const dir = client.commandDir;
    fs.readdirSync(dir).forEach((dirs) => {
      const commands = fs
        .readdirSync(`${dir}${dirs}/`)
        .filter((files) => files.endsWith(".js"));
      if (commands.includes(`${command.info.name}.js`)) {
        try {
          delete require.cache[
            require.resolve(`../${dirs}/${command.info.name}.js`)
          ];
          const pull = require(`../${dirs}/${command.info.name}.js`);
          client.commands.set(command.info.name, pull);
          return message.channel.send(
            `Successfully reloaded command ${command.info.name}!`
          );
        } catch (err) {
          message.channel.send(
            `There was an error while reloading command \`${command.info.name}\``
          );
          return console.error(err);
        }
      }
    });
  } else if (event > 0) {
    try {
      await client.removeAllListeners(reloadName);

      delete require.cache[require.resolve(`../../events/${reloadName}.js`)];
      const event = require(`../../events/${reloadName}.js`);
      client.on(reloadName, event.bind(null, client, Discord));

      return message.channel.send(`Successfully reloaded event ${reloadName}!`);
    } catch (err) {
      message.channel.send(
        `There was an error while reloading event \`${reloadName}\``
      );
      return console.error(err);
    }
  } else return message.channel.send("That command doesn't exist!");
};

module.exports.info = {
  name: "reload",
  description: "Reloads a command / event",
  usage: "(command / event)",
  args: true,
  cooldown: 3,
  developer: true,
};
