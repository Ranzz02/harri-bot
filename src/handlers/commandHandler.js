// handlers/commandHandler.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Collection, Routes } from 'discord.js';

// Recreate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadCommands(Client, rest) {
    const commands = new Collection();
    const commandsPath = path.join(__dirname, '../commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = await import(`../commands/${file}`);
        Client.commands.set(command.default.name, command.default);
        commands.set(command.default.name, command.default);
    }

    try {
        console.log('Started refreshing application (/) commands.');

        // Register commands for a specific guild (use process.env.GUILD_ID for testing)
        await rest.put(
            Routes.applicationGuildCommands(Client.user.id, process.env.GUILD_ID), 
            { body: commands }
        );

        console.log(`Successfully reloaded ${commands.size} application (/) commands.`);
    } catch (error) {
        console.error('Error registering commands:', error);
    }
}
