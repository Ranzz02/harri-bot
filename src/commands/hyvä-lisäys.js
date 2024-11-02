import { play } from '../audio/audioPlayer.js';

export default {
    name: 'hyvä-lisäys',
    description: 'Hyvä lisäys',
    async execute(interaction) {
        await interaction.deferReply();
        try {
            play(interaction,"lisäys.ogg", 1);
            await interaction.deleteReply();
        } catch (error) {
            console.error(error);
            await interaction.editReply('An error occurred while trying to play the sound.');
        }
    },
};