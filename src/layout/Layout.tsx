import { LuFolder, LuLayoutDashboard, LuListCheck } from "react-icons/lu"
import { Outlet } from "react-router-dom"
import { SidebarNavItem } from "./components/sidebar/SidebarNavLink"
import { ColorModeButton } from "@/components/ui/color-mode"


const Layout = () => {

  return (

    <div className="flex h-svh">

        <aside 
            className="w-0 overflow-hidden xl:w-[276px] border-0! xl:border-r! border-(--chakra-colors-border)! flex flex-col gap-4"
        >
            
            <div className="h-[50px] grid place-items-center">
                <h1>Logo</h1>
            </div>

            <ul className="px-4! space-y-2!">

                <SidebarNavItem
                    to="/dashboard"
                    icon={LuLayoutDashboard}
                    label="Dashboard"
                />

                <SidebarNavItem
                    to="/project"
                    icon={LuFolder}
                    label="Project"
                />

                <SidebarNavItem
                    to="/my-task"
                    icon={LuListCheck}
                    label="My Task"
                />

            </ul>


        </aside>


        <div className="min-h-full overflow-auto flex-1">

            <header className="sticky top-0 left-0 w-full px-16! py-4!">
                <div className="flex items-center justify-end">
                    <ColorModeButton />
                </div>
            </header>

            <main className="px-16! py-3.5!">
                <Outlet />
            </main>

        </div>

    </div> 

  )

}

export default Layout