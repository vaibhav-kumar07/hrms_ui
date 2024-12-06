// cookie-utils.ts
import Cookies from "js-cookie";

export type CookieKey = "token"


// Get a cookie value by key
export function getCookieValue(key: CookieKey): string {
    const token = Cookies.get(key);
    if (!token) {
        console.error(`Cookie not found with key: ${key}`);
        return "";
    } else {
        return token;
    }
}

// Set a cookie with a given key and value
export function setCookie(key: CookieKey, value: string): void {
    Cookies.set(key, value, { expires: 7, path: "/" });
    console.log(`Cookie set with key: ${key}`, value);
}

// Check if a cookie exists by key
export function hasCookie(key: CookieKey): boolean {
    const hasCookie = Cookies.get(key) !== undefined;
    console.log(`Cookie found with key: ${key}`, hasCookie);
    return hasCookie;
}

// Delete a cookie by key
export function deleteCookie(key: CookieKey): void {
    Cookies.remove(key);
    console.log(`Cookie deleted with key: ${key}`);
}
