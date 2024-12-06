module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#783FED",
                    foreground: "#FFFFFF",
                },
                secondary: {
                    DEFAULT: "#62C9CD",
                    foreground: "#121212",
                },
                green: {
                    DEFAULT: "#1C982E",
                    foreground: "#FFFFFF", // Foreground (white for good readability)
                },
                accent: {
                    DEFAULT: "#E74C3C", // Background
                    foreground: "#FFFFFF", // Foreground (white for contrast)
                },
                warning: {
                    DEFAULT: "#FF3D3D", // Background
                    foreground: "#FFFFFF", // Foreground (white for contrast)
                },
                info: {
                    DEFAULT: "#E5E5E5", // Background
                    foreground: "#121212", // Foreground (black for contrast)
                },
                white: {
                    DEFAULT: "#FFFFFF", // Background
                    foreground: "#121212", // Foreground (black for good contrast)
                },
                black: {
                    DEFAULT: "#121212", // Background
                    foreground: "#FFFFFF", // Foreground (white for good contrast)
                },
                gray: {
                    DEFAULT: "#A4A4A4", // Background
                    foreground: "#121212", // Foreground (black for contrast)
                },
            },
        },
    },
    plugins: [],
};
