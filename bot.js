const { Client, GatewayIntentBits, PermissionsBitField, Permissions } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
require('dotenv').config()

let prefix = '>';
const {ask} = require('./ai')

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()
    const answer = await ask(message.content.substring(1))
    message.channel.send(answer)
})

client.login(process.env.DISCORD_BOT_TOKEN)