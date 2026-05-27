import { Outlet } from "react-router-dom"
import Sidebar from "./components/sidebar/Sidebar"
import Header from "./components/header/Header"
import { useEffect } from "react"


const Layout = () => {

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  return (

    <div className="flex h-svh">

        
      <Sidebar />

      <div className="min-h-full overflow-auto flex-1">

          <Header />

          <main className="px-8! md:px-16! py-7!">
              <Outlet />
          </main>

        </div>

    </div> 

  )

}

export default Layout