import moment from "moment";
import timezone from "moment-timezone";

export const formatDate = (date: any, format: string): string => {
    const formattedDate = moment(date).format(format);
    return formattedDate;
};
export function formatDateWithoutTime(dateString: string): string {
    // First, parse the date string with the correct input format
    const date = moment(dateString, "h:mm A, MMM Do, YYYY");
    if (!date.isValid()) {
        return "N/A";
    }
    // Then, use the formatDate function to format it to the desired output format
    return formatDate(date, "Do MMM, YYYY");
}
export const dateToGMT = (inputDate: string, inputDateFormat: string) => {
    const formattedDate = moment(inputDate, inputDateFormat).toDate();
    return formattedDate;
};
// export const formatDateToIST = (gmtDate: string): string => {
//     return timezone(gmtDate).tz("Asia/Kolkata").format("DD-MMM-YYYY h:mm A");
// };

// Function to format the GMT date to IST (Indian Standard Time)
export const formatDateToIST = (gmtDate: string): string => {
    const isValidDate = timezone(gmtDate, timezone.ISO_8601, true).isValid();
    console.log("Input GMT Date:", gmtDate);
    if (isValidDate) {
        const formattedDate = timezone(gmtDate)
            .tz("Asia/Kolkata") // Convert to IST timezone
            .format("YYYY-MM-DD"); // Format as desired
        console.log("Formatted IST Date:", formattedDate);
        return formattedDate;
    } else {
        // If the date is invalid, log an error and return a fallback string
        console.error("Invalid GMT Date format:", gmtDate);
        return gmtDate; // You can customize this fallback message
    }
};

export const dateFormatter = (date: string): string => {
    return moment(date).format("h:mm A, MMM Do, YYYY");
};

export const convertMinsToHrsAndMins = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const hoursText = hours > 0 ? `${hours} hr${hours > 1 ? "s" : ""}` : "";
    const minutesText =
        remainingMinutes > 0
            ? `${remainingMinutes} min${remainingMinutes > 1 ? "s" : ""}`
            : "";

    if (hours > 0 && remainingMinutes > 0) {
        return `${hoursText}, ${minutesText}`;
    } else {
        return hoursText + minutesText;
    }
};

export const convertMinutesToDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return hours > 0
        ? remainingMinutes > 0
            ? `${hours} h ${remainingMinutes} mins`
            : `${hours} h`
        : `${remainingMinutes} mins`;
};
export const endOfDay = (
    strDate: string,
    format: string = "YYYY-MM-DD",
): Date => {
    return moment(strDate, format).endOf("day").toDate();
};

export const startOfDay = (
    strDate: string,
    format: string = "YYYY-MM-DD",
): Date => {
    return moment(strDate, format).startOf("day").toDate();
};
