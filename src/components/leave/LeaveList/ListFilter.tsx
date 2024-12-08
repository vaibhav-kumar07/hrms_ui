import { formatDate } from "../../../utils/date-utils";
import React, { useState } from "react";

export default function LeavesFilters({
    setSelectedDate,
}: {
    setSelectedDate: (date: string) => void;
}) {
    const [date, setDate] = useState<string>("");

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = event.target.value;
        const formattedate = formatDate(selectedDate, "YYYY-MM-DD");
        setDate(formattedate);
        setSelectedDate(selectedDate);
    };

    return (
        <section className="grid grid-cols-2 gap-4 py-2 px-4">
            <label
                htmlFor="leave-date"
                className="text-lg font-semibold bg-primary text-primary-foreground flex justify-center items-center rounded-3xl"
            >
                {date ? date : "Today"}
            </label>
            <input
                type="date"
                id="leave-date"
                value={date}
                placeholder="Date"
                onChange={handleDateChange}
                className="border border-gray-300 rounded-3xl p-2 px-5 items-center"
            />
        </section>
    );
}
