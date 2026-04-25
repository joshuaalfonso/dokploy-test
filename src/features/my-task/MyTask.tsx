import { Heading, Stack, Text } from "@chakra-ui/react"
import MyKanbanBoard from "./pages/kanban/MyKanbanBoard"








const MyTask = () => {
    return (
        <>
        
        
            <Stack mb={10}>
                <Heading>
                    My Task
                </Heading>
                <Text fontSize={'sm'} color={'fg.muted'}>
                    List of all your tasks for this workspace
                </Text>
            </Stack>


            <MyKanbanBoard />
        
        
        </>
    )
}

export default MyTask