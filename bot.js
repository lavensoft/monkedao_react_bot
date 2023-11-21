const { Client, GatewayIntentBits, PermissionsBitField, Events, Partials } = require('discord.js');
const client = new Client({ intents: [
   GatewayIntentBits.GuildMessages,
   GatewayIntentBits.MessageContent,
   GatewayIntentBits.GuildMembers,
   GatewayIntentBits.Guilds,
   GatewayIntentBits.GuildMessageReactions,
   GatewayIntentBits.DirectMessageReactions,
   GatewayIntentBits.GuildEmojisAndStickers,
], 
   partials: [
      Partials.Message,
      Partials.Reaction
   ]
});

const BOT_TOKEN = 'BOTTOKEN';
const CHANNEL_REACT_CHECK = ["test"];
const REACT_ROLE_EXCEPT = []; //Skip roles react

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on(Events.MessageReactionAdd, async (reaction, user) => {
   //Remove react if user role in REACT_ROLE_EXCEPT
   
 });

 client.on("messageCreate", async (message) => {
   if (message.author.bot) return false; 

   //If is admin
   if(message.content === '/clean-reactions' && message.member.permissions.has(PermissionsBitField.All, true)) {
      try {
         const fetchedMessages = await message.channel.messages.fetch({ limit: 100 });
         fetchedMessages.forEach(async msg => {
            console.log(msg.channel.name);
             if (CHANNEL_REACT_CHECK.includes(msg.channel.name)) { // Change this to your channel name
                 await msg.reactions.removeAll();
                 console.log(`Reactions removed from a message in #test channel.`);
             }
         });
         console.log(`All reactions removed in #test channel based on role.`);
     } catch (error) {
         console.error('Error removing reactions:', error);
     }
   }
 });

client.login(BOT_TOKEN);