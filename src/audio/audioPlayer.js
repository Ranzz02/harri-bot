import { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } from '@discordjs/voice';
import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function play(interaction, source, volume = 1) {
    // Check if user is in voiceChannel
    const member = interaction.member;
    const voiceChannel = member.voice.channel;

    if (!voiceChannel) {
        return interaction.reply({content: "En tiedä mihin liityä!", ephemeral: true });
    }

    const audioPath = path.resolve(__dirname + "/sources", source);
    console.log(audioPath)

    try {
        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        const player = createAudioPlayer();

        const resource = createAudioResource(audioPath, { inlineVolume: true });
        resource.volume.setVolume(volume);

        player.play(resource);
        connection.subscribe(player);

        await new Promise((resolve, reject) => {
            player.once(AudioPlayerStatus.Idle, resolve);
            player.once('error', reject);
        });

        connection.destroy();
    } catch (error) {
        console.error(`Error while playing sound ${source}:`, error);
        await interaction.followUp('An error occurred while trying to play the sound.');
        connection.destroy();
    }
}
