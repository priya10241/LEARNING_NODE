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