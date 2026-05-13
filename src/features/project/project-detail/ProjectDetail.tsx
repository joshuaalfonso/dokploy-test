import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useSingleProject } from "../hooks/useProject"
import { Heading, Icon, Link, Stack, Tabs } from "@chakra-ui/react";
import { LuListCheck, LuMoveLeft, LuSettings } from "react-icons/lu";
import LoadingSpinner from "@/shared/components/LoadingSpinner";


const ProjectDetail = () => {


    const navigate = useNavigate();

    const location = useLocation();

    const section = location.pathname.split("/")[5]; 

    const { project, isPending, error } = useSingleProject();

    if (isPending) return <LoadingSpinner />;
    if (error) return <p>Failed to load details</p>;

    return (
        <>
        
            <Stack 
                direction={'row'} 
                alignItems={'center'} 
                gap={4} 
                mb={8}
            >
                <Icon size="lg" cursor={'pointer'} onClick={() => navigate(-1)}>
                    <LuMoveLeft />
                </Icon>
                <Heading>
                    { project?.project_name }
                </Heading>
            </Stack>

            <Tabs.Root 
                variant={'plain'}
                defaultValue={section}  
                onValueChange={(e) => navigate(`${e.value}`)}
            >
                <Tabs.List>
                    <Tabs.Trigger 
                        value="task" 
                        asChild
                        _selected={{
                            rounded: 'none',
                            borderBottom: '2px solid'
                        }}
                    >
                    <Link unstyled>
                        <LuListCheck />
                        Task
                    </Link>
                    </Tabs.Trigger>
                    <Tabs.Trigger 
                        value="setting" 
                        asChild
                        _selected={{
                            rounded: 'none',
                            borderBottom: '2px solid'
                        }}
                    >
                    <Link unstyled>
                        <LuSettings />
                        Setting
                    </Link>
                    </Tabs.Trigger>
                </Tabs.List>


                <Tabs.Content value="task"><Outlet /></Tabs.Content>
                <Tabs.Content value="setting"><Outlet /></Tabs.Content>
            </Tabs.Root>

        
        </>
    )
}

export default ProjectDetail