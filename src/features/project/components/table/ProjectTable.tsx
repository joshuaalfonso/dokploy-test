import { Table } from "@chakra-ui/react"
import type { ProjectList } from "../../project.model"
import ProjectTableRow from "./ProjectTableRow"


interface Props {
    items: ProjectList[]
}


const ProjectTable = ( { items }: Props ) => {
    return (
        <Table.ScrollArea bg={'red.100'} borderWidth="1px">
            <Table.Root size="sm" showColumnBorder>
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
                        <ProjectTableRow item={item} />
                    ))}
                </Table.Body>
            </Table.Root>
        </Table.ScrollArea>
    )
}

export default ProjectTable