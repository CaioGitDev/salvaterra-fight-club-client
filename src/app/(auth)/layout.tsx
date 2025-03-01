import '@/app/ui/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      {children}
    </div>
  )
}
