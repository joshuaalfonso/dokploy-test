import { LuFolder } from "react-icons/lu"
import type { ProjectList } from "../../project.model"
import { Avatar, AvatarGroup, Badge, Separator } from "@chakra-ui/react"
import { getProjectPallete } from "@/shared/data/projectStatus"
import { useLocation, useNavigate } from "react-router-dom"
import { Tooltip } from "@/components/ui/tooltip"


interface Props {
    item: ProjectList
}


const ProjectCardRow = ( { item }: Props ) => {

    const navigate = useNavigate();

    const location = useLocation();

    const membersArray = item.project_member?.split(", ").map(name => name.trim());

    return (
        <li 
            className="
                border! rounded-md px-6! py-4! space-y-2! 
                hover:shadow-(--chakra-shadows-sm) 
                transition-all duration-200 ease-out
                cursor-pointer
            " 
            onClick={() =>
                navigate(`${item.project_id}/task`, {
                    state: {
                        from: location,
                    },
                })
            }
        >

            <div className="flex justify-between items-center">
                <LuFolder size={20} />
                <Badge colorPalette={getProjectPallete(item.status)}>{ item.status }</Badge>
            </div>

            <div>
                <h1 className="font-sm! font-semibold! mb-1!">{ item.project_name }</h1>
                <p className="text-sm! text-(--chakra-colors-fg-muted)!">
                    { item.project_description }
                </p>
            </div>

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

                <span className="text-sm! text-(--chakra-colors-fg-muted)!">{item.completion_percentage}%</span>

                <div className="flex items-center gap-2 text-sm! text-(--chakra-colors-fg-muted)! flex-1!">
                   
                    <span> {item.completed_task} / {item.total_task} Task </span>
                     {/* <LuListCheck size={17} /> */}
                </div>

                 <AvatarGroup gap="0" spaceX="-3" size="xs">
                    {membersArray?.map(item => (
                        <Tooltip content={item} openDelay={10} positioning={{ placement: "top" }}>
                            <Avatar.Root>
                                <Avatar.Fallback name={item} />
                            </Avatar.Root>
                        </Tooltip>
                    ))}

                 </AvatarGroup>


            </div>

        </li>
    )

}

export default ProjectCardRow