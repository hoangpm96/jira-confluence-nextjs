export const metadata = {
  title: 'Jira & Confluence API',
  description: 'Middleware API for Custom GPT integration with Jira and Confluence',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
