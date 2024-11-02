export default async (client) => {
    try {
        client.user.setPresence({ activities: [{ name: 'Biggest of Bens', type: 'WATCHING' }], status: 'online' });
        console.log('Harri on elossa');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
