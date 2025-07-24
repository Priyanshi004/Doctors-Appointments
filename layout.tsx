import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Schedula',
  description: 'Book and manage appointments smoothly.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans bg-gray-50`}>
        <Toaster />
        {children}
      </body>
    </html>
  )
}
