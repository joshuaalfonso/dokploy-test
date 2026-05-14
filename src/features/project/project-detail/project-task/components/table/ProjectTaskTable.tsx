import { Avatar, AvatarGroup, Badge, Flex, Table, TableScrollArea } from "@chakra-ui/react"
import { LuFlag } from "react-icons/lu"



const ProjectTaskTable = () => {
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
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {items.map((item) => (
                    <Table.Row key={item.id}>
                        <Table.Cell>{item.title}</Table.Cell>
                        <Table.Cell>{item.description}</Table.Cell>
                        <Table.Cell>

                            <Flex gap={3}>
                                <Badge variant={'subtle'} colorPalette={'red'}>
                                    {/* <LuFlag size={14} /> */}
                                    {item.priority}
                                </Badge>
                                <Badge variant={'subtle'} colorPalette={'yellow'}>
                                    {/* <LuFlag size={14} /> */}
                                    {item.status}
                                </Badge>
                            </Flex>


                        </Table.Cell>
                         <Table.Cell>
                            <Flex alignItems={'center'} gap="2">
                                <LuFlag />
                                <span>{item.end_date}</span>
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
                    ))}
                </Table.Body>
            </Table.Root>
        </TableScrollArea>
    )
}

export default ProjectTaskTable

const items = [
  { id: 1, title: "Responsive Design", description: "Responsive Design", priority: 'low', status: 'in progress', end_date: '02/03/2026', price: 999.99 },
  { id: 2, title: "Coffee Maker", description: "Home Appliances",  priority: 'high', status: 'todo', end_date: '05/026/2026', price: 49.99 },
  { id: 3, title: "Desk Chair", description: "Furniture",  priority: 'low', status: 'in progress', end_date: '03/15/2026', price: 150.0 },
  { id: 4, title: "Smartphone", description: "Electronics",  priority: 'medium', status: 'todo', end_date: '04/010/2026', price: 799.99 },
  { id: 5, title: "Headphones", description: "Accessories", priority: 'medium', status: 'completed', end_date: '02/03/2026', price: 199.99 },
]