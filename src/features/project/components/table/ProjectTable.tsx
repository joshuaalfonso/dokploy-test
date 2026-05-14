import { Table } from "@chakra-ui/react"
import type { ProjectList } from "../../project.model"
import ProjectTableRow from "./ProjectTableRow"


interface Props {
    items: ProjectList[]
}


const ProjectTable = ( { items }: Props ) => {
    return (
        <Table.ScrollArea borderWidth="1px">
            <Table.Root size="md" showColumnBorder>
                <Table.Header>
                    <Table.Row >
                        <Table.ColumnHeader color={'fg.muted'}>Project</Table.ColumnHeader>
                        <Table.ColumnHeader color={'fg.muted'}>Description</Table.ColumnHeader>
                        <Table.ColumnHeader color={'fg.muted'}>Status</Table.ColumnHeader>
                        <Table.ColumnHeader color={'fg.muted'}>Created At</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {items.map((item) => (
                        <ProjectTableRow item={item} key={item.project_id} />
                    ))}
                </Table.Body>
            </Table.Root>
        </Table.ScrollArea>
    )
}

export default ProjectTable