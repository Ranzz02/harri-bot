// cron/job.js
import { CronJob } from 'cron';
import dotenv from 'dotenv';
import { setBotStatus } from "../utils/botStatus.js"
import { ActivityType } from 'discord.js';

dotenv.config();

export function startCronJob(Client) {
    const workStatusJob = new CronJob('0 9 * * 1-5', () => {
        setBotStatus(Client, 'Töissä', ActivityType.Custom, 'dnd');
    }, null, true, "Europe/Helsinki");

    // Cron job for "available" status (Online) - runs at 5:00 PM on weekdays
    const availableStatusJob = new CronJob('0 17 * * 1-5', () => {
        setBotStatus(Client, "Arvioin teitä", ActivityType.Custom, 'online');
    }, null, true, "Europe/Helsinki");

    // Start all cron jobs
    workStatusJob.start();
    availableStatusJob.start();

    console.log('Status cron jobs started.')
}
