import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadEvents(client) {
    const eventsPath = path.join(__dirname, '../events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const event = await import(`../events/${file}`);
        const eventName = file.split('.')[0];
        client.on(eventName, event.default.bind(null, client));
    }
}
