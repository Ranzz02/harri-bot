import { play } from '../audio/audioPlayer.js';
import { isWorkHours } from "../utils/workHour.js";

export default {
    name: 'hyvä-lisäys',
    description: 'Hyvä lisäys',
    async execute(interaction) {
        await interaction.deferReply();
        
        try {
            await interaction.deleteReply();
            play(interaction,"lisäys.ogg", 1);
        } catch (error) {
            console.error(error);
            await interaction.editReply('An error occurred while trying to play the sound.');
        }
    },
};