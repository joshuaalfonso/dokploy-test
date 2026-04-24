import { Heading } from "@chakra-ui/react"
import MyKanbanBoard from "./pages/kanban/MyKanbanBoard"








const MyTask = () => {
    return (
        <>
        
        
            <Heading size={'md'} fontWeight={'light'} mb={10}>
                My Task
            </Heading>


            <MyKanbanBoard />
        
        
        </>
    )
}

export default MyTask