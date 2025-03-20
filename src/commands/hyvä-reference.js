import { play } from '../audio/audioPlayer.js';

export default {
    name: 'hyvä-reference',
    description: 'Hyvä referensi.',
    async execute(interaction) {
        await interaction.deferReply();
        try {
            await interaction.deleteReply();
            play(interaction, "reference.ogg", 1);
        } catch (error) {
            console.error(error);
            await interaction.editReply('An error occurred while trying to play the sound.');
        }
    },
};