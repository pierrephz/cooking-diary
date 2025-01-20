import { Providers } from './providers'
import './globals.css'

export const metadata = {
  title: 'Cooking Diary',
  description: 'Document your cooking journey',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
