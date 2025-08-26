import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


export const metadata = {
  title: 'Vaani — Learn smarter',
  description: 'Nepal-focused ed-tech: Notes and mock tests for CEE, IOE and more.'
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}