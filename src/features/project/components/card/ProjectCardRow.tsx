import { LuEllipsis, LuFolder } from "react-icons/lu"
import type { ProjectList } from "../../project.model"
import { Avatar, AvatarGroup, Badge, IconButton, Menu, Portal, Separator } from "@chakra-ui/react"
import { getProjectPallete } from "@/shared/data/projectStatus"
import { useLocation, useNavigate } from "react-router-dom"
import { Tooltip } from "@/components/ui/tooltip"
import { useProjectDialogStore } from "../../store/projectDialogStore"


interface Props {
    item: ProjectList
}


const ProjectCardRow = ( { item }: Props ) => {

    const navigate = useNavigate();

    const location = useLocation();

    // const membersArray = item.project_member?.split(", ").map(name => name.trim());

    const setItem = useProjectDialogStore(state => state.setSelectedProject);
    const openDialog = useProjectDialogStore(state => state.setCreateModalOpen);

    const projectDetail = () => {
        navigate(`${item.project_id}/task`, {
            state: {
                from: location,
            },
        })
    }

    return (
        <li 
            className="
                border! rounded-md px-6! py-4! space-y-2! 
                cursor-pointer
                group 
            " 
            //  hover:-translate-y-1 hover:-translate-x-1
            //     hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
            //     dark:hover:shadow-[6px_6px_0px_0px_rgba(25,25,27,1)]
                    //   transition-all duration-200 ease-out
            onClick={projectDetail}
        >

            <div className="flex justify-between items-center ">
                <div className="flex justify-between items-center gap-3!">
                    <LuFolder size={20} /> 
                    <h1 className="font-sm! font-semibold! mb-1!">{ item.project_name }</h1>
                </div>
                <Menu.Root lazyMount>
                    <Menu.Trigger asChild>
                         <IconButton size={'xs'} variant={'ghost'}  onClick={(e) => e.stopPropagation()} >
                            <LuEllipsis />
                        </IconButton>
                    </Menu.Trigger>
                    <Portal>
                        <Menu.Positioner>
                        <Menu.Content>
                            <Menu.Item value="new-txt" onClick={(e) => {
                                e.stopPropagation();
                                projectDetail();
                            }}>View Details</Menu.Item>
                            <Menu.Item value="new-file" onClick={(e) => {
                                e.stopPropagation();
                                setItem?.(item);
                                openDialog(true);
                            }}>Edit</Menu.Item>
                        </Menu.Content>
                        </Menu.Positioner>
                    </Portal>
                </Menu.Root>
                {/* <Button size={'xs'} className="hidden! group-hover:block!">
                    Edit
                </Button> */}
            </div>

            <div>
                {/* <h1 className="font-sm! font-semibold! mb-1!">{ item.project_name }</h1> */}
                <p className="text-sm! text-(--chakra-colors-fg-muted)! line-clamp-1">
                    { item.project_description }
                </p>
            </div>

            <Badge colorPalette={getProjectPallete(item.status)}>{ item.status }</Badge>


            {/* <div>
                <div className="flex items-center gap-2 text-sm! text-(--chakra-colors-fg-subtle)!">
                    <LuFlag />
                    <span>Nov 14, 2025</span>
                </div>
            </div> */}

            <div className="py-2!">
                <Separator  />
            </div>

            <div className="flex items-center gap-4">


                <div className="flex items-center gap-2">

                    {/* <ProgressCircle.Root size={'xs'} value={item.completion_percentage}>
                        <ProgressCircle.Circle css={{ "--thickness": "2px"}}>
                            <ProgressCircle.Track />
                            <ProgressCircle.Range strokeLinecap="round" />
                        </ProgressCircle.Circle>
                    </ProgressCircle.Root> */}

                <span className="text-sm! text-(--chakra-colors-fg-muted)!">
                    {item.completion_percentage}%
                </span>
                </div>

                <div className="flex items-center gap-2 text-sm! text-(--chakra-colors-fg-muted)! flex-1!">
                   
                    <span> {item.completed_task} / {item.total_task} Task </span>
                     {/* <LuListCheck size={17} /> */}
                </div>

                <AvatarGroup gap="0" spaceX="-3" size="xs">
                    {item.project_member?.map(item => (
                        <Tooltip content={item.full_name} openDelay={10} positioning={{ placement: "top" }} key={item.project_member_id}>
                            <Avatar.Root>
                                <Avatar.Fallback name={item.full_name} />
                            </Avatar.Root>
                        </Tooltip>
                    ))}

                </AvatarGroup>


            </div>

        </li>
    )

}

export default ProjectCardRow