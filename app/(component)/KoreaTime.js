export default function convertUTCtoKST(utcDateString) {
    // Create a Date object from the UTC date string
    const date = new Date(utcDateString);

    // Calculate the KST time by adding 9 hours (9 * 60 * 60 * 1000 milliseconds)
    const kstOffset = 9 * 60 * 60 * 1000; // 9 hours in milliseconds
    const kstDate = new Date(date.getTime() + kstOffset);

    // Return the KST date
    return kstDate;
}