import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                pop_med: ["poppins-medium"],
                pop_semi: ["poppins-semibold"],
                int_med: ["inter-medium"],
                int_semi: ["inter-semibold"],
                cubano: ["Cubano"],
            },
        },
    },
    plugins: [],
};
export default config;
