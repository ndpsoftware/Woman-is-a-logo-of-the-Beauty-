// Time zones configuration
const timeZones = {
    'utc-clock': 'UTC',
    'est-clock': 'America/New_York',
    'pst-clock': 'America/Los_Angeles',
    'cst-clock': 'America/Chicago',
    'gmt-clock': 'Europe/London',
    'ist-clock': 'Asia/Kolkata',
    'jst-clock': 'Asia/Tokyo',
    'aest-clock': 'Australia/Sydney'
};

/**
 * Format time with leading zeros
 * @param {number} num - The number to format
 * @returns {string} - Formatted number with leading zero if needed
 */
function formatTime(num) {
    return num < 10 ? '0' + num : num;
}

/**
 * Update all clocks with current time
 */
function updateClocks() {
    const now = new Date();

    // Update each timezone clock
    for (const [clockId, timezone] of Object.entries(timeZones)) {
        try {
            // Get the current time in the specified timezone
            const timeString = now.toLocaleString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
                timeZone: timezone
            });

            // Update the clock display
            document.getElementById(clockId).textContent = timeString;
        } catch (error) {
            console.error(`Error updating timezone ${timezone}:`, error);
            document.getElementById(clockId).textContent = '--:--:--';
        }
    }
}

/**
 * Initialize the clock - update immediately and then every second
 */
function initClock() {
    // Update immediately
    updateClocks();

    // Update every 1000 milliseconds (1 second)
    setInterval(updateClocks, 1000);
}

// Start the clock when the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initClock);
} else {
    initClock();
}