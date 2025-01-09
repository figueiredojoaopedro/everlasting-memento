export const metadata = {
  title: "Everlasting Mementos",
  description: "Hold On to Forever.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
