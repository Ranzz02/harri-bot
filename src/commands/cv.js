import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

// Recreate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the correct commands directory
const commandsDir = path.join(__dirname); // This points to the same folder as the current file

export default {
    name: 'cv',
    description: 'Minun cv.',
    async execute(interaction) {
        await interaction.deferReply();

        // Read command files from the commands directory
        const commands = [];
        const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js') && file !== 'cv.js');

        for (const file of commandFiles) {
            const commandPath = path.join(commandsDir, file);
            const commandUrl = pathToFileURL(commandPath).href; // Convert to file URL
            
            const command = await import(commandUrl); // Use the file URL to import the command
            commands.push(command.default);
        }

        // Build the command list
        const commandList = commands.map(cmd => `- **/${cmd.name}**: ${cmd.description}`).join('\n');
        await interaction.editReply(`Minä osaan:\n${commandList}`);
    },
};
