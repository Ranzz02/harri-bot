export async function setBotStatus(Client, activity, type, status) {
    try {
        await Client.user.setPresence({
            activities: [{ name: activity, type: type }],
            status: status
        });
        console.log(`Activity set to ${type}: ${activity} status: ${status}`);
    } catch (error) {
        console.error('Error setting bot status:', error);
    }
}