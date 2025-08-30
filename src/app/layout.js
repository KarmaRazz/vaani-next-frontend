import './globals.css';
import ClientShell from '../components/ClientShell';

export const metadata = { title: 'Vaani — Learn smarter', description: '...' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
