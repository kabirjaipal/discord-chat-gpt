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

client.login("BOT_TOKEN");
