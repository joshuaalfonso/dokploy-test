import { LuFolder, LuLayoutDashboard, LuListCheck } from "react-icons/lu"
import { SidebarNavItem } from "./SidebarNavLink"
import { TbTargetArrow } from "react-icons/tb";


const Sidebar = () => {
    return (
        <aside 
            className="w-0 overflow-hidden xl:w-69 border-0! xl:border-r! border-(--chakra-colors-border)! flex flex-col gap-4 px-2.5!"
        >
            
            <div className="h-13.5! flex items-center gap-1.5 text-xl! font-medium! px-4!">
                <TbTargetArrow size={25} />
                <h1 className="text-md! font-semibold!">Strive</h1>
            </div>

            <ul className="space-y-2! flex-1">

                <SidebarNavItem
                    to="dashboard"
                    icon={LuLayoutDashboard}
                    label="Dashboard"
                />

                <SidebarNavItem
                    to="project"
                    icon={LuFolder}
                    label="Project"
                />

                <SidebarNavItem
                    to="my-task"
                    icon={LuListCheck}
                    label="My Task"
                />

            </ul>


        </aside>
    )
}

export default Sidebar