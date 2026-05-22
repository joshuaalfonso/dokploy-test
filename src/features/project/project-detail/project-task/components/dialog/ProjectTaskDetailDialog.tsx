
import { Avatar, Badge, Button, DataList, Drawer, For, HStack, Portal, Tag, Text } from '@chakra-ui/react'
import { useProjectTaskDialogStore } from '../../store/projectTaskStore';
import { getTaskStatusPalette } from '@/shared/data/taskStatus';
import { formatReadableDate } from '@/lib/formatDate';
import { getTaskPriorityPalette } from '@/shared/data/taskPriority';

const ProjectTaskDetailDialog = () => {


    const open = useProjectTaskDialogStore(state => state.isDetailOpen);
    const setOpen = useProjectTaskDialogStore(state => state.setDetailOpen);
    const selectedTask =  useProjectTaskDialogStore(state => state.selectedTask);
    const setSelectedTask =  useProjectTaskDialogStore(state => state.setSelectedTask);

    // console.log(selectedTask)

    // if (!selectedTask) return 

    return (

        <Drawer.Root
            open={open} 
            onOpenChange={(e) => {
                setOpen(e.open);
            }}
            onExitComplete={() => setSelectedTask(null)}
            size={'md'}
            lazyMount 
        >
            <Drawer.Trigger asChild>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop 
                    bg="transparent"
                    backdropFilter="blur(4px)" 
                />
                <Drawer.Positioner>
                <Drawer.Content background={'bg'} borderWidth="1px" >

                    <Drawer.Header>
                        <Drawer.Title fontSize={'2xl'}>
                            { selectedTask?.task_title }
                        </Drawer.Title>
                    </Drawer.Header>

                    <Drawer.Body spaceY={8}>

                        <Text color="fg.muted">
                            { selectedTask?.task_description }
                        </Text>

                        <DataList.Root orientation="horizontal">
                            
                            <DataList.Item>
                                <DataList.ItemLabel>Status</DataList.ItemLabel>
                                <DataList.ItemValue>
                                    <Badge colorPalette={getTaskStatusPalette(selectedTask?.status || 'todo')}>
                                        {selectedTask?.status}
                                    </Badge>
                                </DataList.ItemValue>
                            </DataList.Item>

                            <DataList.Item>
                                <DataList.ItemLabel>Assignees</DataList.ItemLabel>
                                <DataList.ItemValue>
                                    <HStack>
                                        <For each={selectedTask?.assignees}>
                                            {(assignee) => (
                                            <Tag.Root key={assignee.user_id} size={'xl'} rounded="full">
                                                <Tag.StartElement>
                                                <Avatar.Root size="full" variant={'solid'}>
                                                    <Avatar.Fallback name={assignee.full_name} />
                                                </Avatar.Root>
                                                </Tag.StartElement>
                                                <Tag.Label>{assignee.full_name}</Tag.Label>
                                            </Tag.Root>
                                            )}
                                        </For>
                                    </HStack>
                                </DataList.ItemValue>
                            </DataList.Item>

                            <DataList.Item>
                                <DataList.ItemLabel>Due Date</DataList.ItemLabel>
                                <DataList.ItemValue>
                                    {formatReadableDate(new Date(selectedTask?.due_date || new Date()))}
                                </DataList.ItemValue>
                            </DataList.Item>

                            <DataList.Item>
                                <DataList.ItemLabel>Priority</DataList.ItemLabel>
                                <DataList.ItemValue>
                                    <Badge colorPalette={getTaskPriorityPalette(selectedTask?.priority || 'low')}>
                                        {selectedTask?.priority}
                                    </Badge>
                                </DataList.ItemValue>
                            </DataList.Item>
                            
                        </DataList.Root>

                    </Drawer.Body>

                    <Drawer.Footer>
                        <Button variant="ghost" onClick={() => setOpen(false)}>Close</Button>
                    {/* <Button>Save</Button> */}
                    </Drawer.Footer>

                    {/* <Drawer.CloseTrigger asChild>
                    <CloseButton size="sm" />
                    </Drawer.CloseTrigger> */}
                </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    )
}

export default ProjectTaskDetailDialog