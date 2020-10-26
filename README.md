# discord.js Template

This template was designed by to be an easy way to start off a bot with a few essential features that would be made anyways.

## Requirements
- Node.js 12.0.0 or newer
- A text editor
- An internet connection (which you probably have considering you are reading this)

## Basic Setup

Install the packages using npm in the directory the folder is in

```bash
npm install
```

Then, use your favourite text editor to make a file called .env in the directory and add the following to the file:

```
TOKEN=YourTokenHere
```

Obviously, switch `YourTokenHere` with your real token

## Configuration

The following lines of code in these files can be swapped to what you want!
Just switch the placeholders.

server.js
```javascript
client.color = "Hex Color Code";
client.prefix = ['.', ','];
client.developers = ['Developer ID', 'Another Developer ID'];
```

ready.js
```javascript
    let Statuses = [
        {text: "some game", type: "PLAYING"},
        {text: "some youtube video", type: "WATCHING"},
        {text: "some music", type: "LISTENING"},
        {text: "something", type: "STREAMING", url: "A Twitch URL"}
    ];
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
