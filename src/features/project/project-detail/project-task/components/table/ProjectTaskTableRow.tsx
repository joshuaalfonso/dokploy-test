import { Avatar, AvatarGroup, Badge, Flex, Table, Text } from "@chakra-ui/react"
import type { Task } from "../../projectTask.model"
import { LuCircleDashed, LuFlag } from "react-icons/lu"
import { formatReadableDate } from "@/lib/formatDate"
import { getTaskStatusPalette } from "@/shared/data/taskStatus"
import { getTaskPriorityPalette } from "@/shared/data/taskPriority"


interface Props {
    item: Task
}

const ProjectTaskTableRow = ( { item }: Props ) => {
    return (
       <Table.Row key={item.task_id}>
            <Table.Cell>
                <Text fontWeight={'semibold'}>
                    {item.task_title}
                </Text>
            </Table.Cell>
            <Table.Cell>{item.task_description}</Table.Cell>
            <Table.Cell>

                <Flex gap={3}>
                    <Badge variant={'subtle'} colorPalette={getTaskPriorityPalette(item.priority)}>
                        <LuFlag size={14} />
                        {item.priority}
                    </Badge>
                    <Badge variant={'subtle'} colorPalette={getTaskStatusPalette(item.status)}>
                        <LuCircleDashed size={14} />
                        {item.status}
                    </Badge>
                </Flex>


            </Table.Cell>
            <Table.Cell>
                <Flex alignItems={'center'} gap="2">
                    <span>{ formatReadableDate(new Date(item.due_date)) }</span>
                </Flex>
            </Table.Cell>
            <Table.Cell >
                <AvatarGroup gap="0" spaceX="-2" size="sm">
                    <Avatar.Root>
                        <Avatar.Fallback name="Uchiha Sasuke" />
                    </Avatar.Root>

                    <Avatar.Root>
                        <Avatar.Fallback name="Baki Ani" />
                    </Avatar.Root>

                    <Avatar.Root>
                        <Avatar.Fallback name="Uchiha Chan" />
                    </Avatar.Root>
                    <Avatar.Root variant="solid">
                        <Avatar.Fallback>+3</Avatar.Fallback>
                    </Avatar.Root>
                </AvatarGroup>
            </Table.Cell>
        </Table.Row>
    )
}

export default ProjectTaskTableRow