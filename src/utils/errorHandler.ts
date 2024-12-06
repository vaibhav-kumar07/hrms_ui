

export enum ErrorType {
    VALIDATION_ERROR = 'validation_errors',
    BUSINESS_ERROR = 'buisness_error',
    SERVER_ERROR = 'server_error',
}

export interface ErrorResponse {
    error_type: ErrorType;
    message: string;
    errors?: Array<{ field: string; value: string }>;
}




export const handleApiError = (error: any): ErrorResponse => {
    console.error("API Error: ", error);

    if (error.error_type) {
        return {
            error_type: error.error_type as ErrorType,
            message: error.message || "An error occurred",
            errors: error.errors || [],
        };
    }

    // Default to server error if no other type is provided
    return {
        error_type: ErrorType.SERVER_ERROR,
        message: "An unexpected error occurred. Please try again later.",
        errors: [],
    };
};
