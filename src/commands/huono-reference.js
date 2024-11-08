import { play } from '../audio/audioPlayer.js';
import { isWorkHours } from "../utils/workHour.js";

export default {
    name: 'huono-reference',
    description: 'Huono referensi.',
    async execute(interaction) {
        await interaction.deferReply();

        try {
            if (isWorkHours()) {
                await interaction.editReply("Currently at work");
                play(interaction, "harri-töissä.ogg", 1);
                return
            }

            await interaction.deleteReply();
            play(interaction, "huono_reference.ogg", 1.5);
        } catch (error) {
            console.error(error);
            await interaction.editReply('An error occurred while trying to play the sound.');
        }
    },
};