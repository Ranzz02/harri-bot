import { play } from '../audio/audioPlayer.js';

export default {
    name: 'huono-lisäys',
    description: 'Huono lisäys',
    async execute(interaction) {
        await interaction.deferReply();

        try {
            play(interaction,"huono_lisäys.ogg", 1.5);
            await interaction.deleteReply();
        } catch (error) {
            console.error(error);
            await interaction.editReply('An error occurred while trying to play the sound.');
        }
    },
};