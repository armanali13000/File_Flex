import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { siteConfig } from '../lib/site';

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'FileFlex Tools - Free Online File Converters',
    template: '%s | FileFlex Tools'
  },
  description: 'Free premium file converter tools for PDFs, Word documents, Excel files, and images.',
  openGraph: {
    title: 'FileFlex Tools',
    description: 'Free online file converter tools with secure temporary processing.',
    url: siteConfig.url,
    siteName: 'FileFlex Tools',
    type: 'website'
  },
  icons: {
    icon: '/favicon.svg'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
