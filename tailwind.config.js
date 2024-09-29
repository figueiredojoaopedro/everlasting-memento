import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        babyPink: "#FFA9E7",
        shockPink: "#FF84E8",
        grapePurple: "#7F2CCB",
        mySlate: "#414361",
        almostBlack: "#2A2D43",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
