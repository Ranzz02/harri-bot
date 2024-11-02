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
        return interaction.reply("En tiedä mihin liityä!");
    }

    const audioPath = path.resolve(__dirname + "/sources", source);
    console.log(audioPath)

    const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: interaction.guild.id,
        adapterCreator: interaction.guild.voiceAdapterCreator,
    });

    const player = createAudioPlayer();

    player.on(AudioPlayerStatus.Playing, () => {
        console.log('Audio is playing!');
    });

    player.on(AudioPlayerStatus.Idle, () => {
        console.log('Audio finished playing.');
        connection.destroy();
    });

    player.on('error', (error) => {
        console.error('Error in audio player:', error);
        interaction.followUp("An error occurred while playing the audio.");
        connection.destroy(); // Clean up connection on error
    });

    // Loop to play the audio the specified number of times
    try {
        const resource = createAudioResource(audioPath, { inlineVolume: true });
        resource.volume.setVolume(volume);

        player.play(resource);
        connection.subscribe(player);

        await new Promise((resolve, reject) => {
            player.once(AudioPlayerStatus.Idle, resolve);
            player.once('error', reject);
        });
    } catch (error) {
        console.error(`Error while playing sound ${source}:`, error);
        await interaction.followUp('An error occurred while trying to play the sound.');
        connection.destroy();
    }
}
