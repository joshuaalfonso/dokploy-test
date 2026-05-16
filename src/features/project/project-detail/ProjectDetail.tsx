import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import { useProjectMember, useSingleProject } from "../hooks/useProject"
// import { Avatar, AvatarGroup, Badge, Flex, Heading, Icon, Link, Stack, Tabs, Tooltip as ChakraTooltip, Portal, Text, Separator } from "@chakra-ui/react";
import { Avatar, AvatarGroup, Badge, Flex, Heading, Icon, Link, Stack, Tabs, Text, Separator, Button } from "@chakra-ui/react";
import { LuListCheck, LuMoveLeft, LuSettings } from "react-icons/lu";
import LoadingSpinner from "@/shared/components/LoadingSpinner";
import { getProjectPallete } from "@/shared/data/projectStatus";
import { Tooltip } from "@/components/ui/tooltip";
import { formatReadableDate } from "@/lib/formatDate";
// import { useWorkspaceMember } from "@/features/workspace-member/hooks/useWorkspaceMember";


const ProjectDetail = () => {


    const navigate = useNavigate();

    const location = useLocation();

    const section = location.pathname.split("/")[5]; 

    const handleBack = () => {
        navigate(location.state?.from || "/project");
    };

    const { project, isPending, error } = useSingleProject();

    const { projectMembers} = useProjectMember();

    console.log(projectMembers)


    const { project_id, workspace_id } = useParams();


    if (isPending) return <LoadingSpinner />;
    if (error) return <p>Failed to load details</p>;


    return (
        <>
        
            <Flex 
                flexDirection={'column'} 
                alignItems={'start'}
                md={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }} 
                justifyContent={'space-between'} 
                gap={4} 
                mb={8}
            >

                <Flex direction={'column'} gap={4}>
                    
                    <Stack 
                        direction={'row'} 
                        alignItems={'center'} 
                        gap={4} 
                    >
                        <Icon size="lg" cursor={'pointer'} onClick={handleBack}>
                            <LuMoveLeft />
                        </Icon>
                        <Heading fontSize={'2xl'}>
                            { project?.project_name }
                        </Heading>
                        <Badge colorPalette={getProjectPallete(project!.status)}>{ project!.status }</Badge>
                    </Stack>

                    <Flex gap={4}>

                        <Flex gap={2}>
                            <Text fontSize={'sm'} color={'fg.muted'}>Created At: </Text>
                            <Text fontSize={'sm'}> { formatReadableDate( new Date(project!.created_at) ) } </Text>
                        </Flex>

                        <Separator orientation={'vertical'} />

                        <Flex gap={2}>
                            <Text fontSize={'sm'} color={'fg.muted'}>Total Task: </Text>
                            <Text fontSize={'sm'}> {project?.completed_task} / {project?.total_task} </Text>
                        </Flex>

                    </Flex>


                </Flex>

                
                <Stack
                    direction={'row'} 
                    alignItems={'center'} 
                    gap={4} 
                >

                    <AvatarGroup gap="0" spaceX="-3" size="sm">

                        {projectMembers?.map(item => (
                            <Tooltip 
                                positioning={{ placement: "top" }} 
                                openDelay={10} 
                                content={`${item.full_name} - ${item.role}`}
                                key={item.user_id}
                            >
                                <Avatar.Root>
                                    <Avatar.Fallback name={item.full_name} />
                                </Avatar.Root>
                            </Tooltip>
                        ))}

                        {/* <Tooltip 
                            positioning={{ placement: "top" }} 
                            openDelay={10} 
                            content="Add Members">
                            <Avatar.Root variant={'solid'} cursor={'pointer'}>
                                <Avatar.Fallback><LuPlus /></Avatar.Fallback>
                            </Avatar.Root>
                        </Tooltip> */}


                        {/* <Tooltip 
                            positioning={{ placement: "top" }} 
                            openDelay={10} 
                            content="Uchiha Sasuke">
                            <Avatar.Root>
                                <Avatar.Fallback name="Uchiha Sasuke" />
                            </Avatar.Root>
                        </Tooltip>

                        <Tooltip 
                            positioning={{ placement: "top" }} 
                            openDelay={10} 
                            content="Baki Ani">
                            <Avatar.Root>
                                <Avatar.Fallback name="Baki Ani" />
                            </Avatar.Root>
                        </Tooltip>

                        <Tooltip 
                            positioning={{ placement: "top" }} 
                            openDelay={10} 
                            content="Uchiha Chan">
                            <Avatar.Root>
                                <Avatar.Fallback name="Uchiha Chan" />
                            </Avatar.Root>
                        </Tooltip>

                        <ChakraTooltip.Root positioning={{ placement: "top" }} openDelay={10}>
                            <ChakraTooltip.Trigger asChild>
                                <Avatar.Root 
                                    variant="solid"
                                >
                                    <Avatar.Fallback>+3</Avatar.Fallback>
                                </Avatar.Root>
                            </ChakraTooltip.Trigger>

                            <Portal>

                            <ChakraTooltip.Positioner  >
                                <ChakraTooltip.Content zIndex={9999}>
                                    <div>
                                        <p style={{ margin: 0, fontSize: "12px" }}>
                                            Lebron James
                                        </p>
                                        <p style={{ margin: 0, fontSize: "12px" }}>
                                            Michael Jordan 
                                        </p>
                                        <p style={{ margin: 0, fontSize: "12px" }}>
                                            Luka Doncic 
                                        </p>
                                        
                                    </div>
                                </ChakraTooltip.Content>
                            </ChakraTooltip.Positioner>
                            </Portal>
                        </ChakraTooltip.Root> */}
                        

                    </AvatarGroup>

                    <Button variant={'surface'} size={'sm'}>
                        Add Member
                    </Button>

                </Stack>

             </Flex>

            <Tabs.Root 
                // variant={'plain'}
                defaultValue={section}  
                onValueChange={(e) => 

                    navigate(`/workspace/${workspace_id}/project/${project_id}/${e.value}`, {
                        state: {
                            from: location.state?.from,
                        },
                    })
                }
            >
                <Tabs.List mb={8}>
                    <Tabs.Trigger 
                        value="task" 
                        asChild
                        // _selected={{
                        //     rounded: 'none',
                        //     borderBottom: '2px solid'
                        // }}
                    >
                    <Link unstyled>
                        <LuListCheck size={16} />
                        Task
                    </Link>
                    </Tabs.Trigger>
                    <Tabs.Trigger 
                        value="setting" 
                        asChild
                        // _selected={{
                        //     rounded: 'none',
                        //     borderBottom: '2px solid'
                        // }}
                    >
                    <Link unstyled>
                        <LuSettings size={16} />
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