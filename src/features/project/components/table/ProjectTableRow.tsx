import { Badge, Table, Text } from "@chakra-ui/react"
import type { ProjectList } from "../../project.model"
import { getProjectPallete } from "@/shared/data/projectStatus"
import { formatDateTime } from "@/lib/formatDate"


interface Props{
    item: ProjectList
}

const ProjectTableRow = ( { item }: Props ) => {
    return (
        <Table.Row key={item.project_id}>
            <Table.Cell>
                <Text fontWeight={'semibold'}>
                    {item.project_name}
                </Text>
            </Table.Cell>
            <Table.Cell>{item.project_description}</Table.Cell>
            <Table.Cell>
                <Badge colorPalette={getProjectPallete(item.status)}>{ item.status }</Badge>
            </Table.Cell>
            <Table.Cell>
                { formatDateTime(new Date(item.created_at)) }
            </Table.Cell>
        </Table.Row>
    )
}

export default ProjectTableRow