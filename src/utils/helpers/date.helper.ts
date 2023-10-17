export default {
    /**
     * Add minutes to the current date
     * @param minutes
     * @returns The new date object
     */
    addMinutes(minutes: number) {
        const date = new Date();
        date.setMinutes(date.getMinutes() + minutes);
        return date;
    },
    /**
     * Add days to the current date
     * @param minutes
     * @returns The new date object
     */
    addDays(days: number) {
        const date = new Date();
        date.setDate(date.getDate() + days);
        return date;
    },
    /**
     * Compare the difference between two dates
     * @param minutes
     * @returns boolean (true if date has passed otherwise false)
     */
    expiredDate(compareDate: Date, currentDate: Date = new Date()): boolean {
        let date1 = currentDate.getTime();
        let date2 = new Date(compareDate.getTime()).getTime();
        if (date1 > date2) {
            return true;
        } else {
            return false;
        }
    },
};
