import { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } from '@discordjs/voice';
import { ChannelType } from 'discord.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function play(interaction, source, volume = 1) {
    // Check if user is in voiceChannel
    if (!interaction.guild) {
        return interaction.reply("This command can only be used in a server.");
    }

    const member = interaction.member;
    let voiceChannel;

    if (member.voice.channel) {
        voiceChannel = member.voice.channel;
    } else {
        const voiceChannels = interaction.guild.channels.cache.filter(
            channel => channel.type === ChannelType.GuildVoice
        );

        let mostPopulatedChannel = null;
        let maxMembers = 0;

        voiceChannels.forEach(channel => {
            const memberCount = channel.members.size;
            if (memberCount > maxMembers) {
                maxMembers = memberCount;
                mostPopulatedChannel = channel;
            }
        });

        voiceChannel = mostPopulatedChannel;
    }

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

        // Event handler to catch playback errors
        player.on('error', error => {
            console.error(`Error occurred during playback: ${error}`);
        });

        const resource = createAudioResource(audioPath, { inlineVolume: true });
        resource.volume?.setVolume(volume);

        player.play(resource);
        connection.subscribe(player);

        await new Promise((resolve, reject) => {
            player.once(AudioPlayerStatus.Idle, resolve);
            player.once('error', reject);
        });

        connection.destroy();
    } catch (error) {
        console.error(`Error while playing sound ${source}:`, error);
        await interaction.reply('An error occurred while trying to play the sound.');
    }
}
