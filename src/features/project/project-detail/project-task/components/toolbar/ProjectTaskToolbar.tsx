import { Button, Flex, Input } from "@chakra-ui/react"
import { LuFilter } from "react-icons/lu"








const ProjectTaskToolbar = () => {
    return (
        
        <Flex mb={6} justifyContent={'space-between'}>

            <Flex gap={3}>
                <Input 
                    w={200} 
                    size={'sm'}
                    placeholder="search task, description"
                    _placeholder={{
                        color: 'fg.muted'
                    }}
                />
                <Button size={'sm'} variant={'outline'} color={'fg.muted'}>
                    <LuFilter />
                </Button>
            </Flex>


            <Button
                size={'sm'}
            >
                Create Task
            </Button>

        </Flex>


    )
}

export default ProjectTaskToolbar