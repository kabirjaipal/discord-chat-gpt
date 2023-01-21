# Discord Chat GPT

Advance discord ChatGPT Chat Bot System with Support Slash/Message support

# Download

```cli
npm i discord-chat-gpt
------ or ---------------------
yarn add discord-chat-gpt
```

# Example

**_<p style="text-align: center;">[![Example](https://media.discordapp.net/attachments/1007230019371802654/1066354977704001596/Screenshot_2023-01-21_192330.png)](https://discord.gg/PcUVWApWN3)</p>_**

# Setting up

### Client values

```js
import { Client, GatewayIntentBits } from "discord.js";
import { ChatGPT } from "discord-chat-gpt";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
  allowedMentions: {
    repliedUser: false,
  },
});

const chatGpt = new ChatGPT({
  apiKey: `OPEN_AI_KEY`, // get from https://beta.openai.com/account/api-keys
  orgKey: `Organization_ID`, // get from https://beta.openai.com/account/org-settings
});

client.on("ready", () => {
  console.log(`> ${client.user.username} is Online !!`);
});
```

### Discord Chat Bot Example

```js
client.on("messageCreate", async (message) => {
  if (!message.guild || message.author.bot) return;
  let ChatBotChannelId = "ChannelID";
  let channel = message.guild.channels.cache.get(ChatBotChannelId);
  if (!channel) return;
  if (message.channel.id === channel.id) {
    let msg = await message.reply({
      content: `Waiting ....`,
    });
    let chatreply = await chatGpt
      .chat(message.content, message.author.username)
      .catch((e) => {
        console.log(e);
      });
    msg.edit({
      content: `${chatreply}`,
    });
  }
});
```

### Bugs, glitches and issues

If you encounter any problems feel free to open an issue in our <a href="https://github.com/kabirsingh2004/discord-chat-gpt/issues">GitHub repository</a> or join the [Discord server](https://discord.gg/PcUVWApWN3).
