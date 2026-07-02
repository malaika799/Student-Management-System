import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata = {
  title: 'Student Management System',
  description: 'Manage students easily',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0f1629',
              color: '#f0eeff',
              borderRadius: '10px',
              border: '1px solid rgba(124,58,237,0.3)',
              fontSize: '0.875rem',
              fontWeight: 500,
            },
            success: {
              iconTheme: { primary: '#06d6a0', secondary: '#0f1629' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#0f1629' },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
