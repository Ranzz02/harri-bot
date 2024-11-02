// index.js
import { REST } from '@discordjs/rest';
import Discord, { Collection, GatewayIntentBits, ActivityType } from 'discord.js';
import dotenv from 'dotenv';
import { loadEvents } from './handlers/eventHandler.js';
import { loadCommands } from './handlers/commandHandler.js';
import { startCronJob } from './cron/job.js';
import { setBotStatus } from "./utils/botStatus.js"
import { isWorkHours } from './utils/workHour.js';
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
Client.on("ready", () => {
    if (isWorkHours()) {
        setBotStatus(Client, 'Töissä', ActivityType.Custom, 'dnd');
    }else {
        setBotStatus(Client, "Arvioin teitä", ActivityType.Custom, 'online');
    }
    loadCommands(Client, rest);
    startCronJob(Client);
}) // Register commands on bot startup

Client.login(process.env.BOT_TOKEN);
