import { Outlet } from "react-router-dom"
import Sidebar from "./components/sidebar/Sidebar"
import Header from "./components/header/Header"


const Layout = () => {

  return (

    <div className="flex h-svh">

        
        <Sidebar />

        <div className="min-h-full overflow-auto flex-1">

            <Header />

            <main className="px-16! py-5!">
                <Outlet />
            </main>

        </div>

    </div> 

  )

}

export default Layout