
import Navbar from "@/components/Navbar"
import AppState from "@/context/AppContext/page"
import "@/styles/globals.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Note-Verse",
  description: "A useful notes app for you"
}

const RootLayout = ({ children }) => {

  return (
    <html lang="en">
      <body>
        {/* toasts */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <AppState>
          <div className="-z-[6] main">
            <div className="-z-[5] gradient" />
          </div>
          <main className="z-10 w-screen min-h-screen">
            <Navbar />
            <div className="z-10 px-10 md:px-20">
              {children}
            </div>
          </main>
        </AppState>
      </body>
    </html>
  )
}

export default RootLayout

