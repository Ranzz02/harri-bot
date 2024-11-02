import { play } from '../audio/audioPlayer.js';

export default {
    name: 'huono-reference',
    description: 'Huono referensi.',
    async execute(interaction) {
        await interaction.deferReply();
        try {
            play(interaction, "huono_reference.ogg", 1.5);
            await interaction.deleteReply();
        } catch (error) {
            console.error(error);
            await interaction.editReply('An error occurred while trying to play the sound.');
        }
    },
};