
import Navbar from "@/components/Navbar"
import AppState from "@/context/AppContext/page"
import "@/styles/globals.css"
import Head from "next/head"


const RootLayout = ({ children }) => {

  return (
    <html lang="en">
      <Head>
        <title>
          Note-Verse
        </title>
        <meta
          name="description"
          content="A useful notes app for you"
          key="desc"
        />
      </Head>
      <body>
        <AppState>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="z-10 w-screen min-h-screen bg-gray-200">
            <Navbar />
            <div className="z-10 px-10 lg:px-20">
              {children}
            </div>
          </main>
        </AppState>
      </body>
    </html>
  )
}

export default RootLayout

