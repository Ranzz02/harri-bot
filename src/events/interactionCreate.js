import { isWorkHours } from "../utils/workHour.js";
import { play } from '../audio/audioPlayer.js';
import { ActivityType } from "discord.js"

export default async (client, interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        if (command.name === "cv") {
            await command.execute(interaction);
            return
        }

        // Update status based on work hours
        if (isWorkHours()) {
            // Set presence to indicate "At work" status
            await client.user.setPresence({ 
                activities: [{name: "At work", type: ActivityType.Custom}],
                status: "dnd"
            })

            await interaction.reply("Currently at work");
            play(interaction, "harri-töissä.ogg", 1);
            return
        }

        // Execute command outside work hours
        await command.execute(interaction);
    } catch (error) {
        console.log(error)
        // Check if interaction has already been deferred
        if (interaction.deferred || interaction.replied) {
            await interaction.followUp({ content: 'There was an error executing this command.', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error executing this command.', ephemeral: true });
        }
    }
};
