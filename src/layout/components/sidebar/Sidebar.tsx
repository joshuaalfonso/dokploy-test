import { LuFolder, LuLayoutDashboard, LuListCheck, LuMessageCircleMore, LuSettings } from "react-icons/lu"
import { SidebarNavItem } from "./SidebarNavLink"
import { TbTargetArrow } from "react-icons/tb";
import { useAuthStore } from "@/auth-layout/store/useAuthStore";
import { Avatar, Flex, Separator, Span, Text } from "@chakra-ui/react";


const Sidebar = () => {

    const user = useAuthStore(state => state.user);


    return (
        <aside 
            className="w-0 overflow-hidden xl:w-69 border-0! xl:border-r! border-(--chakra-colors-border)! flex flex-col gap-4 px-0! xl:px-2.5!"
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
                    to="my-task"
                    icon={LuListCheck}
                    label="My Task"
                />

                <SidebarNavItem
                    to="project"
                    icon={LuFolder}
                    label="Project"
                />

                {/* <SidebarNavItem
                    to="member"
                    icon={LuUsers}
                    label="Member"
                /> */}

                <SidebarNavItem
                    to="chat"
                    icon={LuMessageCircleMore}
                    label="Chat"
                />

            </ul>

            <ul className="space-y-2!">
                <SidebarNavItem
                    to="setting"
                    icon={LuSettings}
                    label="Setting"
                />
            </ul>

            <div className="py-0!">
                <Separator />
            </div>

            <Flex gap={3} px={3} pb={4} alignItems={'center'}>
                <Avatar.Root size={'sm'}>
                    <Avatar.Fallback name={user?.full_name} />
                </Avatar.Root>
                <Flex direction={'column'}>
                    <Text fontSize={'sm'}>
                        {user?.full_name}
                    </Text>
                    <Span fontSize={'xs'} color={'fg.muted'}>{user?.email}</Span>

                </Flex>
            </Flex>


        </aside>
    )
}

export default Sidebar