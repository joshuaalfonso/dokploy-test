import { Table, TableScrollArea } from "@chakra-ui/react"
import type { Task } from "../../projectTask.model"
import ProjectTaskTableRow from "./ProjectTaskTableRow"


interface Props {
    tasks: Task[]
}

const ProjectTaskTable = ( { tasks }: Props ) => {
    return (
        <TableScrollArea borderWidth="1px">
            <Table.Root size="md" showColumnBorder>
                <Table.Header>
                    <Table.Row >
                    <Table.ColumnHeader color={'fg.muted'}>Task</Table.ColumnHeader>
                    <Table.ColumnHeader color={'fg.muted'}>Description</Table.ColumnHeader>
                    <Table.ColumnHeader color={'fg.muted'}>Priority & Status</Table.ColumnHeader>
                    <Table.ColumnHeader color={'fg.muted'}>Due Date</Table.ColumnHeader>
                    <Table.ColumnHeader color={'fg.muted'}>Assignee</Table.ColumnHeader>
                    <Table.ColumnHeader color={'fg.muted'}>Created At</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {tasks.map((item) => (
                        <ProjectTaskTableRow 
                            item={item} 
                            key={item.task_id} 
                        />
                    ))}
                </Table.Body>
            </Table.Root>
        </TableScrollArea>
    )
}

export default ProjectTaskTable

