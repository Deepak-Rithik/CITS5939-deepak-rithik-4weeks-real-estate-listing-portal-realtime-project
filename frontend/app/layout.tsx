import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Real Estate Portal',
  description: 'Find your dream property',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">🏠 Real Estate Portal</h1>
            <div className="flex gap-4">
              <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
              <a href="/properties" className="text-gray-600 hover:text-blue-600">Properties</a>
              <a href="/login" className="text-gray-600 hover:text-blue-600">Login</a>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-gray-800 text-white mt-12">
          <div className="max-w-7xl mx-auto px-4 py-6 text-center">
            <p>&copy; 2024 Real Estate Portal. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
