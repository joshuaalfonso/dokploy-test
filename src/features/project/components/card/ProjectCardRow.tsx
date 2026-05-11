import { LuFolder, LuListCheck } from "react-icons/lu"
import type { Project } from "../../project.model"
import { Avatar, Badge, Separator } from "@chakra-ui/react"


interface Props {
    item: Project
}


const ProjectCardRow = ( { item }: Props ) => {

    return (
        <li 
            className="
                border! rounded-md px-6! py-4! space-y-2! 
                hover:shadow-(--chakra-shadows-sm) 
                transition-all duration-200 ease-out
            " 
        >

            <div className="flex justify-between items-center">
                <LuFolder size={20} />
                <Badge>{ item.status }</Badge>
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

                <span className="text-sm! text-(--chakra-colors-fg-muted)!">72%</span>

                <div className="flex items-center gap-2 text-sm! text-(--chakra-colors-fg-muted)! flex-1!">
                    <LuListCheck />
                    <span>4 / 20 Tasks</span>
                </div>

                <Avatar.Root size={'xs'}>
                    <Avatar.Fallback name="Segun Adebayo" />
                    <Avatar.Image src="https://bit.ly/sage-adebayo" />
                </Avatar.Root>

            </div>

        </li>
    )

}

export default ProjectCardRow