import type { Project } from "../../project.model"
import ProjectCardRow from "./ProjectCardRow"





interface Props {
    items: Project[]
}


const ProjectCardList = ( { items }: Props ) => {
    return (
        <ul className="grid! grid-cols-[repeat(auto-fill,minmax(300px,1fr))]! gap-4">
        
            { items?.map(item => (
                <ProjectCardRow 
                    item={item} 
                    key={item.project_id} 
                />
            )) }

        </ul>
    )
}

export default ProjectCardList