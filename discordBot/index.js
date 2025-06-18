//https://discord.com/channels/1384402630276546580/1384402630276546583
//https://discord.com/developers/applications/1384406827592192020/oauth2
//https://discord.com/oauth2/authorized
//https://discord.js.org/docs/packages/discord.js/14.20.0

require('dotenv').config();
const {Client, GatewayIntentBits} = require('discord.js');

const client = new Client({
    intents : [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
})

client.on('messageCreate', (message)=>{
    if(message.author.bot) return;
    message.reply({ content : "Hi from bot!" });
})

client.on('interactionCreate', (interaction)=>{
    interaction.reply("Pong!!");
})

const token = process.env.TOKEN;
// console.log(token);
client.login(token);