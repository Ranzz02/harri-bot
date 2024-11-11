import { play } from '../audio/audioPlayer.js';
import { isWorkHours } from "../utils/workHour.js";

export default {
    name: 'huono-lisäys',
    description: 'Huono lisäys',
    async execute(interaction) {
        await interaction.deferReply();

        try {
            await interaction.deleteReply();
            play(interaction,"huono_lisäys.ogg", 1.5);
        } catch (error) {
            console.error(error);
            await interaction.editReply('An error occurred while trying to play the sound.');
        }
    },
};