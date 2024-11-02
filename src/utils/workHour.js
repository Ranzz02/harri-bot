export function isWorkHours() {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = now.getHours(); // Current hour in 24-hour format

    // Check if it's a weekday (1-5 for Mon-Fri) and if the hour is between 9 and 17
    return day >= 1 && day <= 5 && hour >= 9 && hour < 17;
}
