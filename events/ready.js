module.exports = async (client) => {
  console.log("Loaded!");

  const statuses = [
    { text: "with Super", type: "PLAYING" },
    { text: "Super click circles!", type: "WATCHING" },
    { text: "Cry Thunder", type: "LISTENING" },
    { text: "osu!", type: "STREAMING", url: "https://twitch.tv/BeastTrollMC" },
  ];

  setInterval(async function () {
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    client.user
      .setPresence({
        activity: {
          name: status.text,
          type: status.type,
          url: status.url || "none",
        },
        status: "dnd",
      })
      .catch(console.error);
  }, 15000);
};
