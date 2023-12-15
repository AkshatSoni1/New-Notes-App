import "@/styles/globals.css"

export const metadata={
    title: "Notes-App",
    description: "A useful notes app for you"
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
        <body>
            <main>
                { children }
            </main>
        </body>
    </html>
  )
}

export default RootLayout

