import '@/app/ui/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full flex items-center justify-center bg-secondary-color">
      {children}
    </div>
  )
}
