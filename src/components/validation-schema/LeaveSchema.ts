import { z } from "zod";

// Leave schema for creating a new leave request
export const leaveSchema = z.object({
    name: z
        .string()
        .nonempty("Name is required") // Ensures the name is not empty
        .min(3, "Name must be at least 3 characters long") // Minimum length validation
        .max(100, "Name must be less than 100 characters"), // Maximum length validation

    date: z
        .string()
        .nonempty("Date is required") // Ensures date is provided
        .transform((val) => new Date(val)) // Transforms input into a Date object
        .refine(
            (d) => d >= new Date(new Date().setHours(0, 0, 0, 0)),
            "Date must be in the future or today"
        ) // Ensures the date is today or in the future
        .refine((d) => !isNaN(d.getTime()), "Invalid date format"), // Ensures the date is valid

    reason: z
        .string()
        .nonempty("Reason is required") // Ensures reason is not empty
        .min(5, "Reason must be at least 5 characters long") // Minimum length validation
        .max(500, "Reason must be less than 500 characters"), // Maximum length validation
    position: z.string().min(1, "Position is required"),

});
