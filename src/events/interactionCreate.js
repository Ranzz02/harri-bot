import { isWorkHours } from "../utils/workHour.js";
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

        // Update status
        if (isWorkHours()) {
            await client.user.setPresence({ 
                activities: [{name: "At work", type: ActivityType.Custom}],
                status: "dnd"
            })

            await interaction.editReply("Currently at work");
            play(interaction, "harri-töissä.ogg", 1);
            return
        }

        await command.execute(interaction);
    } catch (error) {
        // Check if interaction has already been deferred
        if (interaction.deferred || interaction.replied) {
            await interaction.followUp({ content: 'There was an error executing this command.', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error executing this command.', ephemeral: true });
        }
    }
};
