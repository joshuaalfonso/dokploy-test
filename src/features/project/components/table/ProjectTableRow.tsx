import { Avatar, AvatarGroup, Badge, Table, Text } from "@chakra-ui/react"
import type { ProjectList } from "../../project.model"
import { getProjectPallete } from "@/shared/data/projectStatus"
import { formatDateTime } from "@/lib/formatDate"
import { Tooltip } from "@/components/ui/tooltip"


interface Props{
    item: ProjectList
}

const ProjectTableRow = ( { item }: Props ) => {


    const membersArray = item.project_member?.split(", ").map(name => name.trim());

    return (
        <Table.Row key={item.project_id}>
            <Table.Cell>
                <Text fontWeight={'semibold'}>
                    {item.project_name}
                </Text>
            </Table.Cell>
            <Table.Cell>
                <Text maxW={'500px'} textWrap={'wrap'}>
                    {item.project_description}
                </Text>
            </Table.Cell>
            <Table.Cell>
                <Badge colorPalette={getProjectPallete(item.status)}>{ item.status }</Badge>
            </Table.Cell>
            <Table.Cell>
                <AvatarGroup gap="0" spaceX="-3" size="xs">
                    {membersArray?.map(item => (
                        <Tooltip content={item} openDelay={10} positioning={{ placement: "top" }}>
                            <Avatar.Root>
                                <Avatar.Fallback name={item} />
                            </Avatar.Root>
                        </Tooltip>
                    ))}

                </AvatarGroup>
            </Table.Cell>
            <Table.Cell>
                { formatDateTime(new Date(item.created_at)) }
            </Table.Cell>
        </Table.Row>
    )
}

export default ProjectTableRow