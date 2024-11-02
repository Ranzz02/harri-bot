// index.js
import { REST } from '@discordjs/rest';
import Discord, { Collection, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { loadEvents } from './handlers/eventHandler.js';
import { loadCommands } from './handlers/commandHandler.js';
dotenv.config();

const Client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessageTyping
    ]
});

Client.commands = new Collection();
const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

// Load event and command handlers
loadEvents(Client);
Client.on("ready", () => {loadCommands(Client, rest);}) // Register commands on bot startup

Client.login(process.env.BOT_TOKEN);
